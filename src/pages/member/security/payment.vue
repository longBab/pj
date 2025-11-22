<template>
    <view class="payment body" :class="$store.state.setting.theme">
      <navBar :back="back" :title="title">
      </navBar>
      <view class="wrapper">
        <view class="navigations" v-if="page=='default'">
          <view class="row panel"  @click="change($event,'alipay')">
            <view class="cl"><u-icon  name="zhifubao-circle-fill" style="color:#00b6ff;margin-right:0.3rem;" size="40" />{{$t('绑定支付宝')}}</view>
            <view class="cr">{{$t('去绑定')}}</view>
            <view class="bdlg"></view>
          </view>
    
          <view class="row panel" @click="change($event,'weixin')">
            <view class="cl"><u-icon  name="weixin-fill" style="color:#08ba00;margin-right:0.3rem;" size="40" />{{$t('绑定微信')}}</view>
            <view class="cr">{{$t('去绑定')}}</view>
            <view class="bdlg"></view>
          </view>
    
          <view class="row panel"  @click="change($event,'bank')">
            <view class="cl"><u-icon  name="rmb-circle-fill" style="color:#ffd731;margin-right:0.3rem;" size="40" />{{$t('绑定银行卡')}}</view>
            <view class="cr">{{$t('去绑定')}}</view>
            <view class="bdlg"></view>
          </view>
        </view>
        <view class="page" v-if="page=='alipay'||page=='weixin'||page=='bank'">
          <view class="tabs">
            <text class="item" :class="{active:page=='alipay'}" @click="change($event,'alipay')" >绑定支付宝</text>
            <text class="item" :class="{active:page=='weixin'}" @click="change($event,'weixin')">绑定微信</text>
            <text class="item" :class="{active:page=='bank'}" @click="change($event,'bank')">绑定银行卡</text>
          </view>
          <view class="form s01">
            <view class="split">请输入支付宝账号(可选)</view>
            <view class="row">
              <view class="cc">
                <input class="input" placeholder="请输入" />
              </view>
            </view>
            <view class="split">上传收款二维码</view>
            <view class="box-cc">
              <view class="item panel" :class="page">
                  <text class="image">收款码照片</text>
                  <view class="bdlg"></view>
              </view>
            </view>
            <view class="ctl">
              <button class="btn">确认提交</button>
            </view>
        </view>

        </view>
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
          back:"/pages/member/security",
          title:"支付方式",
          page:"default",
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
        load(sender){
          var that=this,sender=that.sender||sender||{};
          if(!sender.page)page="default";
          that.extend(sender);
        },
        change(event,page){
          var that=this;
          if(page=='alipay'||page=='weixin'||page=='bank')that.back="/pages/member/security/payment";
          else that.back="/pages/member/security/security";
          that.extend({page:page});

        }
          
      },
    };
    </script>
          
    <style lang="scss" scoped>
    .payment {
      .page,.form{width:93%; margin:0 auto;}
      .form{ width:90%;margin:1rem auto;}
      .page{
        .tabs{
          $_height:2rem;
          width:98%;
          margin:0 auto;
          display:flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          border-radius:10px;
          border: 1px solid #417B68;
          .item{
            width:30%;height:100%;
            text-align: center;
            line-height:$_height;
            color:#fff;
            &.active{
              border-radius:10px;
              background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
              color:#000;
            } 

          }
        }
        .split{line-height:2rem;}
        .box-cc{
            width:100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            height: 8rem;
           
            .item{
                width:50%;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;  
                justify-content: space-around;
                align-content: space-around;
                &.bank{width:90%;}
            }
        }
      }
     
     
      .wrapper{
        color:#fff;
        overflow: hidden;
      }
      uni-scroll-view {
        height: auto;
      }
    
    }
    </style>