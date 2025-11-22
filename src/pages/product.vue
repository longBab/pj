<template>
<view class="product body" :class="$store.state.setting.theme">
  <navBar :title="title" :back="back">
    <!--
  <template #quicker="{}">
    <navLanguage :source="this" />
  </template>
  -->
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('量化中心') }}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="statistics">
        <view class="r01">量化总金额</view>
        <view class="r02 panel"> 
          27153.00
          <view class="bdlg"></view>
        </view>
      </view>
      <view class="progress panel">
        <view class="line">
              <view class="active"></view>
        </view>
        <view class="value">6500/100000 USDT</view>
      </view>

      <view class="board">
        <view class="item panel">
          <text class="title">{{ $t('个人量化产出比') }}</text>
          <text class="value">1.39</text>
          <view class="bdlg"></view>
        </view>

        <view class="item panel">
          <text class="title">{{ $t('个人量化产出比') }}</text>
          <text class="value">1.39</text>
          <view class="bdlg"></view>
        </view>

      </view>
    
        
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('参与量化') }}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="detail panel">
        <view class="row">
          <text class="cl">余额</text>
          <text class="cr clr1">9,048 USDT</text>
        </view>
        <view class="row">
          <text class="cl">量化周期</text>
          <text class="cr">天，周，月，季，年</text>
        </view>
          <view class="row">
          <text class="cl">周期产出比例</text>
          <text class="cr">0%</text>
        </view>
        <view class="row">
          <text class="cl">周期总产出</text>
          <text class="cr">0USDT</text>
        </view>
        <view class="ctl">
              <button class="sbtn">{{ $t('开启量化') }}</button>
        </view>
        <view class="bdlg"></view>
      </view>

      
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('您的量化') }}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="safebox">
        <button class="btn" @click="changePopuper({})">{{ $t('量化保护仓') }}</button>
      </view>
      <view class="detail panel">
        <view class="row" v-for="(item, i) in statistics.groups[1]" :key="i">
          <text class="cl">{{ $t(item.title) }}</text>
          <text class="cr">{{ statistics.data[item.field] }}</text>
        </view>
        <view class="ctl">
              <view class="btn panel" @click="gotoPage('product/detail')">
                {{ $t('查看全部') }}
                <view class="bdlg"></view>
              </view>
        </view>
      </view>

      <view class="nodata">
        沒有更多数据了
      </view>
    </scroll-view>
  </view>
  <u-popup class="popuper" v-model="popuper.isShow" mode="center" >
    <u-icon class="close" name="close" @click="changePopuper(null,'close')"></u-icon>
    <view class="safeBox">
      <view class="r1">量化保护仓</view> 
      <view class="r2 panel">
        <text class="cl">保护仓金额</text>
        <text class="cr">$1399</text>
        <view class="bdlg"></view>
      </view>
      <view class="r3"><u-icon name="bell"></u-icon>保护本金</view>
      <view class="r4">
        <input v-model="popuper.safeBox.isCheck" class="check" type="checkbox" placeholder="" />
        查看合约并勾选确认
      </view>
      <view class="ctl">
        <button class="sbtn">{{ $t('确认开启') }}</button>
      </view>
    </view>
  </u-popup>
  
</view>
</template>
  
<script>
import navBar from "@/components/navBar.vue";

