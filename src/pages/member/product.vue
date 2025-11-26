<template>
<view class="product body">
	<navBar :title="title" :back="back"></navBar>
	<view class="wrapper">
		<scroll-view scroll-y="true" scroll-x="false">
			<view class="chart">
				<view class="rt">
					<view class="cl">
						<text class="title">成交额趋势</text>
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
			<view class="split-row">
				<view class="cl"></view>
				<view class="cc">
					<text>{{ $t('数据看板') }}</text>
				</view>
				<view class="cr"></view>
			</view>
			<view class="board">
				<view class="rt">
					<view class="item panel">
						<text class="r1">今日量化产出</text>
						<text class="r2">177</text>
						<view class="bdlg"></view>
					</view>
					<view class="item panel">
						<text class="r1">总计量化产出</text>
						<text class="r2">177</text>
						<view class="bdlg"></view>
					</view>
				</view>
				<view class="rc panel">

					<view class="row">
						<text class="cl">成交笔数</text>
						<text class="cr">99999999.00</text>
					</view>

					<view class="row">
						<text class="cl">24h成交额</text>
						<text class="cr">99999999.00</text>
					</view>

					<view class="row">
						<text class="cl">成交率(Fill Rate]</text>
						<text class="cr">99999999.00</text>
					</view>

					<view class="row">
						<text class="cl">平均滑点</text>
						<text class="cr">99999999.00</text>
					</view>

					<view class="row">
						<text class="cl">API延迟</text>
						<text class="cr">99999999.00</text>
					</view>

					<view class="row">
						<text class="cl">API延迟</text>
						<text class="cr">99999999.00</text>
					</view>

					<view class="row">
						<text class="cl">系统可用性</text>
						<text class="cr">99999999.00</text>
					</view>

					<view class="row split">
						<text class="cl">交易所与市场覆盖</text>
						<view class="cr">
							<text class="s01">覆盖交易所12家</text>
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
			.item{
				display:flex;
				width:35%;
				flex-direction: column;
				align-content: space-around;
				justify-content: space-evenly;
				flex-wrap: wrap;
				text-align: center;
				line-height:1.2rem;
				padding:0.5rem;
			}
		}
		.rc{
			margin:0.5rem auto;
			display:flex;
			flex-direction: column;
    		justify-content: space-around;
			
			padding:0.3rem 0.3rem 1rem 0.3rem;
			background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
			.row{
				width:100%;
				display:flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				align-content: space-around;
				height:1.3rem;
				
				.cl{
					text-align:left;
				}
				.cr{
					text-align:right;
					.s01{
						border-radius:5px;
						background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
						color:#000;
						padding: 0 0.3rem 0 0.3rem;
						line-height:1.3rem;
					}
				}
				&.split{
					padding:1rem 0 1rem 0;
					border-top:1px dashed #929292;
				}
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