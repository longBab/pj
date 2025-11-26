<template>
  <view class="quantization body" :class="$store.state.setting.theme">
    <navBar :back="back" :title="title">
    </navBar>
    <view class="wrapper">

      <view class="navigations">
        <view class="row panel" @click="gotoPage('incomes')">
          <view class="cl">{{$t('产品收益')}}</view>
          <view class="cr"><u-icon  name="arrow-right" style="color:inherit;" size="24" /></view>
          <view class="bdlg"></view>
        </view>

        <view class="row panel" @click="gotoPage('products')">
          <view class="cl">{{$t('我的产品')}}</view>
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
      back: "/pages/member",
      title: "量化视图",
      currency: "",
      status: "",
      path: "",
      rows: []
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
      that.transfer.request({
        url: "GET app/member/quantization",
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        that.extend(data);
      });
    }

  },
};
</script>
      
<style lang="scss" scoped>
.quantization {
   

  .wrapper {
    padding: 2.4rem 0 0 0;
    color: #fff;
  }
 

}</style>