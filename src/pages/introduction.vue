<template>
<view class="introduction body">
  <navBar :title="title" :back="back">
    <!--
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
    -->
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      <view style="margin-top: 20rpx;text-align: center;font-size:40rpx;">
         {{$t('全球量化智能配置方案')}}
      </view>
       <view style="height: 400rpx; display:flex;justify-content:center;align-items:center;margin-top: 50rpx;">
          <u-image
            src="/static/images/introduction/i1.png"
            width="600rpx"
            height="350rpx"
            mode="scaleToFill"
          ></u-image>
      </view>
      <view style="margin-top: 20rpx;text-align: center;font-size:30rpx;">
        {{$t('量化简介')}}
      </view>
      <view style="margin: 40rpx 50rpx 0 50rpx; border-radius: 20rpx; padding: 30rpx 30rpx 30rpx 30rpx; border: 2rpx solid #00FFFF70; background-color: #00000099;">
          <view>
            <u-row >
              <u-col span="8">
                  <view style="font-size: 20rpx; font-weight: 100;  line-height:30rpx">
                    {{$t('全球量化智能配置方案是一种长期配置方式，通过定期执行的量化模型，在不同市场环境下保持纪律性操作，降低情绪干扰与波动风险。我们的 AI 驱动系统将自动执行策略，帮助用户实现长期稳健的资产增长。')}}
                  </view>
              </u-col>
              <u-col span="4">
                  <view style="display:flex;justify-content:center;align-items:center;">
                    <u-image
                      src="/static/images/introduction/i2.png"
                      width="180rpx"
                      height="180rpx"
                    ></u-image>
                  </view>
              </u-col>
            </u-row>
          </view>
        </view>
      <view style="margin-top: 70rpx;text-align: center;font-size:30rpx;">
        {{$t('项目特色')}}
      </view>
      <view style="margin: 50rpx 42rpx 0 42rpx; ">
          <u-row style="margin-bottom: 10px">
            <u-col span="6">
                <view class="col-box">
                  <view class="col-box-text">
                    {{$t('主流币产出')}}
                  </view>
                  <view class="col-box-text">
                    {{$t('177,034')}}
                  </view>
                </view>
            </u-col>
            <u-col span="6">
                <view class="col-box">
                  <view class="col-box-text">
                    {{$t('发行代币产出')}}
                  </view>
                  <view class="col-box-text">
                     {{$t('177,034')}}
                  </view>
                </view>
            </u-col>
          </u-row>
        </view>
        <view style="margin: 40rpx 50rpx 0 50rpx; border-radius: 20rpx; padding: 30rpx 30rpx 30rpx 30rpx; border: 2rpx solid #00FFFF70; background-color: #00000099;">
          <view class="list-img-box">
            <view>
              <u-image
                src="/static/images/introduction/i3.png"
                width="180rpx"
                height="180rpx"
              ></u-image>
            </view>
            <view>
              <view class="list-img-box-title">
                {{$t('智能自动定投')}}
              </view>
              <view class="list-img-box-text">
                {{$t('系统自动调度，无需人工干预，严格遵循模型信号，避免错过市场机会。')}}
              </view>
            </view>
          </view>
          <view class="list-img-box">
            <view>
              <u-image
                src="/static/images/introduction/i4.png"
                width="180rpx"
                height="180rpx"
              ></u-image>
            </view>
            <view>
              <view class="list-img-box-title">
                {{$t('多因子风控覆盖')}}
              </view>
              <view class="list-img-box-text">
                {{$t('结合波动率、成交量、资金流等因子，分散单一 市场风险，优化平均成本。')}}
              </view>
            </view>
          </view>
          <view class="list-img-box">
            <view>
              <u-image
                src="/static/images/introduction/i5.png"
                width="180rpx"
                height="180rpx"
              ></u-image>
            </view>
            <view>
              <view class="list-img-box-title">
                {{$t('灵活策略配置')}}
              </view>
              <view class="list-img-box-text">
                {{$t('支持主流数字资产，用户可根据风险偏好自由设定周期与额度。')}}
              </view>
            </view>
          </view>
          <view class="list-img-box" style="border-bottom: 0rpx;">
            <view>
              <u-image
                src="/static/images/introduction/i6.png"
                width="180rpx"
                height="180rpx"
              ></u-image>
            </view>
            <view>
              <view class="list-img-box-title">
                {{$t('合规资金托管')}}
              </view>
              <view class="list-img-box-text">
                {{$t('资金采用多重签名与冷热分离架构，由合作的专 业机构进行安全托管。')}}
              </view>
            </view>
          </view>
        </view>
    </scroll-view>
  </view>
  <mrFooter page="introduction" />
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
      title: "介绍",
    };
  },
  onLoad(sender) {
    var that = this;
    if(sender&&sender.code)that.inviteCode=sender.code;
 
  },
  onReady() {
    //this.getServerData();
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.list-img-box{
  display:flex;justify-content:center;align-items:center;border-bottom: 1rpx dashed #0EFFB035;margin-top:20rpx;
  .list-img-box-title{
    font-size: 30rpx;color:#0EFFB0;height: 60rpx;
  }
  .list-img-box-text{
    font-size: 18rpx;color:#929292;height: 100rpx;
  }
}
.col-box {
  border: 2rpx solid #00FFFF70; 
  border-radius: 25rpx; 
  background: #00000099;
  /*
  border-image-slice: 30;
  border-image-source: linear-gradient(109deg, #00FFFF -29.08%, #000000 46.11%, #00FFBD 117.09%);
  */
  
  height:180rpx;
  .col-box-wrapper{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:-30rpx;
  }
  .col-box-text{
    text-align: center;
    font-size: 25rpx;
    font-weight: 100;
    margin-top: 30rpx;
  }
}
.introduction {
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