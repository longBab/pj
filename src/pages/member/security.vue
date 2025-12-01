<template>
<view class="security body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper">
    
      <view class="navigations">

        <view class="row panel" @click="gotoPage('security/password')">
        <view class="cl">{{$t('修改登陆密码')}}</view>
        <view class="cr"><u-icon  name="arrow-right" style="color:inherit;" size="24" /></view>
        <view class="bdlg"></view>
        </view>
        <view class="row panel" @click="changePayPassword($event)">
        <view class="cl">{{$t('修改支付密码')}}</view>
        <view class="cr"><u-icon  name="arrow-right" style="color:inherit;" size="24" /></view>
        <view class="bdlg"></view>
        </view>

        <view class="row panel" @click="gotoPage('security/identity')">
        <view class="cl">{{$t('身份认证')}}</view>
        <view class="cr"><u-icon  name="arrow-right" style="color:inherit;" size="24" /></view>
        <view class="bdlg"></view>
        </view>

        <view class="row panel" @click="gotoPage('security/payment')">
        <view class="cl">{{$t('账号支付配置')}}</view>
        <view class="cr"><u-icon  name="arrow-right" style="color:inherit;" size="24" /></view>
        <view class="bdlg"></view>
        </view>
    </view>
  </view>
  <keyBoard ref="keyBoard"  @submit="changePayPassword"  />
</view>
</template>
<script>
import navBar from "@/components/navBar.vue";
import keyBoard from "@/components/keyBoard.vue";
export default {
  components: {
    navBar,
    keyBoard
  },
  data() {
    return {
      back:"/pages/member",
      title:"安全认证",
      form:{step:0,passwordX:"",newPasswordX:"",reNewPassword:""},
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
      that.transfer.request({
        url: "GET app/member/security",
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        that.extend(data);
      });
    },
    changePayPassword(event,type){
      var that=this,step=that.get("form.step")||0,keyBoard=that.get("$refs.keyBoard"),tips="支付密码";
      if(typeof(event)=="string"){
          if(step==0){
            tips="新支付密码";
            that.extend({form:{step:1,passwordX:event}});
          }
          else if(step==1){
            tips="确认新支付密码";
            that.extend({form:{step:2,newPasswordX:event}});
          }
          else if(step==2){
            that.extend({form:{reNewPasswordX:event}});
            var pdata={
              passwordX:that.get("form.passwordX"),
              newPasswordX:that.get("form.newPasswordX"),
              reNewPasswordX:that.get("form.reNewPasswordX")
            }
            that.extend({form:{
              passwordX:"",
              newPasswordX:"",
              reNewPasswordX:""
            }});
            that.transfer.request({
              url: "POST app/member/security/passwordx",
              data:pdata,
              headers:{'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then((resp) => {
              var data = resp.data;
              data = data.data || data;
              that.Alert("支付密码修改成功");
            });
            return;
          }
       
      }
    
      keyBoard.open({title:tips,length:6});

    }
  },
 
};
</script>
      
<style lang="scss" scoped>
.security {
 
  .wrapper{
    color:#fff;
    overflow: hidden;
  }
 

}
</style>