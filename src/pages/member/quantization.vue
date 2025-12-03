<template>
  <view class="quantization body" :class="$store.state.setting.theme">
    <navBar :back="back" :title="title">
    </navBar>
    <view class="wrapper" style="justify-content: flex-start;">
      <view class="entry-list">
        <view class="entry-card" @click="gotoPage('/pages/member/products')">
          <text class="label">{{$t('产品收益')}}</text>
          <image class="arrow-icon" src="/static/images/fi-rr-angle-left2.png" mode="widthFix" />
        </view>
        <view class="entry-card">
          <text class="label">{{$t('详情展示')}}</text>
          <image class="arrow-icon" src="/static/images/fi-rr-angle-left2.png" mode="widthFix" />
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
    padding: 4rem 0 0 0;
    color: #fff;
  }
  .entry-list{
    width:93%;
    margin:0 auto;
    display:flex;
    flex-direction: column;
    gap:1rem;
  }
  .entry-card{
    width:100%;
    min-height:3.4rem;
    padding:0 1.2rem;
    border-radius:18px;
    background:url(/static/images/Rectangle02.png) center center no-repeat;
    background-size:100% 100%;
    border:1px solid rgba(8,224,127,0.4);
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:0.95rem;
    letter-spacing:0.04rem;
    .arrow-icon{
      width:0.65rem;
    }
  }
}</style>