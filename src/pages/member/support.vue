<template>
<view class="support body" :class="$store.state.setting.theme">
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
  components: {
    navBar
  },
  data() {
    return {
      back:"/pages/member",
      title:"在线支持",
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
.support {
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 14vh);
    padding: 6vh 0 0 0;
    color:#fff;
  }
  uni-scroll-view {
    height: calc(100vh - 14vh);
  }

  
}
</style>