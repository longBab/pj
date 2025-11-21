<template>
<view class="information body">
  <navBar :title="_title" :back="back">
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      
    </scroll-view>
  </view>
  <mrFooter />
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
      _title:"国际资讯",
      back:"informations",
    };
  },
  onLoad(sender) {
    var that = this;
    if(sender&&sender.code)that.inviteCode=sender.code;
 
  },
  onReady() {
    //this.getServerData();
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.information {
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