<template>
  <view class="withdraw body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <view class=" wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        <view class="split-row mt5">
          <view class="cl"></view>
          <view class="cdl"></view>
          <view class="cc">
            <text>{{ $t('提现地址') }}</text>
          </view>
          <view class="cdr"></view>
          <view class="cr"></view>
        </view>
        <view class="mt5 wc93 address-panel">
          <view class="dp input-row">
            <view class="f1">
              <input class="input" placeholder="请输入或粘贴提现地址" />
            </view>
          </view>
        </view>
        <view class="wc93 info">
          <u-icon name="info-circle-fill" size="16"></u-icon>
          {{ $t('长按可粘贴提现地址') }}
        </view>
        <view class="split-row mt5">
          <view class="cl"></view>
          <view class="cdl"></view>
          <view class="cc">
            <text>{{ $t('提现数额') }}</text>
          </view>
          <view class="cdr"></view>
          <view class="cr"></view>
        </view>
        <view class="tab-label">
          (USDT)
        </view>
        <view class="mt5 wc93 momey-panel">
          <view class="dp input-row">
            <view class="f1">
              <input class="input" placeholder="请输入提现金额" type="number" max="20" />
            </view>
            <view class="icon-box">
              <view class="icon"></view>
            </view>
            <view>
              USDT
            </view>
          </view>
          <view class="dp pay-row">
            <view class="f1">
              可用余额 300.2
            </view>
            <view class="btn active">
              全部
            </view>
          </view>
        </view>
        <view class="mt5">
          <view class="sell-btn">
            确认出售
          </view>
        </view>
        <view class="mt10 nodata">提现手续费:1USDT</view>
        <view class="mt5 nodata">最小提现金额: 10 USDT</view>

      </scroll-view>
    </view>
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  components: { navBar },
  data() {
    return {
      back: "/pages/member/wallet",
      title: "提现"
    }
  },

  onReady() { },
  onLoad(sender) {
    var that = this, sender = sender || {};
    that.sender = sender;
    that.load(sender);
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {}, currency = sender.currency || that.currency;

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
    background: linear-gradient(90deg, #00FFBD 0%, #000000 100%);
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

.withdraw {
  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 14vh);
    padding: 6vh 0 8vh 0;
    color: #fff;

    .address-panel {
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
        }
      }
    }

    .tab-label {
      text-align: center;
      color: #FFFFFFB2;
    }

    .momey-panel {
      height: 5rem;
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
        border-bottom: 0.5px dashed #fbd4363d;
        padding-bottom: 0.5rem;

        .input {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          line-height: normal;
          height: 1.3rem;
          line-height: 1.3rem;
          font-size: 0.7rem;
        }

        .icon-box {
          margin: 0 0.2rem;

          .icon {
            height: 0.8rem;
            width: 0.8rem;
            background: url(/static/images/member/m10.png) center center no-repeat;
            background-size: 100% 100%;
          }
        }
      }

      .pay-row {
        justify-content: center;
        align-items: center;
        padding: 0.5rem 0rem;

        .btn {
          margin: 0 0.5rem;
          border: 1px solid #417B68;
          background: #0EFFB01A;
          width: 3rem;
          height: 1.3rem;
          text-align: center;
          line-height: 1.3rem;
          border-radius: 10px;
          border-width: 1px;
        }

        .active {
          color: #000000;
          border: 1px solid #417B68;
          background: var(--Color-4, #0EFFB0);
        }
      }
    }

    .info {
      font-size: 0.4rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }

    .sell-btn {
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
    height: calc(100vh - 14vh - 0.3rem);
  }
}
</style>