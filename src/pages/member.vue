<template>
  <view class="member body">
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
          <view class="level">
            <text class="col">{{$t('我的等级')}}</text>
            <text class="col c01">{{$t('VIP0')}}</text>
          </view>
          <view class="id">
            <view class="panel">
              <view class="container"> 
                <text>ID:1948656777</text>
                <text class="copy"><u-icon  name="order" style="color:inherit" size="28"></u-icon></text>
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
              <text class="join bdr05 bggr01">{{$t('一键开启')}}</text>
            </view>
            <view class="row">
              <text class="link">邀请链接:https://oga...3618</text>
              <text class="copy bdr05 bggr01">{{$t('复制')}}</text>
            </view>
          </view>
          <view class="bdlg"></view>
        </view>
        <view class="guider">
          <view class="item panel"><view class="icon-top"></view>{{$t('我的钱包')}}<view class="bdlg"></view></view>
          <view class="item panel"><view class="icon-top"></view>{{$t('安全认证')}}<view class="bdlg"></view></view>
          <view class="item panel"><view class="icon-top"></view>{{$t('我的钱包')}}<view class="bdlg"></view></view>

          <view class="item panel"><view class="icon-top"></view>{{$t('我的钱包')}}<view class="bdlg"></view></view>
          <view class="item panel"><view class="icon-top"></view>{{$t('我的钱包')}}<view class="bdlg"></view></view>
          <view class="item panel"><view class="icon-top"></view>{{$t('我的钱包')}}<view class="bdlg"></view></view>
        </view>
        <view class="statistics panel">
          <view class="container"></view>
          <view class="bdlg"></view>
        </view>

        <view class="statistics panel">
          <view class="container"></view>
          <view class="bdlg"></view>
        </view>
        
        <view style="height: 200rpx; display:flex;justify-content:center;align-items:center;margin-top: 20rpx;">
            <u-image
              src="/static/images/member/m1.png"
              width="180rpx"
              height="180rpx"
            ></u-image>
        </view>
        <view>
          <u-row >
              <u-col span="6">
                  <view style=" text-align: right; font-weight: 300; font-size: 24rpx;height:54rpx;line-height:54rpx;">
                    {{$t('我的等级')}}
                  </view>
              </u-col>
              <u-col span="6">
                  <view style="font-weight: 600; font-size: 36rpx;height:54rpx;line-height:54rpx;">
                    VIP 0
                  </view>
              </u-col>
          </u-row>
        </view>
        <view style="margin-top: 26rpx; ">
          <view style="display:flex; margin: auto; justify-content:center;align-items:center;height:64rpx;font-weight: 300;font-size: 24rpx;line-height:64rpx;border-radius: 20rpx; border: 2rpx solid #00FFFF70; width: 300rpx;">
            <view>
              ID:1948656777
            </view>
            <view style="margin-left:20rpx">
              <u-icon name="order" color="#ffffff" size="28"></u-icon>
            </view>
          </view>
        </view>
        <view style="margin: 70rpx 50rpx 0 50rpx; border-radius: 20rpx; padding: 30rpx 30rpx 30rpx 30rpx; border: 2rpx solid #00FFFF70;background-color: #00000099; ">
          <view>
            <u-row >
              <u-col span="6">
                  <view style="display:flex;justify-content:center;align-items:center;">
                    <u-image
                      src="/static/images/member/m3.png"
                      width="180rpx"
                      height="180rpx"
                    ></u-image>
                  </view>
              </u-col>
              <u-col span="6">
                  <view>
                    {{$t('全球推广')}}
                  </view>
                  <view style="font-size: 20rpx; font-weight: 100; height:60rpx; line-height:60rpx">
                    {{$t('加入全球推广，共创未来！')}}
                  </view>
                  <view>
                     <view class="ctl">
                        <button style="height:40rpx;line-height: 40rpx; font-size: 18rpx;display: inline-flex;border-radius: 30rpx;" class="btn bdr05 bggr01" >{{$t('一键开启')}}</button>
                      </view>
                  </view>
              </u-col>
            </u-row>
          </view>
          <view style="background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%); display:flex; margin: 50rpx auto 30rpx auto; justify-content:center;align-items:center;height:64rpx;font-weight: 300;font-size: 24rpx;line-height:64rpx;border-radius: 20rpx; ">
             <view>
               {{$t('邀請链接')}}：https://oga...3618
            </view>
            <view style="margin-left:20rpx">
              <view class="ctl">
                <button style="height:40rpx;line-height: 40rpx; font-size: 18rpx;display: inline-flex;border-radius: 30rpx;" class="btn bdr05 bggr01" >{{$t('复制')}}</button>
              </view>
            </view>
          </view>
        </view>
        <view style="margin: 70rpx 42rpx 0 42rpx; ">
          <u-row style="margin-bottom: 10px">
            <u-col span="4">
                <view class="col-btn">
                  <view class="col-btn-wrapper">
                    <u-image
                      src="/static/images/member/m4.png"
                      width="90rpx"
                      height="90rpx"
                    ></u-image>
                  </view>
                  <view class="col-btn-text">
                    {{$t('我的钱包')}}
                  </view>
                </view>
            </u-col>
            <u-col span="4">
                <view class="col-btn">
                  <view class="col-btn-wrapper">
                    <u-image
                      src="/static/images/member/m5.png"
                      width="90rpx"
                      height="90rpx"
                    ></u-image>
                  </view>
                  <view class="col-btn-text">
                    {{$t('安全认证')}}
                  </view>
                </view>
            </u-col>
            <u-col span="4">
                <view class="col-btn">
                  <view class="col-btn-wrapper">
                    <u-image
                      src="/static/images/member/m6.png"
                      width="90rpx"
                      height="90rpx"
                    ></u-image>
                  </view>
                  <view class="col-btn-text">
                    {{$t('在线支持')}}
                  </view>
                </view>
            </u-col>
          </u-row>
          <u-row style="margin-bottom: 10px; margin-top:45rpx;">
            <u-col span="4">
                <view class="col-btn">
                  <view class="col-btn-wrapper">
                    <u-image
                      src="/static/images/member/m7.png"
                      width="90rpx"
                      height="90rpx"
                    ></u-image>
                  </view>
                  <view class="col-btn-text">
                    {{$t('一键兑换')}}
                  </view>
                </view>
            </u-col>
            <u-col span="4">
                <view class="col-btn">
                  <view class="col-btn-wrapper">
                    <u-image
                      src="/static/images/member/m8.png"
                      width="90rpx"
                      height="90rpx"
                    ></u-image>
                  </view>
                  <view class="col-btn-text">
                    {{$t('量化视图')}}
                  </view>
                </view>
            </u-col>
            <u-col span="4">
                <view class="col-btn">
                  <view class="col-btn-wrapper">
                    <u-image
                      src="/static/images/member/m9.png"
                      width="90rpx"
                      height="90rpx"
                    ></u-image>
                  </view>
                  <view class="col-btn-text">
                    {{$t('数据中心')}}
                  </view>
                </view>
            </u-col>
          </u-row>
        </view>
        <view class="list-wrapper">
          <view v-for="(item, i) in list" :key="i">
            <view class="list-item">
              <view class="list-item-left">
                {{ item.t }}
              </view>
              <view class="list-item-right">
                {{ item.n }}
              </view>
            </view>
          </view>
        </view>
        <view style="margin-top:70rpx;">
          <view>
            <view style="text-align: center;">
               {{$t('我的 WIN 社區')}}
            </view>
          </view>
           <view style="display:flex; margin: auto; justify-content:center;align-items:center;height:64rpx;font-weight: 100;font-size: 20rpx;line-height:64rpx; width: 300rpx;">
            <view >
              <u-icon name="info-circle-fill" color="#ffffff" size="20"></u-icon>
            </view>
            <view style="margin-left:10rpx">
              {{$t('大小區貢獻計算規則')}}
            </view>
          </view>
        </view>
        <view class="list-wrapper" style="margin-top:15rpx">
          <view v-for="(item, i) in list" :key="i">
            <view class="list-item">
              <view class="list-item-left">
                {{ item.t }}
              </view>
              <view class="list-item-right">
                {{ item.n }}
              </view>
            </view>
          </view>
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
  data() {
    return {
      logo: "../static/images/logo.png",
      list: [],
    };
  },
  onLoad() {
    var that = this;
    this.loadlist();
   
  },
  onReady() {
     
  },
  methods: {
    loadlist() {
      this.list.push({'t':'直推人数','n':10});
      this.list.push({'t':'社区总人数','n':99999});
      this.list.push({'t':'社区有效人数','n':1});
      this.list.push({'t':'社区总量化投入','n':10});
      this.list.push({'t':'社区总量化运行','n':10});
    }
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper{
  margin: 70rpx 50rpx 0 50rpx; border-radius: 20rpx; padding: 30rpx 30rpx 30rpx 30rpx;  border: 2rpx solid #00FFFF70; background-color: #00000099;
  .list-item{
    display: flex; font-size: 22rpx;font-weight: 100; height:45rpx;line-height: 45rpx;
    .list-item-left{
      flex:1;
    }
    .list-item-right{
      margin-left:auto; text-align: left;
    }
  }
}
.col-btn {
  border: 2rpx solid #00FFFF70; 
  border-radius: 25rpx; 
  background: #00000099;
  /*
  border-image-slice: 30;
  border-image-source: linear-gradient(109deg, #00FFFF -29.08%, #000000 46.11%, #00FFBD 117.09%);
  */
  
  height:140rpx;
  .col-btn-wrapper{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:-30rpx;
  }
  .col-btn-text{
    text-align: center;
    font-size: 25rpx;
    font-weight: 100;
    margin-top: 10rpx;
  }
}


.member {
  .ucenter,.promotion,.guider,.statistics{ width:93%;margin:0 auto;}
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
  }
  .statistics{
    height:10rem; margin:1rem auto;
    &.panel .bdlg{
      background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
    }
  }
  .wrapper{
    justify-content: flex-start;
    height: calc(100% - 14vh);
    padding: 6vh 0 8vh 0;
    color:#fff;
  }
  uni-scroll-view {
        height: calc(100vh - 14vh);
  }
 
}
</style>