<template>
<view class="introduction body">
  <navBar :title="title" :back="back">
    <!--
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
    -->
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      <view class="split-row mt10">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('全球量化智能配置方案')}}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="top-box">
        <view class="top-box-img"></view>
      </view>
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('量化简介')}}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="panel mt10 wc93 inro-box">
        <view class="container">
          <view class="col des">
            {{$t('全球量化智能配置方案是一种长期配置方式，通过定期执行的量化模型，在不同市场环境下保持纪律性操作，降低情绪干扰与波动风险。我们的 AI 驱动系统将自动执行策略，帮助用户实现长期稳健的资产增长。')}}
          </view>
          <view class="col icon"></view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="split-row mt10">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('主流行情')}}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="dp wc93 mt10 mkt-title">
          <view class="f1 col1">
              名称
          </view>
          <view class="col2">
              最新值
          </view>
          <view class="col3">
              24h涨跌%
          </view>
        </view>
      <view class="wc93 mkt-list">
        <view class="dp list" v-for="(item,i) in mkts" :key="i" :class="i === mkts.length - 1 ? ' list-end' : ''">
          <view class="f1 dp col1">
              <view class="dp name">{{item.name}}</view>
              <view class="dp icon-box" v-if="item.hot">
                <view class="icon">
                  <view class="bg"></view>
                </view>
              </view>
          </view>
          <view class="col2">
              <view class="v1">
                   {{ item.v }}
              </view>
              <view class="v2">
                   {{ item.v1 }}
              </view>
          </view>
          <view class="dp col3">
            <view class="f1"></view>
            <view class="v s" v-if="item.s">
                   {{ item.p }}
            </view>
            <view class="v p" v-else>
               {{ item.p }}
            </view>
          </view>
        </view>
      </view> 

      <view class="split-row mt10">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('主流行情')}}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="panel mt10 wc93 inro-box">
        <view class="list-img-box">
          <view class="img-box">
            <view class="img-box-img img-box-img-bg1"></view>
          </view>
          <view class="list-img-box-desc">
            <view class="list-img-box-title">
              {{$t('智能自动定投')}}
            </view>
            <view class="list-img-box-text">
              {{$t('系统自动调度，无需人工干预，严格遵循模型信号，避免错过市场机会。')}}
            </view>
          </view>
        </view>
        <view class="list-img-box">
          <view class="img-box">
            <view class="img-box-img img-box-img-bg2"></view>
          </view>
          <view class="list-img-box-desc">
            <view class="list-img-box-title">
              {{$t('多因子风控覆盖')}}
            </view>
            <view class="list-img-box-text">
              {{$t('结合波动率、成交量、资金流等因子，分散单一 市场风险，优化平均成本。')}}
            </view>
          </view>
        </view>
        <view class="list-img-box">
          <view class="img-box">
            <view class="img-box-img img-box-img-bg3"></view>
          </view>
          <view class="list-img-box-desc">
            <view class="list-img-box-title">
              {{$t('灵活策略配置')}}
            </view>
            <view class="list-img-box-text">
              {{$t('支持主流数字资产，用户可根据风险偏好自由设额度。')}}
            </view>
          </view>
        </view>
        <view class="list-img-box" style="border-bottom: 0;">
          <view class="img-box">
            <view class="img-box-img img-box-img-bg4"></view>
          </view>
          <view class="list-img-box-desc">
            <view class="list-img-box-title">
              {{$t('合规资金托管')}}
            </view>
            <view class="list-img-box-text">
              {{$t('资金采用多重签名与冷热分离架构，由合作的专业机构进行安全托管。')}}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
  <mrFooter page="introduction" />
</view>
</template>

<script>
import navBar from "@/components/navBar.vue";
import mrFooter from "@/components/footer";
import navLanguage from "@/components/navLanguage";

