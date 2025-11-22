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
      back: "/pages/product",
      title: "产品详情",
      list: []
    };
  },
  onLoad(sender) {
    var that = this;
    that.sender = sender;
    that.load(sender);
  },
  onReady() {
    //this.getServerData();
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};
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