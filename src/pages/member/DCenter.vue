<template>
<view class="DCenter body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    <view class="chat"></view>
    <view class="statistics">
      <view class="item">
        <view class="r01">团队数据</view>
        <view class="r02">+700U</view>
        <view class="bdlg"></view>
      </view> 
      
      <view class="item">
        <view class="r01">团队收益</view>
        <view class="r02">+700U</view>
        <view class="bdlg"></view>
      </view> 

      <view class="item">
        <view class="r01">深度数据</view>
        <view class="r02">+700U</view>
        <view class="bdlg"></view>
      </view> 

      <view class="item">
        <view class="r01">量化数据</view>
        <view class="r02">+700U</view>
        <view class="bdlg"></view>
      </view> 
      
      <view class="item">
        <view class="r01">代数数据</view>
        <view class="r02">+700U</view>
        <view class="bdlg"></view>
      </view> 
    </view>
    <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>用户列表</text>
        </view>
        <view class="cr"></view>
      </view>
    <scroll-view scroll-y="true" scroll-x="false">

      <view class="record panel" v-for="(item,i) in rows" :key="i">
        <view class="c01">
          <text class="name">王阳(666888@qq.com)</text>
          <text class="time">{{$t('推广时间')}}:0000-00-00 00:00</text>
        </view>
        <view class="c02">
          <text class="value">+50U</text>
        </view>
        <view class="bdlg"></view>
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
      title:"数据中心",
      currency:"",
      status:"",
      path:"",
      rows:[
        {},{},{},{},{},{},{},{},{},{},{},{}
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
      
    }
      
  },
};
</script>
      
<style lang="scss" scoped>
.DCenter {
  .chat,.statistics,.split-row{width:93%;margin:0 auto;}
  .chat{
    height:7rem;
    background:url(../../static/images/DCenter-chat.png) center center no-repeat;
    background-size:10rem auto;
  }
  .statistics{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item{
      position:relative;
      display:flex;
      flex-direction: column;
      justify-content: space-evenly;
      width:30%;height:3.5rem;
      margin:0.5rem auto 0 auto;
      text-align: center;
      border-image-source:linear-gradient(180deg, rgba(59, 211, 211, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
      border-image-slice: 1;
      border-image-repeat: round;
      clip-path: inset(0 round 10px);
      background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
      .r02{color:#0EFFB0;}
      .bdlg{
        position: absolute;
        top: 1px;
        bottom: -1px;
        right: 1px;
        left: 1px;
        z-index:1;
        border: 1px solid rgba(59, 211, 211, 0.2);
        border-radius: 10px;
      }

    }
  }
  .split-row{margin:1rem auto 0.5rem auto;}

  .record{
    margin:0.3rem auto;
    display:flex;
    height:3rem;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    padding:0.5rem;
    .c01{
      width:13rem;
      display:flex;
      flex-direction: column;
      justify-content: space-evenly;
      .name{
        font-weight:400;
        font-size:0.4rem;
      }
      .time{font-size:0.3rem;}
    }
    .c02{
      width:calc(100% - 13rem);
      text-align:right;
      .value{
        line-height:2rem;
        font-size:0.4rem;
        background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .wrapper{
    justify-content: flex-start;
    padding: 6vh 0 0 0;
    color:#fff;
  }
  uni-scroll-view {
        height: calc(100vh - 6vh - 16.5rem);
  }

  
}
</style>