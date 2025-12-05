<template>
<view class="member body" :class="$store.state.setting.theme" style="padding-bottom:3rem;" >
  <navBar :logo="logo" style="z-index: 1000;">
    <template #quicker="{}">
      <navLanguage :source="this" />
       <view class="logout-btn" @click="logout">
          <image  style="position: relative;top:10rpx; width:1.3rem;height:1.3rem;margin-right:1rem;" src="/static/images/Logout.svg" mode="scaleToFill" />
        </view>
    </template>
  </navBar>
  <view class="top-decor"></view>
  <view class="top-decor-right"></view>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      <view class="ucenter">
        <view class="avatar">
          <view class="img"></view>
        </view>
        <view class="level" style="margin-bottom:0.5rem;">
          <text class="col" style="font-size:0.8rem;margin-top:0.05rem;">{{$t('我的等级')}}</text>
          <text class="col c01"  @click="gotoPage('member/vip')">{{$t(user.levelName)}}</text>
        </view>
        <view class="id">
          <view class="panel" style="width:42%; border-radius:0;height:1.8rem;">
            <view class="container" style="align-items:center;"> 
              <text>ID:{{user.invitationCode}}</text>
              <text class="copy" @click="utility.copy($event,user.invitationCode)">
                <view class="copy-icon" style="background:url(/static/images/member/fi-ss-copy-alt.png) center center no-repeat;background-size:100% 100%;"></view>
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="promotion panel" style="padding:1rem 0;">
        <view class="container"  >
          <view class="col icon"></view>
          <view class="col des">
            <text class="title">{{$t('全球推广')}}</text>
            <text class="sub">加入全球推广，共创未来！</text>
            <!-- <text
              class="join bdr05 bggr01"
              style="color:#000;font-weight:bold;text-align:center;background:linear-gradient(90deg,#08E07F 0%,#1AFFAA 100%);"
              @click="gotoPage('/pages/member/node-preview')"
            >{{$t('一键开启')}}</text> -->
            <button class="btns" @click="gotoPage('/pages/member/node-preview')">{{$t('一键开启')}}</button>
          </view>
          <!-- <view class="row">
            <text class="link">{{$t('邀请链接')}}：{{user.invitationCode || 'https://oga...3618'}}</text>
            <text
              class="copy bdr05 bggr01"
              style="color:#000;font-weight:bold; text-align:center;background:linear-gradient(90deg,#08E07F 0%,#1AFFAA 100%);"
              @click="copyInviteLink($event)"
            >{{$t('复制')}}</text>
          </view> -->
        </view>
        <view class="bdlg"></view>
      </view>
      <!-- 新uiui -->
      <view class="member-guiders">
        <view
          class="member-guiders__item"
          v-for="(item, i) in guiders"
          :key="i"
          @click="gotoPage(item.name)"
        >
          <view class="member-guiders__icon" :class="'icon-' + item.icon"></view>
          <text class="member-guiders__label">{{$t(item.title)}}</text>
        </view>
      </view>
 
      <view class="statistics panel" v-if="false">
        <view class="container">
          <view class="row" v-for="(item,i) in statistics.groups[0]" :key="i">
            <view class="c0">{{$t(item.title)}}</view>
          <view class="c1">{{formatMoney(statistics.data[item.field],2)}}</view>
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>我的 WIN 社區</text>
          <text v-if="false">
            <u-icon name="info-circle-fill"  size="20" />
          </text>
        </view>
        <view class="cr"></view>
      </view>
      <!-- <view class="member-rule">
        <view class="member-rule__icon"></view>
        <text class="member-rule__text">大小區貢獻計算規則</text>
      </view> -->
      <view class="statistics  s01 sda"   >
        <view class="container" >
          <view class="row" v-for="(item,i) in statistics.groups[1]" :key="i"><view class="c0">{{$t(item.title)}}</view><view class="c1">{{formatMoney(format(item.field,'statistic'),item.precision)}} {{item.unit}}</view></view>
        </view>
        <view class="bdlg"></view>
      </view>
