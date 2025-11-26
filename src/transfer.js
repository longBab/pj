var that = this,
  API_URL = "",
  API_KEY = "",
  BASE_DIR="";
/**
 * @function
 * @description URL编码
 * @param {String} str 编码字符串
 * @return {String}
 */
function urlEncode(str) {
  str = str + "";
  str = encodeURIComponent(str);
  str = str
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
    .replace(/%20/g, "+");
  return str;
}
/**
 * @function
 * @description URL解码
 * @param {string} str 编码字符串
 * @return {string}
 */
function urlDecode(str) {
  str = str + "";
  str = decodeURIComponent(str);
  str = str
    .replace(/%21/g, "!")
    .replace(/%27/g, "'")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%2A/g, "*")
    .replace(/%20/g, "+");
  return str;
}
function formatUrl(url, type, data) {
  if (data == undefined && typeof type == "object") data = type;
  var re = /^(GET|PUT|POST|DELETE)\s?(.*?)$/i,
    result = url,
    method = "GET",
    mc = result.match(re);
	
  if (mc != null && mc.length > 1) { 
    method = (mc[1] + "").toUpperCase(); result = mc[2];
  }
  result = result.replace(/\{(.*?)\}/g, function (arg1, arg2) {
    return data && data[arg2] ? data[arg2] : arg1;
  });
  return [url, method, result];
}
function request(options) {
  //console.log(options);
  var url = options.url || "",
    store=that.$store,
    state = that && store ? that.$store.state : {},
    setting = state.setting || {},
    method = options.method || "GET",
    headers = options.headers || options.header || {},
    data = options.data,
    flag=options.flag||1,
    re = /(~\/)([^:]+)/i,
    mc,k,v;
  
  flag=flag*1;
  //console.log(["request.2",flag,options]);
  if (!API_URL && setting) API_URL = setting.API_URL;
  if (!API_KEY && setting) API_KEY = setting.API_KEY;
  if (!BASE_DIR && setting) BASE_DIR = setting.BASE_DIR;
  mc = formatUrl(url,data);
  console.log(["mc",mc]);
  method = mc[1];url = mc[2];

  if (url.indexOf("?") == -1) url += "?";
  else url += "&";
  if (method == "GET" && data) {
    for (k in data) {
      v = data[k];
      if (!v) continue;
      //console.log([k, v, typeof v]);
      if (v.constructor == Date) {
        if (k == "STime") v = that.formatDate(v, "yyyy-MM-dd 00:00:00");
        else if (k == "ETime") v = that.formatDate(v, "yyyy-MM-dd 23:59:59");
        else v = that.formatDate(v);
      }
      url += urlEncode(k) + "=" + urlEncode(v) + "&";
    }
  }
  url += "rnd=" + Math.random();
  if (re.test(url)) url = url.replace(re, BASE_DIR+"$2");
  else if (url.substring(0, 1) != "/" && !/:\/\//i.test(url))
    url = API_URL + url;
    //"Bearer " + 
  if (state.user && state.user.token)headers["Authorization"] ="Bearer "+state.user.token;
  if (setting.lang)headers["lang"] = setting.lang;
  if(setting.clientId)headers["clientId"] = setting.clientId;
  if(setting.tenantId)headers["tenantId"] = setting.tenantId;
  return new Promise((resolve, reject) => {
    if((flag&1)==1)uni.showLoading({});
    
    uni.request({
      url: url,
      method: method || "GET",
      data: options.data || {},
      header: headers,
      success: (resp) => {
        var data=resp.data||resp,msg,code=200,isAuth=false;
        if((flag&1)==1)uni.hideLoading();
        console.log(["resp",resp]);
        if(data.status&&data.error){
          data={error:data.status,message:data.error+(data.path?"["+data.path+"]":"")};
        }
        code=data.code||code;
        if((flag&2)==2){resolve(data);return;}
        msg=data.message||data.msg||"";
        if(code=="401"||(data.error!="0"&&msg.indexOf("/App/Member")!=-1))isAuth=true;
        data=data.data||data||{};
        data.error="0";
        if(code!="200")data.error=code;
      
        //console.log(["xxxxxxxxxxxxxxxxxxxxxxx",isAuth]);
       
        if(data.error!="0"&&msg){
          if(isAuth){
            var user=store&&store.state&&store.state.user?store.state.user:{};
            if(user.account){
              store.commit("setUser",{id:"",account:user.account,mail:"",mobile:"",userName:"",roles:"",token:"",__KEY:"account"});
            }
            setTimeout(function(){
              that.gotoPage("/pages/login");
            },2000);
            return;
          }
          that.Alert(msg);
          reject(data); 
          return;
        }
        console.log(["transfer.success",data,flag]);
        resolve(resp);
      },
      fail: (err) => {
        if((flag&1)==1)uni.hideLoading();
        if((flag&2)==2){reject(err);return;}
        console.log(["transfer.fail", err]);
        if (that && that.Alert) that.Alert(err.message + "[" + err.code + "]");
        reject(err);
      },
    });
  });
}
function init(scope) {
  that = scope;
}
function get(url, options) {
  options = options || {};
  options.url = url;
  options.method = "GET";
  return request(options);
}
function post(url, data, options) {
  options = options || {};
  options.url = url;
  options.method = "POST";
  options.data = data;
  return request(options);
}
function put(url, data, options) {
  options = options || {};
  options.url = url;
  options.method = "PUT";
  options.data = data;
  return request(options);
}
function del(url, options) {
  options = options || {};
  options.url = url;
  options.method = "DELETE";
  return request(options);
}
function uploadFile(args){
  let state = that && that.$store ? that.$store.state : {},
  setting = state.setting || {};
  if (!API_URL && setting) API_URL = setting.API_URL;
  if (!API_KEY && setting) API_KEY = setting.API_KEY;
  console.log(["uploadFile[0]",args]);
  console.log("uploadFile[0]",args.filePath);
  
 // #ifdef APP-PLUS
 return new Promise((resolve, reject) => {
   //plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, fs => {
     plus.io.resolveLocalFileSystemURL(getLocalFilePath(args.filePath),fileEntry => {
      fileEntry.file(file=>{
        let reader = new plus.io.FileReader();
        reader.onload = function(res) {
         let content=(res&&res.target&&res.target.result?res.target.result:"").replace(/[\r\n]/g,""),data={content:content,folder:args.folder||"avatars",name:args.name||"avatar",mime:args.mime||"jpg"},
         options={
           url: API_URL+'/file',
           method:'PUT',
           data:data,
           header:{'Accept': 'application/json; charset=utf8'},
           success: (res) => {
             res=res.data||res;
              console.log(["success",res]);
             resolve({code:0,message:"OK",fileID:"cloud://"+res.id+";"+res.content,res});
           },
           fail:(res)=>{
             res=res.data||res;
             console.log(["fail",res]);
             resolve({code:501,message:"fail",res});
           } 
         }
          console.log(["data", data]);  
         uni.request(options);
        };
        reader.readAsDataURL(file);
        
      })
      
    });
   //}) 
 });

 // #endif
 
 //#ifdef H5 
 return new Promise((resolve, reject) => {
             var xhr = new XMLHttpRequest();
             xhr.open('GET', args.filePath);
             xhr.responseType = 'blob';
             console.log(["uploadFile[1]",xhr]);
             xhr.onload = function () {
              console.log(["uploadFile[2]",xhr.response]);
              let reader = new FileReader();
              reader.onload = function(res) {
                let data={content:res.target.result,folder:"avatars",name:"avatar",mime:"jpg"},
                options={
                  url: API_URL+'file',
                  method:'PUT',
                  data:data,
                  header:{'Accept': 'application/json; charset=utf8'},
                  success: (res) => {
                    res=res.data||res;
                   console.log(["success",res]);
                    resolve({code:0,message:"OK",fileID:"cloud://"+res.id+";"+res.content,res});
                  },
                  fail:(res)=>{
                    res=res.data||res;
                    console.log(["fail",res]);
                    resolve({code:501,message:"fail",res});
                  } 
                }
               console.log(["base64:", res.target.result]);  
                uni.request(options);
              };
              reader.readAsDataURL(xhr.response);
             }
             xhr.send(null);
   });
 //#endif
}
function getTempFileURL(args){
    let state = that && that.$store ? that.$store.state : {},
    setting = state.setting || {};
    if (!API_URL && setting) API_URL = setting.API_URL;
    if (!API_KEY && setting) API_KEY = setting.API_KEY;
    return new Promise(resolve => {
    var fileList=args.fileList,si=-1;
    if(fileList&&fileList.length>0)fileList=fileList[0];
    fileList=fileList+"";
    si=fileList.indexOf(";");if(si!=-1)fileList=fileList.substr(si+1);
    console.log(["getTempFileURL",args,fileList]); 
    //args.success({fileList:[{tempFileURL:API_URL+fileList}]});
    args.success({fileList:[{tempFileURL:fileList}]});
    
    });
}
export default { API_URL, API_KEY, init, request, get, post, put, delete: del,uploadFile,getTempFileURL};
