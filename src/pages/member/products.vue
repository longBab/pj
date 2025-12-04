<template>
<view style="background:#000;">
<view class="products bodys" >
    <navBar :title="title" :back="back"  ></navBar>
    <view class="wrapper" >
        <view class="statistics">
            <view class="card-content">
                <text class="title">{{$t('当前累计收益')}}</text>
                <text class="value">${{formatMoney(user.statisticIncome3s,2)}}</text>
                <view class="total-chip">
                    <text class="label">{{$t('今日收益')}}</text>
                    <text class="amount">≈ 2.36%</text>
                </view>
            </view>
            <view class="hero-wrapper">
                <image class="card-hero" src="/static/images/image260.png" mode="widthFix" />
            </view>
        </view>

        <view class="quantization-section">
        <view class="split-row">
            <view class="cl" style="margin-top:.8rem;"></view>
            <view class="cc">
                <text class="section-title">{{$t('请选择量化周期')}}</text>
            </view>
            <view class="cr" style="margin-top:.8rem;"></view>
        </view>

            <!-- 量化周期选择 tabs，productType 从 0 ~ 3 -->
            <view class="quantization-tabs">
                <view
                    class="tabs"
                    v-if="typeTabs && typeTabs.length"
                >
                    <view
                        class="slider"
                        :style="{
                            width: `calc(${100 / typeTabs.length}% - 0.1rem)`,
                            transform: `translateX(${(productType >= 0 ? productType : 0) * 100}%)`
                        }"
                    ></view>
                    <text
                        class="item"
                        v-for="(item, i) in typeTabs"
                        :key="i"
                        :class="{ active: productType === item.value }"
                        @click="onTypeTabClick(item, i)"
                    >
                        {{ item.text }}
                    </text>
                </view>
            </view>
            <view class="plan-grid">
                <view
                  class="plan-card"
                  v-for="(plan, index) in quantizationPlans"
                  :key="'plan-' + index"
                  @click="handlePlanClick(plan)"
                >
                    <text class="plan-name">{{ plan.name || '--' }}</text>
                    <text class="plan-desc">
                        {{$t('下单时间')}}：{{ plan.purchaseTime || '--' }}
                    </text>
                    <view class="plan-row">
                        <text class="label">{{$t('收益率')}}：</text>
                        <text class="value">
                            {{ plan.expectedRevenue ? plan.expectedRevenue + '%' : '--' }}
                        </text>
                    </view>
                    <view class="plan-row">
                        <text class="label">{{$t('周期/剩余')}}：</text>
                        <text class="value">
                            {{ plan.projectDuration || 0 }}{{$t('天')}}
                            /
                            {{ plan.residualDistributionCycle || 0 }}
                        </text>
                    </view>
                    <view class="plan-row">
                        <text class="label">{{$t('投资金额')}}：</text>
                        <text class="value">
                            {{ plan.purchaseAmount || '--' }} U
                        </text>
                    </view>
                </view>
            </view>
        </view>

        <!-- <view class="statBar">
            <view class="item">
               <text class="title"> {{$t('量化总参与')}} </text>
               <text class="value">{{formatMoney(user.statisticInvestsTotals,2)}} $</text>
            </view>

            <view class="item">
               <text class="title"> {{$t('量化当前规模')}} </text>
               <text class="value">{{formatMoney(user.statisticInvests,2)}} $</text>
            </view>

            <view class="item">
               <text class="title"> {{$t('量化总产出')}} </text>
               <text class="value"> {{formatMoney(user.statisticIncome3s,2)}} $</text>
            </view>
        </view> -->
        
        <!-- <view class="summary-cards">
            <view class="summary-card">
                <view class="summary-icon-box">
                    <image class="summary-icon" src="/static/images/image253.png" mode="widthFix" />
                </view>
                <view class="summary-divider"></view>
                <view class="summary-text">
                    <text class="label">我的投资额</text>
                    <text class="value">{{formatMoney(user.statisticInvestsTotals,2)}}U</text>
                </view>
            </view>
            <view class="summary-card">
                <view class="summary-icon-box">
                    <image class="summary-icon" src="/static/images/image254.png" mode="widthFix" />
                </view>
                <view class="summary-divider"></view>
                <view class="summary-text">
                    <text class="label">最终回报</text>
                    <text class="value">{{formatMoney(user.statisticInvestsTotals + user.statisticIncome3s,2)}}U</text>
                </view>
            </view>
            <view class="summary-card">
                <view class="summary-icon-box">
                    <image class="summary-icon" src="/static/images/image255.png" mode="widthFix" />
                </view>
                <view class="summary-divider"></view>
                <view class="summary-text">
                    <text class="label">最终受益</text>
                    <text class="value">+{{formatMoney(user.statisticIncome3s,2)}}U</text>
                </view>
            </view>
        </view>
         <view class="supported-assets">
            <text class="label">支持币种</text>
            <text class="value">BTC、ETH、FIL、SOL</text>
        </view> -->

        
       

        <!-- <view class="split-row s01">
          <view class="cl"></view>
          <view class="cc">
            
            <picker :range="types" @change="chose($event,'type')"><text>{{ $t('灵犀·量化仓选择') }}</text></picker>
          </view>
          <view class="cr"></view>
        </view> -->
        <!-- <scroll-view scroll-y="true" scroll-x="false">
            <view class="records">
                <view @click="gotoPage('product?id='+item.id)" class="item panel" v-for="(item,i) in rows" :key="i">
                    <view class="r1">{{item.name}}</view>
                    <view class="r2">{{$t(item.remark||"暂无")}}</view>
                    <view class="r3 col">
                       <text class="cl"> {{$t('收益率')}} </text> 
                       <text class="cr">{{item.expectedRevenue}}%</text>
                    </view>
                    <view class="r4 col">
                        <text class="cl">投资金额</text> 
                        <text class="cr">{{item.purchaseAmount}}</text>  
                    </view>
                    <view class="bdlg"></view>
                </view>

            </view>
        </scroll-view>  -->
    </view>