<!-- 
      <view class="ctl">
        <button class="btn" @click="logout">{{$t('退出')}}</button>
      </view> -->
        
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
      levelName:"VIP 0",invitationCode:""
      },
      guiders: [
        {name:"/pages/member/wallet",icon:"wallet",title:"我的钱包"},
        {name:"/pages/member/security",icon:"security",title:"安全认证"},
        {name:"/pages/service",icon:"support",title:"在线支持"},
        {name:"/pages/member/exchange",icon:"exchange",title:"一键兑换"},
        {name:"/pages/member/products",icon:"quantization",title:"量化视图"},
        {name:"/pages/member/team",icon:"team",title:"数据中心"}
      ],
      statistics:{
        groups:[
          [
            /*
            {field:"v01",title:"直推人数"},
            {field:"v02",title:"社区总人数"},
            {field:"v03",title:"社区有效人数"},
            {field:"v04",title:"社区总量化投入"},
            {field:"v05",title:"社区总量化运行"}
            */
          ],
          [ 
            {field:"statisticRecommends",title:"有效直推数",precision:0,unit:""},
            {field:"statisticFansTeams",title:"社区总人数",precision:0,unit:""},
            {field:"statisticRecommendsTeams",title:"社区有效人数",precision:0,unit:""},
            {field:"statisticInvestsTeams",title:"社区总量化投入",precision:2,unit:"$"}
            /*,
            {field:"statisticUnkown",title:"社区总能量(EG)" ,precision:2,unit:"$"}
            */
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
    copyInviteLink(event) {
      const code = this.user && this.user.invitationCode ? this.user.invitationCode : "";
      // 复制为完整链接：{origin}/#/pages/register?ref=code
      let base = "";
      if (typeof window !== "undefined" && window.location && window.location.origin) {
        base = window.location.origin;
      }
      let url = base + "/#/pages/register";
      if (code) {
        url += "?ref=" + code;
      }
      this.utility.copy(event, url);
    },
    logout() {
      var that = this;
      var store = that.$store;
      var user = store && store.state && store.state.user ? store.state.user : {};
      
      // 清除用户数据
      if (user.account) {
        store.commit("setUser", {
          id: "",
          account: user.account,
          mail: "",
          mobile: "",
          userName: "",
          roles: "",
          token: "",
          __KEY: "account"
        });
      } else {
        // 如果没有 account，直接清空所有用户数据
        store.commit("setUser", {
          id: "",
          account: "",
          mail: "",
          mobile: "",
          userName: "",
          roles: "",
          token: ""
        });
      }
      
      // 跳转到登录页面
      that.gotoPage("/pages/login");
    },
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
  position:relative;
  .top-decor{
    position:absolute;
    top: 5rem;
    left:0;
        width: 12rem;
    height:18rem;
    background:url(/static/images/member/image244.png) left top no-repeat;
    background-size:auto 100%;
    pointer-events:none;
  }
  .top-decor-right{
    position:absolute;
    top:.5rem;
    right:0;
    width: 12rem;
    height:18rem;
    background:url(/static/images/member/image245.png) right top no-repeat;
    background-size:auto 100%;
    pointer-events:none;
  }
  .ucenter,.promotion,.member-guiders,.statistics,.split-row,.member-rule,.ctl{ width:93%;margin:0 auto;}
  .ucenter{
    display:flex;
    flex-direction: column;
    
    .avatar{
      margin:.5rem 0;
      margin-top:2rem;
      width:100%;
      .img{
        width:6rem;height:6rem;margin:0 auto; 
        background:url(/static/images/member/image243.png) center bottom no-repeat;
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
      line-height:1rem;
      .col{
        width:50%;text-align:right;
        &.c01{  
          text-indent:1rem;text-align:left;
          font-weight:800;
          font-size:1.3rem;
          background: linear-gradient(90deg, #08E07F 0%, #1AFFAA 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom:0.1rem;
        }
      }
    }
    .id{
      text-align:center;
      .panel{
        width:60%;
        margin:0 auto;
        height:1.6rem;
        line-height:1.3rem; 
        padding:0 0.3rem 0 0.3rem;
        border:none;
        background:url(/static/images/member/Rectangle1113.png) center center no-repeat;
        background-size:100% 100%;
        .copy{
          display:inline-flex;
          align-items:center;
          margin:0.1rem 0 0 0.3rem;
          vertical-align: middle;
          .copy-icon{
            width:1rem;
            height:1rem;
            background:url(/static/images/member/fi-ss-copy-alt.png) center center no-repeat;
            background-size:100% 100%;
          }
        }
      }
    }
  }
 
  .promotion{
    height:7.2rem;
    margin:0.8rem auto 1.2rem auto;
    background:url(/static/images/member/Rectangle1119.png) center center no-repeat;
    background-size:100% 100%;
    border:none;
    .bdlg{
      display:none;
    }
    .container{
      flex-wrap: wrap;
      padding:0.1rem 1.1rem 0.1rem 1.1rem;
      align-items: center;
      .btns{
        color:#000;
        background:linear-gradient(90deg, #08E07F 100%, #1AFFAA 100%);
        border-radius:999px;
        padding:0.5rem 1rem;
        font-size:0.7rem;
        font-weight:600;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-left:0;
      }
    }
   
    .col{
      height:4.9rem;
      &.icon{
        width:45%;
        background:url(/static/images/member/m3.png) center center no-repeat;
        background-size:6.1rem 6.1rem;
      }
      &.des{
        position: relative;
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        width:55%;
        text-align: left;
        padding-left:0.4rem;
        .title{
          width:100%;
          display:block;
          font-weight:600;
          margin-bottom:0.35rem;
          font-size:0.8rem;
        }
        .sub{
          display:block;
          width:100%;
          font-size:.8rem;
          color:#fff;
          margin-bottom:0.7rem;
        }
        .join{
          position: absolute;
          bottom:0.1rem;
          left:0.4rem;
          padding:0 1.6rem;
          height:1.7rem;
          line-height:1.7rem;
          border-radius:999px;
          font-size:0.7rem;
        }
      }
    }
    .row{
      display:flex;
      width:100%;
      min-height:2.5rem;
      align-items:center;
      margin:1.4rem auto 0.1rem auto;
      border-radius:4px;
      background:url(/static/images/member/Rectangle1105.png) center center no-repeat;
      background-size:100% 100%;
      padding:0 0.45rem 0 1rem;
      .copy{
        width:3.8rem;
        height:1.7rem;
        line-height:1.7rem;
        font-size:0.7rem;
      }
      .link{
        flex:1;
        text-align:left;
        font-size:0.65rem;
        margin-right:0.45rem;
      }
    }
  }
  .member-guiders{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1.4rem;
    &__item{
      width: 31%;
      margin-bottom: 1rem;
      height: 5.3rem;
      border-radius: 12px;
      background: url(/static/images/member/Rectangle.png) center center no-repeat;
      background-size: 100% 100%;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.9);
      position: relative;
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 0.7rem;
      color:#fff;
      font-size:0.7rem;
      overflow: hidden;
    }
    &__icon{
      position: absolute;
      top: 0.7rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 9px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 60%;
    }
    &__label{
      text-align: center;
      line-height: 1rem;
    }
    /* 具体图标 */
    .icon-wallet{ background-image:url(/static/images/member/qianbao.png);}
    .icon-security{ background-image:url(/static/images/member/anquanrenzheng.png);}
    .icon-support{ background-image:url(/static/images/member/chat-smile-2-fill.png);}
    .icon-exchange{ background-image:url(/static/images/member/duihuan.png);}
    .icon-quantization{ background-image:url(/static/images/member/lianghuajifen.png);}
    .icon-team{ background-image:url(/static/images/member/shujutongjixuanzhong.png);}
  }
  .split-row{
    margin:1rem auto;
    .cc{font-size:0.7rem;}
  }
  .member-rule{
    margin-top: 0.6rem;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &__icon{
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.5rem;
      border-radius: 50%;
      background: url(/static/images/member/fi-ss-info.png) center center no-repeat;
      background-size: 100% 100%;
    }
    &__text{
      font-size: 0.7rem;
      color: rgba(255,255,255,0.77);
    }
  }
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
    &.s01{
      height:8rem;
      background: url(/static/images/member/Rectangle1126.png) center center no-repeat;
      background-size: 100% 100%;
    }
  }
  .ctl{
    .btn{
      width: 80%;
      color:#fff;
      font-weight: bold;
      background-color: #0EFFB0;
      border-radius: 10px;
      font-size:0.7rem;
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
.sda{
  line-height:1.8rem;
}
</style>