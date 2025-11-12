<template>
<view class="home body">
  <navBar ref="navBar"  :logo="logo" :haveWallet="true" :source="this">
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      
    </scroll-view>  
  </view>
  <mrFooter page="home"  />
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
      name:"Home",
      logo: "../static/images/logo.png"
    }
  },
  onLoad(sender) {
    var that = this;
    that.sender=sender;
    that.load(sender);
  },
  onReady() {
    var that=this;
  },
  methods: {
    load(sender){
      var that=this,sender=that.sender||sender||{};
      
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 4rem);
    padding: 4rem 0rem 5rem 0rem;

  }
  uni-scroll-view {
    height: calc(100% - 2rem);
  }
}
</style>