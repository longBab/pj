<template>
<view class="product body">
	<navBar :title="title" :back="back"></navBar>
	<view class="wrapper">
		<scroll-view scroll-y="true" scroll-x="false">
			<view class="chart">
				<view class="rt">
					<view class="cl">
						<text class="title">{{$t('成交额趋势')}}</text>
						<text class="name">Sparkline</text>
					</view>
					<view class="cr">
						<text class="btn">近24小时刷新</text>
					</view>
				</view>
				<view class="rc panel">
					 
					<view class="bdlg"></view>
				</view>
				<view class="rb">

					<view class="item">
						<text class="r1">API延迟(ms)</text>
						<text class="r2">Sparkline</text>
						<view class="rc">

						</view>
					</view>

					<view class="item">
						<text class="r1">API延迟(ms)</text>
						<text class="r2">Sparkline</text>
						<view class="rc">

						</view>
					</view>

				</view>
			</view>
			<view style="height:.5rem;"></view>
			<view class="split-row">
				<view class="cl"></view>
				<view class="cc" style="font-size:1.4rem;">
					<text>{{ $t('数据看板') }}</text>
				</view>
				<view class="cr"></view>
			</view>
			<view class="board">
				<view class="rt" >
					<view class="item panel" style="margin:0;">
						<text class="r1">今日量化产出</text>
						<text class="r2">177</text>
						<view class="bdlg"></view>
					</view>
					<view class="item panel" style="margin:0;">
						<text class="r1">总计量化产出</text>
						<text class="r2">177</text>
						<view class="bdlg"></view>
					</view>
				</view>
				<view class="rc panel" >

					<view class="row">
						<text class="cl">24h 成交笔数</text>
						<text class="cr">177,034</text>
					</view>

					<view class="row">
						<text class="cl">24h 成交额</text>
						<text class="cr">386,767013USD</text>
					</view>

					<view class="row">
						<text class="cl">成交率(Fill Rate]</text>
						<text class="cr">99.75%</text>
					</view>

					<view class="row">
						<text class="cl">平均滑点</text>
						<text class="cr">2.8 bp</text>
					</view>

					<view class="row">
						<text class="cl">API延迟</text>
						<text class="cr">42</text>
					</view>

					<view class="row">
						<text class="cl">系统可用性</text>
						<text class="cr">99.90%</text>
					</view>
					<view class="dash-line"></view>
	
					<view class="row ">
						<text class="cl">交易所与市场覆盖</text>
						<view class="cr">
							<text class="s01">覆盖交易所 12 家</text>
						</view>
					</view>
					<view class="row cc">
						<text>Binance OKX Bybit Coinbase Kraken Bitget Gate</text>
						<text>Huobi(HTX) Deribit KuCoin MEXc Gemini</text>
					</view>

					<view class="bdlg"></view>
				</view>
			</view>
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
				back:"/pages/member/products",
				title:"个人产品"
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
.product {
	.chart,.board,.split-row{
		width:93%;
		margin:0.5rem auto;
	}
	.chart{
        width:93%;margin:0.5rem auto;
		display:flex;
		flex-direction: column;
    	flex-wrap: nowrap;
		.rt{
			display:flex;
			flex-direction: row;
			align-content: center;
			flex-wrap: nowrap;
			justify-content: space-around;
			.cl,.cr{
				width:40%;
				display:flex;
				flex-direction: column;
				justify-content: space-around;
				align-content: space-between;
				flex-wrap: wrap;
			}
			.cl{
				.title{
					font-size:0.6rem;
				}
			}
			.cr{
   			  align-content: space-around;
			  .btn{
				background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
				border-radius:5px;
				padding:0 0.3rem 0 0.3rem;

			  }
			}
		}
		.rc{
			margin-top:0.5rem;
			height:10rem;
			display:flex;
			background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
		}
		.rb{
			margin-top:0.5rem;
			display:flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-evenly;
			.item{
				width:47%;
				display:flex;
				flex-direction: column;
				align-content: space-around;
				flex-wrap: wrap;
				justify-content: space-around;
				text-align: center;
				.rc{
					width:90%;
					height:4rem;
					background: #0EFFB01A;
					border: 1px solid #417B68;
					border-radius:6px;
					

				}
				
			}
		}

    }
	.board{
		
		.rt{
			display:flex;
			width:100%;
			justify-content: space-between;
			margin-bottom:1rem;
			.item{
				display:flex;
				width:47%;
				flex-direction: column;
				
				text-align: center;
				line-height:2rem;
				padding:0.5rem 0;
				&.panel{
					/* 今日量化产出 / 总计量化产出 使用 Rectangle836 背景，去掉圆角和边框 */
					background-image: url(/static/images/Rectangle836.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					border-radius: 0;
					border: none;
					.bdlg{
						display:none;
					}
					.r1{
						font-size:.8rem;
					}
					.r2{
						font-size:1.4rem;
						color:#08E07F;
						font-width:600;
					}
				}
			}
		}
		.rc{
			margin:0.5rem auto;
			display:flex;
			flex-direction: column;
    		justify-content: space-around;
			
			padding:0.8rem 0.8rem 1.2rem 0.8rem;
			
			background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
			&.panel{
				/* 数据看板主卡片 使用 Rectangle833 背景，去掉圆角和边框 */
				background: none;
				background-image: url(/static/images/Rectangle833.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				border-radius: 0;
				border: none;
				.bdlg{
					display:none;
				}
				
			}
			.row{
				width:100%;
				display:flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				align-content: center;
				height:2.5rem;
				
				.cl{
					text-align:left;
					font-size:.8rem;
					    font-weight: 200;
				}
				.cr{
					text-align:right;
					font-size:.9rem;
					font-weight:200px !important;
					.s01{
						border-radius:15px;
						background: linear-gradient(90deg, #08E07F 0%, #1AFFAA 100%);
						color:#000;
						padding: 0 0.5rem 0 ;
						line-height:1.3rem;
						font-size:.9rem;
					}
				}
				&.split{
					padding:0.8rem 0 0.8rem 0;
					border-top:1px solid #21544F;
				}
			}
			.dash-line{
				width:100%;
				margin:0.3rem 0 0.8rem 0;
				border-bottom:1px dashed #929292;
			}
			.cc{
				display:flex;	
				flex-direction: column;
				flex-wrap: nowrap;
				align-content: center;
				justify-content: space-around;
			}
		}

	}
    .wrapper{
        justify-content: flex-start;
        height: calc(100% - 1.2rem);
        padding: 2.5rem 0 0 0;
        color: #fff;
      
    }

}
 
</style>