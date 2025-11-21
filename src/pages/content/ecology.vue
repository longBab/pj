<template>
	<view class="ecology body">
		<navBar :title="_title" :back="back"></navBar>
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
				back:"/pages/home",
				_title:"团队生态布局"
			};
		},
	onLoad(sender) {
		var that = this;
		that.sender=sender;
		that.load(sender);
  	},
	methods: {
		load(sender){
      		var that=this,sender=that.sender||sender||{},id=sender.id;
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