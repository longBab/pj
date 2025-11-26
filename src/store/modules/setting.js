export default {
    state: {
       name:"App",title:"App",logo:"src/assets/logo.png",API_URL:"",API_KEY:"",BASE_DIR:"/",loaded:false,theme:"default",
       clientId:"428a8310cd442757ae699df5d894f051",
       tenantId:"0000"
    },
    mutations: {

        setSetting(state,value){
            let that=this,scope=that.state&&that.state.scope?that.state.scope:null,json;
            if(value&&value.__path&&value.__data){
                state[value.__path]=value.__data;value=state;
            }
            console.log(["setSetting.00",state,value,scope]); 
           
            scope.extend(state,value);
            json=JSON.stringify(state);
            if(typeof(uni))uni.setStorageSync("Setting",json);
            else localStorage.setItem("Setting",json);
            return true;
        } 
    },
    actions: {
        initSetting(context){
            let that=this,scope=that.state&&that.state.scope?that.state.scope:null;
            var value=typeof(uni)?uni.getStorageSync("Setting"):localStorage.getItem("Setting"),value=value?JSON.parse(value):that.state.setting||{};
            scope.extend(that.state,{setting:value});
            //console.log(["initSetting",value]);
            return true;
        },
        getSetting(context){
            let that=this;
            //console.log(["getFilter",that.state.filter]);
            return that.state.setting;
        }
    }
}