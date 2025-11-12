<template>
  <view class="invest">
    <navBar :logo="logo">
      <template #quicker="{}">
        <navLanguage :source="this" />
      </template>
    </navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
       
      </scroll-view>
    </view>
    <mrFooter page="team" />
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
  data() {
    return {
      logo: "../../static/images/logo.png"
     
    };
  },

  onReady() {},
  onLoad(sender) {
    var that = this;
    that.sender=sender;
    that.load(sender);
  },
  methods: {
    load(sender){
      var that=this,sender=that.sender||sender||{};
       
    }
   
  },
};
</script>

<style lang="scss" scoped>
.invest {
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