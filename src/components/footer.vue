<template>
  <view class="footer" style="z-index: 101">
     <view :class="'ul '+page">
			<text class="item home" @click="gotoPage('/pages/home')">
                
			</text>
			<text class="item order" @click="gotoPage('/pages/order')">
                
			</text>
			<text class="item asset" @click="gotoPage('/pages/asset')">
                
			</text>
			<text class="item member" @click="gotoPage('/pages/member')">
                
			</text>
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
	height: 8vh;
	display: flex;
	position: fixed;
	width: 100%;
	bottom: 0;
	justify-content: space-around;
	background-color: #fff;
    background: url('@/assets/green/footer.png') no-repeat center center; 
    background-size: cover;
	align-items: center;
	.ul {
	width: 100%;
	display: flex;
	justify-content: space-around;
	}

	.item {
		width: 20% !important;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 1.8rem;
		height: 1.8rem;
		margin: 0.5rem 0 0.1rem 0;
        font-weight: 700;
		background:url(../static/image/tabbar/home.png) no-repeat center ;
		background-size: 1.8rem 1.8rem;;
        font-family: 'Microsoft YaHei', 'Segoe UI', Georgia, 'Times New Roman', Times, serif;
	
		&.home{background-image:url(../static/image/tabbar/tabbar-zhuye2.png)}
    &.order{background-image:url(../static/image/tabbar/tabbar_gailan2.png)}
		&.asset{background-image:url(../static/image/tabbar/DataExchange.png)}
		&.member{background-image:url(../static/image/tabbar/tabbar_woon2.png)}
	}
	.ul{
       
		
		&.home .item.home{background-image:url(../static/image/tabbar/tabbar-zhuye.png)}
    &.order .item.order{background-image:url(../static/image/tabbar/tabbar_gailan.png)}
		&.asset .item.asset{background-image:url(../static/image/tabbar/DataExchange1.png)}
		&.member .item.member{background-image:url(../static/image/tabbar/tabbar_woon.png)}
		 
	}
}
</style>