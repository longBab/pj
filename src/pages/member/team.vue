<template>
<view class="team body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    <view class="chat">
      <image src="/static/images/image261.png" mode="widthFix" class="chat-image" />
    </view>
    <view class="statistics">
      <view class="item item-top" :class="{active:showType==1}" @click="chose($event,'showType',1)">
        <!-- <view class="item-icon">
          <image src="/static/images/Ellipse1630.png" mode="aspectFill" class="icon-bg" />
          <image src="/static/images/fi-ss-chart-tree.png" mode="widthFix" class="icon-inner" />
        </view> -->
        <view class="item-content">
        <view class="r01">{{$t('团队数据')}}</view>
          <view class="r02">+{{formatMoney(user.statisticInvestsTeams,2)}}U</view>
        </view>
      </view> 
      
      <view class="item item-top" :class="{active:showType==12}" @click="chose($event,'showType',12)">
        <!-- <view class="item-icon">
          <image src="/static/images/Ellipse1630.png" mode="aspectFill" class="icon-bg" />
          <image src="/static/images/fi-ss-credit-card.png" mode="widthFix" class="icon-inner" />
        </view> -->
        <view class="item-content">
        <view class="r01">{{$t('团队量化')}}</view>
          <view class="r02">+{{formatMoney(statistics.s12,2)}}U</view>
        </view>
      </view> 

    </view>
    <view class="bottom-container">
      <view class="item item-bottom" :class="{active:showType==9}" @click="chose($event,'showType',9)">
        <view class="r01">{{$t('深度数据')}}</view>
        <view class="r02">+{{formatMoney(statistics.s9,2)}}U</view>
      </view> 

      <view class="item item-bottom" :class="{active:showType==3}" @click="chose($event,'showType',3)">
        <view class="r01">{{$t('量化数值')}}</view>
        <view class="r02">+{{formatMoney(statistics.s3,2)}}U</view>
      </view> 
      
      <view class="item item-bottom" :class="{active:showType==10}" @click="chose($event,'showType',10)">
        <view class="r01">{{$t('代数数据')}}</view>
        <view class="r02">+{{formatMoney(statistics.s10,2)}}U</view>
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
      statistics:{s3:0,s7:0,s9:0,s10:700,s11:0,s12:0},
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
  .chat,.statistics,.split-row,.bottom-container{width:93%;margin:0 auto;}
  .split-row .cc{font-size:0.68rem;}
  .chat{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    .chat-image{
      width: 100%;
      max-width: 100%;
      padding:0 1rem;
    }
  }
  .statistics{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.8rem;
    .item{
      position:relative;
      display:flex;
      border-radius: 10px;
      .r01{
        font-size: 0.85rem;
        color: #FFFFFF;
        margin-bottom: 0.3rem;
      }
      .r02{
        font-size: 1rem;
        font-weight: 700;
        color: #0EFFB0;
      }
      &.item-top{
        flex-direction: row;
        align-items: center;
        width: 48%;
        height: 4rem;
        padding: 1rem;
        background: url(/static/images/Rectangle74.png) center center no-repeat;
        background-size: 100% 100%;
        .item-icon{
          position: relative;
          width: 2.5rem;
          height: 2.5rem;
          margin-right: 0.8rem;
          .icon-bg{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .icon-inner{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            width: 1.2rem;
            height: 1.2rem;
          }
        }
        .item-content{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
      }
      &.item-bottom{
        flex: 1;
        height: 3.5rem;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        text-align: right;
        padding: 0.5rem 1rem;
      }
    }
  }
  .bottom-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 0.8rem;
    padding: 1rem;
    border-radius: 10px;
    background: url(/static/images/Rectangle69.png) center center no-repeat;
    background-size: 100% 100%;
    .item{
      flex: 1;
      height: 3.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      text-align: right;
      padding: 0.5rem 1rem;
      .r01{
        font-size: 0.75rem;
        color: #FFFFFF;
        margin-bottom: 0.3rem;
      }
      .r02{
        font-size: 0.9rem;
        font-weight: 700;
        color: #0EFFB0;
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