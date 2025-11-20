<template>
  <view class="invite body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <view class=" wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        <view class="mt10 wc93" style="background: linear-gradient(180deg, rgba(14, 255, 175, 0.175) 1.92%, rgba(14, 255, 175, 0.121) 20.19%, rgba(74, 85, 81, 0.099) 100%);

        border: 1px solid #134D3A;
border-width: 1px;
border-radius: 10px;
padding:1rem;

">
          <view class="" style="text-align: center;font-size:0.7rem;">我的邀请码</view>
          <view class="mt10 dp" style="background: #0EFFB01A;border: 1px solid #417B68;
border-width: 1px;
border-radius: 10px;
height: 2rem;
line-height: 2rem;
padding:0 1rem;
">
            <view class="f1">
              A7B9C2
            </view>
            <view>
              <u-icon  name="order" style="color:inherit" size="28" />
            </view>
          </view>
          <view class="mt10 dp">
            <view class="f1" style="background: #0EFFB01A;border: 1px solid #417B68;
border-width: 1px;
border-radius: 10px;
height: 3rem;
padding:0 1rem;
">
              <view style="margin-top:0.4rem;">9</view>
              <view style="margin-top:0.3rem;">已邀请好友</view>
            </view>
            <view style="width:1rem;"></view>
            <view class="f1" style="background: #0EFFB01A;border: 1px solid #417B68;
border-width: 1px;
border-radius: 10px;
height: 3rem;
padding:0 1rem;
">
              <view  style="margin-top:0.4rem;">80.5</view>
              <view  style="margin-top:0.3rem;">累计奖励(USDT)</view>
            </view>
          </view>
          
          <view class="split-row mt10">
              <view class="cl"></view>
              <view class="cdl"></view>
              <view class="cc">
                  <text>{{ $t('邀请规则') }}</text>
              </view>
              <view class="cdr"></view>
              <view class="cr"></view>
          </view>

        <view class="nodata mt5" style="text-align: left;">
          每成功邀请1位好友注册并完成实位好友注册并完成实名认证，您可获得10USDT奖励
        </view>

        <view class="nodata mt5" style="text-align: left;">
          好友首次充值，您可获得充值金额5%的额外奖励
        </view>
        <view class="nodata mt5" style="text-align: left;">
          奖励自动发放至您的账户余额
        </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  setup() { },
  components: { navBar },
  data() {
    return {
      back: "/pages/member",
      title: "推广邀请",
      url: ""
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

    },

  }
};
</script>

<style lang="scss" scoped>

.split-row {

    .cl,
    .cr {
        width: 20%;
        text-align: center;
        height: 1px;
        margin: 0.5rem 0 0 0;
        border-radius: 1.5px;
        background: linear-gradient(90deg, #00FFBD 0%, #00000000 100%);
    }

    .cdl,
    .cdr {
        width: 6px;
        height: 6px;
        background: #0EFFB0;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    .cdl {
        margin: 0.35rem 0 0 -0.2rem;
    }

    .cdr {
        margin: 0.35rem -0.2rem 0 0;
    }

    .cc {
        font-size: 0.8rem;
    }
}
.invite {
  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 14vh);
    padding: 6vh 0 8vh 0;
    color: #fff;
  }

  uni-scroll-view {
    height: calc(100vh - 14vh - 0.3rem);
  }
}
</style>