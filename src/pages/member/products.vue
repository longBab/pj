<template>
<view class="products body">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper">
        <view class="statistics">
            <view class="col">
               <text class="title">当前累计收益</text>
               <text class="value">$280</text>
            </view>
            <view class="total">
                个人总收益~36
            </view>
        </view>
        
        <view class="statBar">
            <view class="item">
               <text class="title">总投入资金</text>
               <text class="value">16500U</text>
            </view>

            <view class="item">
               <text class="title">总投入资金</text>
               <text class="value">16500U</text>
            </view>

            <view class="item">
               <text class="title">总投入资金</text>
               <text class="value">16500U</text>
            </view>
        </view>

        <view class="split-row s01">
          <view class="cl"></view>
          <view class="cc">
            <text>{{ $t('请选择量化周期') }}</text>
          </view>
          <view class="cr"></view>
        </view>
        <scroll-view scroll-y="true" scroll-x="false">
            <view class="records">
                <view @click="gotoPage('product')" class="item panel" v-for="(item,i) in rows" :key="i">
                    <view class="r1">7天量化资源包</view>
                    <view class="r2">期·适合体验与滚动复投</view>
                    <view class="r3 col">
                       <text class="cl">收益区间:</text> 
                       <text class="cr">0.45%~0.60% / 日</text>
                    </view>
                    <view class="r4 col">
                        <text class="cl">适用策略</text> 
                        <text class="cr">K-Lite  α · 高频网格</text>  
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
        rows:[{},{},{},{},{}]
        };
    },
    onLoad(sender) {
        let that = this;
        that.sender=sender;
        that.load(sender);
    },
    methods: {
        load(sender) {
        var that = this, sender = that.sender || sender || {};
        that.transfer.request({
            url: "GET app/member/products",
        })
        .then((resp) => {
            var data = resp.data;
            data = data.data || data;
            that.extend(data);
        });
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
            font-size:0.5rem;
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