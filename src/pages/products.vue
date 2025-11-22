<template>
<view class="products body" :class="$store.state.setting.theme">
    <navBar :back="back" :title="title">
    </navBar>
    <view class="wrapper">
        <view class="statistics">
            <view class="r01">{{$t('当前组合年华收益率(预估)')}}</view>
            <view class="r02">36,011.9373%</view>
            <view class="r03"></view>
            <view class="r04">{{$t('数据由链上真实成交与AI回测综合计算,仅作策略表现参考.')}}</view>
            <view class="rbb">
                <view class="tab">
                    <text class="title">当前托管本金</text>
                    <text class="value">924,1424.30U</text>
                    <view class="bdlg"></view>
                </view>
                <view class="tab">
                    <text class="title">当前托管本金</text>
                    <text class="value">924,146.30U</text>
                </view>
                <view class="tab">
                    <text class="title">当前托管本金</text>
                    <text class="value">924,146.30U</text>
                </view>
            </view>
        </view>

        <view class="guider">
            <view class="rt">
                <text class="cl">请选择量化周期</text>
                <text class="cr">请选择量化周期</text>
            </view>
            <view class="tabs">
                <text class="item active"> 7天·入门</text>
                <text class="item">15天·加强</text>
                <text class="item">30天·稳健</text>
                <text class="item">60天·进阶</text>
            </view>
        </view>
    
        
        
        <scroll-view scroll-y="true" scroll-x="false">
            <view class="list">
                <view class="item panel" v-for="(item, i) in rows" :key="i" :class="{active:itemIndex==i}" >
                    <view class="row rt">
                        24小时快返
                    </view>
                    <view class="row r2">
                        <text class="cl">日化区间</text>
                        <text class="cr">0.40%-2.00%</text>
                    </view>
                    <view class="row rb">
                        <text class="cl">结算方式</text>
                        <text class="cr">T+1复利</text> 
                    </view>
                    <view class="bdlg"></view>
                </view>
            </view>  
        </scroll-view>
        <view class="shower panel">
            <view class="cl">
                <view class="r1">您当前选择的收益方案</view>
                <view class="r2">天进阶收益</view>
                <view class="r3">预估日化:0.90% - 2.60%,中周期进阶策略,净值波动相对更大，适合进阶玩家</view>
            </view>
            <view class="cr">
                <view class="btn" @click="gotoPage('product')">
                    <text>确认并</text>
                    <text>进入产品</text>
                </view>
            </view>
            <view class="bdlg"></view>
        </view>

        <view class="tips">
            风险提示：以上为策略目标区间,并非固定收益承诺.实际表现受市场波动、流动性以 及成交滑点影响,以系统最终结算结果为准.
        </view>
 
    </view>
    <mrFooter page="products" />
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
    data() {
        return {
            back: "/pages/home",
            title: "产品",
            currency: "",
            status: "",
            path: "",
            itemIndex:0,
            rows: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        };
    },
    onReady() {

    },
    onLoad(sender) {
        var that = this, sender = sender || {};
        that.sender = sender;
        that.load(sender);
    },
    methods: {
        load(sender) {
            var that = this, sender = that.sender || sender || {};

        }

    },
};
</script>
      