</view>
</view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
    components: {navBar},
    data() {
        return {
        back:"/pages/member",
        title:"量化视图",
        user:{statisticIncome3sDays:0,statisticInvestsTotals:0,statisticIncome3s:0,statisticInvests:0},
        types:["灵犀·闪电策略","灵犀·灵动策略","灵犀·趋势策略","灵犀·矩阵策略"],
        typesMap:[0,1,2,3],
        productType:0,
        rows:[],
        quantizationPlans: [],
        typeTabs: [
          { value: 0, text: "闪电策略" },
          { value: 1, text: "灵动策略" },
          { value: 2, text: "趋势策略" },
          { value: 3, text: "矩阵策略" }
        ]
        };
    },
    onLoad(sender) {
        let that = this;
        that.sender=sender;
        that.load(sender);
    },
    methods: {
        load(sender) {
        var that = this, sender = sender||that.sender || {},filter=sender;
        filter.productType=that.productType;
         if(!filter.pageNum)filter.pageNum=0;
         if(!filter.pageSize)filter.pageSize=10000;
        that.transfer.request({
            url: "GET app/member/products",
            data:filter
        })
        .then((resp) => {
            var data = resp.data;
            data = data.data || data;
            var rows=(data.dataView?data.dataView.rows:null)||data.rows||[];
            data.rows=rows;
            that.extend(data);
            that.quantizationPlans = rows;
        });
        },
        // 老 picker 的通用选择方法，保留以兼容历史调用
        chose(event,type,index){
            var that=this,value=index||event;
            console.log([event,type]);
             if(type=="type"){
                value=event.detail.value;
                that.productType=that.typesMap[value];
                that.load();
            }
        },
        // 顶部量化周期 tabs 点击
        onTypeTabClick(item, index) {
            if (!item) return;
            // productType 按照 0~3 顺序赋值
            this.productType = item.value;
            this.load();
        },
        handlePlanClick(plan) {
            if (!plan || !plan.id) {
                return;
            }
            this.gotoPage('/pages/member/product?id=' + plan.id);
        }
    }
};
</script>

