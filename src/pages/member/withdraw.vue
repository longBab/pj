<template>
  <view class="withdraw body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <view class=" wrapper">
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
      back:"/pages/member",
      title:"提现"
    }
     
  },

  onReady() {},
  onLoad(sender) {
    var that = this,sender=sender||{};
    that.sender=sender;
    that.load(sender); 
  },
  methods: {
    load(sender){
      var that=this,sender=that.sender||sender||{},currency=sender.currency||that.currency;
      
    },
  }
    
};
</script>

<style lang="scss" scoped>
.withdraw {
  .wrapper{
    justify-content: flex-start;
    margin:4rem auto;
    height: calc(100% - 4rem);
    padding: 0 0.8rem 0 0.8rem;
  }
  uni-scroll-view {
    height: calc(100% - 2rem);
  }
}
</style>