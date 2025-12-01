<template>
<view class="products body">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper">
        <view class="statistics">
            <view class="col">
               <text class="title"> {{$t('今日累计收益')}} </text>
               <text class="value">{{formatMoney(user.statisticIncome3sDays,2)}} $</text>
            </view>
            <view class="total" v-if="false">
                {{$t('量化总产出')}}~0
            </view>
        </view>
        
        <view class="statBar">
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
        </view>

        <view class="split-row s01">
          <view class="cl"></view>
          <view class="cc">
            
            <picker :range="types" @change="chose($event,'type')"><text>{{ $t('灵犀·量化仓选择') }}</text></picker>
          </view>
          <view class="cr"></view>
        </view>
        <scroll-view scroll-y="true" scroll-x="false">
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
        back:"/pages/member",
        title:"量化视图",
        user:{statisticIncome3sDays:0,statisticInvestsTotals:0,statisticIncome3s:0,statisticInvests:0},
        types:["灵犀·闪电策略","灵犀·灵动策略","灵犀·趋势策略","灵犀·矩阵策略"],
        typesMap:[0,1,2,3],
        productType:-1,
        rows:[]
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
        });
        },
        chose(event,type,index){
            var that=this,value=index||event;
            console.log([event,type]);
             if(type=="type"){
                value=event.detail.value;
                that.productType=that.typesMap[value];
                that.load();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.products {
    .statistics,.statBar,.split-row,.records{width:96%;margin:0.5rem auto;}
    .statistics{
        background: url(../../static/images/member/products_bg01.png) center center no-repeat;
        background-size:60% 90%;
        height:8rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: center;
        position: relative;
        margin-bottom:2.8rem;
        .total{
            position:absolute; 
            bottom:-2.3rem;
            background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
            border: 1px solid #0EFFB0;
            border-radius:10px;
            padding:0.2rem 0.4rem 0.2rem 0.4rem;

        }
         .col{
            width:80%;
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: space-around;
            height:3rem;
            //border:1px solid #fff;   
            .value{
                color:#0EFFB0;
                font-size:1rem;
            }
        }
        
    }
    .statBar{
        border: 1px solid #1BA27A;
        border-radius:10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding:0.3rem;
        .item{
         display: flex;
         flex-direction: column;
         text-align: center;
         .value{font-weight:600;}

            
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
            background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
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
    .wrapper{
        justify-content: flex-start;
        height: calc(100% - 2.5rem);
        padding: 2.5rem 0 0 0;
        color: #fff;
      
    }


}
 
</style>