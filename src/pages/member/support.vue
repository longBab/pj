<template>
  <view class="support body" :class="$store.state.setting.theme">
    <navBar :back="back" :title="title">
    </navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        <view class="mt10 wc93 panel">
          <view class="title">
            请说出您目前遇到的问题？
          </view>
          <view class="t-box">
            <textarea style="height: 6rem;" placeholder="请输入" @input="" />
          </view>
        </view>
        <view class="mt10">
          <view class="btn">
            提交问题
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
      title: "在线支持",
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
.support {
  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 14vh);
    padding: 6vh 0 0 0;
    color: #fff;

    .btn {
      background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
      border-radius: 5px;
      color: #000000;
      width: 6rem;
      height: 1.8rem;
      line-height: 1.8rem;
      text-align: center;
      font-size: 0.7rem;
      margin: 0 auto;
    }
  }

  .panel {
    backdrop-filter: blur(1px);
    border: 1px solid;

    border-width: 1px;
    border-radius: 10px;
    border-image-source: linear-gradient(180deg, rgba(59, 211, 211, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
    background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);

    clip-path: inset(0 round 10px);

    padding: 1rem;

    .title {
      color: #0EFFB0;
      border-bottom: 1px dashed #0EFFB020;
      padding-bottom: 0.5rem;
      font-size: 0.7rem;
    }

    .t-box {
      margin-top: 0.5rem;
    }
  }

  uni-scroll-view {
    height: calc(100vh - 14vh);
  }


}</style>