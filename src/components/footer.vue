<template>
  <view class="footer" style="z-index: 101">
     <view :class="'ul '+page">
			<view class="li home" @click="gotoPage('/pages/home')" >
				<uni-icons  type="shop" size="20" style="color:inherit" />
             	<text>{{$t('首页')}}</text> 
			</view>
			<view class="li products" @click="gotoPage('/pages/products')">
				<uni-icons  type="shop" size="20" style="color:inherit" />
				<text>{{$t('产品')}}</text>    
			</view>
			<view class="li introduction" @click="gotoPage('/pages/introduction')">
				<uni-icons  type="shop" size="20" style="color:inherit"/>
                <text>{{$t('介绍')}}</text>
			</view>
			<view class="li member" @click="gotoPage('/pages/member')">
				<uni-icons  type="shop" size="20" style="color:inherit"/>
                <text>{{$t('我的')}}</text>
			</view>
		</view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  props: ["page"],
  onLoad(sender) {
   
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
.footer {
	$_height:3rem;
	height: $_height;
	display: flex;
	position: fixed;
	width: 100%;
	bottom: 0;
	justify-content: space-around;
	background-color:rgba(0, 0, 0, 0.65);
    background-size: cover;
	align-items: center;
	overflow: hidden;
	
	.ul {
		width: 100%;
		display: flex;
		justify-content: space-around;
		&.home .li.home,
		&.products .li.products,
		&.introduction .li.introduction,
		&.member .li.member{color:#0EFFB0;}
		
		.li{
			color:#fff;
			display: flex;
			flex-direction: column;
			align-content: space-around;
			flex-wrap: nowrap;
		}
	} 
	
}
</style>