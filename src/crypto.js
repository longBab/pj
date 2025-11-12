import CryptoJS,{enc,mode,pad,lib,AES,MD5,HmacMD5} from "crypto-js";
import {util,asn1,pki,md} from "node-forge";
import {v4} from "uuid";
var crypto={
    /**
     * 
     * @param {Array<Number>} ary 数组
     * @returns {String} 字符串
     */
    getStrFromBytes: function(ary) {
        var tmp,i;
        for (tmp = "", i = 0; i < ary.length; i++)tmp += String.fromCharCode(ary[i]);
        return tmp
    },
    Base64:enc.Base64,
    /**
     * AES 加密解密
    */
    AES: {
        getAesIvKey: function() {
            var _this=this,str;
            if (!_this.aesIvKey) {
                str = crypto.getStrFromBytes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
                _this.aesIvKey =enc.Utf8.parse(str)
            }
            return _this.aesIvKey
        },  
        /**
        * 获取属性
        * @param {WordArray} iv IV
        * @returns {CipherOption}
        */
       getOption: function(iv) {
           var _this=this,option=_this.option||{iv:iv,mode:mode.CBC,padding:pad.Pkcs7};
           return option
       },
        /**
         * 加密
         * @param {WordArray|String} message 信息
         * @param {WordArray|String} key 密钥
         * @returns {CipherParams}
         */
        encrypt: function(message, key) {
            var _this=this;
            return AES.encrypt(message, key, _this.getOption(_this.getAesIvKey()))
        },
        /**
         * 加密
         * @param {WordArray|String} message 信息
         * @param {WordArray|String} key 密钥
         * @returns {String}
         */
        encryptBase64:function(message, key){
           return enc.Base64.stringify(this.encrypt(message, key).ciphertext); 
        },
        /**
         * 解密
         * @param {CipherParams|String} cipher 密文
         * @param {WordArray|String} key 密钥
         * @returns {WordArray}
         */
        decrypt: function(cipher, key) {
            var _this=this;
          
            return AES.decrypt(lib.CipherParams.create({ciphertext:cipher}), key, _this.getOption(_this.getAesIvKey()))
        },
          /**
         * 解密
         * @param {CipherParams|String} cipher 密文(base64)
         * @param {WordArray|String} key 密钥
         * @returns {WordArray}
         */
        decryptBase64(cipher, key,format){
            var _this=this,cipher=cipher&&cipher.ciphertext?cipher:enc.Base64.parse(cipher),buf=_this.decrypt(cipher,key);
            if(format=="utf8")return enc.Utf8.stringify(buf);
            if(format=="base64")return enc.Base64.stringify(buf);
            return buf;

        }

    },
    MD5:MD5,
    MAC:{
         /**
         * 加密
         * @param {WordArray|String} message 信息
         * @param {WordArray|String} key 密钥
         * @returns {WordArray}
         */
        encrypt: function(message, key){return HmacMD5(message, key);},
          /**
         * 加密成Base64
         * @param {WordArray|String} message 信息
         * @param {WordArray|String} key 密钥
         * @returns {String}
         */
        encryptBase64:function(message, key){
            var _this=this;return enc.Base64.stringify(_this.encrypt(message, key));
        }
    },
    RSA:{
        rsaKeySize: 1024,
        genKeyPair:function(format){
            var keypair =pki.rsa.generateKeyPair({bits:this.rsaKeySize}),
            //publicKey=pki.publicKeyToPem(keypair.publicKey),
            //privateKey=pki.privateKeyToPem(keypair.privateKey);
            privateKey=asn1.toDer(pki.privateKeyToAsn1(keypair.privateKey)).getBytes(),
            publicKey=asn1.toDer(pki.publicKeyToAsn1(keypair.publicKey)).getBytes();
            console.log(publicKey);
            if(/^(base64|base64Private)$/i.test(format)) privateKey=util.encode64(privateKey);
            if(/^(base64|base64Public)$/i.test(format))publicKey=util.encode64(publicKey);
            return {publicKey,privateKey}
        },
        /**
         * 获取私钥处理对像
         * @param {String|asn1.ByteBuffer} privateKey 私钥
         * @returns {pki.privateKey}
         */
        fromPrivateKeyData: function(privateKey) {
            return pki.privateKeyFromAsn1(asn1.fromDer(privateKey))
        },
         /**
         * 获取公钥处理对像
         * @param {String|asn1.ByteBuffer} publicKey 私钥
         * @returns {pki.publicKey}
         */
        fromPublicKeyData: function(publicKey) {
            return pki.publicKeyFromAsn1(asn1.fromDer(publicKey))
        },
        encrypt:function(message, publicKey) {
           var cipher=this.fromPublicKeyData(publicKey).encrypt(message);
           return cipher;
        },
         /**
         * 加密成base64
         * @param {WordArray|String} message 密文(base64)
         * @param {WordArray|String} publicKey 公钥
         * @returns {WordArray|String}
         */
        encryptBase64:function(message,publicKey) {
            if(message&&message.words){message=util.decode64(enc.Base64.stringify(message));}
            if(publicKey&&publicKey.words){publicKey=util.decode64(enc.Base64.stringify(publicKey));}
            var _this=this,cipher=_this.encrypt(message,publicKey);
            return util.encode64(cipher);
        },
       decrypt: function(cipher, privateKey) {
            var message=this.fromPrivateKeyData(privateKey).decrypt(cipher);
            return message;
        }, 
        /**
         * 解密
         * @param {WordArray|String} cipher 密文(base64)
         * @param {WordArray|String} key 密钥
         * @returns {WordArray}
         */
        decryptBase64:function(cipher, privateKey,format){
            if(cipher&&cipher.words)cipher=enc.Base64.stringify(cipher);
            if(privateKey&&privateKey.words)privateKey=enc.Base64.stringify(privateKey);
            var _this=this,cipher=util.decode64(cipher),privateKey = util.decode64(privateKey),message=_this.decrypt(cipher,privateKey);
            if(/^(utf8)$/i.test(format))return message;
            message=util.encode64(message);
            if(/^(base64)$/i.test(format))return message;
            //console.log(enc.Base64.stringify(message));
            return enc.Base64.parse(message);

        },
        /**
         * 
         * @param {rsa.PrivateKey} privateKey
         * @returns {String|Asn1[]}
         */
        toPrivateKeyData: function(privateKey) {
            return asn1.toDer(pki.privateKeyToAsn1(privateKey)).getBytes();
        }
    },
    getValues: function(obj) {
        var tmp="",keys=Object.keys(obj).sort(),i,key,value;
        for (i = 0; i < keys.length; i++)
        {
            key=keys[i]; value=obj[key];
            if(value!==null) (tmp +=value);
        }
        return tmp
    },formatQuerys(obj){
        var _this=this,tmp="",keys=Object.keys(obj),i,key,value;
        for (i = 0; i < keys.length; i++)
        {
            key=keys[i]; value=obj[key];
            if(!value)continue;
            value=_this.urlEncode(value);
            if(tmp!="")tmp+="&";
            tmp+=key+"="+value;
            
        }
        return tmp;
    },
    encryptPwd:function(key){
         //var md5=md.md5.create(),buf=md5.update(key).digest();
         var _this=this,key=typeof(key)=="string"?enc.Utf8.parse(key):key,key=MD5(key);
         return enc.Hex.stringify(MD5(_this.AES.encrypt(key,key).ciphertext));
    },
    encryptMD5: function(message) {
		//var md5=md.md5.create(),buf=md5.update(key).digest();
		var _this = this,
			message = typeof(message) == "string" ? enc.Utf8.parse(message) : message,
			key = MD5(message);
		return enc.Hex.stringify(MD5(message));
	},
    urlEncode:function(str){
        str = str+"";   
        str=encodeURIComponent(str);
        str=str.replace(/!/g, '%21').
                replace(/'/g, '%27').
                replace(/\(/g, '%28').  
                replace(/\)/g, '%29').
                replace(/\*/g, '%2A').
                replace(/%20/g, '+');  
        return str;
    },
    urlDecode:function(str){
            str = str+"";   
            str=decodeURIComponent(str);
            str=str.replace(/%21/g, "!").
                    replace(/%27/g, "'").
                    replace(/%28/g, '(').  
                    replace(/%29/g, ')').
                    replace(/%2A/g, '*').
                    replace(/%20/g, '+');  
            return str; 
    },generateId(){
        return v4().replace(/-/g,"");
    },encode64:function(data){
        if(data&&data.words)return enc.Base64.stringify(data);
        return util.encode64(data);
    },decode64:function(data){
        if(data&&data.words)return enc.Base64.parse(data);
        return util.decode64(data);
    }

}

export default crypto