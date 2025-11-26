<template>
<view class="member body" :class="$store.state.setting.theme">
  <navBar :logo="logo">
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      <view class="ucenter">
        <view class="avatar">
          <view class="img"></view>
        </view>
        <view class="level" >
          <text class="col">{{$t('我的等级')}}</text>
          <text class="col c01" @click="gotoPage('member/vip')">{{$t('VIP0')}}</text>
        </view>
        <view class="id">
          <view class="panel">
            <view class="container"> 
              <text>ID:{{user.invitationCode}}</text>
              <text class="copy">
                <u-icon name="copy" style="color:inherit" size="28" />
              </text>
            </view>
            <view class="bdlg"></view>
        </view>
        </view>
      </view>

      <view class="promotion panel">
        <view class="container">
          <view class="col icon"></view>
          <view class="col des">
            <text class="title">{{$t('全球推广')}}</text>
            加入全球推广，共创未来！
            <text class="join bdr05 bggr01" @click="gotoPage('/pages/member/invite')">{{$t('一键开启')}}</text>
          </view>
          <view class="row">
            <text class="link">邀请链接:https://oga...3618</text>
            <text class="copy bdr05 bggr01">{{$t('复制')}}</text>
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="guider">
        <view class="item panel" v-for="(item,i) in guiders" :key="i" @click="gotoPage('/pages/member/'+item.name)"><view class="icon-top" :class="item.icon"></view>{{$t(item.title)}}<view class="bdlg"></view></view>
        
      </view>
      
      <view class="statistics panel" v-if="false">
        <view class="container">
          <view class="row" v-for="(item,i) in statistics.groups[0]" :key="i"><view class="c0">{{$t(item.title)}}</view><view class="c1">{{formatMoney(statistics.data[item.field],2)}}</view></view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>我的 WIN 社區</text>
          <text>
            <u-icon name="info-circle-fill"  size="20"></u-icon>
            {{$t('大小区贡献算规则')}}
          </text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="statistics panel s01" >
        <view class="container">
          <view class="row" v-for="(item,i) in statistics.groups[1]" :key="i"><view class="c0">{{$t(item.title)}}</view><view class="c1">{{formatMoney(format(item.field,'statistic'),2)}}</view></view>
        </view>
        <view class="bdlg"></view>
      </view>

      <view class="ctl">
        <button class="btn" @click="gotoPage('/pages/login')">{{$t('退出')}}</button>
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
  setup() {},
  props: ["page"],
  data() {
    return {
      logo: "/static/images/logo-02.png",
      user:{
        invitationCode:""
      },
      guiders: [
        {name:"wallet",icon:"wallet",title:"我的钱包"},
        {name:"security",icon:"security",title:"安全认证"},
        {name:"support",icon:"support",title:"在线支持"},
        {name:"exchange",icon:"exchange",title:"一键兑换"},
        {name:"products",icon:"quantization",title:"量化视图"},
        {name:"team",icon:"team",title:"数据中心"}
      ],
      statistics:{
        groups:[
          [
            {field:"v01",title:"直推人数"},
            {field:"v02",title:"社区总人数"},
            {field:"v03",title:"社区有效人数"},
            {field:"v04",title:"社区总量化投入"},
            {field:"v05",title:"社区总量化运行"}
          ],
          [ 
            {field:"statisticRecommends",title:"直推数量"},
            {field:"statisticFansTeams",title:"公会总人数"},
            {field:"statisticInvestsTeams",title:"公会总业绩(USDT)"},
            {field:"statisticIncomesTeams",title:"社区总量化投入"},
            {field:"statisticUnkown",title:"公会总能量(EG)"}
          ]
        ],
        data:{
          /*v01:999999999999.00,
          v02:999999999999.00,
          v03:999999999999.00,
          v04:999999999999.00,
          v05:999999999999.00,
          v06:999999999999.00,
          v07:999999999999.00,
          v08:999999999999.00,
          v09:999999999999.00,
          v10:999999999999.00*/
        }
      }
    };
  },
  onLoad(sender) {
    var that = this;
    that.sender = sender;
    that.load(sender);
  },
  onReady() {
     
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};
      that.transfer.request({
        url: "GET app/member",
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        that.extend(data);
      });
    },
    format(value,type){
      var that=this;
      return that.get(value)||that.get("user."+value)||0;
    }
  },
};
</script>