export default {
  components: {
    navBar
  },
  setup() { },
  data() {
    return {
      back: "/pages/products",
      title: "产品详情",
      popuper:{isShow:false,safeBox:{isCheck:false},dialog:{icon:"",title:"",content:""}},
      list: [],
      statistics: {
        groups: [
          [
            { field: "v01", title: "量化周期" },
            { field: "v02", title: "周期产出比例" },
            { field: "v03", title: "周期总产出" }
          ],
          [
            { field: "v01", title: "保障银行" },
            { field: "v02", title: "狀態" },
            { field: "v03", title: "操作類型" },
            { field: "v04", title: "个人量化产出" },
            { field: "v05", title: "購買時間" }
          ]
        ],
        data: {
          v01: '天，周，月，季，年',
          v02: '0 %',
          v03: '0 USDT',
        },
        data: {
          v01: '量化保护',
          v02: '能量释放中',
          v03: '$1221,399',
          v04: '$1,399',
          v05: '2025-10-21 00:00:00'
        }
      }
    };
  },
  onLoad(sender) {
    var that = this;
    if (sender && sender.code) that.inviteCode = sender.code;
    this.loadlist();

  },
  onReady() {
    //this.getServerData();
  },
  methods: {
    changePopuper(sender,type){
      var that=this,item=sender||{};
      console.log(["....",item]);
      if(type=='close'){that.extend(that.popuper,{isShow:false});return false;}
      that.extend(that.popuper,{isShow:true,dialog:{icon:item.icon,title:item.name}});
    },
    loadlist() {
      this.list.push({ 't': '量化周期', 'n': '天，周，月，季，年' });
      this.list.push({ 't': '周期产出比例', 'n': '0 %' });
      this.list.push({ 't': '周期总产出', 'n': '0 USDT' });
    }
  },
};
</script>
  
  <style lang="scss" scoped>
  .product {
    .popuper{

      ::v-deep .u-mode-center-box{
        width:85% !important;
        border-radius:10px;
        border:0px solid #000;
        background:url(/static/images/popuper-bg1.png) center center no-repeat !important;
        background-size:100% auto;
      }
      .close{
        color:#fff;
      }
      .safeBox{
        width:100%;
        margin:0 auto;
        padding:2rem;
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: center;
        flex-wrap: wrap;
        color:#fff;
        .check{
          display: inline-block;
          vertical-align: middle;
          border:1 solid #929292;
        }
        .r1{
          color:#0EFFB0;
          text-align: center;
          font-size:1rem;
          line-height:3rem;

        }
        .r2{
          height:2rem;
          padding:1rem;
          display:flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: space-around;
          
        }
        .r3{
          line-height:2rem;
          
        }
        .r4{
          text-align: center;
          line-height:3rem;
        }
        .ctl{padding:0rem;}
      }
    }
    .sbtn {
      width: 7.5rem;
      height: 1.55rem;
      line-height: 1.55rem;
      font-size: 0.75rem;
      background-color: #0EFFB0;
      border-radius: 0.65rem;
    }
    .split-row {
      .cc {
        font-size: 0.8rem;
      }
    }
    .split-row,.statistics,.progress,.board,.detail,.safebox{
      width:93%;
      margin:0.5rem auto;
    }
    .statistics{
        height:5rem;
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: flex-start;
        text-align: center;
        font-size:0.6rem;
        background:url(/static/images/products/p1.png) right center no-repeat;
        background-size:auto 70%;
        .r01,.r02{width:50%;}
        .r02{height:2rem;line-height:2rem;}
    }
    .progress{
      $_height:1.5rem;
      height:$_height;
      position:relative;
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: center;
      box-shadow: 2px 1px 24.1px 3px #8C8784 inset,4px 4px 5.2px 29px #0EFFB01A inset;
      background: #000000;
      border-radius: 0.7rem;
      .line{
        $_heightL:0.25rem;
        width:95%;
        margin: 0  auto;
        border-radius: 0.65rem;
        height: $_heightL;
        background-color: #726B6B;
        .active{
          width: 35%;
          border-radius: 0.65rem;
          height: $_heightL;
          background-color: #0EFFB0;
        }
      }
      .value{
        width:100%;
        position:absolute;
        top:0;right:0.5rem;
        line-height:$_height;
        width:auto;
        z-index:1;
      }
    }
    .board{
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      .item{
        width:45%;
        height:3rem;
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: space-around;
        text-align: center;
      }

    }
    .detail{
      display:flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
      padding:0.7rem;
      .row{
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-around;
        height:1.5rem;
        .cl{
          width:6rem;
          text-align:left;
        }
        .cr{
          width:calc(100% - 6rem);
          text-align:right;
          &.clr1{
            color:#9C9C9C;
          }
        }
      }
      .ctl{
        height:1.5rem;
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: center;
        .btn{width:30%;text-align: center;line-height:1.4rem;}
      }
    }
    .safebox{
      height:6rem;
      display:flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-end;
      background:url(/static/images/products/p2.png) left center no-repeat;
      background-size:auto 100%;
      
      .btn{
        width:7rem;
        height:2rem;
        border:1px solid #0EFFB0;
        border-radius:5px;
        color:#fff;
        font-size:0.7rem;
        background: radial-gradient(100% 100% at 0% 0%, rgba(250, 250, 250, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
      }
    }
    .wrapper {
      justify-content: flex-start;
      height: calc(100% - 0vh);
      padding: 6vh 1rem 8vh 1rem;
      color: #fff;
    }
  
    uni-scroll-view {
      height: calc(100vh - 12vh);
    }
  }

  </style>