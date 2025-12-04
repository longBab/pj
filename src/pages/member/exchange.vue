<template>
<view class="exchange bodys2" :class="$store.state.setting.theme" >
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    <view class="tabs">
      <view class="tabs-container">
        <view class="tabs-slider" :style="{transform: `translateX(${type === 0 ? 0 : 100}%)`}"></view>
        <text class="item buy" :class="{active:type==0}" @click="chose($event,'type',0)">{{$t('购买')}}</text>
        <text class="item sell" :class="{active:type==1}" @click="chose($event,'type',1)">{{$t('出售')}}</text>
      </view>
    </view>

    <view class="statistics">
      <view class="stat-item input-item">
        <image class="usdt-icon" src="/static/images/USDT.png" mode="widthFix" />
        <text>0.00 USD</text>
      </view>
      <view class="stat-item dropdown-item">
        <text>{{$t('金额')}}</text>
        <image class="dropdown-icon" src="/static/images/fi-rr-angle-left.png" mode="widthFix" />
      </view>
      <view class="stat-item dropdown-item">
        <text>{{$t('支付')}}</text>
        <image class="dropdown-icon" src="/static/images/fi-rr-angle-left.png" mode="widthFix" />
      </view>
      <view class="stat-item shield-item" :class="{active: shieldActive}" @click="shieldActive = !shieldActive">
        <text>{{$t('神盾')}}</text>
       
        <view class="shield-icon-bg">
          <image v-if="shieldActive" class="shield-check" src="/static/images/Vector18.png" mode="widthFix" />
        </view>
      </view>
    </view>
    
    <scroll-view scroll-y="true" scroll-x="false">

      <view class="record" v-for="(row,i) in rows" :key="i" >
        <view class="record-badge" v-if="i === 0">
          <u-icon name="clock" size="12" color="#fff" />
          <text>{{$t('限时')}}</text>
        </view>
        <view class="row r01">{{$t(row.name)}}</view>
        <view class="row r02">30日成單 {{row.orderPlacementNum}} ({{row.conversionRate}}%)</view>
        <view class="row r03">
          <view class="price-section">
            <text class="price">¥{{row.usdtPrice}}</text>
            <text class="price-unit"> /USDT</text>
          </view>
          <view class="btn-wrapper">
            <view class="btn" :class="{sell:type===1,buy:type===0}" @click="chose(row,'goto')">{{$t(type===0?'购买':'出售')}}</view>
          </view>
        </view>
        
        <view class="row r04">
          <view class="c01">限額 {{formatMoney(row.minQuota,2)}} - {{formatMoney(row.maxQuota,2)}} CNY</view>
          <view class="c02">可用余额 {{formatMoney(row.balance,2)}} USDT</view>
        </view>
      </view>

      <view style="height:10rem;"></view>
      
    </scroll-view>
  </view>