<style lang="scss" scoped>
.member {
  .ucenter,.promotion,.guider,.statistics,.split-row,.ctl{ width:93%;margin:0 auto;}
  .ucenter{
    display:flex;
    flex-direction: column;
    
    .avatar{
      width:100%;
      .img{
        width:6rem;height:6rem;margin:0 auto; 
        background:url(/static/images/member/m1.png) center bottom no-repeat;
        background-size:100% auto;
      }
    }
    .level,.id{
      width:100%;
      margin-top:0.5rem;
    }
    .level{
      display:flex;
      flex-direction: row;
      justify-content: space-around;
      .col{
        width:50%;text-align:right;
        &.c01{  
          text-indent:1rem;text-align:left;
          font-weight:800;
          font-size:1rem;
          background: linear-gradient(90deg, #00FFFF 0%, #00FFBD 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .id{
      text-align:center;
      .panel{
        width:60%;margin:0 auto;
        height:1.6rem;
        line-height:1.3rem; 
        padding:0 0.3rem 0 0.3rem;
        .copy{color:#00FFFF;margin:0 0 0 0.3rem; }
        
      }
    }
  }
 
  .promotion{
    height:10rem;
    margin:0.5rem auto;
    .container{
      flex-wrap: wrap;
      padding:1rem 0.5rem 1rem 0.5rem;
    }
   
    .col{
      height:4.8rem;
      &.icon{
        width:40%;
        background:url(/static/images/member/m3.png) center center no-repeat;
        background-size:5.6rem 5.6rem;
      }
      &.des{
        position: relative;
        .title{width:100%;display:block;font-weight:600;}
        width:60%;
        text-align: left;
        .join{position: absolute;bottom:0px;left:0;padding:0 0.5rem 0 0.5rem;}
      }
    }
    .row{
      display:flex;
      width:100%;
      height:2rem; line-height:2rem;
      margin:1.2rem auto;
      text-align:center;
      border-radius:10px;
      background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
      .copy{width:3rem;height:1.4rem;line-height:1.4rem; margin-top:0.2rem;}
      .link{width:calc(100% - 4rem);}
    }
  }
  .guider{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .item{
      margin:1.6rem 0 0 0;
      width:30%;
      height:4rem;
      line-height:5rem;
      text-align: center;
      font-size:0.7rem;
      background: linear-gradient(90deg, #00FFFF 0%, #00FFBD 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .panel .icon-top{
      &.wallet{ background-image:url(/static/images/member/m4.png);}
      &.security{ background-image:url(/static/images/member/m5.png);}
      &.support{ background-image:url(/static/images/member/m6.png);}
      &.exchange{ background-image:url(/static/images/member/m7.png);}
      &.quantization{ background-image:url(/static/images/member/m8.png);}
      &.team{ background-image:url(/static/images/member/m9.png);}
      
    }
  }
  .split-row{margin:1rem auto;}
  .statistics{
    height:10rem; 
    margin:1rem auto;
    
    .container{
      padding:0.5rem;
    }
    .row{
      width:100%;
      display:flex;
      flex-direction: row;
      justify-content: space-between;

    }
    .bdlg{
      background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
    }
    &.s01{height:8rem; }
  }
  .ctl{
    .btn{
      width: 80%;
      color:#fff;
      line-height: 2rem;
      font-size: 1rem;
      font-weight: bold;
      background-color: #0EFFB0;
      border-radius: 0.65rem;
    }
    padding-bottom:1rem;
  }
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 3rem);
    padding: 2.5rem 0 0.1 0;
    color:#fff;
  }
  
 
}
</style>