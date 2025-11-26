<template>
    <view class="payment body" :class="$store.state.setting.theme">
      <navBar :back="back" :title="title">
      </navBar>
      <view class="wrapper">
        <view class="navigations" v-if="page=='default'">
          <view class="row panel"  @click="change($event,'alipay')">
            <view class="cl"><u-icon  name="zhifubao-circle-fill" style="color:#00b6ff;margin-right:0.3rem;" size="40" />{{$t('绑定支付宝')}}</view>
            <view class="cr">{{$t(alipayAccount&&alipayCertificate?'去查看':'去绑定')}}</view>
            <view class="bdlg"></view>
          </view>
    
          <view class="row panel" @click="change($event,'weixin')">
            <view class="cl"><u-icon  name="weixin-fill" style="color:#08ba00;margin-right:0.3rem;" size="40" />{{$t('绑定微信')}}</view>
            <view class="cr">{{$t(wxpayAccount&&wxpayCertificate?'去查看':'去绑定')}}</view>
            <view class="bdlg"></view>
          </view>
    
          <view class="row panel"  @click="change($event,'bank')">
            <view class="cl"><u-icon  name="rmb-circle-fill" style="color:#ffd731;margin-right:0.3rem;" size="40" />{{$t('绑定银行卡')}}</view>
            <view class="cr">{{$t(openBank&&bankCardAccount&&cardholderName?'去查看':'去绑定')}}</view>
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
            <view class="split" v-if="form.split">{{$t(form.split||"未知")}}</view>
            <view class="row" v-if="form.split">
              <view class="cc">
                <input class="input" v-model="form.value" :placeholder="$t(form.tips||'未知')" />
              </view>
            </view>
            <view class="split" v-if="form.split01">{{$t(form.split01||"未知1")}}</view>
            <view class="box-cc" v-if="form.split01">
              <view class="item panel" :class="page">
                
                  <text v-if="!form.image">{{$t(form.tips01||"未知1")}}</text>
                  <image 
                    :src="formatUrl(form.image)"
                    mode="scaleToFill" v-if="form.image"
                  />
                 
                <view class="bdlg"></view>
              </view>
            </view>

            <view class="split" v-if="form.split02">{{$t(form.split02||"未知")}}</view>
            <view class="row" v-if="form.split02">
              <view class="cc">
                <input class="input" v-model="form.value01" :placeholder="$t(form.tips02||'未知')" />
              </view>
            </view>

            <view class="split" v-if="form.split03">{{$t(form.split03||"未知")}}</view>
            <view class="row" v-if="form.split03">
              <view class="cc">
                <input class="input" v-model="form.value02" :placeholder="$t(form.tips03||'未知')" />
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
          id:"",
          alipayAccount:"",
          alipayCertificate:"",
          bankCardAccount:"",
          cardholderName:"",
          openBank:"",
          wxpayAccount:"",
          wxpayCertificate:"",
          form:{
            tips:"",
            tips01:"",
            tips02:"",
            tips03:"",
            tips04:"",
            value:"",
            value01:"",
            value02:"",
            value03:"",
            image:""
          },
          maps:{
            alipay:{
              split:"支付宝账号(可选)",
              tips:"请输入支付宝账号",
              split01:"上传支付宝收款二维码",
              tips01:"支付宝收款码照片",
              split02:"",
              tips02:"",
              split03:"",
              tips03:""
            },
            weixin:{
              split:"微信号(可选)",
              tips:"请输入微信号",
              split01:"上传微信收款二维码",
              tips01:"微信收款码照片",
              split02:"",
              tips02:"",
              split03:"",
              tips03:""
            },
            bank:{
              split:"开户行",
              tips:"请输入开户行",
              split01:"",
              tips01:"",
              split02:"银行卡号",
              tips02:"请输入银行卡号",
              split03:"持卡人姓名",
              tips03:"请输入持卡人姓名"
            }
          },
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
            var that = this, sender = that.sender || sender || {};
            sender.page=that.page||"default";
            that.extend(sender);
            if(sender.page!="default")return;
            that.transfer.request({
                url: "GET app/member/security/payment?way="+that.page,
            })
            .then((resp) => {
                var data = resp.data;
                data = data.data || data;
                that.extend(data);
                if(data.dataView)that.extend(data.dataView);
            });
        },
        change(event,page){
          var that=this;
          if(page=='alipay'||page=='weixin'||page=='bank')that.back="/pages/member/security/payment";
          else that.back="/pages/member/security/security";
          var form=that.get("maps."+page);
          if(page=="alipay"){
            form.value=that.alipayAccount||"";
            form.image=that.alipayCertificate||"";
          }
          else if(page=="weixin"){
            form.value=that.wxpayAccount||"";
            form.image=that.wxpayCertificate||"";
          }
          else if(page=="bank"){
            form.value=that.openBank||"";
            form.value01=that.bankCardAccount||"";
            form.value02=that.cardholderName||"";
          }
          that.extend({page:page,form:form});

          that.load({page:page});

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
                uni-image{width:100%;height:100%;}
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