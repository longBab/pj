<template>
  <view class="deposit body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <!-- <image src="../static/image/homebg.png" class="bg_img1"></image> -->
    <view class="wrapper">

      <view class="page">
        <view class="title">BSC链</view>
        <view class="qrcode">
          <view class="img"></view>
        </view>
        <view class="split-row mt5">
          <view class="cl"></view>
          <view class="cdl"></view>
          <view class="cc">
            <text>{{ $t('您的专属充值地址') }}</text>
          </view>
          <view class="cdr"></view>
          <view class="cr"></view>
        </view>
        <view class="mt5 wc93 dp address">
          <view class="f1 text">
            21sWEDSSDW3e......324454EDSSD454ED435
          </view>
          <view>
            <u-icon name="order" style="color:inherit" size="28" />
          </view>
        </view>
        <view class="wc93 info">
          <u-icon name="info-circle-fill" size="16"></u-icon>
          {{ $t('每个用户具备独立地址，该地址入账均算入用户充值。') }}
        </view>
        <button class="btn">
          {{ $t('确认提交') }}

        </button>

      </view>



    </view>
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
import utility from '../../utility';
export default {
  components: { navBar },
  data() {
    return {
      back: "/pages/member/wallet",
      title: "钱包充值",
      address: "21sWEDSSDW3e......32445435",
      form: {
        value: ""
      },
    };
  },

  onReady() { },
  onLoad(sender) {
    var that = this, sender = sender || {};
    that.sender = sender;
    that.load(sender);
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};

    }
  }
};
</script>

<style lang="scss" scoped>
.deposit {
  .page {
    width: 80%;
    background: linear-gradient(180deg, rgba(33, 34, 33, 0.3) 0%, rgba(41, 45, 43, 0.3) 100%);
    border: 1px solid #134D3A;
    padding: 0 0 2rem 0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;

    .title,
    .qrcode,
    .info,
    .ctl {
      text-align: center;
    }

    .title {
      font-size: 1rem;
      height: 2rem;
      font-weight: 600;
      color: #0EFFB0;
      line-height: 2.5rem;

    }

    .qrcode {
      height: 11rem;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: space-around;

      .img {
        border: 1px solid #fff;
        width: 10rem;
        height: 10rem;
      }
    }

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
        font-weight: 600;
        color: #0EFFB0;
      }
    }
  }

  .address {
    border: 1px solid #417B68;
    background: #0EFFB01A;
    border-radius: 5px;
    height: 2rem;
    line-height: 2rem;
    padding: 0 0.7rem;

    .text {
      overflow: hidden;
      margin-right: 0.7rem;
    }
  }

  .info {
    font-size: 0.4rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
  }

  .btn {
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 0.7rem;
    background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
  }

  .wrapper {
    //justify-content: flex-start;
    margin: 0.5rem auto;
    color: #ffffff;
    height: calc(100vh - 6rem);
  }

}</style>