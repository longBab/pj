<template>
<view :class="'nabBar '+page">
    <uni-icons class="back" v-if="back&&back.length>2" @click="chose($event,'back')"  type="left" size="20" style="color:inherit"></uni-icons>
    <view v-if="logo"  class="logo">
      <image class="img" :src="logo" mode="scaleToFill" />
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
  props: ['title','back','logo','source','page'],
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
  background-color:rgba(0, 0, 0, 0.65);
  display: flex;
  height: 6vh;
  width:100%;
  z-index: 9999999;
  color: #fff;
  font-size: 0.9rem;
  line-height:6vh;
  .back{
        width: 2rem;
	      height: 2rem;
  }
  .logo {
    width:60%; 
    justify-content: flex-start;
    margin:1vh auto;
    text-align: center;
    .img{
      width: 100%;
      height: 4vh;
    }
  }
  
  .title,.quicker ::v-deep .item{
       
  }
  .title {
      width: calc(100% - 5rem);
      text-align: center;
  }
  .quicker {
      display: flex;
      align-items: right;
      right: 0;
      top: 20rpx;
      right: 20rpx;
      ::v-deep .item{ 
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height:2rem;
        cursor: pointer;
      }
  }
  .popuper{
    
  }
}
</style>