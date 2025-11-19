<template>
  <view class="detail body">
    <navBar :title="title" :back="back">
      <!--
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
    -->
    </navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        <view class="split-row  mt5">
          <view class="cl"></view>
          <view class="cc">
            <text>{{ $t('量化中心') }}</text>
          </view>
          <view class="cr"></view>
        </view>
        <view class=" box1">
          <view class="box1-text">
            <view class="box1-text-t">
              {{ $t('量化总金额') }}
            </view>
            <view class="box1-text-n panel">
              <view class="container">
                {{ $t('53,971,407.27153') }}
              </view>
              <view class="bdlg"></view>
            </view>
          </view>
          <view class="box1-img">
            <view class="box1-img-bg"></view>
          </view>
        </view>
        <view class="panel progress-panel mt5 ">
          <view class="container progress-container">
            <view class="progress-container-bg">
              <view class="line">
                <view class="active"></view>
              </view>
              <view class="text">
                6500/100000 USDT
              </view>
            </view>
          </view>
          <view class="bdlg bdlg-cp20"></view>
        </view>
        <view class="mt10">
          <view class="col-box">
            <view class="panel col-panel">
              <view class="container">
                <view>
                  <view class="t">
                    {{ $t('个人量化产出比') }}
                  </view>
                  <view class="n">
                    {{ $t('1,399') }}
                  </view>
                </view>
              </view>
              <view class="bdlg"></view>
            </view>
            <view class="w5"></view>
            <view class="panel col-panel">
              <view class="container">
                <view>
                  <view class="t">
                    {{ $t('个人量化产出比') }}
                  </view>
                  <view class="n">
                    {{ $t('1,399') }}
                  </view>
                </view>
              </view>
              <view class="bdlg"></view>
            </view>
          </view>
        </view>
        <view class="split-row mt10">
          <view class="cl"></view>
          <view class="cc">
            <text>{{ $t('参与量化') }}</text>
          </view>
          <view class="cr"></view>
        </view>

        <view class="statistics panel">
          <view class="container">
            <view class="row">
              <view class="c3">餘額</view>
              <view class="c1 c4">9,048 USDT</view>
            </view>
            <view class="panel row-panel">
              <view class="container" style="padding: inherit;">
                <view class="row">
                  <view class="c3">产品金额</view>
                  <view class="c4">9,048 USDT</view>
                </view>
              </view>
              <view class="bdlg"></view>
            </view>
            <view class="row" v-for="(item, i) in statistics.groups[0]" :key="i">
              <view class="c0">{{ $t(item.title) }}</view>
              <view class="c1">{{ statistics.data[item.field] }}</view>
            </view>

            <view>
              <view class="ctl">
                <button class="sbtn">{{ $t('开启量化') }}</button>
              </view>
            </view>
          </view>
          <view class="bdlg"></view>
        </view>
        <view class="split-row mt5">
          <view class="cl"></view>
          <view class="cc">
            <text>{{ $t('您的量化') }}</text>
          </view>
          <view class="cr"></view>
        </view>
        <view class="mt08 img1-box">
          <view class="col">
            <view class="img">
              <view class="img-bg"></view>
            </view>
          </view>
          <view class="col">
            <view class="panel col-panel">
              <view class="container">
                {{ $t('量化保护仓') }}
              </view>
              <view class="bdlg"></view>
            </view>
          </view>
        </view>
        <view class="statistics panel" style="height:12rem;">
          <view class="container">
            <view class="row" v-for="(item, i) in statistics.groups[1]" :key="i">
              <view class="c0">{{ $t(item.title) }}</view>
              <view class="c1">{{ statistics.data[item.field] }}</view>
            </view>
            <view class="w25" @click="gotoPage('/pages/member/QView')">
              <view class="panel row-panel1">
                <view class="">
                  {{ $t('查看全部') }}
                </view>
                <view class="bdlg"></view>
              </view>
            </view>

          </view>
          <view class="bdlg"></view>
        </view>
        <view class="nodata">
          沒有更多數據了
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
  setup() { },
  data() {
    return {
      back: "/pages/products",
      title: "产品详情",
      list: [],
      statistics: {
        groups: [
          [
            { field: "v01", title: "量化周期" },
            { field: "v02", title: "周期产出比例" },
            { field: "v03", title: "周期总产出" }
          ],
          [
            { field: "v01", title: "保障银行" },
            { field: "v02", title: "狀態" },
            { field: "v03", title: "操作類型" },
            { field: "v04", title: "个人量化产出" },
            { field: "v05", title: "購買時間" }
          ]
        ],
        data: {
          v01: '天，周，月，季，年',
          v02: '0 %',
          v03: '0 USDT',
        },
        data: {
          v01: '量化保护',
          v02: '能量释放中',
          v03: '$1221,399',
          v04: '$1,399',
          v05: '2025-10-21 00:00:00'
        }
      }
    };
  },
  onLoad(sender) {
    var that = this;
    if (sender && sender.code) that.inviteCode = sender.code;
    this.loadlist();

  },
  onReady() {
    //this.getServerData();
  },
  methods: {
    loadlist() {
      this.list.push({ 't': '量化周期', 'n': '天，周，月，季，年' });
      this.list.push({ 't': '周期产出比例', 'n': '0 %' });
      this.list.push({ 't': '周期总产出', 'n': '0 USDT' });
    }
  },
};
</script>

