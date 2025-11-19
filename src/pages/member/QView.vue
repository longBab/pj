<template>
  <view class="QView body" :class="$store.state.setting.theme">
    <navBar :back="back" :title="title">
    </navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        <view class="mt15" @click="gotoPage('/pages/product/income')">
          <view class="panel itme-panel">
            <view class="container">
              <view class="dp w100 item">
                <view class="f1">
                  产品收益
                </view>
                <view class="f1 tr">
                  <u-icon name="arrow-right" size="32"></u-icon>

                </view>
              </view>
            </view>
            <view class="bdlg"></view>
          </view>
        </view>   
        <view class="mt15" @click="gotoPage('/pages/product/myproduct')">
          <view class="panel itme-panel">
            <view class="container">
              <view class="dp w100 item">
                <view class="f1">
                  我的产品
                </view>
                <view class="f1 tr">
                  <u-icon name="arrow-right" size="32"></u-icon>

                </view>
              </view>
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

    }

  },
};
</script>
      
<style lang="scss" scoped>
.QView {
  .itme-panel {
    height: 2.8rem;
    line-height: 2.8rem;

    .item {
      padding: 0 1.5rem;
      font-size: 0.75rem;
    }
  }

  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 6vh);
    padding: 6vh 1rem 0 1rem;
    color: #fff;
  }

  uni-scroll-view {
    height: calc(100vh - 6vh);
  }


}</style>