</view>
</template>
<script>
import navBar from "@/components/navBar.vue";
export default {
  components: {
    navBar
  },
  data() {
    return {
      back:"/pages/member",
      title:"一键兑换",
      type:0,
      rows:[],
      currentTab:'buy',
      shieldActive: true
    };
  },
  onReady() {
    
  },
  onLoad(sender) {
    var that = this,sender=sender||{};
    that.sender=sender;
    if(sender.type)that.set(sender.type,'type');
    that.load(sender);
  },
  methods: {
    load(sender) {
      var that = this, sender = sender ||that.sender || {},filter=sender;
      filter.type=that.type||0;
      if(!filter.pageNum)filter.pageNum=1;
      if(!filter.pageSize)filter.pageSize=10000;
      that.transfer.request({
        url: "GET app/member/exchange",
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
      if(type=='goto'){
        var row=event;
        if(that.get("type")==1){
          that.gotoPage("exchange/sell");
          return false;
        }
        if(/(和成)/.test(row.name))that.gotoPage("/pages/serviceChangeX");
        else that.gotoPage("/pages/serviceChange");
        return false;
      }
      that.set(index,type);
      that.load();

    }
      
  },
};
</script>
      
<style lang="scss" scoped>
.bodys2{
  width:100%;
    height: 105%;
    padding-top:1.5rem;          // 预留顶部 3rem 用于导航栏
    box-sizing:border-box;
    background-color:#010101;
    /* 左上角装饰图 */
    background-image: url(/static/images/Ellipse3.png);
    background-repeat: no-repeat;
    background-position: left top;
    background-size: auto;
    font-size:0.65rem;
    overflow: hidden;
    uni-scroll-view {
        height:100%;
    }

}
.exchange {
  .tabs{
    width:70%;
    margin: 0.5rem auto;
      .tabs-container{
        position: relative;
        display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        border-radius:10px;
        padding: 0;
        overflow: hidden;
        background: url(/static/images/Rectangle75.png) center center no-repeat;
        background-size: 100% 100%;
        .tabs-slider{
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, #0EFFB1, #31B9D4);
          border-radius: 10px;
          transition: transform 0.3s ease;
          z-index: 1;
        }
      .item{
        position: relative;
        flex: 1;
        height: 2.4rem;
        text-align: center;
        line-height: 2.4rem;
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        z-index: 2;
        transition: color 0.3s ease;
        &.active{
          color: #000;
          font-weight: 600;
        }
      }
    }
  }
  .statistics{
    width:91%;
    margin: 0.5rem auto;
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    .stat-item{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;
      padding: 0.4rem 0.6rem;
      border: 1px solid #417B68;
      border-radius: 6px;
      font-size: 0.7rem;
      color: #FFFFFF;
      &.input-item{
        flex: 1.5;
        .usdt-icon{
          width: 1rem;
          height: 1rem;
        }
      }
      &.dropdown-item{
        flex: 1;
        background: transparent;
        .dropdown-icon{
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      &.shield-item{
        flex: 0.8;
        background: transparent;
        .shield-icon-bg{
          width: 1rem;
          height: 1rem;
          position: relative;
          background: url(/static/images/Ellipse.png) center center no-repeat;
          background-size: contain;
          display: flex;
          align-items: center;
          justify-content: center;
          .shield-check{
            width: 0.6rem;
            height: 0.6rem;
          }
        }
        &.active{
        }
      }
    }
  }
  .record{
    position: relative;
    width: 93%;
    margin: 0.6rem auto;
    padding: 1rem 0.8rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(8, 224, 127, 0.3);
    border-radius: 12px;
    .record-badge{
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      padding: 0.2rem 0.5rem;
      background: #F74660;
      border-radius: 12px;
      font-size: 0.65rem;
      color: #FFFFFF;
      z-index: 1;
    }
    .row{
      width: 100%;
      margin-bottom: 0.5rem;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .r01{
      font-size: 0.85rem;
      color: #FFFFFF;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    .r02{
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 0.6rem;
    }
    .r03{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6rem;
      .price-section{
        display: flex;
        align-items: baseline;
        .price{
          font-size: 1.2rem;
          font-weight: 700;
          color: #FFFFFF;
        }
        .price-unit{
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin-left: 0.2rem;
        }
      }
      .btn-wrapper{
        display: flex;
        align-items: center;
      }
    }
    .r04{
      display: flex;
      justify-content: space-between;
      padding-top: 0.6rem;
      border-top: 1px dashed rgba(8, 224, 127, 0.3);
      font-size: 0.7rem;
      color: #929292;
      .c01, .c02{
        flex: 1;
      }
      .c02{
        text-align: right;
      }
    }
  }
  .btn {
      border-radius: 8px;
      width: 3rem;
      height: 1.5rem;
      line-height: 1.5rem;
      text-align: center;
      font-size: 0.75rem;
      font-weight: 600;
      &.buy{
        background: linear-gradient(90deg, #08E07F, #1AFFAA);
        color: #000000;
      }
      &.sell{
        background-color: #F74660;
        color: #fff;
      }
    }
   
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 6vh);
    padding: 6vh 0 0 0;
    color:#fff;
  }
  uni-scroll-view {
        height: calc(100vh - 6vh - 3rem);
  }

  
}
</style>