
var _this = this;
function init(scope) {
    _this = scope;
}
function initComponent(){
    let that=this,router=that.router,route=that.$route,path=route.fullPath,title="",i=0,item={},url="",breadcrumb=[];
    if(!that.$store.state.user.id&&!(/(Loading|Login)/i).test(path)){
        //that.gotoPage("Login");
        //console.log(["Login",path,(/(Login)/i).test(path)]);
        that.Confirm("用户验证失败请重新登陆",(event)=>{
            that.gotoPage("Login");
        },{flag:4});
        return;
    }

}
 
/**
 * 
 * @param {*} value 
 * @param {*} type 
 */
function formatUrl(value,type){
    let that=this,state = that && that.$store ? that.$store.state : {},
    setting = state.setting || {},apiUrl=setting.API_URL||"",url=value;
    var basePath=window.location.origin + '/';
    if(typeof(value)!="string")return value;
    value=(value+"").replace(/\\/g,"\/");
    if(value&&value.indexOf(",")!=-1)return value.split(',')[0];
    if(/\/attachments\//i.test(value))return apiUrl+value;
    if(value.indexOf("://")!=-1)return value;
    value=`${basePath}${value}`;
    return value;
}

function formatMoney(s,n,u) {
    var flag=1,t="",i=0,l,r;
    if(s&&s.get)s=s.get()||0;
    if(n&&n.get)n=n.get();
    if(u&&u.get)u=u.get();
    if(typeof(u)=="number"){
        if((u&64)==64)s=Math.abs(s);
    }
    s=s*1;if(s<0)flag=-1;s=Math.abs(s);
    n =n||0;u=u||"";if(typeof(u)!="string")u="";
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    s=t.split("").reverse().join("");if(n>0)s+= "." + r;
    if(flag==-1)s="-"+s;
    return u+s;
}

function formatDisplay(str,begin,end,type){
    if(!str)return "";
	var str=str||"",begin=begin||0,end=end||end,type=type||0,len=str.length;
    if(type==0) return str;
	if(type>8)len=type;
    if(len<3&&begin>=1){begin=1;end=0;}
    if(len<begin+end||len==1)return str;
    return str.substring(0,begin)+
    "**************************************************************************************".substring(0,len-begin-end)+
    str.substring(str.length-end);
}

/**
 * 跳转到页面
 * @param {*} event 
 * @param {*} path 
 */
 function gotoPage(event,path){
    if(!path&&typeof(event)=="string")path=event;
    
    if((path+"").indexOf("blank ")==0){event="_blank";path=path.replace("blank ","");}
    if(!path){
        //console.log(path);
        history.back();
        //uni.navigateBack({delta:1});
        return;
    }
    else if(path.indexOf("://")!=-1){
        if(event=="_blank"){window.open(path);return;}
        //plus.runtime.openURL('地址');
        window.location=path;
        return;
    }
    uni.navigateTo({ url: path});
}
function Alert(content){
    var content=content||"",that=this,store=that.$store||{},setting=store.state?store.state.setting:{},keywords=setting.languageKeywords,reg;
    content=content.replace(/[\n]?path=>([a-z0-9._]+)/ig,"");
   
    if(that.$t){
        if(keywords){
        keywords=keywords.replace(/(,\s)/g,"|");
        reg=new RegExp("(.*?)("+keywords+")","g");
        //console.log(["reg",reg]);
        content=content.replace(reg,
        function(arg0,arg1,arg2){
            arg0=arg0.replace(arg1,that.$t(arg1)||arg1);
            arg0=arg0.replace(arg2,that.$t(arg2)||arg2);
            return arg0;
         });
        }
      content=that.$t(content)||content;
    }
    uni.showToast({
        title:content,duration: 3000,
        icon: "none"
     });
    return false;
}
function Confirm(content,caller,option,ititle){
    //let that=this;
    //that.call("Dialog.Confirm",[content,caller,option,ititle]);
}
function loadSetting(){
    let that=this,store=that.$store,setting=store.setting,doc=typeof(window)&&window.document?window.document:{};
    return new Promise((resolve, reject) => {
        if(setting&&setting.loaded){
            doc.title=setting.title;
            resolve(setting);
            return;
        }
        that.transfer.get("~/setting.json").then((resp)=>{
            var data=resp.data||data;data.loaded=true;
            store.commit("setSetting",data);
            doc.title=data.title;
            resolve(data)
        }).catch((error)=>{
            reject(error)
        });
    })
}
function copy(event,value){
    var that=_this||this;
    if(typeof(event)=="string"&&!value)value=event;
    uni.setClipboardData({
        data: value,
        success: function() {
            uni.showToast({
                title: that.$t('复制成功'),
                icon: 'success',
                duration: 2000
            });
        },fail:(error)=> {
            uni.showToast({
                title: that.$t('复制失败'),
                icon: 'none'
            });
        }
    });
}
function toMaps(items,key,flag){
    var maps={},item={},flag=flag||0,_key;
    for(var i=0;items&&items.constructor==Array&&i<items.length;i++){
      item=items[i];
      _key=item[key];
      if((flag&1)==1)_key=(_key+"").replace(/^(.*?)\.([a-z0-9]+)$/i,"$2");
      maps[_key]=item;
    }
    return maps;
}
function getSetting(){
    var that=_this||this,state=that&&that.$store?that.$store.state:{},
    setting=state.setting;
    return setting;
}
function getCellMap(type,scope){
  var that=scope||_this||this,maps,key,options;
  maps=that.get(type+"Maps",scope)||that.get(type+"Maps");
  if(!maps){
    key="value";
    if(type=="currency"){
      key="symbol";
      options=that.get("currencys",that.utility.getSetting());
    }
    else if(type=="language"){
      key="lang";
      options=that.get("languageItems",that.utility.getSetting());
    }
    if(!options)options=that.get(type+"Options");
    if(!options)options=that.get(type+"Options",that.utility.getSetting());
    if(!options)options=that.get(type+"Types",that.utility.getSetting());
    if(!options)options=that.get(type+"s",that.utility.getSetting());
    if(options){
      maps=that.utility.toMaps(options,key);
      that.set(maps,type+"Maps"); 
    }
  }
  return maps||{"0":{text:"关"},"1":{text:"开"}};
}
function formatCell(value,type,scope){
    var that=scope||_this||this,text=value||{},text=value[type]!=undefined?value[type]:value,_key,options,maps;
    if(that.get(type+"Maps"))text=that.get(type+"Maps."+text+".text")||text;
    maps=getCellMap(type,that);
    
    if(typeof(text)=="string"&&text.indexOf(".")){
     
      _key=text;
      if(/(.*?).D$/.test(_key))return "社区奖励";
      if(_key.indexOf("Airdrop")!=-1&&type=="status")return "";
      if(!maps[_key])_key=_key.replace(/^(.*?).([^.]+)$/i, "$1");
      if(!maps[_key])_key=_key.replace(/^(.*?).([^.]+)$/i, "$1");
      if(!maps[_key])_key=_key.replace(/^(.*?).([^.]+)$/i, "$1");
      if(!maps[_key])_key=_key.replace(/^(.*?).([^.]+)$/i, "$1");
      text=(maps[_key]?maps[_key].text:null)||text;
    }
    else if(maps&&maps[text])text=maps[text].text||text;
    return text;
}
export default {init,initComponent,gotoPage,Alert,Confirm,loadSetting,formatUrl,formatMoney,formatDisplay,copy,toMaps,getSetting,getCellMap,formatCell}