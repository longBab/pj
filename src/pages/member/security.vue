<template>
<view class="security body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    
      <view class="navigations">
        <view class="row panel" @click="gotoPage('security/identity')">
          <view class="cl">{{$t('身份认证')}}</view>
          <view class="cr"><u-icon  name="arrow-right" style="color:inherit;" size="24" /></view>
          <view class="bdlg"></view>
        </view>

        <view class="row panel" @click="gotoPage('security/payment')">
          <view class="cl">{{$t('账号支付配置')}}</view>
          <view class="cr"><u-icon  name="arrow-right" style="color:inherit;" size="24" /></view>
          <view class="bdlg"></view>
        </view>
    </view>
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
.security {
 
  .wrapper{
    color:#fff;
    overflow: hidden;
  }
 

}
</style>