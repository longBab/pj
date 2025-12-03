<template>
<view class="security body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
  </navBar>
  <view class="wrapper" style="justify-content:flex-start;padding-top:5rem;">
    
      <view class="navigations">
        <view class="card-item" @click="gotoPage('security/identity')">
          <image class="card-bg" src="/static/images/Rectangle121.png" mode="widthFix" />
          <view class="card-content">
            <view class="card-title">{{$t('身份认证')}}</view>
            <image class="card-icon" src="/static/images/sf.png" mode="widthFix" />
          </view>
        </view>

        <view class="card-item" @click="gotoPage('security/payment')">
          <image class="card-bg" src="/static/images/Rectangle121.png" mode="widthFix" />
          <view class="card-content">
            <view class="card-title">{{$t('账号支付配置')}}</view>
            <image class="card-icon" style="width:160%;" src="/static/images/zh.png" mode="widthFix" />
          </view>
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
    padding: 1rem;
  }
  .navigations{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 0.5rem;
  }
  .card-item{
    position: relative;
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    .card-bg{
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
    .card-content{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 1;
    }
    .card-title{
      font-size: 0.9rem;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 0.5rem;
    }
    .card-icon{
      width: 100%; 
      align-self: center;
      margin-top: auto;
    }
  }
}
</style>