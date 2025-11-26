<template>
  <view class="body notices">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        <view class="mt15" @click="gotoPage('/pages/notice')">
          <view class="panel itme-panel">
            <view class="container">
              <view class="dp w100 item">
                <view class="f1">
                  公告1
                </view>
                <view class="f1 tr">
                  <u-icon name="arrow-right" size="32"></u-icon>

                </view>
              </view>
            </view>
            <view class="bdlg"></view>
          </view>
        </view>   
        <view class="mt15">
          <view class="panel itme-panel">
            <view class="container">
              <view class="dp w100 item">
                <view class="f1">
                  公告2
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
  components: {navBar},
  data() {
    return {
      back:"home",
      title:"公告列表"
    };
  },
  onLoad(sender) {
    let that = this;
    that.sender=sender;
    that.load(sender);
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};
      that.transfer.request({
          url: "GET app/notices",
      })
      .then((resp) => {
          var data = resp.data;
          data = data.data || data;
          that.extend(data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.notices {
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 6vh);
    padding: 6vh 1rem 0 1rem;
    color: #fff;
    .itme-panel {
    height: 2.8rem;
    line-height: 2.8rem;

    .item {
      padding: 0 1.5rem;
      font-size: 0.75rem;
    }
  }
  }
 
 
}
  uni-scroll-view {
    height: calc(100vh - 6vh);
  }
</style>