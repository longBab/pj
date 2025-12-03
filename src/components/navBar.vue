<template>
<view :class="'nabBar '+page+' flag'+flag">
<view class="back" v-if="back&&back.length>2" @click="chose($event,'back')">
  <view style="position: relative; width:2.8rem;height:2.8rem;border-radius: 50%;left:-1.5rem;">
    <image  style="width:100%;height:100%;" src="/static/images/home/Ellipse1629.svg" mode="widthFix" />
    <image  style="width:50%;height:50%;position: absolute;left:50%;top:50%;transform: translate(-50%, -50%); "  src="/static/images/Vector2.png" mode="widthFix" />
  </view>
</view>
    <view v-if="logo"  class="logo">
      <image class="img" :src="logo" mode="scaleToFill" />
    </view>
    <view class="title" style="font-size:1.4rem;font-weight:600;" v-if="title">{{$t(title?title:"none")}}</view>
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
  props: {
    title:{type:String,default:''},
    back:{type:String,default:''},
    logo:{type:String,default:''},
    source:{type:Object,default:null},
    page:{type:String,default:''},
    flag:{type:Number,default:0}
},
 // props: ['title','back','logo','source','page','flag'],
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
  $_height:4.5rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: $_height;
  line-height:$_height;
  width:100%;
  z-index: 9;
  color: #fff;
  font-size: 0.9rem;
  .back{
      position:relative;
      width: 5.7rem;
      height: $_height;
      display:flex;
      align-items:center;
      justify-content:flex-start;
      padding-left:3rem;  // 整体向右移动一点
      .back-bg{
        width:2.7rem;
        height:2.7rem;
      }
      .back-icon{
        position:absolute;
        width:1rem;
        height:auto;
        left:74%;
        top:50%;
        transform:translate(-50%,-50%);
      }
  }
  .logo {
    width:60%; 
    justify-content: flex-start;
    margin:1vh auto;
    text-align: center;
    .img{
      width: 100%;
      height: 4vh;
      margin-left:.8rem;
    }
  }
  
  .title,.quicker ::v-deep .item{
       
  }
  .title {
      width: calc(100% - 2rem);
      text-align: center;
      margin-right:5.76rem;
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