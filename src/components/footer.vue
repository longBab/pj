<template>
	<view class="footer" style="z-index: 101;display: flex;flex-direction: column;">
     	<view :class="'ul '+page" style="margin-bottom:0;">
			<!-- 首页 -->
			<view class="li home" @click="gotoPage('/pages/home')" >
				<view v-if="page==='home'" class="icon-bg">
					<view class="icon-wrap home-icon"></view>
				</view>
				<uni-icons
					v-else
					type="home"
					size="20"
					style="color:inherit"
				/>
			</view>
			<!-- 产品 -->
			<view class="li products" @click="gotoPage('/pages/products')">
				<view v-if="page==='products'" class="icon-bg">
					<uni-icons type="products" size="20" style="color:inherit" />
				</view>
				<uni-icons
					v-else
					type="products"
					size="20"
					style="color:inherit"
				/>
			</view>
			<!-- 安全 -->
			<view class="li coins" @click="gotoPage('/pages/coins')">
				<view v-if="page==='coins'" class="icon-bg">
					<uni-icons type="vip" size="20" style="color:inherit" />
				</view>
				<uni-icons
					v-else
					type="vip"
					size="20"
					style="color:inherit"
				/>
			</view>
			<!-- 介绍 -->
			<view class="li introduction" @click="gotoPage('/pages/introduction')">
				<view v-if="page==='introduction'" class="icon-bg">
					<uni-icons type="introduction" size="20" style="color:inherit"/>
				</view>
				<uni-icons
					v-else
					type="introduction"
					size="20"
					style="color:inherit"
				/>
			</view>
			<!-- 我的 -->
			<view class="li member" @click="gotoPage('/pages/member')">
				<view v-if="page==='member'" class="icon-bg">
					<uni-icons type="person" size="20" style="color:inherit"/>
				</view>
				<uni-icons
					v-else
					type="person"
					size="20"
					style="color:inherit"
				/>
			</view>
		</view>
		<view :class="'ul '+page" style="height:1.5rem; background: none; padding-top:0;padding-bottom:0; margin:0;">
			<view class="li home" @click="gotoPage('/pages/home')" >
             	<text style="font-size:.8rem;">{{$t('首页')}}</text> 
			</view>
			<view class="li products" @click="gotoPage('/pages/products')">
				<text style="font-size:.8rem;">{{$t('产品')}}</text>    
			</view>
			<view class="li coins" @click="gotoPage('/pages/coins')">
				<text style="font-size:.8rem;">{{$t('安全')}}</text>    
			</view>
			<view class="li introduction" @click="gotoPage('/pages/introduction')">
                <text style="font-size:.8rem;">{{$t('介绍')}}</text>
			</view>
			<view class="li member" @click="gotoPage('/pages/member')">
                <text style="font-size:.8rem;">{{$t('我的')}}</text>
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
	$_height:6rem;
	height: $_height;
	display: flex;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: flex-end;
	background-color: transparent;
	/* 使用伪元素放背景，压在导航栏下面并支持点击穿透 */
	position: fixed;
	z-index: 100;

	&::before{
		content:"";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		/* 往上延伸一部分，压到导航栏上面 */
		top: -1rem;
		background-image: url(/static/images/Ellipse5.png);
		background-repeat: no-repeat;
		background-position: center 0.8rem;
		background-size: 120% 120%;
		pointer-events: none; /* 背景本身不拦截点击 */
		z-index: 0;
	}

	/* 让真正的导航内容在背景之上 */
	> .ul{
		position: relative;
		z-index: 1;
	}
	overflow: hidden;
	align-items: center;

	.ul {
		width: 92%;
		height: 3rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0.35rem 0.8rem 0.2rem;
		margin-bottom: 0.4rem;
		background: url(/static/images/member/Rectangle1085.png) center center no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;

		&.home .li.home,
		&.products .li.products,
		&.coins .li.coins,
		&.introduction .li.introduction,
		&.member .li.member {
			color:#0EFFB0;
		}

		.li{
			flex: 1;
			color:#cfd2d4;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 0.6rem;

			.icon-wrap{
				width: 1.1rem;
				height: 1.1rem;
				background-position: center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}

			.icon-bg{
				background:url(/static/images/tab/Rectangle3525.png) center center no-repeat;
				background-size:100% 100%;
				width:2rem;
				height:2rem;
				display:flex;
				justify-content:center;
				align-items:center;
				border-radius:999px;
			}

			.home-icon{
				background-image:url(/static/images/tab/Vector.png);
			}

			::v-deep uni-icons {
				margin-bottom: 0.2rem;
			}
		}

		&.home .li.home ::v-deep uni-icons,
		&.products .li.products ::v-deep uni-icons,
		&.coins .li.coins ::v-deep uni-icons,
		&.introduction .li.introduction ::v-deep uni-icons,
		&.member .li.member ::v-deep uni-icons {
			background: linear-gradient(135deg, #08E07F 0%, #1AFFAA 100%);
			color:#020b09;
			border-radius: 999px;
			padding: 0.28rem;
		}
	} 
}
</style>