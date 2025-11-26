<template>
<view class="informations body">
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
  <mrFooter page="member" />
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
  setup() {},
  data() {
    return {
      confirm: true,
      keyword: "",
      service: false,
      title:"国际资讯",
      back:"/pages/introduction",
    };
  },
  onLoad() {
    var that = this, sender = sender || {};
    that.sender = sender;
    that.load(sender);
   
  },
  onReady() {
    
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};
      that.transfer.request({
          url: "GET app/informations",
      })
      .then((resp) => {
          var data = resp.data;
          data = data.data || data;
          that.extend(data);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.informations {
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 4rem);
    padding: 4rem 0 5rem 0;
  }

  uni-scroll-view {
    height: calc(100% - 2rem);
  }
}
</style>