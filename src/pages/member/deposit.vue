<template>
  <view class="deposit">
    <navBar :title="title" :back="back"></navBar>
    <!-- <image src="../static/image/homebg.png" class="bg_img1"></image> -->
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
         
      </scroll-view>
    </view>
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
import utility from '../../utility';
export default {
  components: {navBar},
  data() {
    return {
      back:"invest",
      title:"充值",
      form: {
        value: "" 
      },
    };
  },

  onReady() {},
  onLoad(sender) {
    var that = this,sender=sender||{};
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
.deposit {
  .wrapper {
    justify-content: flex-start;
    margin: 4rem auto;
    height: calc(100% - 4rem);
    padding: 0rem 0.8rem 0 0.8rem;
  }
  uni-scroll-view {
    height: calc(100% - 2rem);
  }
}


</style>