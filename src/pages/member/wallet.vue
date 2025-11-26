<template>
<view class="wallet body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
 
  </navBar>
  <view class="wrapper">
    <view class="statistics">
      <view class="c0">
        <text class="name">{{ $t('总余额') }}</text>
        <view class="value">
          {{formatMoney(user.balance,2)}}
          <u-icon name="order" size="20"></u-icon>
        </view> 
      </view>
      <view class="c1"></view>
    </view>
    <view class="guider">
      <text class="item" @click="gotoPage('deposit')">{{$t('充值')}}</text>
      <text v-if="false" class="item" >{{$t('提现')}}</text>
      <text class="item" @click="gotoPage('withdraw')">{{$t('转账')}}</text>
    </view>
    <view class="tabs">
      <view class="item" :class="{active:showType==1}" @click="chose($event,'showType',1)">
        <view class="c01"><u-icon name="fire" size="60"></u-icon></view>
        <view class="c02">
          <text class="name">{{$t('活跃资金')}}</text>
          <view class="value">{{formatMoney(user.balance,2)}} USDT
           <!--<u-icon name="order" size="16"></u-icon>--> 
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="item" :class="{active:showType==2}" @click="chose($event,'showType',2)">
        <view class="c01"><u-icon name="time-list" size="60"></u-icon></view>
        <view class="c02"><text class="name">{{$t('结算资金')}}</text>
          <view class="value">{{formatMoney(user.rechargeAmount,2)}}USDT
            <!--<u-icon name="order" size="16"></u-icon>-->
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
    </view>
    <scroll-view scroll-y="true" scroll-x="false">
      <view class="record panel" v-for="(row,i) in rows" :key="i">
        <view class="c01">
          <text class="name">{{$t(row.title)}}</text>
          <text class="time">{{formatDate(row.createdTime,'yyyy/MM/dd HH:mm')}}</text>
        </view>
        <view class="c02">
          <text class="value">{{row.pm==0?"-":"+"}}{{ formatMoney(row.amount,2) }}</text>
        </view>
        <view class="bdlg"></view>
      </view>
    </scroll-view>
  </view>
  <mrFooter page="member" />
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
  data() {
    return {
      back:"/pages/member",
      title:"我的钱包",
      showType:1,
      user:{balance:0},
      rows:[]
    };
  },
  onReady() {
    
  },
  onLoad(sender) {
    var that = this,sender=sender||{};
    that.sender=sender;
    that.load(sender);
  },
  methods: {
    load(sender) {
      var that = this, sender = sender||that.sender||{},filter=sender;
      filter.showType=that.showType;
      that.transfer.request({
        url: "GET app/member/wallet",
        data:filter
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        var rows=(data.dataView?data.dataView.rows:null)||data.rows||[];
        data.rows=rows;
        that.extend(data);
      });
    },
    chose(event,type,index){
      var that=this;
      that.set(index,type);
      that.load();
      
    }
      
  },
};
</script>
    
<style lang="scss" scoped>
.wallet {
  .statistics,.guider,.tabs{
    width:93%;margin:0 auto;
  }
  .guider,.tabs{
    margin:0.6rem auto;
  }
  .statistics{
    display:flex;
    height:5rem;
    .c0{
      width:40%;
      display:flex;
      flex-direction: column;
      justify-content: center;
      text-align:center;
      .name{
        font-size:0.7rem;
        
      }
      .value{

        font-family:"PingFangSC-Bold";
        font-weight:600;
        font-size:1rem;
        background: linear-gradient(90deg, #0EFFB0 0%, #FFFFFF 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        .u-icon{color:#0EFFB0;}
      }
    }
    .c1{
      width:60%;
      height:100%;
      background:url(../../static/images/wallet-bg01.png) center center no-repeat;
      background-size:auto 100%;
    }
  }
  .guider{
    height:2rem;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: nowrap;
    .item{
      padding:0.1rem 1rem 0.1rem 1rem;
      border-radius:20px;
      background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
    }
  }
  .tabs{
    height:3.8rem;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    
    .item{
      width:48%;
      display:flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-around;
      position: relative;
      border: 1px solid rgba(59, 211, 211, 0.5);
      border-radius: 10px;
      .c01,.c02{height:100%; text-align:center;}
      .c01{
        width:28%;
        .u-icon{
          color:#0EFFB1;
          padding:0.5rem;
          margin:0.6rem auto;
          border-radius: 10px;
          background: #3E3E3E;
        }
      }
      .c02{
        display:flex;
        width:72%;
        flex-direction: column;
        justify-content: space-evenly;
        text-align:center;
        .name{ 
          font-weight:400;font-size:0.7rem;
        }
        .value{font-size:0.5rem;}
        .u-icon{color:#1ba27a;margin:0 0 0 0.1rem; }
      }
      .bdlg{
        position: absolute;
        border: 1px solid;
        top: -1px;
        bottom: -1px;
        right: -1px;
        left: -1px;
        z-index:1;
        background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
        border-image-source: linear-gradient(180deg, rgba(59, 211, 211, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
        border-image-slice: 1;
        border-image-repeat: round;
        clip-path: inset(0 round 10px);
      }
      &.active{
          background: linear-gradient(270deg, #0EFFB1 0%, #31B9D4 100%);
          border-radius:10px;  
          height:100%;
          color:#000;
      }
    }
    
  }
  .record{
    margin:0.3rem auto;
    display:flex;
    height:3rem;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    padding:0.5rem;
    .c01{
      width:13rem;
      display:flex;
      flex-direction: column;
      justify-content: space-evenly;
      .name{
        color: #0EFFB0;
        font-weight:400;
        font-size:0.4rem;
        white-space:nowrap;
        text-overflow:ellipsis;
      }
      .time{font-size:0.3rem;}
    }
    .c02{
      width:calc(100% - 13rem);
      text-align:right;
      .value{
        line-height:2rem;
        font-size:0.4rem;
        background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 14vh);
    padding: 6vh 0 8vh 0;
    color:#fff;
  }
  uni-scroll-view {
        height: calc(100vh - 14vh - 12.4rem);
  }
  
}
</style>