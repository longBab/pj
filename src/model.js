/**
 * 路径变量
 * @param {string} path 
 * @param {object} obj 
 * @param {object} value 
 * @returns {object|boolean}
 */
 var __Dictionary={};
 function pathVar(path,obj,value){
     var result;
     //console.log(["pathVar",path,obj,value]);
     if(value!=undefined){
 
         try{ result=(new Function("obj","value","obj."+path+"=value;return true;")).apply(obj,[obj,value]);}catch(ee){console.warn(["(set)=>[return obj."+path+"=value;]",ee]);}
     }
     else {
         try{result=(new Function("obj","return obj."+path+";")).apply(obj,[obj]);}catch(ee){console.warn(["(get)=>"+path,value,ee]);}
     }
     return result;
     /*
      var si,key=path,scope=obj;
     si=path.lastIndexOf(".");if(value!=undefined&&si!=-1){key=path.substring(si+1);path=path.substring(0,si);}
     scope=(new Function("obj","return obj."+path+";")).apply(obj,[obj]);
     if(value!=undefined){
        
         if(scope&&key)scope[key]=value;
         return true;
     }
     return scope;
     */
 }
 /**
  * 获取值
  * @param {string|object} path 路径
  * @param {object|string} obj 对像值  
  * @returns {object}
  */
 let __maps=["$parent.$parent.$parent.$parent","$parent.$parent.$parent","$parent.$parent","$parent.$parent","$parent",""];
 let __reg=(/^(ROOT|Mask|Header|Footer|Dialog)/);
 let __reg01=(/^(ROOT)/);
 function get(path,obj){
     var tpath,tobj,key,value;
     if(typeof(path)!="string"&&typeof(obj)=="string"){
         tobj=path;path=obj;obj=tobj;
     }else if(typeof(path)=="string"&&obj==undefined)obj=this;
     value=__Dictionary[path];if(value!=undefined)return value;
     if(__reg.test(path)){
         for(key in __maps){
            /*
            if(__reg01.test(path)){
             //tpath=path.replace(__reg01,"");
             //if(pathVar(__maps[key]+".Name",obj)=="ROOT");
              console.log([__maps[key]+".Name",pathVar(__maps[key]+".Name",obj)]);
             continue;
            }*/
            if(__reg01.test(path)){
             tpath=__maps[key]+path.replace(__reg01,"");
             if(path=="ROOT")tpath=__maps[key]+".Name";
            }
            else tpath=__maps[key]+(__maps[key]==""?"":".")+"$refs"+"."+path;
            
            value=pathVar(tpath,obj);
            if(path=="ROOT"&&value=="ROOT")value=pathVar(__maps[key],obj);
            //console.log([tpath,value]);
            if(value!=undefined){__Dictionary[path]=value;return value;}
         }
     }
     value=pathVar(path,obj);
     
     return value;
 }
 /**
  * 设置值
  * @param {object} value 值 
  * @param {string|object} path 路径
  * @param {object} obj 对象
  * @returns {boolean}
  */
 function set(value,path,obj){
     var si,rpath=path,tpath=path,key,_obj;
     if(obj==undefined)obj=this;
     si=path.lastIndexOf(".");
     if(si==-1){obj[path]=value;return true;}
     if(si!=-1){rpath=path.substring(0,si);tpath=path.substring(si+1);}
     _obj=get(rpath,obj);
     if(_obj){_obj[tpath]=value;return true;}
     console.log(["set",_obj,tpath,value]);
     /*
     if(__reg.test(rpath)){
         for(key in __maps){
            tpath=__maps[key];
           if(pathVar(tpath+"."+rpath,obj)!=undefined){
             path=tpath+"."+path; break;
           }
         }
     }*/
 
     //console.log([value,path,obj]);
     return pathVar(path,obj,value);
 }
 /**
  * 引入
  * @param {object|string} tobj 目标对象
  * @param {object} sobj 源对像
  */
 function extend(tobj,sobj,flag){
     var key,value;
      
     if(typeof(tobj)=="object"&&sobj==undefined){sobj=tobj;tobj=this;}
     else if(typeof(tobj)=="string")tobj=get.apply(this,[tobj]);
     if(tobj==undefined)tobj=this;
     for(key in sobj){
        value=sobj[key];
        if(value&&tobj[key]&&value.constructor==Array&&value.constructor==tobj[key].constructor)
        {
            tobj[key]=value;
        }
        else if(typeof(tobj[key])=="object"&&typeof(value)=="object"){
             extend(tobj[key],value);
        }else tobj[key]=value;
     }
 }
 /**
  * 
  * @param {string} path 
  * @param {array} args 
  * @param {object} obj 
  */
 function call(path,args,obj){
     var si,scope,fun;
   
     if(obj==undefined)obj=this;
   
     fun=get(path,obj);scope=obj;
     si=path.lastIndexOf(".");
     if(si!=-1)scope=get(path.substring(0,si),obj);
     if(typeof(fun)=="function")fun.apply(scope,args);
     return;
 }
 
 function parseDate(obj){
     var 
     /** 
     * @type {Number} 数字时间 
     */
     dts,
     /** 
     * @type {string} 日期正则 
     */
     re1,
     /** 
     * @type {string} 时间正则
     */
     re2,
     /** 
     * @type {RegExp} 正则 
     */
     re,
     /** 
     * @type {Object} 匹配集 
     */
     mcs,
     /** 
     * @type {Number} 年 
     */
     year=0,
     /** 
     * @type {Number} 月 
     */
     month=0,
     /** 
     * @type {Number} 日 
     */
     day=0,
     /** 
     * @type {Number} 时 
     */
     hour=0,
     /** 
     * @type {Number}  分
     */
     minute=0,
     /** 
     * @type {Number} 秒
     */
     second=0,
     /** 
     * @type {Number} 微秒 
     */
     msecond=0,
     /** 
     * @type {Data} 时间
     */
     datetime;
     if(!obj)return new Date(1972,0,1,0,0,0,0);
     if(!isNaN(obj)){
     dts=parseInt(obj);if(dts<4294967296)dts=dts*1000;
     return new Date(dts);
     }
     dts=obj;
     re1="(\\d{2,4})\\s?[.|\/|-]\\s?(\\d{1,2})\\s?[.|\/|-]\\s?(\\d{1,2})";
     re2="(\\d{1,2})\\s?:\\s?(\\d{1,2})\\s?:\\s?(\\d{1,2})";
     re=new RegExp(re1+"\\s+"+re2+".(\\d+)");mcs=dts.match(re);
     if(!mcs)re=new RegExp(re1+"\\s+"+re2);mcs=dts.match(re);
     if(!mcs)re=new RegExp(re1);mcs=dts.match(re);
     if(mcs&&mcs.length>3){
     year=parseInt(mcs[1]);month=parseInt(mcs[2])-1;day=parseInt(mcs[3]);
     if(mcs.length>6){hour=parseInt(mcs[4]);minute=parseInt(mcs[5]);second=parseInt(mcs[6]);}
     if(mcs.length>7)msecond=mcs[7];
     datetime=new Date(year,month,day,hour,minute,second,msecond);
     }
 
     return datetime;
 }
 /**
 * @function
 * @param {Date} date 路径
 * @param {String} format 格式符(yyyy-MM-dd HH:mm:ss)
 * @description  对象值转日期
 * @returns {String} 日期 
 */	
 function formatDate(date,format){
     if(!date)return;
     if(date.constructor!=Date)date=parseDate(date);
     format=format||"yyyy-MM-dd HH:mm:ss";
     function zeroize(value,length){
         if(!length)length=2;
         value="00000"+value;
         return value.substr(value.length-length);
     }	
     return format.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {  
         switch($0) {  
             case 'd':   return date.getDate();  
             case 'dd':  return zeroize(date.getDate());  
             case 'ddd': return ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'][date.getDay()];  
             case 'dddd':return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()];  
             case 'M':   return date.getMonth() + 1;  
             case 'MM':  return zeroize(date.getMonth() + 1);  
             case 'MMM': return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()];  
             case 'MMMM':return ['January','February','March','April','May','June','July','August','September','October','November','December'][date.getMonth()];  
             case 'yy':  return String(date.getFullYear()).substr(2);  
             case 'yyyy':return date.getFullYear();  
             case 'h':   return date.getHours() % 12 || 12;  
             case 'hh':  return zeroize(date.getHours() % 12 || 12);  
             case 'H':   return date.getHours();  
             case 'HH':  return zeroize(date.getHours());  
             case 'm':   return date.getMinutes();  
             case 'mm':  return zeroize(date.getMinutes());  
             case 's':   return date.getSeconds();  
             case 'ss':  return zeroize(date.getSeconds());  
             case 'l':   return zeroize(date.getMilliseconds(), 3);  
             case 'L':   var m = date.getMilliseconds();  
             if (m > 99) m = Math.round(m / 10);  
             return zeroize(m);  
             case 'tt':  return date.getHours() < 12 ? 'am' : 'pm';  
             case 'TT':  return date.getHours() < 12 ? 'AM' : 'PM';  
             case 'Z':   return date.toUTCString().match(/[A-Z]+$/);  
             default:    return $0.substr(1, $0.length - 2);  
             }  
     });
 }
 
 export default {pathVar,get,set,extend,call,parseDate,formatDate}