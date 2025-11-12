import setting from '@/store/modules/setting.js';
import user from '@/store/modules/user.js';
let store;
// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
store=new Vuex.Store({
	modules:{
    setting,
		user,
	},actions: {
    init(context,scope){
        let that=this;
        console.log(["init",that]);
        that.state.scope=scope;
    }
  }
})
// #endif

// #ifdef VUE3
import {createStore} from 'vuex'
store=createStore ({
    modules: {
      setting,
      user
    },actions: {
      init(context,scope){
          let that=this;
          console.log(["init",that]);
          that.state.scope=scope;
      }
  },
  });
// #endif
export default store;

