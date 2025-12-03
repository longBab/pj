<template>
  <view class="home body" :class="$store.state.setting.theme"  style="padding-bottom:3rem;">
    <navBar :logo="logo">
      <template #quicker="{ }">
        <navLanguage :source="this" />
      </template>
    </navBar>
    
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">

        <view class="notices " @click="gotoPage('/pages/notices')">
          <view class="container">
            <view class="lefter">
              <view class="notice-pill">
                <view class="notice-icon-wrap">
                  <image class="notice-icon" src="/static/images/home/ic_message.png" mode="widthFix" />
                  <view class="notice-dot"></view>
                </view>
                <text class="notice-text">{{ $t('公告') }}</text>
              </view>
            </view>

            <u-notice-bar
              class="righter"
              :volume-icon="false"
              color="white"
              bg-color="#00000000"
              mode="horizontal"
              :list="_notices"
            ></u-notice-bar>
          </view>
          <view class="bdlg"></view>
        </view>
 
        <!-- 轮播图 -->
        <view class="banners">
          <view class="banner-inner">
            <u-swiper
              class="banner-swiper"
              :list="_banners"
              :autoplay="true"
              :circular="true"
              :indicator="false"
              bg-color="transparent"
              @change="onBannerChange"
            ></u-swiper>
            <view class="banner-dots" v-if="_banners && _banners.length">
              <view
                v-for="(item, index) in _banners"
                :key="index"
                class="dot"
                :class="{ active: index === bannerCurrent }"
              ></view>
            </view>
          </view>
        </view>

        <!-- 欢迎探索模块 -->
        <view class="welcome-card">
          <view class="welcome-left">
            <view class="welcome-title-main">{{ $t('欢迎探索') }}</view>
            <view class="welcome-title-sub">
              <text class="green">{{ $t('量化交易的世界') }}</text>
              <text class="green">！</text>
            </view>
            <view class="welcome-divider"></view>
            <view class="welcome-desc">
              <text style="font-size:.7rem; ">
                {{ $t('GEF（Game Ecosystem Fund）是 OGA 生态的资金调度核心，承载着回购、能量补给、彩蛋激励与价格稳定的四重职能。') }}
              </text>
            </view>
          </view>
          <view class="welcome-right"  >
            <image class="welcome-icon" style=" position: absolute;right:0;"  src="/static/images/home/image240.png" mode="widthFix" />
          </view>
        </view>

        <!-- WIN生态看板 -->
        <view class="ecosystem-section">
          <view class="eco-title-row">
            <view class="eco-line"></view>
            <text class="eco-title">{{ $t('WIN生态看板') }}</text>
            <view class="eco-line"></view>
          </view>
          <view class="eco-list">
            <view class="eco-item" @click="gotoPage('content/fee')">
              <image class="eco-bg" src="/static/images/home/Rectangle3532.png" mode="widthFix" />
              <view class="eco-inner">
                <image class="eco-icon" src="/static/images/home/image117.png" mode="widthFix" />
                <text class="eco-text">{{ $t('平台手续费') }}</text>
              </view>
            </view>
            <view class="eco-item" @click="gotoPage('informations')">
              <image class="eco-bg" src="/static/images/home/Rectangle3532.png" mode="widthFix" />
              <view class="eco-inner">
                <image class="eco-icon" src="/static/images/home/image119.png" mode="widthFix" />
                <text class="eco-text">{{ $t('国际资讯') }}</text>
              </view>
            </view>
            <view class="eco-item" @click="gotoPage('content/ecology')">
              <image class="eco-bg" src="/static/images/home/Rectangle3532.png" mode="widthFix" />
              <view class="eco-inner">
                <image class="eco-icon" src="/static/images/home/fi-ss-location-alt.png" mode="widthFix" />
                <text class="eco-text">{{ $t('团队生态布局') }}</text>
              </view>
            </view>
            <view class="eco-item" @click="gotoPage('content/qualified')">
              <image class="eco-bg" src="/static/images/home/Rectangle3532.png" mode="widthFix" />
              <view class="eco-inner">
                <image class="eco-icon" src="/static/images/home/fi-ss-comment-user.png" mode="widthFix" />
                <text class="eco-text">{{ $t('国际资质') }}</text>
              </view>
            </view>
          </view>
        </view>

        <!--
        <view class="introduced panel">
          <view class="container">
            <view class="col des">
              <text class="title">{{ $t(introduced.title||"暂无") }}</text>
              {{ $t(introduced.description||"暂无") }}
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
        -->
        <!-- <view class="split-row">
          <view class="cl"></view>
          <view class="cc">
            <text>{{$t('主流行情')}}</text>
          </view>
          <view class="cr"></view>
        </view>
        <view class="quotes panel">
          <view class="header">
            <view class="c01">名称</view>
            <view class="c02">最新值</view>
            <view class="c03">24h涨跌%</view>
          </view>
          <view class="row" v-for="(item,i) in quotes">
            <view class="c01">
              <text class="name">{{ item.name }}</text>
            </view>
            <view class="c02">
              <text class="price">{{ item.v }}</text>
              <text class="total">{{ item.v1 }}</text>
            </view>
            <view class="c03"><text class="chat" :class="item.p<0?'down':''">{{ item.p }}%</text></view>
          </view>
          <view class="bdlg"></view>
        </view> -->

        <!-- 合作夥伴 -->
        <view class="partner-section">
          <view class="eco-title-row partner-title-row">
            <view class="eco-line"></view>
            <text class="eco-title">{{ $t('合作夥伴') }}</text>
            <view class="eco-line"></view>
          </view>
          <view class="partner-card">
            <image class="partner-bg" src="/static/images/home/Rectangle1078.png" mode="widthFix" />
            <view class="partner-grid">
              <view class="partner-row">
                <view class="partner-item">
                  <image class="partner-logo partner-logo-sm" src="/static/images/home/image86.png" mode="widthFix" />
                </view>
                <view class="partner-item">
                  <image class="partner-logo partner-logo-sm" src="/static/images/home/image85.png" mode="widthFix" />
                </view>
                <view class="partner-item">
                  <image class="partner-logo partner-logo-sm" style="width:2rem;" src="/static/images/home/image87.png" mode="widthFix" />
                </view>
              </view>
              <image class="partner-divider" src="/static/images/home/Vector11.png" mode="widthFix" />
              <view class="partner-row">
                <view class="partner-item">
                  <image class="partner-logo partner-logo-lg" src="/static/images/home/image88.png" mode="widthFix" />
                </view>
                <view class="partner-item">
                  <image class="partner-logo partner-logo-lg" src="/static/images/home/image89.png" mode="widthFix" />
                </view>
                <view class="partner-item">
                  <image class="partner-logo partner-logo-lg" src="/static/images/home/image234.png" mode="widthFix" />
                </view>
              </view>
              <image class="partner-divider" src="/static/images/home/Vector11.png" mode="widthFix" />
              <view class="partner-row">
                <view class="partner-item">
                  <image class="partner-logo partner-logo-sm" style="width:3.7rem"  src="/static/images/home/image107.png" mode="widthFix" />
                </view>
                <view class="partner-item">
                  <image class="partner-logo partner-logo-lg" src="/static/images/home/image92.png" mode="widthFix" />
                </view>
                <view class="partner-item">
                  <image class="partner-logo partner-logo-sm" style="width:4rem"  src="/static/images/home/image106.png" mode="widthFix" />
                </view>
              </view>
            </view>
          </view>
        </view>
        
      </scroll-view>
    </view>
    <mrFooter page="home" />
    <u-popup class="popuper" v-model="popuper.isShow" mode="center" >
      <u-icon class="close" name="close" @click="changePopuper(null,'close')"></u-icon>
      <view class="dialog">
        <view class="icon"><image  :src="formatUrl(popuper.dialog.icon,'local')" mode="scaleToFill"/></view>
        <view class="title">{{$t(popuper.dialog.title||"暂无")}}</view>
        <view class="content">{{$t(popuper.dialog.content||"暂无")}}</view>
        <view class="ctl"><button class="btn">下载</button></view>
      </view>
    </u-popup>
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
  setup() { },
  data() {
    return {
      name: "Home",
      title:"首页",
      logo: "../static/images/logo-02.png",
      _notices:[],
      _banners:[],
      bannerCurrent: 0,
      introduced:{},
      navigations:[],
      quotes:[],
      partners: [],
      popuper:{isShow:false,dialog:{icon:"",title:"",content:""}}
    }
  },
  onLoad(sender) {
    var that = this;
    that.sender = sender;
    that.load(sender);
    //that.extend(that.popuper,{isShow:true});
  },
  onReady() {
    var that = this;
  },
  methods: {
    changePopuper(sender,type){
      var that=this,item=sender||{};
      if(type=='close'){that.extend(that.popuper,{isShow:false});return false;}
      that.extend(that.popuper,{isShow:true,dialog:{icon:item.icon,title:item.name}});
    },
    load(sender) {
      var that = this, sender = that.sender || sender || {};
      that.transfer.request({
        url: "GET app/home",
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        data={
          notices:[{title:"公告1"},{title:"公告2"},{title:"公告3"}],
          banners:"static/images/home/s1.png,static/images/home/f1.png,static/images/home/f2.png,static/images/home/f3.png",
          introduced:{title:"全球推广",description:"GEF(Game Ecosystem Fund)是 OGA 生态的资金调度核心,承载着回购、能量补给、彩蛋激励与价格稳定的四重职能."},
          navigations:[
            {url:"content/fee",title:"平台手续费",icon:"static/images/home/h2.png"},
            {url:"informations",title:"国际资讯",icon:"static/images/home/h3.png"},
            {url:"content/ecology",title:"团队生态布局",icon:"static/images/home/h4.png"},
            {url:"content/qualified",title:"国际资质",icon:"static/images/home/h5.png"}
          ],
          quotes:[
            {name:"BTC",hot:true,v:"95,084.01",v1:"$95,084.01",p:10.37,s:true},
            {name:"ETH",hot:true,v:"3,102.95",v1:"$3,102.95",p:10.37,s:true},
            {name:"MET",hot:true,v:"0.4491",v1:"$0.4491",p:10.37,s:true},
            {name:"SOL",hot:false,v:"137.34",v1:"$137.34",p:-10.37,s:false},
            {name:"DOGE",hot:false,v:"0.15958",v1:"$0.15958",p:-10.37,s:false},
            {name:"ADA",hot:false,v:"0.5059",v1:"$0.5059",p:-10.37,s:false},
            {name:"ZEC",hot:false,v:"574.76",v1:"$574.76",p:-10.37,s:false},
            {name:"XRP",hot:false,v:"2.2696",v1:"$2.26",p:-10.37,s:false},
            {name:"ASTER",hot:false,v:"1.055",v1:"$1.05",p:-10.37,s:false},
            {name:"LINK",hot:false,v:"14.00",v1:"$14",p:-10.37,s:false}
          ],
          partners: [
            { name: "Chiliz",icon:"static/images/home/partner/11.png",content:"" },
            { name: "GENTING",icon:"static/images/home/partner/12.png",content:"" },
            { name: "OG Guild",icon:"static/images/home/partner/13.png",content:"" },
            { name: "TOKEN POCET",icon:"static/images/home/partner/14.png",content:"" },
            { name: "Bitget wallet" ,icon:"static/images/home/partner/15.png",content:""},
            { name: "METAMASK",icon:"static/images/home/partner/16.png",content:""},
            { name: "SOCLOS",icon:"static/images/home/partner/17.png",content:""},
            { name: "Bitget",icon:"static/images/home/partner/18.png",content:""},
            { name: "BINANCE",icon:"static/images/home/partner/19.png",content:"" }
          ]
        }
        console.log(["data",data]);
        data._notices=that.format(data.notices,'notices');delete(data.notices);
        data._banners=that.format(data.banners,'banners');delete(data.banners);
        that.extend(data);
      });
    },
    onBannerChange(e) {
      // u-swiper 在不同版本里，change 事件可能直接返回索引(number)，也可能是对象({ current: index })
      if (typeof e === 'number') {
        this.bannerCurrent = e;
      } else {
        this.bannerCurrent = (e && (e.current || e.detail && e.detail.current)) || 0;
      }
    },
    format(value,type){
			var that=this,result,i,k,v,items=[],_items=[];
			if(type=="banners"){
        value=value||"";
        value=value.thumbs||value;
				_items=value.split(',');
				for(i in _items){
					v=_items[i];if(!v)continue;
					v=that.formatUrl(v,'local');
					items.push(v);
				}
				console.log(["format",items]);
				return items;
			}
			if(type=="notices"){
				_items=value;
				for(i in _items){
					v=_items[i]||{};v=v.title;
					items.push(v);
				}
				return items;
			}
      if(type=="content"){
        items=value.split('\n');
        return items;
      }
			return result;
		}
  }
};
</script>

