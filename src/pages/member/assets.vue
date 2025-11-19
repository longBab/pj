<template>
  <view class="assets body" :class="$store.state.setting.theme">
    <navBar :back="back" :title="title">
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
components: {navBar},
  data() {
    return {
      back:"invest",
      title:"资产记录",
      currency:"",
      status:"",
      path:"",
      rows:[]
    };
  },
  onReady() {
    
  },
  onLoad(sender) {
    var that = this,sender=sender||{};
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
.assets {
  .wrapper{
    box-sizing: border-box;
    justify-content: flex-start;
    margin:4rem auto;
    height: calc(100% - 4rem);
  }
  uni-scroll-view {
    height: calc(100% - 2rem);
  }

  
}
</style>