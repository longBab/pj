<script>
export default {
		globalData: {version:"v2.0.0"},
		onLaunch: function() {
			console.log('App Launch')
			let that=this,globalData=getApp().globalData,store=that.$store,
			model=that.model,crypto=that.crypto,utility=that.utility,transfer=that.transfer;
			if(model){
			globalData.model=model;
			globalData.get=model.get;
			globalData.set=model.set;
			globalData.extend=model.extend;
			globalData.call=model.call;
			globalData.parseDate=model.parseDate;
			globalData.formatDate=model.formatDate;
			}
			globalData.crypto=crypto;
			globalData.utility=utility;
			globalData.loadSetting=utility.loadSetting;
			globalData.Alert=utility.Alert;
			globalData.gotoPage=utility.gotoPage;
			globalData.formatUrl=utility.formatUrl;
			globalData.formatMoney=utility.formatMoney;
			globalData.transfer=transfer;
			globalData.switchTab=function(event,sender){
			console.log([event,sender]);
			}
			store.dispatch("init",that);
			store.dispatch("initSetting");
			store.dispatch("initUser");
			that.transfer.init(that);
			that.utility.init(that);
			that.loadSetting().then((data)=>{
				that.transfer.request({url:"GET app/globalizations"}).then((resp)=>{
					var _data=resp.data||resp,_data=_data.data||_data,k,lang,store=that.$store,
					state = that.$store ? that.$store.state : {},
					setting = state.setting || {},doc=typeof(window)&&window.document?window.document:{};
					that.$isResolve();
					for(k in _data){
						if( (/^(languageItems|languageKeywords|currencys|assetTypes)$/.test(k))||
              			(/(Options)$/.test(k))
			  			){
							store.commit("setSetting",{__path:k,__data:_data[k]});
							continue;
						}
						that.$i18n.setLocaleMessage(k,_data[k]);
					}
					//lang=that.get("state.setting.lang",store)||uni.getLocale().replace(/([a-z]+)-([a-z]+)/i,"$1").toLocaleLowerCase();
					lang=that.get("state.setting.lang",store)||"zh-CHT";
					that.$i18n.locale = lang; 
					doc.title=that.$t(setting.title);
					//console.log(["languages",lang,store]); 	
					//首页弹窗显示
					store.commit("setSetting",{__path:"showTips",__data:"1"});
				}) 
				console.log(["loading",data]);    
			}).catch((error)=>{
					console.log(["error",error]);
			});
			//let langs= await that.get();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>
<style lang="scss">
@import "../node_modules/vk-uview-ui/index.scss";
@import "~@/assets/iconfont.scss";
@import "~@/assets/style.scss";
.uni-page-head{
	height: 64px !important;
	align-items: center;
}
</style>