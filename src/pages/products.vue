<template>
<view class="products body">
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
  <mrFooter page="products" />
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
      back:"home",
      title: "产品",
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
.products {
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 4rem);
  }
 
  uni-scroll-view {
    height: calc(100% - 2rem);
  }
}
</style>