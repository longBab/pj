<template>
<view class="team body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    <view class="chat">
      <image src="/static/images/image2623.png"  class="chat-image" />
    </view>
    <view class="statistics">
      <view class="item item-top" :class="{active:showType==1}" @click="chose($event,'showType',1)">
        <view class="item-content">
        <view class="r01">{{$t('团队数据')}}</view>
          <view class="r02">+{{formatMoney(user.statisticInvestsTeams,2)}}$</view>
        </view>
      </view> 
      <view class="item item-top" :class="{active:showType==12}" @click="chose($event,'showType',12)">
        <view class="item-content">
        <view class="r01">{{$t('团队量化')}}</view>
          <view class="r02">+{{formatMoney(statistics.s12,2)}}$</view>
        </view>
      </view> 
      <view class="item item-top" :class="{active:showType==9}" @click="chose($event,'showType',9)">
        <view class="item-content">
          <view class="r01">{{$t('深度数据')}}</view>
          <view class="r02">+{{formatMoney(statistics.s9,2)}}$</view>
        </view>
      </view> 
      <view class="item item-top" :class="{active:showType==3}" @click="chose($event,'showType',3)">
        <view class="item-content">
          <view class="r01">{{$t('量化数值')}}</view>
          <view class="r02">+{{formatMoney(statistics.s3,2)}}$</view>
        </view>
      </view> 
    </view>
    
    <view class="split-row" >
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t(showType==1?'用户列表':'账单列表')}}</text>
        </view>
        <view class="cr"></view>
    </view>
    <scroll-view scroll-y="true" scroll-x="false" class="team-list">
      <view
        class="team-card"
        v-for="(item,i) in rows"
        :key="i"
      >
        <view class="card-main">
          <view class="card-info">
            <text class="card-name" v-if="showType==1">
              {{utility.formatDisplay(item.userName,1,1,3)||"未实名"}}({{utility.formatDisplay(item.phone,3,3,11)||utility.formatDisplay(item.email,3,3,10)}})
            </text>
            <text class="card-name" v-else>{{item.title}}</text>
            <text class="card-time">
              {{$t(showType==1?'推广时间':'创建时间')}} {{formatDate(item.createdTime,'yyyy-MM-dd HH:mm:ss')}}
            </text>
          </view>
          <text class="card-amount">
            <template v-if="showType==1">{{formatMoney(item.statisticInvests,2)}} $</template>
            <template v-else>{{formatMoney(item.amount,2)}} $</template>
          </text>
        </view>
        <view
          class="card-arrow prev"
          v-if="showType==1&&i==-1&&spreadId!=0"
          @click="chose($event,'spreadId',preSpreadId)"
        >
          <u-icon name="arrow-left" color="#08E07F" size="35" />
        </view>
        <view
          class="card-arrow next"
          v-if="showType==1&&item.statisticFans"
          @click="chose($event,'spreadId',item.id)"
        >
          <u-icon name="arrow-right" color="#08E07F" size="35" />
        </view>
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
      
uni-scroll-view {
      
        ::v-deep .uni-scroll-view-content {
      
          padding:0.9rem;
      
             box-sizing: border-box;
      
        }
      
  }
      
.team {
      
  display: flex;
      
  flex-direction: column;
      
  height: 100vh;
      
  .chat,.statistics,.split-row{width:93%;margin:0 auto;}
      
  .split-row .cc{font-size:1.2rem;}
      
  .chat{
      
    width: 100%;
      
    display: flex;
      
    justify-content: center;
      
    align-items: center;
      
    margin-bottom: .3rem;
      
    min-height: 7rem;
      
    max-height: 7rem;
      
    .chat-image{
      
      width: 100%;
      
      height: 100%;
      
      padding:0 1rem;
      
      object-fit: cover;
      
      object-position: center;
      
      display: block;
      
      margin: 0 auto;
      
    }
      
  }
      
  .statistics{
      
    display:flex;
      
    flex-wrap: wrap;
      
    justify-content: space-between;
      
    gap: 0.1rem;
      
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
      
        width: 49.6%;
      
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
      
    }
      
  }
      
  .split-row{margin:.7rem auto 0.5rem auto;}
      

      
  .team-list{
      
    padding: 0 1rem 1rem 1rem;
      
    flex: 1;
      
    min-height: 0;
      
  }
      
  .team-card{
      
    position: relative;
      
    margin: 0 0 0.7rem 0;
      
    padding: 0.7rem 0.9rem;
      
    border: 1px solid #08E07F;
      
    border-radius: .6rem;
      
    background: rgba(0,0,0,0.08);
      
    box-shadow: 0 8px 25px rgba(8,224,127,0.08);
      
    display: flex;
      
    flex-direction: column;
      
  }
      
  .card-main{
      
    display: flex;
      
    justify-content: space-between;
      
    align-items: center;
      
    gap: 0.5rem;
      
  }
      
  .card-info{
      
    flex: 1;
      
    display: flex;
      
    flex-direction: column;
      
    gap: 0.25rem;
      
  }
      
  .card-name{
      
    font-size: 0.95rem;
      
    font-weight: 500;
      
    color: #FFFFFF;
      
    line-height: 1.1;
      
  }
      
  .card-amount{
      
    font-size: 1.2rem;
      
    font-weight: 600;
      
    color: #0EFFB0;
      
    white-space: nowrap;
      
  }
      
  .card-time{
      
    font-size: 0.78rem;
      
    color: #9FDEBF;
      
  }
      
  .card-arrow{
      
    position: absolute;
      
    top: 50%;
      
    transform: translateY(-50%);
      
    padding: 0.2rem;
      
  }
      
  .card-arrow.prev{
      
    left: -0.2rem;
      
  }
      
  .card-arrow.next{
      
    right: -0.2rem;
      
  }
      

      
  .wrapper{
      
    justify-content: flex-start;
      
    padding: 2.5rem 0 1rem 0;
      
    color:#fff;
      
    flex: 1;
      
    display: flex;
      
    flex-direction: column;
      
    min-height: 0;
      
  }
      
}
      
</style>
      