<template>
  <view class="body notices">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        
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
      title:"公告"
    };
  },
  onLoad(sender) {
    let that = this;
    that.sender=sender;
    that.load(sender);
  },
  methods: {
    load(sender){
      var that=this,sender=that.sender||sender||{};
     
    }
  }
};
</script>

<style lang="scss" scoped>
.notices {
  .wrapper{
    justify-content: flex-start;
    margin:3.5rem auto;
    height: calc(100% - 4rem);
    padding: 0rem 0 5rem 0;
  }
 
 
}
uni-scroll-view {
  height: calc(100% - 2rem);
}
</style>