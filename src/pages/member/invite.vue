<template>
  <view class="invite body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <view class=" wrapper">
      
        <view class="box-main">
          <view class="sider"></view>
          <view class="sider right"></view>
          <view class="title">{{$t('我的邀请码')}}</view>
          <view class="r1">
            <text class="cl">{{user.invitationCode}}</text>
            <u-icon name="copy" style="color:inherit" @click="utility.copy($event,user.invitationCode)" size="28" />
          </view>

          <view class="statistics">
          <view class="item">
            <text class="value">{{user.statisticFans}}</text>
            <text class="name"> {{$t('已邀请好友')}} </text>
          </view>

          <view class="item">
              <text class="value">{{formatMoney(statistics.s9,2)}}</text>
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
            <text class="item" v-for="(item,i) in content" :key="i">{{item}}</text>
          </view>

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
        "每当您成功邀请一位直推好友注册实名并完成量化采购后，",
        "系统将根据 TA 的实际参与金额，为您自动发放对应代数的邀请奖励如下:",
        "直推 5%、二代 3%、三代 2%、奖励自动发放至您的钱包结算资金"
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
  .split-row,.box-main,.statistics,.content{
    width:90%;
    margin: 0.5rem auto;
  }
  .statistics{
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    .item{
      display:flex;
      flex-direction: column;
      justify-content: space-evenly;
      background: #0EFFB01A;border: 1px solid #417B68;
      border-width: 1px;
      border-radius: 10px;
      height: 3rem;
      padding:0 1rem;
      text-align: center;
    }
  }
  .content{
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
    .item{line-height:1.2rem;}
  }
  .box-main{
   
    background: linear-gradient(180deg, rgba(14, 255, 175, 0.175) 1.92%, rgba(14, 255, 175, 0.121) 20.19%, rgba(74, 85, 81, 0.099) 100%);
    border: 1px solid #134D3A;
    border-width: 1px;
    border-radius: 10px;
    padding:1rem;
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-around;
    position: relative;
    overflow: hidden;
    .sider{
      position: absolute;
      width: 3rem;
      height: 2rem;
      top: calc(50% - 1rem);
      left: -2rem;
      border: 1px solid #134D3A;
      border-radius: 5px;
      z-index:2;
      &.right{left:auto;right:-2rem;}
    }
    .title{
      text-align: center;
      font-size:1rem;
      height: 3rem;
    }
    .r1{
      background: #0EFFB01A;border: 1px solid #417B68;
      border-width: 1px;
      border-radius: 10px;
      height: 2rem;
      line-height: 2rem;
      padding:0 1rem;
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      .copy{

      }

    }
  }
  .wrapper {
    //justify-content: flex-start;
    height: calc(100% - 3rem);
    padding: 2.5rem 0 0 0;
    color: #fff;
  }
  uni-scroll-view {
    height: auto;
  }

  
}
 

</style>