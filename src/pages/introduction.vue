<template>
<view class="introduction body" style="padding-bottom:3rem;">
  <navBar :title="title" :back="back">
    <!--
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
    -->
  </navBar>
  <view class="wrapper" >
    <scroll-view scroll-y="true" scroll-x="false">
      <view class="split-row" style="margin-bottom:3rem;">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('全球量化智能配置方案')}}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="statistics" >
        <view class="stat-label stat-center">
          <text>{{ $t('稳健收益') }}</text>
        </view>
        <view class="stat-label stat-left">
          <text>{{ $t('多维风控') }}</text>
        </view>
        <view class="stat-label stat-right">
          <text>{{ $t('自动执行') }}</text>
        </view>
      </view>
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('量化简介')}}</text>
        </view>
        <view class="cr"></view>
      </view>

      <!-- 量化简介卡片 -->
      <view class="intro-card">
        <image class="intro-bg" src="/static/images/home/Rectangle76.png" mode="widthFix" />
        <view class="intro-content">
          <view class="intro-text">
            <text>
              {{ $t('全球量化智能配置方案是一种长期配置方式，通过定期执行的量化模型，在不同市场环境下保持纪律性操作，') }}
            </text>
            <text class="highlight">
              {{ $t('降低情绪干扰与波动风险') }}
            </text>
            <text>
              {{ $t('。我们的 AI 驱动系统将自动执行策略，帮助用户实现') }}
            </text>
            <text class="highlight">
              {{ $t('长期稳健的资产增长') }}
            </text>
            <text>。</text>
          </view>
          <view class="intro-icon-wrap">
            <image class="intro-icon" src="/static/images/home/image217.png" mode="widthFix" />
          </view>
        </view>
      </view>


      <!-- 主流行情 -->
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('主流行情') }}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="quotes-card">
          <image class="quotes-bg" src="/static/images/introduction/Rectangle3538.png" mode="widthFix" />
          <view class="quotes-content">
            <view class="quotes-header">
              <view class="q-c01">{{ $t('名称') }}</view>
              <view class="q-c02">{{ $t('最新值') }}</view>
              <view class="q-c03">{{ $t('24h涨跌%') }}</view>
            </view>
            <view class="quotes-row" v-for="(item,i) in quotes" :key="i">
              <view class="q-c01">
                <text class="q-name">{{ item.name }}</text>
                <image v-if="item.hot" class="q-hot-icon" src="/static/images/home/ic_hot.png" mode="widthFix" />
              </view>
              <view class="q-c02">
                <text class="q-price">{{ item.v }}</text>
                <text class="q-total">{{ item.v1 }}</text>
              </view>
              <view class="q-c03">
                <text class="q-change" :class="item.p<0?'down':''">{{ item.p }}%</text>
              </view>
            </view>
          </view>
        </view>

      <!-- <view class="split-row">
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
      </view> -->
      

      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{$t('量化特色')}}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="features-card">
        <image class="features-bg" src="/static/images/introduction/Rectangle77.png" mode="widthFix" />
        <view class="features-content">
          <view class="feature-row" v-for="(item,i) in features" :key="i" :class="i==features.length-1?'last':''">
            <image class="feature-icon" :src="formatUrl(item.icon,'local')" mode="widthFix" />
            <view class="feature-text">
              <view class="feature-title">{{ $t(item.title||"暂无") }}</view>
              <view class="feature-desc">{{ item.description }}</view>
            </view>
          </view>
        </view>
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
      quotes:[],
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
            {icon:"static/images/introduction/image.png",title:"智能自动定投",description:"系统自动调度，无需人工干预，严格遵循模型信号，避免错过市场机会。"},
            {icon:"static/images/introduction/image99.png",title:"多因子风控覆盖",description:"结合波动率、成交量、资金流等因子，分散单一市场风险，优化平均成本。"},
            {icon:"static/images/introduction/image100.png",title:"灵活策略配置",description:"支持主流数字资产，用户可根据风险偏好自由设定周期与额度。"},
            {icon:"static/images/introduction/image101.png",title:"合规资金托管",description:"资金采用多重签名与冷热分离架构，由合作的专业机构进行安全托管。"},
          ],
          quotes:[
            {name:"BTC",hot:true,v:"95,084.01",v1:"$95,084.01",p:-7.33,s:true},
            {name:"ETH",hot:true,v:"3,102.95",v1:"$3,102.95",p:-10.56,s:true},
            {name:"MET",hot:true,v:"0.4491",v1:"$0.4491",p:-3.83,s:true},
            {name:"SOL",hot:false,v:"137.34",v1:"$137.34",p:-11.42,s:false},
            {name:"DOGE",hot:false,v:"0.15958",v1:"$0.15958",p:-8.89,s:false},
            {name:"ADA",hot:false,v:"0.5059",v1:"$0.5059",p:-10.14,s:false},
            {name:"ZEC",hot:false,v:"574.76",v1:"$574.76",p:14.45,s:false},
            {name:"XRP",hot:false,v:"2.2696",v1:"$2.26",p:-8.27,s:false},
            {name:"ASTER",hot:false,v:"1.055",v1:"$1.05",p:-4.44,s:false},
            {name:"LINK",hot:false,v:"14.00",v1:"$14",p:-10.37,s:false}
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
    margin:1.5rem auto 2.5rem;
  }
  .split-row .cc{
    font-size: 1.2rem;
  }
  .statistics{
    position:relative;
    height:12rem;
    margin:0 auto; 
    background:url(/static/images/introduction/i1.png) center bottom no-repeat;
    background-size:auto 100%;
  }
  .stat-label{
    position:absolute;
    color:#FFFFFF;
    font-size:0.9rem;
    font-weight:600;
    text-shadow:0 2px 6px rgba(0,0,0,0.6);
  }
  .stat-center{
    top:-1.7rem;
    left:0;
    right:0;
    text-align:center;
  }
  .stat-left{
    top:.2rem;
    left:22%;
    transform:translateX(-50%);
  }
  .stat-right{
    top:.2rem;
    right:22%;
    transform:translateX(50%);
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
  .intro-card{
    position:relative;
    width:93%;
    margin:1rem auto 0;
    min-height:11rem;
  }
  .intro-bg{
    width:100%;
    min-height:11rem;
    display:block;
    object-fit:cover;
  }
  .intro-content{
    position:absolute;
    inset:0;
    padding:1rem 1.5rem;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
  }
  .intro-text{
    width:62%;
    font-size:$_fontSizeD;
    line-height:$_lineHeightD;
    color:#FFFFFF;
  }
  .intro-text .highlight{
    color:#0EFFB0;
  }
  .intro-icon-wrap{
    display:flex;
    justify-content:flex-end;
    align-items:center;
  }
  .intro-icon{
    position:absolute;
    right:0rem;
    width:10rem;
  }
  .quotes-card{
    position:relative;
    width:93%;
    margin:1rem auto 0;
    min-height:35rem;
  }
  .quotes-bg{
    width:100%;
    min-height:35rem;
    display:block;
    object-fit:cover;
  }
  .quotes-content{
    position:absolute;
    inset:0;
    padding:0.8rem 0.6rem 0.6rem;
    display:flex;
    flex-direction:column;
  }
  .quotes-header{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding:0 0.4rem 0.5rem;
    font-size:0.75rem;
    color:#0EFFB0;
    font-weight:600;
  }
  .q-c01{
    width:3.2rem;
    text-align:left;
  }
  .q-c02{
    flex:1;
    text-align:right;
    padding-right:0.8rem;
  }
  .q-c03{
    width:4.5rem;
    text-align:right;
  }
  .quotes-row{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding:0.5rem 0.4rem;
    border-bottom:1px dashed rgba(14,255,176,0.3);
  }
  .quotes-row:last-child{
    border-bottom:none;
  }
  .q-name{
    font-size:0.8rem;
    color:#FFFFFF;
    font-weight:700;
    margin-right:0.3rem;
  }
  .q-hot-icon{
    width:0.5rem;
    height:0.5rem;
    vertical-align:middle;
  }
  .q-price{
    display:block;
    font-size:0.8rem;
    color:#FFFFFF;
    font-weight:700;
    margin-bottom:0.15rem;
    text-align:right;
  }
  .q-total{
    display:block;
    font-size:0.65rem;
    color:#929292;
    text-align:right;
  }
  .q-change{
    display:inline-block;
    padding:0.15rem 0.5rem;
    border-radius:4px;
    font-size:0.65rem;
    color:#FFFFFF;
    background:#F74660;
    font-weight:600;
  }
  .q-change.down{
    background:#00FF73;
    color:#797979;
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
  .features-card{
    position:relative;
    width:93%;
    margin:1rem auto 0;
  }
  .features-bg{
    width:100%;
    display:block;
  }
  .features-content{
    position:absolute;
    inset:0;
    padding:1rem 1.2rem;
    display:flex;
    flex-direction:column;
  }
  .feature-row{
    display:flex;
    flex-direction:row;
    align-items:flex-start;
    padding:0.8rem 0;
    border-bottom:1px dashed rgba(14,255,176,0.3);
  }
  .feature-row.last{
    border-bottom:none;
  }
  .feature-icon{
    width:4rem;
    height:4rem;
    margin-right:1rem;
    flex-shrink:0;
  }
  .feature-text{
    flex:1;
  }
  .feature-title{
    color:#0EFFB0;
    font-size:$_fontSizeT;
    font-weight:700;
    margin-bottom:0.4rem;
  }
  .feature-desc{
    color:#929292;
    font-size:$_fontSizeD;
    line-height:$_lineHeightD;
  }
  .wrapper{
    justify-content: flex-start;
    padding: 2.5rem 0 0  0;
    height: calc(100% - 3.6rem);
    color: #fff; 
  }
 
}
</style>