<style lang="scss" scoped>
.sbtn {
  width: 7.5rem;
  height: 1.55rem;
  line-height: 1.55rem;
  font-size: 0.75rem;
  background-color: #0EFFB0;
  border-radius: 0.65rem;
}

.row-panel1 {
  height: 1.55rem;
  line-height: 1.55rem;
  font-size: 0.55rem;
  text-align: center;
  color: #FFFFFFB2;
}

.col-box {
  display: flex;

  .col-panel {
    flex: 1;
    height: 4.8rem;

    .t {
      margin-top: 1rem;
    }

    .n {
      text-align: center;
      margin-top: 0.8rem;
    }
  }
}

.progress-panel {
  height: 1.55rem;
  font-size: 0.55rem;
  line-height: 1.55rem;
  background-color: #000;
  box-shadow:
    2px 1px 24.1px 3px #8C8784 inset,
    4px 4px 5.2px 29px #0EFFB01A inset;
  background: #000000;
  border: 0.05rem solid #0EFFB0;
  border-radius: 0.7rem;
  .progress-container {

    .progress-container-bg {
      width: 99%;
      height: 100%;
      display: flex;
      justify-content: left;
      align-items: center;



      // background-image:linear-gradient(to top,#8C8784,#0EFFB01A);

      .line {
        margin: 0 0.5rem 0 0.5rem;
        width: 65%;
        border-radius: 0.65rem;
        height: 0.25rem;
        background-color: #726B6B;

        .active {
          width: 35%;
          border-radius: 0.65rem;
          height: 0.25rem;
          background-color: #0EFFB0;
        }
      }
    }
  }
}

.img1-box {
  display: flex;
  justify-content: center;
  align-items: center;

  .col {
    flex: 1;

    .img {
      display: flex;
      justify-content: center;
      align-items: center;

      .img-bg {
        height: 5rem;
        width: 5rem;
        background: url(/static/images/products/p2.png) center center no-repeat;
        background-size: 5rem 5rem;
      }
    }

    .col-panel {
      height: 1.8rem;
      line-height: 1.8rem;
      width: 50%
    }
  }
}


.box1 {
  display: flex;

  .box1-text {
    flex: 1;
    text-align: center;

    .box1-text-t {
      margin-top: 1.2rem;
    }

    .box1-text-n {
      height: 2rem;
      line-height: 2rem;
      margin: 1.2rem auto;
      text-align: center;
      border-radius: 10px;
      background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);

    }
  }

  .box1-img {
    height: 6.5rem;
    width: 8.5rem;

    .box1-img-bg {
      height: 6.5rem;
      width: 8.5rem;
      background: url(/static/images/products/p1.png) center center no-repeat;
      background-size: 8.5rem 6.5rem;
    }
  }
}

.split-row {
  .cc {
    font-size: 0.8rem;
  }
}


.row-panel {
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem 0 0.5rem;
}

.statistics {
  height: 15rem;
  margin: 1rem auto;

  .container {
    padding: 1rem 0.5rem 0.5rem 0.5rem;
  }

  .c3 {
    font-size: 0.68rem;
  }

  .c4 {
    color: #9C9C9C;
  }

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }


  .bdlg {
    background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
  }

  &.s01 {
    height: 8rem;
  }
}

.detail {
  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 0vh);
    padding: 6vh 1rem 8vh 1rem;
    color: #fff;
  }

  uni-scroll-view {
    height: calc(100vh - 12vh);
  }
}
</style>