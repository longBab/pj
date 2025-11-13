<template>
<view class="products body">
  <navBar :title="title" :back="back">
    <!--
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
    -->
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      <view style="margin-top: 20rpx;text-align: center;font-size:36rpx;">
         {{$t('量化中心')}}
      </view>
      <view style="margin: 70rpx 0 0 0; ">
          <view>
            <u-row >
              <u-col span="6" style="position: relative;">
                <view style="text-align: center;position: absolute;top:-90rpx;left:60rpx;z-index: 2;width: 400rpx;">
                  <view style="font-size: 38rpx;">
                    {{$t('量化总金额')}}
                  </view>
                  <view style="margin: auto; height:80rpx;font-size: 38rpx;line-height:80rpx;border-radius: 20rpx; border: 2rpx solid #00FFFF70;margin-top:60rpx;">
                    {{$t('53,971,407.27153')}}
                  </view>
                </view>
              </u-col>
              <u-col span="6">
                  <view style="display:flex;justify-content:right;align-items:center;">
                    <u-image mode="scaleToFill"
                      src="/static/images/products/p1.png"
                      width="300rpx"
                      height="220rpx"
                    ></u-image>
                  </view>
              </u-col>
            </u-row>
          </view>
      </view>
      <view style="margin: 100rpx 50rpx 0 50rpx;">
        <view style="display:flex;justify-content:left;align-items:center;height:55rpx;font-size: 18rpx;line-height:55rpx;border-radius: 40rpx; border: 2rpx solid #00FFFF70;">
          <view style="margin:0 20rpx 0 15rpx;width: 440rpx;border-radius: 40rpx; height: 8rpx;background-color: #726B6B;">
            <view style="width: 140rpx;border-radius: 40rpx;height: 8rpx;background-color: #0EFFB0;">
            </view>
          </view>
          <view>
            6500/100000 USDT
          </view>
        </view>
      </view>
      <view style="margin: 50rpx 42rpx 0 42rpx; ">
          <u-row style="margin-bottom: 10px">
            <u-col span="6">
                <view class="col-box">
                  <view class="col-box-text">
                    {{$t('个人量化产出比')}}
                  </view>
                  <view class="col-box-text">
                    {{$t('1,399')}}
                  </view>
                </view>
            </u-col>
            <u-col span="6">
                <view class="col-box">
                  <view class="col-box-text">
                    {{$t('平台产出比')}}
                  </view>
                  <view class="col-box-text">
                     {{$t('0')}}
                  </view>
                </view>
            </u-col>
          </u-row>
        </view>
      <view style="margin-top: 80rpx;text-align: center;font-size:36rpx;">
         {{$t('参与量化')}}
      </view>
      <view class="list-wrapper" style="margin-top:60rpx">
        <view style="display: flex;font-size: 30rpx;">
          <view style="flex:1;">
            餘額
          </view>
          <view>
            9,048 USDT
          </view>
        </view>
        <view style="display: flex;font-size: 30rpx;">
          <view style="flex:1;">
            产口金额
          </view>
          <view>
            9,048 USDT
          </view>
        </view>
        <view v-for="(item, i) in list" :key="i">
          <view class="list-item">
            <view class="list-item-left">
              {{ item.t }}
            </view>
            <view class="list-item-right">
              {{ item.n }}
            </view>
          </view>
        </view>
        <view style="margin-top:60rpx;">
          <view class="ctl">
            <button style=" width:340rpx;height:80rpx;line-height: 80rpx; font-size: 32rpx;background-color: #0EFFB0; border-radius: 30rpx;" >{{$t('开启量化')}}</button>
          </view>
        </view>
      </view>
      <view style="margin-top: 80rpx;text-align: center;font-size:36rpx;">
         {{$t('您的量化')}}
      </view>
      <view style="display:flex;justify-content:center;align-items:center;">
        <view style="">
          <u-image mode="scaleToFill"
            src="/static/images/products/p2.png"
            width="150rpx"
            height="150rpx"
          ></u-image>
        </view>
        <view>
            量化保护仓
        </view>
      </view>
      
      <view class="list-wrapper" style="margin-top:60rpx">
        <view style="display: flex;font-size: 30rpx;">
          <view style="flex:1;">
            餘額
          </view>
          <view>
            9,048 USDT
          </view>
        </view>
        <view style="display: flex;font-size: 30rpx;">
          <view style="flex:1;">
            产口金额
          </view>
          <view>
            9,048 USDT
          </view>
        </view>
        <view v-for="(item, i) in list" :key="i">
          <view class="list-item">
            <view class="list-item-left">
              {{ item.t }}
            </view>
            <view class="list-item-right">
              {{ item.n }}
            </view>
          </view>
        </view>
        <view style="margin-top:60rpx;">
          查看全部
        </view>
      </view>
    </scroll-view>
  </view>
  <mrFooter page="products" />
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
      back:"home",
      title: "产品",
      list:[],
    };
  },
  onLoad(sender) {
    var that = this;
    if(sender&&sender.code)that.inviteCode=sender.code;
    this.loadlist();
 
  },
  onReady() {
    //this.getServerData();
  },
  methods: {
    loadlist() {
      this.list.push({'t':'量化周期','n':'天，周，月，季，年'});
      this.list.push({'t':'周期产出比例','n':'0 %'});
      this.list.push({'t':'周期总产出','n':'0 USDT'});
    }
  },
};
</script>

<style lang="scss" scoped>

.list-wrapper{
  margin: 70rpx 50rpx 0 50rpx; border-radius: 20rpx; padding: 30rpx 30rpx 30rpx 30rpx;  border: 2rpx solid #00FFFF70; background-color: #00000099;
  .list-item{
    display: flex; font-size: 22rpx;font-weight: 100; height:45rpx;line-height: 45rpx;
    .list-item-left{
      flex:1;
    }
    .list-item-right{
      margin-left:auto; text-align: left;
    }
  }
}
.col-box {
  border: 2rpx solid #00FFFF70; 
  border-radius: 25rpx; 
  background: #00000099;
  
  height:180rpx;
  .col-box-wrapper{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:-30rpx;
  }
  .col-box-text{
    text-align: center;
    font-size: 28rpx;
    margin-top: 30rpx;
  }
}
.products {
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 4rem);
    padding: 4rem 0 5rem 0;
    color:#fff;
  }
 
  uni-scroll-view {
    height: calc(100vh - 9rem);
  }
}
</style>