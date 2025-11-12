export default {
    state: {
       id:null,account:null,mail:null,mobile:null,userName:null,roles:null,token:null
    },
    mutations: {
        setUser(state,value,key){
            var that=this,scope=that.state&&that.state.scope?that.state.scope:null,json;
            key=(value&&value.__KEY?value.__KEY:null)||key;
            //console.log(["setUser.01",state,value,scope,key]);  
            var keyValue=value&&key&&value[key]?value[key]:"";
            if(value&&key&&value.id=="")value[key]="";
            scope.extend(state,value);
            json=JSON.stringify(state);
            localStorage.setItem("User",json);
            console.log(["setUser.04",value,key,value.id==""]);  
            if(key&&value&&keyValue){
                var users=localStorage.getItem("Users")||"{}",users=JSON.parse(users);
                if(key&&value&&value.id==""&&users[keyValue])delete(users[keyValue]);
                else users[keyValue]=value;
                localStorage.setItem("Users",JSON.stringify(users));
            }
            return true;
        }
    },
    actions: {
        initUser(context){
            let that=this,scope=that.state&&that.state.scope?that.state.scope:null;
            var value=localStorage.getItem("User"),value=value?JSON.parse(value):{};
            scope.extend(that.state,{user:value});
            return true;
        },
        getUser(context){
            let that=this;
            //console.log(["getFilter",that.state.filter]);
            return that.state.user;
        },
        getUsers(context){
            var users=localStorage.getItem("Users")||"{}",users=JSON.parse(users);
            return users;
        } 
    }
}