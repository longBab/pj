<template>
  <view class="home body" :class="$store.state.setting.theme">
    <navBar :logo="logo">
      <template #quicker="{ }">
        <navLanguage :source="this" />
      </template>
    </navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        <view class="panel wc93 mt5 notice-panel" @click="gotoPage('/pages/notices')">
          <view class="container">
            <view class="notice-label">
              <view class="bdr05 bggr01 notice-bg">
                <u-icon name="bell"></u-icon>
                <text>{{ $t('公告') }}</text>
              </view>
            </view>
            <view class="notice-text">
              暂无公告
            </view>
          </view>
          <view class="bdlg"></view>
        </view>
        <view class="wc93 mt10">
          <u-swiper :list="swiper_images" @change="" @click=""></u-swiper>
        </view>
        <view class="panel wc93 mt10 info-panel">
          <view class="container">
            <view class="col des">
              <text class="title">{{ $t('全球推广') }}</text>
              GEF（Game Ecosystem Fund）是 OGA 生态的资金调度核心，承载着回购、能量补给、彩蛋激励与价格稳定的四重职能。
            </view>
            <view class="col icon"></view>
          </view>
          <view class="bdlg"></view>
        </view>
        <view class="split-row mt10">
          <view class="cl"></view>
          <view class="cc">
            <text>{{ $t('WIN生态看板') }}</text>
          </view>
          <view class="cr"></view>
        </view>
        <view class="wc93 mt10">
          <view class="board">
            <view class="cell">
              <view class="box">
                <view class="bg">
                  <view class="img img1"></view>
                </view>
                <view class="des">
                  {{ $t('平台手续费') }}
                </view>
              </view>
            </view>
            <view class="cell">
              <view class="box">
                <view class="bg">
                  <view class="img img2"></view>
                </view>
                <view class="des">
                  {{ $t('国际资讯') }}
                </view>
              </view>
            </view>
            <view class="cell">
              <view class="box">
                <view class="bg">
                  <view class="img img3"></view>
                </view>
                <view class="des">
                  {{ $t('团队生态布局') }}
                </view>
              </view>
            </view>
            <view class="cell">
              <view class="box">
                <view class="bg">
                  <view class="img img4"></view>
                </view>
                <view class="des">
                  {{ $t('国际资质') }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="split-row mt10">
          <view class="cl"></view>
          <view class="cc">
            <text>{{ $t('合作夥伴') }}</text>
          </view>
          <view class="cr"></view>
        </view>

        <view class="wc93 mt10">
          <view class="partner">
            <view class="cell" v-for="(item, i) in partners" :key="i">
              <view class="box">
                <view class="bg">
                  <view class="img img1"></view>
                </view>
                <view class="des">
                  {{ item.name }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <mrFooter page="home" />
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
import mrFooter from "@/components/footer";
import navLanguage from "@/components/navLanguage";

export default {
  components: {
    mrFooter,
    navBar,
    navLanguage
  },
  setup() { },
  data() {
    return {
      name: "Home",
      logo: "../static/images/logo-02.png",
      swiper_images: [
        "/static/images/home/s1.png",
      ],
      partners: [
        { name: "Chiliz" },
        { name: "GENTING" },
        { name: "OG Guild" },
        { name: "TOKEN POCET" },
        { name: "Bitget wallet" },
        { name: "METAMASK" },
        { name: "SOCLOS" },
        { name: "Bitget" },
        { name: "BINANCE" }
      ]
    }
  },
  onLoad(sender) {
    var that = this;
    that.sender = sender;
    that.load(sender);
  },
  onReady() {
    var that = this;
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};

    }
  }
};
</script>

<style lang="scss" scoped>
.split-row {
  .cc {
    font-size: 0.8rem;
  }
}

.home {
  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 0vh);
    padding: 6vh 0 8vh 0;
    color: #fff;

    .notice-panel {
      height: 2rem;

      .container {
        justify-content: left;

        .notice-label {
          height: 100%;
          padding: 0.2rem;

          .notice-bg {
            height: 100%;
            color: black;
            width: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .notice-text {
          width: 16.8rem;
          display: flex;
          align-items: center;
          justify-content: left;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }

    .info-panel {
      height: 8rem;
      overflow: hidden;
      .container {
        flex-wrap: wrap;
        background: url(/static/images/home/h1.png) center center no-repeat;
        background-size: 102% 102%;
        overflow: hidden;
        border-radius: 10px;
        padding: 1rem 0.5rem 1rem 0.5rem;

        .col {
          &.des {
            position: relative;
            width: 55%;
            text-align: left;

            .title {
              width: 100%;
              display: block;
              font-weight: 600;
              text-align: center;
              margin-bottom: 0.5rem;
            }
          }

          &.icon {
            width: 45%;
          }
        }
      }
    }

    .board {
      display: flex;
      flex-wrap: wrap;
      height: 100%;

      .cell {
        flex: 1 1 50%;

        .box {
          display: flex;
          border: 0px solid;
          height: 3rem;
          border-radius: 1px;
          width: 85%;
          margin: 0 auto;
          padding: 0 0.6rem;
          margin-bottom: 0.6rem;
          border-radius: 8px;
          border: 1px solid transparent;
          background-image: linear-gradient(to left top, #121a24 50%, #121a2474 100%), linear-gradient(180deg, rgba(59, 211, 211, 0.5), transparent);
          background-origin: border-box;
          background-clip: padding-box, border-box;

          .bg {
            display: flex;
            justify-content: center;
            align-items: center;

            .img {
              height: 100%;
              width: 3.5rem;
            }

            .img1 {
              background: url(/static/images/home/h2.png) center center no-repeat;
              background-size: 1.5rem 1.5rem;
            }

            .img2 {
              background: url(/static/images/home/h3.png) center center no-repeat;
              background-size: 1.5rem 1.5rem;
            }

            .img3 {
              background: url(/static/images/home/h4.png) center center no-repeat;
              background-size: 1.5rem 1.5rem;
            }

            .img4 {
              background: url(/static/images/home/h5.png) center center no-repeat;
              background-size: 1.5rem 1.5rem;
            }
          }

          .des {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .partner {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 1fr;
      height: 100%;

      .cell {
        padding-bottom: 0.5rem;

        .box {
          height: 5rem;
          width: 100%;
          margin: 0 auto;
          padding: 0 0.5rem;

          .bg {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3rem;
            border-radius: 8px;
            border: 1px solid transparent;
            background-image: linear-gradient(to bottom, #000000 0%, #121a2488 100%), linear-gradient(180deg, #3BD3D3, transparent);
            background-origin: border-box;
            background-clip: padding-box, border-box;

            .img {
              width: 100%;
              height: 100%;
            }

            .img1 {
              background: url(/static/images/home/h6.png) center center no-repeat;
              background-size: 70% 70%;
            }
          }

          .des {
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }

  uni-scroll-view {
    height: calc(100vh - 22vh);
  }
}
</style>