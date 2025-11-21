<template>
	<view class="qualified body">
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
				_title:"国际资质"
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
.qualified {


}
uni-scroll-view {
	height: calc(100% - 2rem);
}
</style>