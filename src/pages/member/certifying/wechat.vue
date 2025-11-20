<template>
  <view class="wechat body" :class="$store.state.setting.theme">
    <navBar :back="back" :title="title">
    </navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">

        <view class="mt5 wc93 input-panel">
          <view class="dp input-row">
            <view>微信账号</view>
            <view class="f1">
              <input class="input" placeholder="请输入" />
            </view>
          </view>
        </view>
        <view class="mt5 wc93" style="text-align: center;">
          上传收款二维码
        </view>
        <view class="mt5 wc93">
          <view class="dp">
            <view class="panel" style="height:10rem; width:10rem;margin: 0.5rem auto;">
              <view class="container">
                二维码图片
              </view>
              <view class="bdlg"></view>
            </view>
          </view>
        </view>
        <view class="mt5">
          <view class="btn">
            确认提交
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
      back: "/pages/member/certifying",
      title: "绑定微信",
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
.wechat {

  .wrapper {
    justify-content: flex-start;
    padding: 6vh 0 0 0;
    color: #fff;
    overflow: hidden;

    .input-panel {
      backdrop-filter: blur(10px);
      padding: 0.5rem;
      border-radius: 8px;
      border: 1px solid transparent;
      background-image: linear-gradient(to bottom, #000000 0%, #121a2488 100%), linear-gradient(180deg, #3BD3D344, transparent);
      background-origin: border-box;
      background-clip: padding-box, border-box;

      .input-row {
        justify-content: center;
        align-items: center;

        .input {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          line-height: normal;
          height: 1.3rem;
          line-height: 1.3rem;
          font-size: 0.7rem;
          margin-left: 0.4rem;
        }
      }
    }

    .info {
      font-size: 0.4rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }

    .btn {
      background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
      border-radius: 5px;
      color: #000000;
      width: 6rem;
      height: 1.8rem;
      line-height: 1.8rem;
      text-align: center;
      font-weight: 600;
      font-size: 0.7rem;
      margin: 0 auto;
    }
  }

  uni-scroll-view {
    height: calc(100vh - 6vh);
  }

}
</style>