<template>
  <view class="deposit body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper" style="padding-top:5rem;">

      <view class="page">
        <view class="title">{{$t('BSC链')}}</view>
        <view class="qrcode">
          <image v-if="qrSrc" :src="qrSrc" mode="aspectFit" class="img" />
        </view>
        <view class="split-row mt5">
          <view class="cc">
            <text>{{ $t('您的专属充值地址') }}</text>
          </view>
        </view>
        <view class="mt5 wc93 dp address">
          <view class="f1 text">
            {{ formatAddress(address) }}
          </view>
          <view @click="utility.copy($event, address)">
            <u-icon name="copy" style="color:inherit" size="28" />
          </view>
        </view>
        <view class="wc93 info" style="font-size:.5rem">
          <image src="/static/images/Vector.png" mode="widthFix" class="info-icon" />
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
      qrSrc: "",
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
    formatAddress(address) {
      if (!address || address.length <= 10) {
        return address;
      }
      // 显示前6位和后4位，中间用省略号
      return address.substring(0, 6) + '...' + address.substring(address.length - 4);
    },
    load(sender) {
      var that = this, sender = that.sender || sender || {};
      that.transfer.request({
        url: "GET app/member/deposit",
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        that.extend(data);
        // 如果接口返回了 address，则生成对应的二维码图片
        if (data && data.address) {
          that.address = data.address;
          // 使用在线二维码服务生成二维码图片
          that.qrSrc = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(data.address);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.deposit {
  .split-row .cc{font-size:0.8rem;}
  .page {
    position: relative;
    width: 80%;
    background: url(/static/images/Subtract.png) center center no-repeat;
    background-size: cover;
        padding:  2rem;
        height:30rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* flex-wrap: nowrap; */
    /* justify-content: center; */
    background-size: 100% 100%;

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
      margin-top: 1rem;
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
        font-weight: 600;
        color: #0EFFB0;
        font-size: 0.8rem;
      }
    }
  }

  .address {
    position: relative;
    border-radius: 5px;
    height: 2rem;
    line-height: 2rem;
    padding: 0 0.7rem;
    background: url(/static/images/Rectangle11.png) center center no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      overflow: hidden;
      margin-right: 0.7rem;
      text-align: center;
      flex: 1;
    }
  }

  .info {
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    .info-icon {
      width: 0.8rem;
      height: 0.8rem;
    }
  }

  .btn {
    height: 2.3rem;
    width:10rem;
    line-height: 2.3rem;
    font-size: 0.7rem;
    background: linear-gradient(90deg, #08E07F , #1AFFAA 100%);
    border-radius:15px;
    font-weight:600;
    font-size:.8rem;
  }

  .wrapper {
    position: relative;
    z-index: 1;
    //justify-content: flex-start;
    margin: 0.5rem auto;
    color: #ffffff;
    height: calc(100vh - 6rem);
  }

}</style>