export default {
  components: {
    mrFooter,
    navBar,
    navLanguage
  },
  setup() {},
  data() {
    return {
      back:"home",
      title: "介绍",
      mkts:[
        {name:"BTC",hot:true,v:"95,084.01",v1:"$95,084.01",p:"+10.37%",s:true},
        {name:"ETH",hot:true,v:"3,102.95",v1:"$3,102.95",p:"+10.37%",s:true},
        {name:"MET",hot:true,v:"0.4491",v1:"$0.4491",p:"+10.37%",s:true},
        {name:"SOL",hot:false,v:"137.34",v1:"$137.34",p:"-10.37%",s:false},
        {name:"DOGE",hot:false,v:"0.15958",v1:"$0.15958",p:"-10.37%",s:false},
        {name:"ADA",hot:false,v:"0.5059",v1:"$0.5059",p:"-10.37",s:false},
        {name:"ZEC",hot:false,v:"574.76",v1:"$574.76",p:"-10.37%",s:false},
        {name:"XRP",hot:false,v:"2.2696",v1:"$2.26",p:"-10.37%",s:false},
        {name:"ASTER",hot:false,v:"1.055",v1:"$1.05",p:"-10.37%",s:false},
        {name:"LINK",hot:false,v:"14.00",v1:"$14",p:"-10.37%",s:false}
      ]
    };
  },
  onLoad(sender) {
    var that = this;
    if(sender&&sender.code)that.inviteCode=sender.code;
 
  },
  onReady() {
    //this.getServerData();
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.list-img-box{
  display:flex;justify-content:center;align-items:center;border-bottom: 1px dashed #0EFFB035;margin-top:0.5rem;
  padding:0rem 0.2rem 0rem 0.2rem;
  .img-box{
      height:4rem;
      width:4.5rem;
      flex: 1;
      .img-box-img{
        height:4rem;
        width:4.5rem;
      }
      .img-box-img-bg1{
        background:url(/static/images/introduction/i3.png) center center no-repeat;
        background-size:4.5rem 4.5rem;
      }
      .img-box-img-bg2{
        background:url(/static/images/introduction/i4.png) center center no-repeat;
        background-size:4.5rem 4.5rem;
      }
      .img-box-img-bg3{
        background:url(/static/images/introduction/i5.png) center center no-repeat;
        background-size:4.5rem 4.5rem;
      }
      .img-box-img-bg4{
        background:url(/static/images/introduction/i6.png) center center no-repeat;
        background-size:4.5rem 4.5rem;
      }
  }
  .list-img-box-desc
  {
    width:100%;
    .list-img-box-title{
      font-size: 0.65rem;color:#0EFFB0;height: 1.5rem;
    }
    .list-img-box-text{
      font-size: 0.55rem;color:#929292;height: 2.5rem;
    }

  }
}

.split-row{
    .cc{
      font-size: 0.8rem;
    }
}


.inro-box{
    min-height:6rem;
    .container{
      padding:0.5rem 0.2rem 0.5rem 0.2rem;
    }
    .col{
      height:4.8rem;
      &.icon{
        width:30%;
        background:url(/static/images/introduction/i2.png) center center no-repeat;
        background-size:5.6rem 5.6rem;
      }
      &.des{
        position: relative;
        width:60%;
        text-align: left;
      }
    }
}
.introduction {
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 14vh);
    padding: 6vh 0 8vh 0;
    color: #fff;
    .top-box{
      .top-box-img{
        width:18rem;height:12rem;margin:0 auto; 
        background:url(/static/images/introduction/i1.png) center bottom no-repeat;
        background-size:100% auto;
      }
    }
    .mkt-title{
	padding:0 1rem;border: 1px solid #0EFFB0; border-width: 1px 1px 0px 1px;justify-self: center;align-items: center; width:100%; border-radius: 20px 20px 0px 0px ;height:1.5rem; background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
	.col1{
		width: 100%;text-align: left;
	}
	.col2{
		text-align: right;
	}
	.col3{
		width:4.5rem;text-align: right;
	}
}
.mkt-list{
	border: 1px solid #0EFFB0; border-width: 0px 1px 1px 1px;border-radius: 0px 0px 20px 20px;min-height:2.5rem;
  .list-end{
    border-bottom: none !important;
  }
	.list{
		margin:0 0.5rem;padding: 0 0.5rem; border-bottom: 1px solid #00FFBD; height: 2rem;
		.col1{
			width: 100%;text-align: left; height: 100%; 
			.name{
				justify-self: center;align-items: center;height: 100%;
			}
			.icon-box{
				justify-self: center;align-items: center;margin-left: 0.2rem;
				.icon{
					height:1rem;width:1rem;
					.bg{
						height:1rem;
						width: 1rem;
						background:url(/static/images/introduction/i7.png) center center no-repeat;
						background-size:80% 80%;
					}
				}
			}
		}
		.col2{
			margin:auto 0;
			.v1{
				text-align: right;
			}
			.v2{
				font-size: 0.55rem;color:#D9D8D8;text-align: right;
			}
		}
		.col3{
			width:4.5rem;height:100%;justify-self: end;align-items: center;
			.v{
				font-size: 0.6rem;border-radius: 5px;height:1.1rem;width:3.5rem; text-align: center;line-height: 1.1rem;
			}
			.p{
				color:#797979;background-color: #00FF73;
			}
			.s{
				background-color: #F74660;
			}
		}
	}
}
  }
  uni-scroll-view {
    height: calc(100vh - 14vh - 0.3rem);
  }
}
</style>