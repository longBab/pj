<template>
<view class="products body" :class="[$store.state.setting.theme, { 'page-loaded': pageLoaded }]" style="padding-bottom:3rem;">
    <navBar :back="back" :title="title">
    </navBar>
    
    <view class="wrapper" style="padding-top:2.5rem;">
         <scroll-view
            scroll-y="true"
            scroll-x="false"
            class="scroll-container fade-in-up"
            :style="{ animationDelay: '0.3s' }"
        >
        <view style="height:1rem;"></view>
        <view class="statistics fade-in-up" :style="{ animationDelay: '0.1s' }">
            <view class="statistics-top">
                <view class="icon-left">
                    <image src="/static/images/image255.png" mode="widthFix" class="icon-image" />
                </view>
                <view class="content-right">
                    <view class="r01">{{$t('组合年量化收益率(预估)')}}</view>
                    <view class="r02">{{formatMoney(statistics.value01,2)}}%</view>
                </view>
            </view>
            <view class="rbb">
                <view class="tab">
                    <text class="title">{{$t('当前托管本金')}}</text>
                    <text class="value">{{formatMoney(user.statisticInvests,2)}} $</text>
                </view>
                <view class="tab">
                    <text class="title">{{$t('今日已实现收益')}}</text>
                    <text class="value">{{formatMoney(user.statisticIncome3sDays,2)}} $</text>
                </view>
                <view class="tab">
                    <text class="title">{{$t('策略运行胜率')}}</text>
                    <text class="value">{{formatMoney(statistics.value02,2)}}%</text>
                </view>
            </view>
            <view class="r04">{{$t('数据由链上真实成交与AI回测综合计算,仅作策略表现参考.')}}</view>

        </view>

        <view class="guider fade-in-up" :style="{ animationDelay: '0.2s' }">
            <view class="rt">
                <text class="cl">{{$t('请选择量化周期')}}</text>
                <text class="cr" v-if="false">{{$t('托管随进随出·到期可续约')}}</text>
            </view>
            <view class="tabs">
                <view class="slider" :style="{
                    width: typeSetting.items.length > 0 ? `calc(${100 / typeSetting.items.length}% - 0.1rem)` : '25%',
                    transform: `translateX(${typeSetting.current >= 0 ? typeSetting.current * 100 : 0}%)`
                }"></view>
                <text class="item" @click="chose(item,'typeSetting',i)" :class="{active:i==typeSetting.current}" v-for="(item,i) in typeSetting.items" :key="i">{{item.text}}</text>
            </view>
        </view>
            <view class="list">
                <view
                    class="item panel"
                    @click="chose(item,'row',i)"
                    v-for="(item, i) in rows"
                    :key="i"
                    :class="{active:row.index==i}"
                >
                    <view class="row rt">
                        {{item.name}}
                    </view>
                    <view class="row r2">
                        <text class="cl" style="color:#999;">{{$t('量化产出值')}}</text>
                        <text class="cr">{{formatMoney(item.expectedRevenue*1+item.expectedRevenue01*1,2)}} %</text>
                    </view>
                    <view class="row rb">
                        <text class="cl" style="color:#999;">{{$t('结算方式')}}</text>
                        <text class="cr">{{$t(releaseCycleMap[item.releaseCycle]||item.releaseCycle||'未知')}}</text> 
                    </view>
                    <view class="bdlg"></view>
                </view>
            </view>  

            <view class="shower fade-in-up" :style="{ animationDelay: '0.4s' }">
                <view class="cl">
                    <view class="r1">{{$t('您当前选择的收益方案')}}</view>
                    <view class="r2">{{$t(row.name||"暂无")}}</view>
                    <view class="r3">{{ $t(row.remark||"暂无") }}</view>
                </view>
                <view class="cr">
                    <view class="btn" @click="chose(row,'product',row.index)">
                        <text>{{$t('确认并')}}</text>
                        <text>{{$t('进入产品')}}</text>
                    </view>
                </view>
            </view>

            <view class="tips" v-if="false">
                {{$t(tips)}}
            </view>
        </scroll-view>
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
            typeSetting:{
                current:-1,
                items:[]
            },
            statistics:{
                value01:0,
                value02:0
            },
            user:{
                statisticInvests:0,
                statisticIncome3sDays:0
            },
            releaseCycleMap:{
                "按天":"T+天",
                "按周":"T+周",
                "按月":"T+月",
                "按年":"T+年"
            },
            rows: [],
            row:{index:0,id:0,remark:""},
            tips:"",
            pageLoaded: false
        };
    },
    onReady() {
        var that = this;
        // 触发页面动画
        setTimeout(() => {
            that.pageLoaded = true;
        }, 50);
    },
    onLoad(sender) {
        var that = this, sender = sender || {};
        that.sender = sender;
        that.load(sender);
    },
    methods: {
        load(sender) {
            var that = this, sender = sender||that.sender || {},filter=sender;
            if(filter.status==undefined)filter.status=-1;
            if(filter.productType==undefined)filter.productType=-1;
            if(!filter.pageNum)filter.pageNum=0;
            if(!filter.pageSize)filter.pageSize=10000;
            that.transfer.request({
                url: "GET app/products",
                data:filter
            })
            .then((resp) => {
                var data = resp.data;
                data = data.data || data;
                if(!data.typeSetting){
                    data.typeSetting={
                        items:[
                            {value:0,text:"闪电策略"},
                            {value:1,text:"灵动策略"},
                            {value:2,text:"趋势策略"},
                            {value:3,text:"矩阵策略"}
                        ]
                    }
                }
                if(!data.tips)data.tips="风险提示:以上为策略目标区间,并非固定收益承诺.实际表现受市场波动、流动性以 及成交滑点影响,以系统最终结算结果为准.";
                var rows=(data.dataView?data.dataView.rows:null)||data.rows||[];
                data.rows=rows;
                //if(that.get("row.index")>=rows.length)that.set(0,"row.index");
                that.extend({row:{index:0,id:0,remark:""}});
                if(rows.length>0)that.chose(rows[0],'row',0);
                that.extend(data);
            });
        },
        chose(event,type,index){
            var that=this,item=event,sender={};
            if(type=="product"){
                var id=that.get("row.id");
                if(!id){that.Alert("请先选择产品!");return false;}
                that.gotoPage('product?id='+id)
                return false;
            }
            if(type=="row"){
                item.index=index;
                console.log(["product",item]);
                that.extend(that.row,item);
                return false;
            }
            that.set(index,type+".current");
            sender.productType=item.value;
            that.load({productType:item.value});
        }

    },
};
</script>
      
