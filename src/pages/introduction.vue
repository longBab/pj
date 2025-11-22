<template>
<view class="introduction body">
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
          <text>{{$t('全球量化智能配置方案')}}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="statistics">
         
      </view>
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('量化简介')}}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="introduced panel">
        <view class="container">
          <view class="lefter">
            {{$t(introduced.description||"暂无")}}
          </view>
        </view>
        <view class="bdlg"></view>
      </view>

      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('WIN生态看板') }}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="navigations">
        <view class="cell" v-for="(item, i) in navigations" :key="i" @click="gotoPage(item.url)">
          <image class="icon" :src="formatUrl(item.icon,'local')" mode="scaleToFill"/>
          <view class="title">
            {{ $t(item.title||"暂无") }}
          </view>
        </view>
      </view>

      
      

      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('量化特色')}}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="features panel">
        <view class="row"  v-for="(item,i) in features" :key="i" :class="i==features.length-1?'laster':''">
          <image class="cl" :src="formatUrl(item.icon,'local')" mode="scaleToFill"/>
          <view class="cr">
            <view class="title">{{ $t(item.title||"暂无") }}</view>
            <view class="description"> {{item.description}} </view>
          </view>
        </view>
        <view class="bdlg"></view>
      </view>
 
    </scroll-view>
  </view>
  <mrFooter page="introduction" />
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
  data() {
    return {
      back:"home",
      title: "介绍",
      introduced:{},
      navigations:[],
      features:[],
    };
  },
  onLoad(sender) {
    var that = this;
    var that = this, sender = that.sender || sender || {};
    that.transfer.request({
        url: "GET app/introduction",
      })
      .then((resp) => {
        let data = resp.data;
        data = data.data || data;
        data={
          introduced:{description:"全球量化智能配置方案是一种长期配置方式，通过定期执行的量化模型，在不同市场环境下保持纪律性操作，降低情绪干扰与波动风险。我们的 AI 驱动系统将自动执行策略，帮助用户实现长期稳健的资产增长。"},
          navigations:[
            {url:"content/fee",title:"平台手续费",icon:"static/images/home/h2.png"},
            {url:"informations",title:"国际资讯",icon:"static/images/home/h3.png"},
            {url:"content/ecology",title:"团队生态布局",icon:"static/images/home/h4.png"},
            {url:"content/qualified",title:"国际资质",icon:"static/images/home/h5.png"}
          ],
          features:[
            {icon:"static/images/introduction/i3.png",title:"智能自动定投",description:"系统自动调度，无需人工干预，严格遵循模型信号，避免错过市场机会。"},
            {icon:"static/images/introduction/i4.png",title:"多因子风控覆盖",description:"结合波动率、成交量、资金流等因子，分散单一 市场风险，优化平均成本。"},
            {icon:"static/images/introduction/i5.png",title:"灵活策略配置",description:"支持主流数字资产，用户可根据风险偏好自由设额度。"},
            {icon:"static/images/introduction/i6.png",title:"合规资金托管",description:"结合波动率、成交量、资金流等因子，分散单一 市场风险，优化平均成本。"},
          ]
        }
        console.log(["data",data]);
        that.extend(data);
      });
 
  },
  onReady() {
    //this.getServerData();
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.introduction {
  $_fontSizeT:0.8rem;
  $_fontSizeD:0.7rem;
  $_lineHeightD:1.3rem;
  .split-row,.statistics,.navigations,.features{
    width:93%;
    margin:0.5rem auto;
  }
  .split-row .cc{
    font-size: 0.8rem;
  }
  .statistics{
    height:12rem;margin:0 auto; 
    background:url(/static/images/introduction/i1.png) center bottom no-repeat;
    background-size:auto 100%;
  }
  .introduced {
    height: 8rem;
    overflow: hidden;
    background: url(/static/images/introduction/i2.png) center right no-repeat;
    background-size:auto 100%;
    .lefter{ 
      width: 67%;
      text-indent:1.1rem;
      color:#929292;
      font-size:$_fontSizeD;
      line-height:$_lineHeightD;
      .title {
            width: 100%;
            display: block;
            font-weight: 600;
            text-align: center;
            margin-bottom: 0.2rem;
      }
    }
    .container {
      flex-wrap: wrap;
      justify-content: flex-start;
      overflow: hidden;
      border-radius: 10px;
      padding: 0.2rem 0.2rem 0.5rem 0.2rem;
      font-size:0.7rem;
    }
  }
  .navigations {
    display: flex;
    flex-wrap: wrap;
    .icon{ 
        margin:0.5rem 0 0 0;
        height:1.5rem;
        width:1.5rem;
    }
    .cell {
      display: flex;
      border: 0px solid;
      height: 3rem;
      border-radius: 1px;
      width: calc(50% - 0.8rem);
      margin:0.6rem 0.4rem 0 0.4rem;
      padding:0 0.5rem 0 0.5rem;
      
      border-radius: 8px;
      border: 1px solid transparent;
      background-image: linear-gradient(to left top, #121a24 50%, #121a2474 100%), linear-gradient(180deg, rgba(59, 211, 211, 0.5), transparent);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      .title{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
     
    }
  }
  .features{
    .row{
      display:flex;
      border-bottom: 1px dashed rgba(14, 255, 176, 0.2078431373);
      &.laster {
        border-bottom:0;
      }
      margin-top: 0.5rem;
      padding: 0rem 0.2rem 0rem 0.2rem;

      .cl{
        padding:0 0.5rem 0 0.5rem;
        width:4rem;
        height:4rem;
      }
      .cr{
        width:calc(100% - 2rem);
        .title{
          color:#0EFFB0;
          font-size:$_fontSizeT;
        }
        .description{
          color:#929292;
          font-size:$_fontSizeD;
          line-height:$_lineHeightD;
        }
      }
    }
  }
  .wrapper{
    justify-content: flex-start;
    padding: 2.5rem 0 0  0;
    height: calc(100% - 3.6rem);
    color: #fff; 
  }
 
}
</style>