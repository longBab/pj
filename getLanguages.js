var path=require('path'),fs = require("fs");
function Guid(format){
    var f="D",bits;
    if(format!=undefined)
    {
        f=format.replace(/([0-9]+)/i,"");f=f.toUpperCase();
        bits=format.replace(/([B|D|N|P])/i,"");
    }
    var bits;
    if(bits!=32)bits=16;
    if(!f)f="N";
    var r=new Date().getTime().toString(16);
    r+=parseInt(Math.random()*Math.pow(10,16)).toString(16);
    r+=parseInt(Math.random()*Math.pow(10,16)).toString(16);
    r=r.substr(0,bits);
    /* while(r.length<bits)
    {
         var t=Math.floor(Math.random()*0x10);
         t=t.toString(16);
         r+=t;
    }*/
    if(f!="N")
    {
     var t="";
     if(r.length==32){t=r.substr(0,8);r=r.substr(8);}
     else{t=r.substr(0,4);r=r.substr(4);}
     t+="-"+r.substr(0,4);r=r.substr(4);
     t+="-"+r.substr(0,4);r=r.substr(4);
     t+="-"+r.substr(0,4);r=r.substr(4);
     if(r!="")t+="-"+r;r=t
    }
    if(f=="B")r="{"+r+"}";
    else if(f=="P")r="("+r+")"; 
     return r;
}
function getFiles(dir,out){
    var files,file,filePath,stat,content,sql="";
    out=out||{};
    
    files = fs.readdirSync(dir);
    for(index in files){
            file=files[index];
            filePath = path.join(dir, file);
            stat = fs.statSync(filePath);
            
            if(/^.*?(.vue)$/i.test(filePath)){
                content=fs.readFileSync(filePath,"utf8");
                content.replace(/\$t\(['"](.*?)['"]\)/g,function(arg0,arg1,arg2){
                    if(out.keys[arg1])return;
                    out.keys[arg1]=true;
                   //if(out.sql!="")out.sql+=";\n";
                   var isql="insert into mr_languages(Id,`Value`) values('"+Guid('16N')+"','"+arg1+"');"
                   console.log(isql); 
                   //console.log([filePath+"["+Guid('16N')+"]",arg1]);
                })
                
                continue;
            }
            if (stat.isDirectory()){getFiles(filePath,out);continue;}    
    }
   
}

out={sql:"",keys:{}};
getFiles("src/pages",out);
console.log(["sql",out.sql]);