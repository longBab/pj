<template>
<view class="exchange body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    <view class="tab">
        <text class="item active">购买</text>
        <text class="item">出售</text>
      </view>

      <view class="statistics">
        <view class="item">
          <u-icon  name="order" style="color:inherit" size="28" />
          0.00 USD
        </view>
        <view class="item">
          金额
          <u-icon  name="order" style="color:inherit" size="28" />
        </view>
        <view class="item">
          支付
          <u-icon  name="order" style="color:inherit" size="28" />
        </view>
        <view class="item">
          神盾
          <u-icon  name="order" style="color:inherit" size="28" />
        </view>
      </view>
    
    <scroll-view scroll-y="true" scroll-x="false">

      <view class="record" v-for="(row,i) in rows" :key="i">
        <view class="row r01">鸿运-实名付款-安全零冻结</view>
        <view class="row r02">30日成單31069(99.80%)</view>
        <view class="row r03">¥7.07 / <text class="currency">USDT</text></view>
        <view @click="gotoPage('/pages/member/exchange/sell')">出售</view>
        <view class="row r04">
          <view class="c01">限額 1,000 - 1,408,865 CNY</view>
          <view class="c02">可用余额 199,273.7 USDT</view>
        </view>
        <view class="bdlg tl"></view>
        <view class="bdlg tr"></view>
        <view class="bdlg bl"></view>
        <view class="bdlg br"></view>
      </view>
      
    </scroll-view>
  </view>
</view>
</template>
<script>
import navBar from "@/components/navBar.vue";
export default {
  components: {
    navBar
  },
  data() {
    return {
      back:"/pages/member",
      title:"一键兑换",
      status:"",
      path:"",
      rows:[
        {},{},{},{},{},{}
      ]
    };
  },
  onReady() {
    
  },
  onLoad(sender) {
    var that = this,sender=sender||{};
    that.sender=sender;
    that.load(sender);
  },
  methods: {
    load(sender){
      var that=this,sender=that.sender||sender||{};
      
    },
    change(event,type){

    }
      
  },
};
</script>
      
<style lang="scss" scoped>
.exchange {
  $_marginT:0.5rem;//面板下移
  $_heightT:1.5rem;//tab,statistics高
  .tab{
    $_height:$_heightT;
    width:70%;
    margin:$_marginT auto;
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    border-radius:10px;
    border: 1px solid #417B68;
    .item{
      width:50%;height:100%;
      text-align: center;
      line-height:$_height;
      color:#fff;
      &.active{
        border-radius:10px;
        background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
        color:#000;
      }

    }
  }
  .statistics{
    $_height:$_heightT;
    width:91%;
    margin:$_marginT auto;
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    .item{
      height:100%;
      margin:0 0 0 0.5rem;
      text-align: center;
      line-height:$_height;
      border: 1px solid #417B68;
      opacity: 0.5;
      border-radius: 5px;
      border-width: 1px;
      padding:0 0.25rem 0 0.25rem;
    }
  }
  .record{
    $_radius:10px;
    $_height:auto;
    position: relative;
    width: 93%;height:$_height;
    margin:0.4rem auto;
    padding:0.4rem 0 0.1rem 0;
    display:flex;
    flex-direction: column;
    align-content: space-around;
    flex-wrap: wrap;
    border: 1px solid ;
    background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
    border-image-source: linear-gradient(180deg, rgba(59, 211, 211, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
    border-image-slice: 1;
    border-image-repeat: round;
    clip-path: inset(0 round $_radius);
    .row{
      width:90%;height:1.1rem;line-height:1.1rem;
    }
    .r01{
      font-size:1rem;color:#fff;font-weight:500;
      height:1.3rem;line-height:1.3rem;
    }
    .r02{
      background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .r03{
      font-size:0.5rem;
    }
    .r04{
      border-top: 0.5px dashed #0EFFB0;
      color:#929292;
      display:flex;
      text-align:center;
      justify-content: space-around;
      font-size:0.5rem;
      
    }
    .currency{

    }
  
    .bdlg{
        position: absolute;
        width:$_radius;height:$_radius;
        z-index:1;
        &.tl{
          top:-1px;left:-1px;
          border-top-left-radius:$_radius;
          border-top: 1px solid rgba(59, 211, 211, 0.2);
          border-left: 1px solid rgba(59, 211, 211, 0.1);
        }
        &.tr{
          top:-1px;right:-1px;
          border-top-right-radius:$_radius;
          border-top: 1px solid rgba(59, 211, 211, 0.5);
          border-right: 1px solid rgba(59, 211, 211, 0.5);
        }
        &.bl{
          bottom:-1px;left:-1px;
          border-bottom-left-radius:$_radius;
          border-bottom: 1px solid rgba(59, 211, 211, 0.08);
          border-left: 1px solid rgba(59, 211, 211, 0.08);
        }
        &.br{
          bottom:-1px;right:-1px;
          border-bottom-right-radius:$_radius;
          border-bottom: 1px solid rgba(59, 211, 211, 0.04);
          border-right: 1px solid rgba(59, 211, 211, 0.04);
        }

      }

  }
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 6vh);
    padding: 6vh 0 0 0;
    color:#fff;
  }
  uni-scroll-view {
        height: calc(100vh - 6vh - 3rem);
  }

  
}
</style>