import model from "./model.js";
import crypto from "./crypto.js";
import utility from "./utility.js";
import transfer from "./transfer.js";
import App from "./App.vue";
import store from './store';
import languages from './languages';

//uni.getLocale().replace(/([a-z]+)-([a-z]+)/i,"$1")
let i18n,lang=uni.getLocale().toLocaleLowerCase(),i18nConfig = {
	locale:lang,//获取已设置的语言
	messages:languages
  };

//chain
/*
import * as buffer from "buffer"
if(typeof(window)){
	 if(!window.Buffer)window.Buffer = buffer.Buffer;
	if(!window.global)window.global=window;
}
*/
 
// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
import VueI18n from 'vue-i18n'//v8.x
App.mpType = 'app' //not defined meta error
Vue.config.productionTip = false
Vue.use(uView)
Vue.use(VueI18n)
Vue.prototype.$store=store;
i18n = new VueI18n(i18nConfig);
Vue.prototype.$i18n = i18n;
/* begin:core.init */
Vue.prototype.model=model;
Vue.prototype.crypto=crypto;
Vue.prototype.get=model.get;
Vue.prototype.set=model.set;
Vue.prototype.extend=model.extend;
Vue.prototype.call=model.call;
Vue.prototype.parseDate=model.parseDate;
Vue.prototype.formatDate=model.formatDate;
Vue.crypto=crypto;
Vue.prototype.utility=utility;
Vue.prototype.Alert=utility.Alert;
Vue.prototype.Confirm=utility.Confirm;
Vue.prototype.loadSetting=utility.loadSetting;
Vue.prototype.gotoPage=utility.gotoPage;
Vue.prototype.formatUrl=utility.formatUrl;
Vue.prototype.formatMoney=utility.formatMoney;
Vue.prototype.transfer=transfer;
Vue.prototype.baseUrl="./";
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})
/* end:core.init */
const app = new Vue({
	i18n,
	...App
})
app.$mount()
//console.log(["vue","OK"]);
// #endif

// #ifdef VUE3
import {createSSRApp} from "vue";
import { createI18n } from 'vue-i18n'// v9.x
import uView from "vk-uview-ui";
i18n = createI18n(i18nConfig)
export function createApp() {
	const app = createSSRApp(App);
	app.config.globalProperties.$store=store;
	app.use(i18n);
	app.use(uView);

	/* begin:core.init */
	app.config.globalProperties.model=model;
	app.config.globalProperties.crypto=crypto;
	app.config.globalProperties.get=model.get;
	app.config.globalProperties.set=model.set;
	app.config.globalProperties.extend=model.extend;
	app.config.globalProperties.call=model.call;
	app.config.globalProperties.parseDate=model.parseDate;
	app.config.globalProperties.formatDate=model.formatDate;
	app.config.globalProperties.crypto=crypto;
	app.config.globalProperties.utility=utility;
	app.config.globalProperties.Alert=utility.Alert;
	app.config.globalProperties.Confirm=utility.Confirm;
	app.config.globalProperties.gotoPage=utility.gotoPage;
	app.config.globalProperties.formatUrl=utility.formatUrl;
	app.config.globalProperties.formatMoney=utility.formatMoney;
	app.config.globalProperties.loadSetting=utility.loadSetting;
	app.config.globalProperties.transfer=transfer;
	app.config.globalProperties.$onLaunched = new Promise(resolve => {
		app.config.globalProperties.$isResolve = resolve
	})
	/* end:core.init */
	//app.config.globalProperties.$i18n = i18n;
	return {
		app,
	};
}
console.log(["vue3","OK"]);
// #endif