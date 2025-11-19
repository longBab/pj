<template>
<view class="certifying body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      
      <view class="nav panel">
        <view class="container">
          <view class="c01">{{$t('身份认证')}}</view>
          <view class="arrow"><u-icon  name="arrow-right" style="color:inherit" size="28" /></view>
        </view>
        <view class="bdlg"></view>
      </view>

      <view class="nav panel">
        <view class="container">
          <view class="c01">{{$t('账号支付配置')}}</view>
          <view class="arrow"><u-icon  name="arrow-right" style="color:inherit" size="28" /></view>
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
      title:"安全认证",
      currency:"",
      status:"",
      path:"",
      rows:[]
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
.certifying {
  
  .nav{
    width:93%;margin:2rem auto 0 auto;
    height:3rem;
    
    .container{
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: nowrap;
      padding:0 0.5rem 0 0.5rem;
      line-height:2.8rem;
    }
    .c01,.c02{height:100%;}
  }
  .wrapper{
    justify-content: flex-start;
    padding: 6vh 0 0 0;
    color:#fff;
    overflow: hidden;
  }
  uni-scroll-view {
    height: calc(100vh - 6vh);
  }

}
</style>