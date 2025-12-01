<template>
<view class="products body" :class="$store.state.setting.theme">
    <navBar :back="back" :title="title">
    </navBar>
    <view class="wrapper">
        <view class="statistics">
            <view class="r01">{{$t('组合年量化收益率(预估)')}}</view>
            <view class="r02">{{formatMoney(statistics.value01,2)}}%</view>
            <view class="r03"></view>
            <view class="r04">{{$t('数据由链上真实成交与AI回测综合计算,仅作策略表现参考.')}}</view>
            <view class="rbb">
                <view class="tab">
                    <text class="title">{{$t('当前托管本金')}}</text>
                    <text class="value">{{formatMoney(user.statisticInvests,2)}}$</text>
                    <view class="bdlg"></view>
                </view>
                <view class="tab">
                    <text class="title">{{$t('今日已实现收益')}}</text>
                    <text class="value">{{formatMoney(user.statisticIncome3sDays,2)}}$</text>
                </view>
                <view class="tab">
                    <text class="title">{{$t('策略运行胜率')}}</text>
                    <text class="value">{{formatMoney(statistics.value02,2)}}%</text>
                </view>
            </view>
        </view>

        <view class="guider">
            <view class="rt">
                <text class="cl">{{$t('请选择量化周期')}}</text>
                <text class="cr" v-if="false">{{$t('托管随进随出·到期可续约')}}</text>
            </view>
            <view class="tabs">
                <text class="item" @click="chose(item,'typeSetting',i)" :class="{active:i==typeSetting.current}" v-for="(item,i) in typeSetting.items" :key="i">{{item.text}}</text>
            </view>
        </view>
    
        
        
        <scroll-view scroll-y="true" scroll-x="false">
            <view class="list">
                <view class="item panel" @click="chose(item,'row',i)" v-for="(item, i) in rows" :key="i" :class="{active:row.index==i}" >
                    <view class="row rt">
                        {{item.name}}
                    </view>
                    <view class="row r2">
                        <text class="cl">{{$t('量化产出值')}}</text>
                        <text class="cr">{{formatMoney(item.expectedRevenue*1+item.expectedRevenue01*1,2)}} %</text>
                    </view>
                    <view class="row rb">
                        <text class="cl">{{$t('结算方式')}}</text>
                        <text class="cr">{{$t(releaseCycleMap[item.releaseCycle]||item.releaseCycle||'未知')}}</text> 
                    </view>
                    <view class="bdlg"></view>
                </view>
            </view>  
        </scroll-view>
        <view class="shower panel">
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
            <view class="bdlg"></view>
        </view>

        <view class="tips" v-if="false">
            {{$t(tips)}}
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
            tips:""
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
                            {value:0,text:"灵犀·闪电策略"},
                            {value:1,text:"灵犀·灵动策略"},
                            {value:2,text:"灵犀·趋势策略"},
                            {value:3,text:"灵犀·矩阵策略"}
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
    .statistics,.guider,.list,.shower,.tips{width:93%;margin:0.5rem auto;}
    .statistics{
        //height:10rem;
        display:flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-around;
        text-align: center;
        /*font-size:0.6rem;*/
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
        .r03{/*font-size:0.6rem;*/}
        .rbb{
            width:100%;
            display:flex;
            flex-direction: row;
            justify-content: space-around;
            margin:0.5rem auto;
            /*font-size:0.62rem;*/
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
            /*font-size: 0.7rem;*/
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
            .cl,.cr{/*font-size:0.6rem;*/}
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
        /*font-size:0.5rem;*/
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
        /*font-size: 0.5rem;*/
        color:#929292;  
    }
    .wrapper {
        justify-content: flex-start;
        height: calc(100% - 3.2rem);
        padding: 2.5rem 0rem 0 0rem;
        color: #fff;
    }

   


}</style>