<style lang="scss" scoped>


.home {
 
  .split-row {
    .cc {
      font-size: 0.8rem;
    }
  }
  .split-row,.notices,.banners,.introduced,.quotes,.board{
    width:93%;
    margin:0.5rem auto;
  }
  .notices {
    $_height:2.5rem;
    height: 2.5rem; 
    background:url(/static/images/home/Rectangle12.png) center center no-repeat;
    background-size:100% 100%;
    padding:2px;
    box-sizing: border-box;
    .container{position: relative;}
    .lefter{ 
      width:6.5rem;
      margin:1px 0 0 1px;
      height:2.1rem;
      z-index:1;
      display:flex;
      align-items:center;
    }
    .notice-pill{
      display:flex;
      align-items:center;
      justify-content:flex-start;
      width:75%;
      height:100%;
      padding:0 0.9rem 0 0.8rem;
      border-radius:10px;
      background:linear-gradient(90deg,#08E07F 0%,#1AFFAA 100%);
    }
    .notice-icon-wrap{
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
      margin-right:0.4rem;
    }
    .notice-icon{
      width:1rem;
      height:1rem;
    }
    .notice-dot{
      position:absolute;
      top:-0.12rem;
      right:-0.1rem;
      width:0.36rem;
      height:0.36rem;
      background:#FF7A21;
      border-radius:50%;
    }
    .notice-text{
      font-size:0.8rem;
      color:#000;
      font-weight:bold;
    }
    .righter{
      position: absolute;
      top:0;left:4rem;
      width:calc(100% - 4rem);
      height:$_height;
      line-height:1rem;
      z-index:0;
    }
    .container {
      flex-direction: row;
      justify-content: left;
    }
  }
  .banners{
    margin-top:0.8rem;
    display:flex;
    justify-content:center;
  }
  .banner-inner{
    width:100%;
    border-radius:16px;
    overflow:hidden;
    padding:0.6rem 0.3rem 0;
  }
  .banner-swiper{
    border-radius:10px;
    overflow:hidden;
  }
  .banner-inner ::v-deep .u-swiper__indicator{
    display:none;
  }
  .banner-dots{
    margin-top:0.55rem;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:0.4rem;
  }
  .banner-dots .dot{
    width:0.22rem;
    height:0.22rem;
    border-radius:50%;
    background:#D9D9D9;
  }
  .banner-dots .dot.active{
    background:#08E07F;
  }

  .welcome-card{
    margin:0 auto 0.3rem;
    width:93%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding:1.2rem 1.1rem 1.3rem;
    border-radius:16px;
  }
  .welcome-left{
    flex:1.4;
    color:#fff;
  }
  .welcome-title-main{
    font-size:1.1rem;
    font-weight:700;
    margin-bottom:0.25rem;
  }
  .welcome-title-sub{
    font-size:0.95rem;
    font-weight:600;
    margin-bottom:0.45rem;
    .green{
      color:#08E07F;
    }
  }
  .welcome-divider{
    width:3.2rem;
    height:2px;
    background:#08E07F;
    border-radius:999px;
    margin-bottom:0.55rem;
  }
  .welcome-desc{
    font-size:0.75rem;
    line-height:1rem;
    color:#D9E2ED;
    max-width:14rem;
  }
  .welcome-right{
    flex:1;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    margin-left:0.6rem;
  }
  .welcome-icon{
    width:12.5rem;
    
  }

  .ecosystem-section{
    margin:1.5rem auto 0.5rem;
    width:100%;
  }
  .eco-title-row{
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:1rem;
  }
  .eco-title{
    font-size:1rem;
    font-weight:700;
    color:#FFFFFF;
    margin:0 0.8rem;
  }
  .eco-line{
    width:2.3rem;
    height:3px;
    border-radius:999px;
    background:linear-gradient(90deg,rgba(0,0,0,0) 0%,#09F0A0 50%,rgba(0,0,0,0) 100%);
  }
  .eco-list{
    padding:0 1rem 0.3rem;
    display:flex;
    justify-content:space-between;
    flex-wrap:nowrap;
  }
  .eco-item{
    position:relative;
    width:22%;
  }
  .eco-bg{
    width:100%;
    height:auto;
    display:block;
  }
  .eco-inner{
    position:absolute;
    inset:0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding-bottom:0.4rem;
  }
  .eco-icon{
    width:1.9rem;
    margin-bottom:0.5rem;
  }
  .eco-text{
    font-size:0.7rem;
    color:#FFFFFF;
  }

  .partner-section{
    margin:1.6rem auto 1rem;
    width:100%;
  }
  .partner-title-row{
    margin-bottom:1.1rem;
  }
  .partner-card{
    position:relative;
    width:93%;
    margin:0 auto;
  }
  .partner-bg{
    width:100%;
    display:block;
    border-radius:18px;
  }
  .partner-grid{
    position:absolute;
    inset:0;
    padding: .8rem .8rem;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  .partner-divider{
    width:100%;
    margin:0.5rem 0;
  }
  .partner-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .partner-item{
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .partner-logo{
    width:3rem;
  }
  .partner-logo-sm{
    width:3rem;
  }
  .partner-logo-lg{
    width:5rem;
  }

  .introduced {
    height: 8rem;
    overflow: hidden;
    background: url(/static/images/home/h1.png) center right no-repeat;
    background-size:100% 100%;
    .container {
      flex-wrap: wrap;
      justify-content: flex-start;
      overflow: hidden;
      border-radius: 10px;
      padding: 0.2rem 0.2rem 0.5rem 0.2rem;
      font-size:0.7rem;

      .col {
        &.des {
          position: relative;
          width: 65%;
          text-align: left;
          .title {
            width: 100%;
            display: block;
            font-weight: 600;
            text-align: center;
            margin-bottom: 0.2rem;
          }
        }

        &.icon {
          width: 35%;
        }
      }
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
  .quotes{
    padding:0 0 10px 0;
    .header,.row{
      display:flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .header{
      $_heightH:1.6rem;
      border-radius: 10px 10px 0px 0px;
      height:$_heightH;
      line-height:$_heightH;
      background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
    }
    
    .c01,.c02,.c03{
      text-align:right;
      display:flex;
      flex-direction: column;
      justify-content: space-around
    }
    .c01{text-align:left;width:3rem;}
    .c02{width:calc(100% - 10rem);}
    .c03{width:5rem;}
    .row{
      height:2.6rem;
      border-bottom:1px solid #00FFBD;
      width:calc(100% - 0.4rem);
      margin:0 auto;
      .c03{
        .chat{
          width:90%;
          margin:0 auto;
          height:1.2rem;
          line-height:1.2rem;
          background:#F74660;
          font-size: 0.6rem;
          border-radius: 5px;
          padding:0 0.1rem 0 0.1rem;
          text-align:center;
          &.down{background:#00FF73;color:#797979;}
        }
      }
    }
 
  }
  .partner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    height: auto;

    .cell {
      margin:0.8rem 0.4rem 0 0.4rem;
      width: calc(100% - 0.8rem);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      line-height: 1rem;
      border-radius: 8px;
      border: 1px solid transparent;
      background-image: linear-gradient(to bottom, #000000 0%, #121a2488 100%), linear-gradient(180deg, #3BD3D3, transparent);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      padding:0 0 0.2rem 0;
      .img{
        width:2rem;
        height:2rem;
      }
    }
  }
 
  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 3.5rem);
    padding: 2.5rem 0 0  0;
    color: #fff;
  }

  
}
</style>