<template>
<view class="team body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    <view class="chat"></view>
    <view class="statistics">
      <view class="item" :class="{active:showType==1}" @click="chose($event,'showType',1)">
        <view class="r01">{{$t('团队数据')}}</view>
        <view class="r02">+{{formatMoney(user.statisticInvestsTeams,2)}}$</view>
        <view class="bdlg"></view>
      </view> 
      
      <view class="item" :class="{active:showType==12}" @click="chose($event,'showType',12)">
        <view class="r01">{{$t('团队量化')}}</view>
        <view class="r02">+{{formatMoney(statistics.s12,2)}}$</view>
        <view class="bdlg"></view>
      </view> 

      <view class="item" :class="{active:showType==9}" @click="chose($event,'showType',9)">
        <view class="r01">{{$t('深度数据')}}</view>
        <view class="r02">+{{formatMoney(statistics.s9,2)}}$</view>
        <view class="bdlg"></view>
      </view> 

      <view class="item" :class="{active:showType==3}" @click="chose($event,'showType',3)">
        <view class="r01">{{$t('量化数值')}}</view>
        <view class="r02">+{{formatMoney(statistics.s3,2)}}U</view>
        <view class="bdlg"></view>
      </view> 
      
      <view class="item" :class="{active:showType==10}" @click="chose($event,'showType',10)"  v-if="false">
        <view class="r01">{{$t('代数数据')}}</view>
        <view class="r02">+{{formatMoney(0,2)}}U</view>
        <view class="bdlg"></view>
      </view> 
    </view>
    <view class="split-row" >
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t(showType==1?'用户列表':'账单列表')}}</text>
        </view>
        <view class="cr"></view>
    </view>
    <scroll-view scroll-y="true" scroll-x="false">
 
      <view class="record panel " :class="{team:showType==1}" v-for="(item,i) in rows" :key="i">
        <view class="c01" >
          <text class="name" v-if="showType==1">{{utility.formatDisplay(item.userName,1,1,3)||"未实名"}}({{utility.formatDisplay(item.phone,3,3,11)||utility.formatDisplay(item.email,3,3,10)}})</text>
          <text class="name" v-if="showType!=1">{{item.title}}</text>
          <text class="time">{{$t(showType==1?'推广时间':'创建时间')}}:{{formatDate(item.createdTime,'yyyy/MM/dd HH:mm:ss')}}</text>
        </view>
        <view class="c02">
          <text class="value" v-if="showType==1">{{formatMoney(item.statisticInvests,2)}}$</text>
          <text class="value" v-if="showType!=1">{{formatMoney(item.amount,2)}}$</text>
        </view>
        <view class="pre" v-if="showType==1&&i==-1&&spreadId!=0" @click="chose($event,'spreadId',preSpreadId)"><u-icon  name="arrow-left" style="color:inherit;" size="35" /></view>
        <view class="next" v-if="showType==1&&item.statisticFans" @click="chose($event,'spreadId',item.id)"><u-icon  name="arrow-right" style="color:inherit;" size="35" /></view>
        
        <view class="bdlg"></view>
      </view>
      
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
      title:"数据中心",
      showType:1,
      spreadId:0,
      preSpreadId:0,
      user:{statisticInvestsTeams:0,statisticIncomes:0,statisticIncomesTeams:0},
      statistics:{s3:0,s7:0,s9:0,s10:0,s11:0,s12:0},
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
      var that = this, sender = that.sender || sender || {},filter=sender;
      filter.showType=that.showType;
      filter.spreadId=that.spreadId;
      that.transfer.request({
        url: "GET app/member/team",
        data:filter
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        if(data.statistics&&data.statistics.length>=1)data.statistics=data.statistics[0];
        

        that.extend(data);
      });
    },
    chose(event,type,index){
      var that=this;
      if(type=="showType"){that.set(0,"spreadId");that.set(0,"preSpreadId");}
      console.log(["..",that.get("preSpreadId")]);
      that.set(that.get("spreadId"),"preSpreadId");
      that.set(index,type);
      that.load();
    }
      
  },
};
</script>
      
<style lang="scss" scoped>
.team {
  .chat,.statistics,.split-row{width:93%;margin:0 auto;}
  .split-row .cc{font-size:0.68rem;}
  .chat{
    height:7rem;
    background:url(../../static/images/DCenter-chat.png) center center no-repeat;
    background-size:10rem auto;
  }
  .statistics{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item{
      position:relative;
      display:flex;
      flex-direction: column;
      justify-content: space-evenly;
      width:48%;height:3.5rem;
      margin:0.5rem auto 0 auto;
      text-align: center;
      border-image-source:linear-gradient(180deg, rgba(59, 211, 211, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
      border-image-slice: 1;
      border-image-repeat: round;
      clip-path: inset(0 round 10px);
      background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
      .r02{color:#0EFFB0;}
      .bdlg{
        position: absolute;
        top: 1px;
        bottom: -1px;
        right: 1px;
        left: 1px;
        z-index:1;
        border: 1px solid rgba(59, 211, 211, 0.2);
        border-radius: 10px;
      }
      &.active{
          background: linear-gradient(270deg, #0EFFB1 0%, #31B9D4 100%);
          border-radius:10px; 
         .r02 {color:#000;} 
          
      }
    }
  }
  .split-row{margin:1rem auto 0.5rem auto;}

  .record{
    margin:0.3rem auto;
    display:flex;
    height:3rem;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    padding:0.5rem;
    position: relative;
    .c01{
      width:13rem;
      display:flex;
      flex-direction: column;
      justify-content: space-evenly;
      .name{
        font-weight:400;
      }
      .time{/*font-size:0.3rem;*/}
    }
    .c02{
      width:calc(100% - 13rem);
      text-align:right;
      .value{
        line-height:2rem;
        /*font-size:0.4rem;*/
        background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    &.team{
       padding:0 1.5rem 0 1rem;
       .c02 .value{line-height:500%;}
    }
    .pre,.next{
      position: absolute;
      top: 0;
      bottom: 0;
       line-height: 500%;
  
      z-index: 2;
      ::v-deep .u-iconfont{ 
        background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
      }
    }
    .pre{
      left:0;
    }
    .next{
      padding: 0 0.4rem 0 0;
      right: 0;
      width: 20%;
      text-align: right;
     
    }
  }

  .wrapper{
    justify-content: flex-start;
    padding: 2.5rem 0 1rem 0;
    color:#fff;
  }
  uni-scroll-view {
        height: calc(100% - 10rem);
  }
 

  
}
</style>