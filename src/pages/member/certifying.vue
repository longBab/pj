<template>
<view class="certifying body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      
      <view class="panel mt5 wc93" style="height:2rem;">
        <view class="container">
          <view class="dp" style="width:100%;height:2rem;line-height: 2rem;padding:0 1rem;" @click="gotoPage('/pages/member/certifying/identity')">
            <view class="f1"><u-icon  name="account-fill" style="color:inherit;margin-right:0.3rem;" size="24" />{{$t('身份认证')}}</view>
            <view>{{$t('去认证')}}</view>
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="panel mt5 wc93" style="height:2rem;">
        <view class="container">
          <view class="dp" style="width:100%;height:2rem;line-height: 2rem;padding:0 1rem;" @click="gotoPage('/pages/member/certifying/alipay')">
            <view class="f1"><u-icon  name="zhifubao-circle-fill" style="color:inherit;margin-right:0.3rem;" size="24" />{{$t('绑定支付宝')}}</view>
            <view>{{$t('去绑定')}}</view>
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="panel mt5 wc93" style="height:2rem;">
        <view class="container">
          <view class="dp" style="width:100%;height:2rem;line-height: 2rem;padding:0 1rem;" @click="gotoPage('/pages/member/certifying/wechat')">
            <view class="f1"><u-icon  name="weixin-fill" style="color:inherit;margin-right:0.3rem;" size="24" />{{$t('绑定微信')}}</view>
            <view>{{$t('去绑定')}}</view>
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="panel mt5 wc93" style="height:2rem;">
        <view class="container">
          <view class="dp" style="width:100%;height:2rem;line-height: 2rem;padding:0 1rem;" @click="gotoPage('/pages/member/certifying/bank')">
            <view class="f1"><u-icon  name="rmb-circle-fill" style="color:inherit;margin-right:0.3rem;" size="24" />{{$t('绑定银行卡')}}</view>
            <view>{{$t('去绑定')}}</view>
          </view>
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