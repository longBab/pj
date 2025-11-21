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
      back:"home",
    };
  },
  onLoad() {
    var that = this;
   
  },
  onReady() {
    
  },
  methods: {},
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