<style lang="scss" scoped>
.products {
    .statistics,.guider,.list,.shower,.tips{width:93%;margin:0.4rem auto;}
    .statistics{
        position: relative;
        display:flex;
        flex-direction: column;
        flex-wrap: nowrap;
        padding: 1.1rem 0.9rem 0;
        border-radius: 10px;
        background: url(/static/images/Rectangle3579.png) center center no-repeat;
        background-size: 100% 100%;
        .statistics-top{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            margin-bottom: 0.6rem;
            .icon-left{
                width: 40%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .icon-image{
                    position: absolute;
                    width: 9rem;
                    top:-2rem
                }
            }
            .content-right{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                text-align: right;
                .r01{
                    color: #fff;
                    font-size: 0.7rem;
                    margin-bottom: 0.5rem;
                }
                .r02{
                    color: #0EFFB0;
                    font-weight: 800;
                    font-size: 2rem;
                    line-height: 1.2;
                }
            }
        }
        .r04{
            color: #fff;
            font-size: 0.6rem;
            text-align: center;
            opacity: 0.8;
            margin-top: .4rem;
            margin-bottom: .3rem;
        }
        .rbb{
            width:100%;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 0.5rem;
            margin-top: 0.3rem;
            .tab{
                flex: 1;
                height: 3.1rem;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                padding: 0.6rem 0.5rem;
                border-radius: 8px;
                background: url(/static/images/Rectangle3565.png) center center no-repeat;
                background-size: 100% 100%;
                .title{
                    color: #fff;
                    font-size: 0.6rem;
                    margin-bottom: 0.3rem;
                }
                .value{
                    color: #0EFFB0;
                    font-size: 0.8rem;
                    font-weight: 700;
                }
            }  
        }
    }
    .guider{
        display:flex;
        flex-direction: column;
        margin-bottom:0.2rem;
        .rt{
            width:100%;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.3rem;
            .cl{
                font-size: 0.78rem;
                font-weight: 600;
                color:#FFFFFF;
            }
            .cr{
                padding:0 0.3rem;
                border-radius: 999px;
                border: 1px solid rgba(0, 255, 255, 0.44);
                background: linear-gradient(90.79deg, rgba(146, 146, 146, 0.3) -5.06%, rgba(102, 102, 102, 0.3) 99.32%);
            }
        }
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
            // 双重边框效果：使用伪元素实现外层渐变边框
            &::before {
                content: '';
                position: absolute;
                inset: -0.8px;
                border-radius: $_radius;
                background: linear-gradient(139deg, rgba(0, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 39%, rgba(0, 255, 189, 1) 100%);
                z-index: -1;
            }
            // 内层灰色半透明边框
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
            padding: 0.8rem;
            background: url(/static/images/Rectangle3573.png) center center no-repeat;
            background-size: 100% 100%;
            border: none;
            border-radius: 0;
            .row{
                display:flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .cl{width:4rem;}
            .cr{width:calc(100% - 4rem);color:#0EFFB0;text-align:right;}
            &.active{
                box-shadow: none;
            }
            .bdlg{
                display:none;
            }
        }
    }
    .shower{
        $_widthR:4.2rem;
        position: relative;
        display:flex;
        flex-direction: row;
        padding: 0.6rem 0.8rem;
        border-radius: 10px;
        background: url(/static/images/Rectangle3580.png) center center no-repeat;
        background-size: 100% 100%;
        flex-shrink: 0;
        .cl,.cr{height:100%;}
        .cl{
            flex: 1;
            display:flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding-right: 0.8rem;
            .r1{
                color:#fff;
                font-size: 0.7rem;
                font-weight: 600;
                margin-bottom: 0.3rem;
            }
            .r2{
                color:#08E07F;
                font-size: 0.9rem;
                font-weight: 700;
                margin-bottom: 0.2rem;
            }
            .r3{
                color:#929292;
                font-size: 0.6rem;
                line-height: 1.3;
            }
        }
        .cr{
            $_width:$_widthR;
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            
            .btn {
                width: 4.6rem;
                height: auto;
                background: linear-gradient(to right, #08E07F 100%, #1AFFAA 100%);
                border-radius: 9990px;
                color: #000;
                font-size: 0.65rem;
                font-weight: bold;
                text-align: center;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0.2rem 0.35rem;
                text{
                    line-height: 1.2;
                }
           }
        }
    }
    .tips{
        margin:0 auto;
        /*font-size: 0.5rem;*/
        color:#929292;  
    }
    .wrapper {
        justify-content: flex-start;
        height: calc(100% - 3rem);
        padding: 2rem 0rem 0 0rem;
        color: #fff;
        display: flex;
        flex-direction: column;
    }
    
    .scroll-container {
        flex: 1;
        height: 0;
        overflow: hidden;
    }

    // 页面整体淡入动画
    &.page-loaded {
        animation: fadeIn 0.5s ease-out;
    }

    // 区块依次出现动画
    .fade-in-up {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    &.page-loaded .fade-in-up {
        animation-play-state: running;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

   


}</style>