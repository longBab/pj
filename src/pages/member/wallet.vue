<template>
<view class="wallet body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
 
  </navBar>
  <view style="height:5rem;"></view>
  <view class="wrapper">
    <view class="statistics">
      <image class="statistics-bg" src="/static/images/Rectangle1126.png" mode="widthFix" />
      <view class="c0">
        <text class="name">{{ $t('总余额') }}</text>
        <view class="value">
          ${{formatMoney((user.balance*1)+(user.rechargeAmount*1),2)}} 
          <u-icon name="order" size="20"></u-icon>
        </view> 
      </view>
      <view class="c1">
        <image class="statistics-icon" src="/static/images/image251.png" mode="widthFix" />
      </view>
    </view>
    <view class="guider">
      <view class="guider-bg">
        <image class="guider-bg-img" src="/static/images/Rectangle1105.png" mode="widthFix" />
      </view>
      <text class="item" @click="gotoPage('deposit')">{{$t('充值')}}</text>
      <text class="item" @click="gotoPage('withdraw')">{{$t('提现')}}</text>
      <text class="item" @click="gotoPage('transfer')">{{$t('转账')}}</text>
    </view>
    <view class="tabs">
      <view class="item" :class="{active:showType==1}" @click="chose($event,'showType',1)">
        <view class="item-bg">
          <image src="/static/images/Rectangle63.png" mode="widthFix" />
        </view>
        <view class="c01">
          <view class="icon-bg">
            <image src="/static/images/image159.png" mode="widthFix" class="icon-img" style="width:80%" />
          </view>
        </view>
        <view class="c02">
          <text class="name" style="font-size:.8rem; color:#fff;">{{$t('活跃资金')}}</text>
          <view class="value" style="font-size:.8rem; color:#fff;">{{formatMoney(user.balance,2)}} $
           <!--<u-icon name="order" size="16"></u-icon>--> 
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="item" :class="{active:showType==2}" @click="chose($event,'showType',2)">
        <view class="item-bg">
          <image src="/static/images/Rectangle63.png" mode="widthFix" />
        </view>
        <view class="c01">
          <view class="icon-bg">
            <image src="/static/images/image160.png" mode="widthFix" class="icon-img" />
          </view>
        </view>
        <view class="c02"><text class="name" style="font-size:.8rem;">{{$t('结算资金')}}</text>
          <view class="value" style="font-size:.8rem;">{{formatMoney(user.rechargeAmount,2)}} $
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
          <text class="status" v-if="row.busType==1" :class="'c'+row.status">{{$t(statusMap[row.status])}}</text>
          <text class="value">{{row.pm==0?"-":"+"}}{{ formatMoney(row.amount,2) }} $</text>
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
      user:{balance:0,rechargeAmount:0},
      statusMap:{
        "0":"申请中",
        "1":"成功",
        "2":"退回"
      },
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
      that.extend(sender);
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
      that.load({showType:index});
      
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
    position:relative;
    display:flex;
    height:4.5rem;
    overflow:visible;
    .statistics-bg{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:0;
      object-fit:cover;
    }
    .c0{
      position:relative;
      z-index:1;
      width:40%;
      display:flex;
      flex-direction: column;
      justify-content: center;
      text-align:left;
      padding-left:1rem;
      .name{
        font-size:0.7rem;
        color:#FFFFFF;
        margin-bottom:0.3rem;
      }
      .value{
        font-family:"PingFangSC-Bold";
        font-weight:600;
        font-size:1.5rem;
        color:#08E07F;
        .u-icon{color:#08E07F;}
      }
    }
    .c1{
      position:relative;
      z-index:1;
      width:60%;
      height:100%;
      display:flex;
      align-items:center;
      justify-content:flex-end;
      padding-right:0;
      .statistics-icon{
        position:absolute;
        right:1.5rem;
        top:-2.5remrem;
        width:9rem;
        height:auto;
      }
    }
  }
  .guider{
    position:relative;
    min-height:3rem;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items:center;
    flex-wrap: nowrap;
        padding: 2.5rem 2rem;
    .guider-bg{
      position:absolute;
      top:1.5rem;
      width:90%;
      height:100%;
      left: 50%;
    width: 90%;
    height: 100%;
    transform: translateX(-50%);
      z-index:0;
      .guider-bg-img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
    }
    .item{
      position:relative;
      z-index:1;
      padding: .1rem 1.2rem;
      border-radius:999px;
      background:#08E07F;
      color:#000000;
      font-size:0.65rem;
      font-weight:600;
      white-space:nowrap;
      width: 5.2rem;
      text-align: center;
      background: linear-gradient(90deg, #08E07F, #1AFFAA);
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
      position: relative;
      border-radius: 10px;
      overflow:hidden;
      .item-bg{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:0;
        image{
          width:100%;
          height:100%;
          object-fit:cover;
        }
      }
      .c01,.c02{height:100%; position:relative; z-index:1;}
      .c01{
        width:28%;
        display:flex;
        align-items:center;
        justify-content:center;
        padding-left:0.6rem;
        .u-icon{
          color:#0EFFB1;
          padding:.8rem;
          margin:0.6rem auto;
          border-radius: 10px;
          background: #3E3E3E;
        }
        .icon-bg{
          width:2.5rem;
          height:2.5rem;
          padding:0.4rem;
          border-radius: 10px;
          background: #3E3E3E;
          display:flex;
          align-items:center;
          justify-content:center;
          .icon-img{
            width:100%;
            height:100%;
            object-fit:contain;
          }
        }
      }
      .c02{
        flex:1;
        display:flex;
        flex-direction: column;
        justify-content: center;
        text-align:left;
        padding-left:0.5rem;
        .name{ 
          font-weight:400;
          font-size:0.8rem;
          color:#FFFFFF;
          margin-bottom:0.2rem;
        }
        .value{
          font-size:0.8rem;
          color:#FFFFFF;
        }
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
        border-image-slice: 1;
        border-image-repeat: round;
        clip-path: inset(0 round 10px);
      }
      &.active{
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
        /*font-size:0.4rem;*/
        white-space:nowrap;
        text-overflow:ellipsis;
      }
      .time{ /*font-size:0.3rem;*/}
     
    }
    .c02{
      display:flex;
      flex-direction: column;
      width:calc(100% - 13rem);
      justify-content: space-around;
      flex-wrap: nowrap;
      text-align:right;
       .status{
        &.c0{color:orange;}
        &.c1{color:green;}
        &.c2{color:red;}
      }
      .value{
        line-height:2rem;
        /*font-size:0.4rem;*/
        background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .wrapper{
    justify-content: flex-start;
    padding: 2.5rm 0 3rem 0;
    color:#fff;
    overflow:visible;
  }
  uni-scroll-view {
        height: calc(100% - 17.5rem);
  }
  
}
</style>