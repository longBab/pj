<template>
  <view class="invite body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <view class=" wrapper" style="padding-top:5rem;">
      
        <view class="box-main">
          <view class="title">{{$t('我的邀请码')}}</view>
          <view class="r1">
            <text class="code-text">{{user.invitationCode}}</text>
            <u-icon name="copy" style="color:#08E07F;" size="20" @click="utility.copy($event,user.invitationCode)" />
          </view>

          <view class="statistics">
            <view class="item">
              <text class="value">{{user.statisticFans || 0}}</text>
              <text class="name">{{$t('已邀请好友')}}</text>
            </view>
            <view class="item">
              <text class="value">{{formatMoney(statistics.s9,2) || '0.00'}}</text>
              <text class="name">{{$t('累计奖励')}}(USDT)</text>
            </view>
          </view>

          <view class="split-row">
            <view class="cl"></view>
            <view class="cdl"></view>
            <view class="cc">
              <text>{{ $t('邀请规则') }}</text>
            </view>
            <view class="cdr"></view>
            <view class="cr"></view>
          </view>

          <view class="content">
            <text class="item" v-for="(item,i) in content" :key="i" :class="{highlight: i === 1}">{{item}}</text>
          </view>
        </view>
        
        <view class="scan-link">
          <text>{{$t('扫码直接注册')}}</text>
        </view>
       
   
    </view>
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  setup() { },
  components: { navBar },
  data() {
    return {
      back: "/pages/member",
      title: "推广邀请",
      url: "",
      user:{invitationCode:""},
      statistics:{s3:0,s7:0,s9:0,s10:0,s11:0,s12:0},
      content:[
        "每成功邀请1位好友注册并完成实名认证,您可获得10USDT奖励",
        "好友首次充值,您可获得充值金额5%的额外奖励",
        "奖励自动发放至您的账户余额"
      ],
    };
  },
  onReady() {

  },
  onLoad(sender) {
    var that = this, sender = sender || {};
    that.sender = sender;
    that.load(sender);
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};
      that.transfer.request({
        url: "GET app/member/invite",
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
         if(data.statistics&&data.statistics.length>=1)data.statistics=data.statistics[0];
        that.extend(data);
      });
    }

  }
};
</script>

<style lang="scss" scoped>
.invite {
  .box-main{
    width: 80%;
    margin: 0 auto;
    background: url(/static/images/Subtract.png) center center no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    position: relative;
    .title{
      text-align: center;
      font-size: 1rem;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 1.5rem;
    }
    .r1{
      position: relative;
      height: 2.5rem;
      line-height: 2.5rem;
      padding: 0 1rem;
      background: url(/static/images/Rectangle9.png) center center no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      .code-text{
        flex: 1;
        color: #FFFFFF;
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
  }
  .statistics{
    width: 100%;
    margin: 0 auto 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    .item{
      flex: 1;
      position: relative;
      height: 4rem;
      padding: 0.8rem 1rem;
      background: url(/static/images/Rectangle8.png) center center no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .value{
        font-size: 1.2rem;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 0.4rem;
        line-height: 1.5rem;
      }
      .name{
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1rem;
        white-space: nowrap;
      }
    }
  }
  .split-row{
    width: 100%;
    margin: 1.5rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .cl, .cr {
      width: 20%;
      height: 1px;
      margin: 0.5rem 0 3px 0;
      border-radius: 1.5px;
      background: linear-gradient(90deg, #00FFBD 0%, #000000 100%);
    }
    .cdl, .cdr {
      width: 6px;
      height: 6px;
      background: #0EFFB0;
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }
    .cdl {
      margin: 0.35rem 0 0 -0.2rem;
    }
    .cdr {
      margin: 0.35rem -0.2rem 0 0;
    }
    .cc {
      font-weight: 600;
      color: #fff;
      font-size: 0.8rem;
      margin: 0 0.5rem;
    }
  }
  .content{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    .item{
      font-size: 0.7rem;
      line-height: 1.4rem;
      color: rgba(255, 255, 255, 0.8);
      &.highlight{
        color: #08E07F;
      }
    }
  }
  .scan-link{
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
    text{
      color: #08E07F;
      font-size: 0.85rem;
      text-decoration: underline;
    }
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - 3rem);
    padding: 2.5rem 0 0 0;
    color: #fff;
  }
  uni-scroll-view {
    height: auto;
  }

  
}
 

</style>