<style lang="scss" scoped>
.products {
    .statistics,.guider,.list,.shower,.tips{width:93%;margin:0.5rem auto;}
    .statistics{
        //height:10rem;
        display:flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-around;
        text-align: center;
        font-size:0.6rem;
        background: radial-gradient(141.52% 176.06% at -23.26% 15.47%, #1a6b5167 0%, #0b213139 47.64%, #16669f3b 100%),
                linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #00000000 100%);
        border: 1px solid #2abdbd2d;
        border-width: 1px;
        border-radius: 10px;
        backdrop-filter: blur(2px);
        padding: 0.2rem 0.3rem;
        .r01{color:#fff;}
        .r02{color:#fff;font-weight:800;font-size:1.3rem;}
        .r03{height:0.1rem;}
        .r03{font-size:0.6rem;}
        .rbb{
            width:100%;
            display:flex;
            flex-direction: row;
            justify-content: space-around;
            margin:0.5rem auto;
            font-size:0.62rem;
            .tab{
                width:32%;
                height:2.2rem;
                display:flex;
                flex-direction: column;
                justify-content: space-around;
                border-radius:8px;
                border: 1px solid;
                border-image-source: linear-gradient(180deg, rgba(59, 211, 211, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
                border-image-slice: 1;
                border-image-repeat: round;
                clip-path: inset(0 round 8px);
                background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

                //background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(18, 26, 36, 0.5333333333) 100%), linear-gradient(180deg, rgba(59, 211, 211, 0.2666666667), transparent);
                //background-origin: border-box;
                //background-clip: padding-box, border-box;
            }  
        }
    }
    .guider{
        display:flex;
        flex-direction: column;
        .rt{
            width:100%;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            .cl.cr{width:50%;}
            .cr{
                padding:0 0.3rem 0 0.3rem;
                border: 1px solid rgba(0, 255, 255, 0.44);
                border-radius: 5px;
                background: linear-gradient(90.79deg, rgba(146, 146, 146, 0.3) -5.06%, rgba(102, 102, 102, 0.3) 99.32%);
                border-image-source: linear-gradient(109deg, #00FFFF -29.08%, #000000 46.11%, #00FFBD 117.09%),
                linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
                border-image-slice: 1;
                border-image-repeat: round;     
            }
        }
        .tabs{
            $_height:1.8rem;
            $_radius:20px;
            width:100%;height:$_height;
            margin:0.2rem auto;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            align-content: center;
            flex-wrap: wrap;
            border: 1px solid rgba(0, 255, 255, 0.44);
            border-radius: $_radius;
            background: linear-gradient(90.79deg, rgba(146, 146, 146, 0.3) -5.06%, rgba(102, 102, 102, 0.3) 99.32%);
            border-image-source: linear-gradient(109deg, #00FFFF -29.08%, #000000 46.11%, #00FFBD 117.09%),
            linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
            border-image-slice: 1;
            border-image-repeat: round;    
            font-size: 0.7rem;
            line-height:$_height;
            .item{
                padding:0 0.5rem 0 0.5rem;
                font-weight:700;
                &.active{
                    background: linear-gradient(270deg, #0EFFB1 0%, #31B9D4 100%);
                    border-radius:$_radius;  
                    height:$_height;
                    color:#000;
                }
            }
        }
    }
    .list{
        margin:0 auto;
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: space-between;
        flex-wrap: wrap;
       
        .item{
            display:flex;
            flex-direction: column;
            width: calc(50% - 0.4rem);
            margin:0.4rem 0 0 0;
            
           
                padding: 0.2rem;
                background: linear-gradient(90.79deg, rgba(146, 146, 146, 0.2) -5.06%, rgba(102, 102, 102, 0.2) 99.32%);
            
            .row{
                display:flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .cl,.cr{font-size:0.6rem;}
            .cl{width:4rem;}
            .cr{width:calc(100% - 4rem);color:#0EFFB0;text-align:right;}
            &.active{
             border:1px solid transparent;
             border-radius:10px;
             box-shadow: 0px 0px 5px 5px #0effb0;
            }
        }
    }
    .shower{
        $_widthR:5rem;
        display:flex;
        padding:0.3rem;
        font-size:0.5rem;
        .cl,.cr{height:100%;}
        .cl{
            display:flex;
            flex-direction: column;
            align-content: flex-start;
            width:calc(100% - $_widthR);
            padding:0 0.5rem 0 0;
            .r1{color:#fff;}
            .r2{color:#0EFFB0;}
            .r3{color:#929292;}
        }
        .cr{
            $_width:$_widthR;
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            position: relative;
            
            .btn {
                position:absolute;
                z-index:3;
                background: linear-gradient(270deg, #0EFFB1 0%, #31B9D4 100%);
                border-radius: 20px;
                margin-top: 1px;
                color: #000000;
                height: 2.5rem;
                width: $_width;
                font-size: 0.7rem;
                text-align: center;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                display:flex;
                flex-direction: column;
           }
        }
    }
    .tips{
        margin:0 auto;
        font-size: 0.5rem;
        color:#929292;  
    }
    .wrapper {
        justify-content: flex-start;
        height: calc(100% - 3rem);
        padding: 2.5rem 0rem 0 0rem;
        color: #fff;
    }

    uni-scroll-view {
        height: calc(100% - 19rem);
    }


}</style>