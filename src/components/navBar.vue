<template>
<view class="nabBar">
    <uni-icons class="back" v-if="back&&back.length>2" @click="chose($event,'back')"  type="left" size="25" style="color:#000"></uni-icons>
    <view v-if="logo" style="width: 40%; justify-content: flex-start;margin:auto;text-align: center;" class="center_flex">
      <image class="logo mr05" :src="logo" mode="scaleToFill" />
    </view>
    <view class="title" v-if="title">{{$t(title?title:"none")}}</view>
    <slot name="tabs" v-bind="this"></slot>
    <view class="quicker">
     
    </view>
    <slot name="quicker" v-bind="this"></slot>
</view>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      
    };
  },
  props: ['title','back','logo','source'],
  mounted() {
 
   var that=this;
  
   
  },
  methods: {
    chose(event, type) {
        let that = this;
        console.log(that.back);
        if (that.back) that.gotoPage(that.back);
    }
  },
};
</script>

<style lang="scss"  scoped>
.nabBar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  padding: 0 0.7rem;
  border-bottom: 0rpx solid #cecece;
  display: flex;
  height: 3.8rem;
  width:100%;
  z-index: 9999999;
  .logo {
    width: 4.5rem;
    height: 2rem;
  }
  .popuper{
    
  }
  .quicker {
    display: flex;
    align-items: center;
  }
}
</style>