<style lang="scss" scoped>
.bodys{
	width:100%;
    min-height:100vh;
    box-sizing:border-box;
    background-color:#010101;
    /* 左上角装饰图 */
    background-image: url(/static/images/Ellipse3.png);
    background-repeat: no-repeat;
    background-position: left top;
    background-size: auto;
    font-size:0.65rem;
    overflow: hidden;
  
}
.products {
    .statistics,.summary-cards,.supported-assets,.statBar,.split-row,.records{width:96%;margin:0.5rem auto;}
    .statistics{
        width:96%;
        margin:0.8rem auto -2rem ;
        min-height:10.5rem;
        padding:1.8rem 1.6rem 0;
        display:flex;
        align-items:center;
        justify-content:space-between;
        background-size:100% 100%;
        color:#fff;
        .card-content{
            display:flex;
            flex-direction:column;
            gap:0.8rem;
            .title{
                font-size:1rem;
                opacity:0.9;
            }
            .value{
                font-size:2rem;
                font-weight:700;
                color:#0EFFB0;
            }
        }
        .total-chip{
            width:10.2rem;
            margin-top:0.9rem;
            padding:0.45rem 1rem;
            background:url(/static/images/Rectangle1121.png) center center no-repeat;
            background-size:100% 100%;
            display:flex;
            align-items:center;
            justify-content:space-between;
            font-size:0.8rem;
            .amount{
                color:#0EFFB0;
                font-weight:600;
                margin-left:0.3rem;
            }
        }
        .hero-wrapper{
            position:relative;
            top:0;
        }
        .card-hero{
            width:14rem;
            bottom:1rem;
            left:-1.5rem;
            height:auto;
        }
    }
    .summary-cards{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom:1.2rem;
        .summary-card{
            flex:1;
            margin:0 0.3rem;
            padding:.6rem 0.6rem;
            background:url(/static/images/Rectangle1120.png) center center no-repeat;
            background-size:100% 100%;
            display:flex;
            flex-direction: column;
            align-items: center;
            color:#fff;
            &:first-child{margin-left:0;}
            &:last-child{margin-right:0;}
        }
        .summary-icon-box{
            width:5.3rem;
            height:5.3rem;
            display:flex;
            align-items:center;
            justify-content:center;
            margin-bottom:0.9rem;
            .summary-icon{
                width:80%;
            }
        }
        .summary-divider{
            width:80%;
            height:1px;
            margin:0.1rem 0 0.9rem 0;
            border-bottom:2px dotted rgba(8,224,127,0.65);
        }
        .summary-text{
            text-align:center;
            .label{
                font-size:0.9rem;
                margin-bottom:0.4rem;
            }
            .value{
                font-size:1.5rem;
                font-weight:700;
                color:#0EFFB0;
            }
        }
    }
    .supported-assets{
        width:96%;
        margin:0rem auto 1.2rem;
        padding:0.3rem 1.5rem;
        background:url(/static/images/Rectangle650.png) center center no-repeat;
        background-size:100% 100%;
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content: space-between;
        font-size:0.95rem;
        color:#fff;
        .label{
            color:#0EFFB0;
            font-weight:600;
        }
        .value{
            color:rgba(255,255,255,0.9);
            letter-spacing:0.15rem;
            font-size:0.7rem;
        }
    }
    .statBar{
        margin:0.8rem auto 1.4rem auto;
        padding:.3rem 1.8rem;
        background:url(/static/images/Rectangle356.png) center center no-repeat;
        background-size:100% 100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color:#fff;
        .item{
            flex:1;
            text-align:center;
            .title{
                font-size:0.85rem;
                margin-bottom:0.4rem;
                opacity:0.9;
            }
            .value{
                font-size:.95rem;
                font-weight:700;
                letter-spacing:0.05rem;
            }
        }
    }
    .quantization-section{
        width:96%;
        margin:0.2rem auto 0;
        color:#fff;
        .section-title{
            width:100%;
            text-align:center;
            font-size:1.1rem;
            font-weight:600;
            letter-spacing:0.08rem;
            margin:0.4rem 0 0.4rem;
        }
    }
    // 量化周期 tabs（复用产品页样式）
    .quantization-tabs{
        width:96%;
        margin:0.4rem auto 0.6rem;
        display:flex;
        flex-direction: column;
        .tabs{
            $_height:2.4rem;
            $_radius:999px;
            width:100%;
            min-height:$_height;
            padding:0.2rem;
            margin:0.2rem auto 0;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background: rgba(29, 29, 29, 1) 100%;
            border-radius: $_radius;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                inset: -0.8px;
                border-radius: $_radius;
                background: linear-gradient(139deg, rgba(0, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 39%, rgba(0, 255, 189, 1) 100%);
                z-index: -1;
            }
            border: 0.8px solid rgba(128, 128, 128, 0.2);
            box-sizing: border-box;
            .slider{
                position: absolute;
                left: 0.2rem;
                top: 0.2rem;
                height: calc($_height - 0.4rem);
                background: linear-gradient(90deg, #08E07F 0%, #1AFFAA 100%);
                border-radius: $_radius;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 0;
            }
            .item{
                flex: 1;
                text-align: center;
                height:calc($_height - 0.4rem);
                line-height:calc($_height - 0.4rem);
                font-size: 0.75rem;
                font-weight:700;
                color:#FFFFFF;
                border-radius: $_radius;
                position: relative;
                z-index: 1;
                transition: color 0.3s ease-out;
                &.active{
                    color:#000000;
                }
            }
        }
    }
    .plan-grid{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
    }
    .plan-card{
        width:48.5%;
        min-height:6.5rem;
        padding:0.9rem 0.9rem 0.8rem;
        background:url(/static/images/Rectangle374.png) center center no-repeat;
        background-size:100% 90%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        color:#fff;
        .plan-name{
            font-size:0.95rem;
            font-weight:600;
            margin-bottom:0.15rem;
            display:block;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        }
        .plan-desc{
            font-size:0.55rem;
            opacity:0.85;
            margin-bottom:0.5rem;
        }
        .plan-row{
            display:flex;
            font-size:0.55rem;
            margin-top:0.1rem;
            .label{
                color:#0EFFB0;
            }
            .value{
                margin-left:0.1rem;
                color:#0EFFB0;
            }
        }
    }
    .records{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        .item{
            padding:0.3rem;
            display: flex;
            flex-direction: column;  
            margin:0.2rem auto;
            width:calc(50% - 0.4rem);
            background:url(/static/images/Rectangle744.png) center center no-repeat;
            background-size:100% 100%;
            /*font-size:0.5rem;*/
            .col{
                display: flex;
                flex-direction: row;    
                flex-wrap: wrap;
                justify-content: space-between;
                color:#0EFFB0;
                .cl{width:4rem;}
                .cr{
                    width:calc(100% - 4rem);
                    height:1rem;
                    overflow: hidden;
                }
            }
        }
    }
    .view-assets-btn{
        width:80%;
        margin:1.5rem auto 2rem;
        height:2.8rem;
        background:url(/static/images/Rectangle3570.png) center center no-repeat;
        background-size:100% 100%;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#0EFFB0;
        font-size:0.95rem;
    }
    .wrapper{
        justify-content: flex-start;
        height: calc(100% - 2.5rem);
        padding: 2.5rem 0 0 0;
        color: #fff;
      
    }


}
 
</style>