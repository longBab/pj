<template>
  <view class="home body" :class="$store.state.setting.theme">
    <navBar :logo="logo">
      <template #quicker="{ }">
        <navLanguage :source="this" />
      </template>
    </navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">

        <view class="notices panel" @click="gotoPage('/pages/notices')">
          <view class="container">
            <view class="lefter bdr05 bggr01 ">
              <u-icon name="bell"></u-icon>
              <text>{{ $t('公告') }}</text>
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
        <view class="banners panel">
          <u-swiper style="background-color:inherit" :list="_banners"></u-swiper>
          <view class="bdlg"></view>
        </view>
        <view class="panel introduced">
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
       
        <view class="board">
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
            <text>{{ $t('合作夥伴') }}</text>
          </view>
          <view class="cr"></view>
        </view>

        
        <view class="partner">
          <view class="cell" v-for="(item, i) in partners" :key="i">
                <image class="img" :src="formatUrl(item.icon,'local')" mode="scaleToFill"/>
                <view class="name">{{ item.name }}</view>
          </view>
        </view>
        
      </scroll-view>
    </view>
    <mrFooter page="home" />
    <u-popup class="popuper" v-model="popuper.isShow" mode="center" >
      <u-icon name="close"></u-icon>
      dd
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
      introduced:{},
      navigations:[],
      partners: [],
      popuper:{isShow:true}
    }
  },
  onLoad(sender) {
    var that = this;
    that.sender = sender;
    that.load(sender);
  },
  onReady() {
    var that = this;
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};
      that.transfer.request({
        url: "GET app/home",
      })
      .then((resp) => {
        let data = resp.data;
        data = data.data || data;
        data={
          notices:[{title:"公告1"},{title:"公告2"},{title:"公告3"}],
          banners:"static/images/home/s1.png",
          introduced:{title:"全球推广",description:"GEF(Game Ecosystem Fund)是 OGA 生态的资金调度核心,承载着回购、能量补给、彩蛋激励与价格稳定的四重职能."},
          navigations:[
            {url:"content/fee",title:"平台手续费",icon:"static/images/home/h2.png"},
            {url:"informations",title:"国际资讯",icon:"static/images/home/h3.png"},
            {url:"content/ecology",title:"团队生态布局",icon:"static/images/home/h4.png"},
            {url:"content/qualified",title:"国际资质",icon:"static/images/home/h5.png"}
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
  .split-row,.notices,.banners,.introduced,.board{
    width:93%;
    margin:0.5rem auto;
  }
  .notices {
    $_height:2rem;
    height: $_height;
    .container{position: relative;}
    .lefter{ 
      width:3rem;
      margin:1px 0 0 1px;
      height:calc($_height - 0.2rem - 4px); 
      padding:0.2rem 0 0.2rem 0.3rem;
      line-height:1.2rem;
      z-index:1;
    }
    .righter{
      position: absolute;
      top:-4px;left:4rem;
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
 
    border-image-source: linear-gradient(109deg, #00FFFF -29.08%, #000000 46.11%, #00FFBD 117.09%);
    border-image-slice: 1;
    border-image-repeat: round;
    clip-path: inset(0 round 10px);

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

  .board {
    display: flex;
    flex-wrap: wrap;
    .icon{ 
        margin:0.5rem 0 0 0;
        height:1.5rem;
        width:1.5rem;
    }
    ::v-deep .u-iconfont{
        height:1.5rem;
        width:1.5rem;
        background: none center center no-repeat;
        background-size: 1.5rem 1.5rem;
        &.uicon-fee{
          background-image:url(/static/images/home/h2.png);
        }
        &.uicon-news{
          background-image:url(/static/images/home/h3.png);
        }
        &.uicon-team{
          background-image:url(/static/images/home/h4.png);
        }
        &.uicon-qualified{
          background-image:url(/static/images/home/h5.png);
        }
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