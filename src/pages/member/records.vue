<template>
  <view class="records">
    <navBar :back="back">
    <template #tabs="{}">
      <view class="title-wrap">
        <view class="nav-title" :class="{active:path=='Deposit'}" @click="gotoPage('records?path=Deposit&currency='+currency)">{{$t('充值记录')}}</view>
        <view class="nav-title" :class="{active:path=='Withdraw'}" @click="gotoPage('records?path=Withdraw&currency='+currency)">{{$t('提现记录')}}</view>
      </view> 
    </template>
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
      back:"deposit",
      path:"Deposit",
      rows:[]
    };
  },
  onReady() {
    
  },
  onLoad(sender) {
    var that = this,sender=sender||{},path=sender.path;
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
.records {
  .wrapper{
    box-sizing: border-box;
    justify-content: flex-start;
    margin:4rem auto;
    height: calc(100% - 4rem);
    padding:0 0.8rem 0 0.8rem;
  }
  uni-scroll-view {
    height: calc(100% - 2rem);
  }
}
</style>