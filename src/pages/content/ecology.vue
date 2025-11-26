<template>
	<view class="ecology body">
		<navBar :title="title" :back="back"></navBar>
		<view class="wrapper">
			<scroll-view scroll-y="true" scroll-x="false">
				 

			</scroll-view>
		</view>
	</view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  components: {navBar},
		data() {
			return {
				back:"/pages/introduction",
				title:"团队生态布局"
			};
		},
	onLoad(sender) {
		var that = this;
		that.sender=sender;
		that.load(sender);
  	},
	methods: {
		load(sender){
			var that = this,path=that.$route.path||"",url;
			var sender=(sender&&sender.id?sender:null)||that.sender||{},id=sender.id;
			path=path.replace(/[\/]?pages\/content\/(.*?)/g,"$1");
			url= "GET app/content/"+path;
			if(id)url="GET app/content?id="+id;
			if(that.get("sender.back"))that.set(that.get("sender.back").replace(/\./g,"/"),"back");
			that.transfer.request({
			url: url,
			})
			.then((resp) => {
				var data=resp.data;
				data=data.data||data;
				that.extend(data);
			});
		}
	},
};
</script>

<style lang="scss" scoped>
.ecology {


}
uni-scroll-view {
	height: calc(100% - 2rem);
}
</style>