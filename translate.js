
var path=require('path'),fs = require("fs"),axios=require("axios");
function  Youdao(query,to,callback){
  function truncate(q){
    var len = q.length;
    if(len<=20) return q;
    return q.substring(0, 10) + len + q.substring(len-10, len);
  }
  to=to||"en";
  var CryptoJS= require("crypto-js");
  var appKey = '126a8b968e3cb913';
  var key = 'c8Q1aueotvnALUscYYdC4q2zUdye2Dc4';//注意：暴露appSecret，有被盗用造成损失的风险
  var salt = (new Date).getTime();
  var curtime = Math.round(new Date().getTime()/1000);
  //var query = '我的\n个人中心';
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from = 'zh-CHS';
  var str1 = appKey + truncate(query) + salt + curtime + key;
  // var vocabId =  '';//您的用户词表ID'
  //console.log('---',str1);
  var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
  var data={
  q: query,
  appKey: appKey,
  salt: salt,
  from: from,
  to: to,
  sign: sign,
  signType: "v3",
  curtime: curtime
  /*,
  vocabId: vocabId,*/
  };
  //console.log(JSON.stringify(data));return;
  axios({
  url:"https://openapi.youdao.com/api",
  method:"POST",
  data,
  headers: {'content-type': 'application/x-www-form-urlencoded'}
  }).then((resp)=>{
  var data=resp.data||resp,code=data.code||"0",message=data.message||"OK";
  callback(data.translation,data.query);
  //console.log(data);
  });

 

}
 
function Google(){
  /*
  const translate = require('google-translate')("000000", {});
  const languages = translate.languages;
  console.log(translate.getSupportedLanguages());
  */
  const translate=require('@vitalets/google-translate-api').translate;
  const proxy=require('http-proxy-agent')("http://192.168.200.220:8118");
  console.log(translate);
  translate("Привет, мир!",{
    to:"en",
    raw:true,
    client:"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.140",
    fetchOptions:{ agent:proxy }}).then((res)=>{
    console.log(res); 

  }).catch((err)=>{
    console.log(err); 
  });
  /*
  translate.translate("test",function(res){
    console.log(res);
  });
  */
  //const { text } = await translate('Привет мир');
}
function Bing(){
  //http://api.microsofttranslator.com/V2/Ajax.svc/Translate?oncomplete=mycallback&appId=A4D660A48A6A97CCA791C34935E4C02BBB1BEC1C&from=zh-cn&to=en&text=%E9%A6%96%E9%A1%
  //https://api.microsofttranslator.com/V2/Ajax.svc/Translate?oncomplete=mycallback&appId=A4D660A48A6A97CCA791C34935E4C02BBB1BEC1C&from=zh-cn&to=vi&text=%E6%B5%8B%E8%AF%95
  //https://api.microsofttranslator.com/V2/Ajax.svc/Translate?appId=A4D660A48A6A97CCA791C34935E4C02BBB1BEC1C&from=zh-cn&to=en&text=%E9%A6%96%E9%A1%B5,%E6%88%91%E7%9A%84


}
/*
Youdao("人个中心\n金额",(translation,query)=>{
  console.log(translation);
});*/
var langDic={};
function procFiles(dir,out,basedir){
  var files,file,filePath,content;
  if(/(uni_modules|node_modules)/i.test(dir))return;
 

  files = fs.readdirSync(dir);
  for(index in files){
          file=files[index];
          filePath = path.join(dir, file);
          stat = fs.statSync(filePath);
          if (stat.isDirectory()){procFiles(filePath,out,basedir);continue;}
          if(/^.*?(.vue)$/i.test(file)){

            content=fs.readFileSync(filePath,"utf8");
            content.replace(/(\$t\(["'](.*?)["']\))|(:\s?["']([\u4E00-\u9FA5\uF900-\uFA2D]{1,})["'])/ig,function(arg0,arg1,arg2,arg3,arg4){
              var text=arg4||arg2;
              text=(text+"").replace(/^\s+|\s+$/gm,'');
              //console.log([arg0,arg1,arg2,arg3]);
              if(!text)return;
              if(!langDic[text]){
                langDic[text]=[];
                console.log(text);
              }
            })
            //return;
            console.log(filePath);
          }
         
          
  }
}
var langs="";
var keyWords="不能为空|请输入|请选择|必需为|范围在|非法|无效|不够|超出|可用";
/* 文件扫描
procFiles("src");
*/

var other=` `;
other=other.replace(/[\r\n]/ig,"|");
var others=other.split(/[\r\n]/);
var keyWords="";
for(var key in others){
  key=(others[key]||"").replace(/^\s+|\s+$/gm,'');
  if(!key)continue;
  langDic[key]=[];
}
for(var lang in langDic){
  if(langs!="")langs+="\n";
  langs+=lang;
}



 
var codes=["","en","ko","ja","th","zh-CHT","vi"];//,"vi"
codes=["","vi"];
if(keyWords)langs=keyWords.replaceAll("|","\n")+"\n"+langs;
var flags={};
//console.log(langs);
function proc(index){
  if(index==codes.length){
    var csql="\"Flag\"",sqls="";
    for(var lang in langDic){
      var item=langDic[lang],isql="0";
      if(flags[lang])isql="1";
      for(var c=0;c<item.length;c++){
        if(!sqls)csql+=",\""+(c==0?"Value":"Value0"+c)+"\"";
        isql+=",'"+(item[c].text+"").replaceAll("'","''")+"'";
      }
      sqls+="insert into \"mr_Languages\"("+csql+")";
      sqls+="values("+isql+");\n";

    }
    //sqls="delete from \"mr_Languages\";\n"+sqls;
    //fs.writeFileSync("languages.sql",sqls);
    //console.log(sqls);
   
  }
 if(index>codes.length)return;
 var code=codes[index];
 if(!code)return;
  Youdao(langs,code,(translation,query)=>{
    if(!query)console.log([code,"没数据接收"]);
    var querys=query.split(/[\n]/);
    translation=translation.constructor==Array?translation[0]:translation;
    var translations=translation.split(/[\n]/);
    for(var i=0;i<querys.length;i++){
      var key=querys[i];
      
      if(!langDic[key]){ langDic[key]=[]; flags[key]=1;}
      langDic[key][index]={text:translations[i]};
      if(!langDic[key][0]){langDic[key][0]={text:key}}
      var text=translations[i];
      text=text.replace(/[|]/g,"\n");
      console.log("--------------"+code+"."+index+"----------------");
      console.log(text);
      //console.log([code+"."+index,text+]);
    }
    proc(index+1);
  });
}
proc(1);
