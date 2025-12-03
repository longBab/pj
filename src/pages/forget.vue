<template>
<view class="forget body">
    <view class="wrapper">
        <view class="header">
            <image class="logo-icon" src="/static/images/Group48095820.png" mode="widthFix" />
            <view class="close-btn" @click="goBack">
                <u-icon name="close" color="#08E07F" size="20"></u-icon>
            </view>
        </view>
        <view class="panel" style="padding:1rem;margin-top:-1rem;">
            <view class="title" style="color:#08E07F;">{{$t('找回密码')}}</view>
            <u-form class="form" ref="uForm" :model="form">
                <view class="label" v-if="checkshow">{{$t('手机号码')}}</view>
                <u-form-item v-if="checkshow" :border-bottom="false">
                    <u-input type="number" v-model="form.account" :placeholder="$t('请输入手机号码')" />
                </u-form-item>
                <view class="label" v-if="checkshow">{{$t('验证码')}}</view>
                <u-form-item v-if="checkshow" :border-bottom="false">
                    <u-input type="number" v-model="form.checkcode" :placeholder="$t('请输入验证码')" />
                    <view class="code-btn" @click="getCode">{{$t('获取验证码')}}</view>
                </u-form-item>
                <view class="label" v-if="!checkshow">{{$t('新密码')}}</view>
                <u-form-item v-if="!checkshow" :border-bottom="false">
                    <u-input type="password" v-model="form.password" :placeholder="$t('请输入新密码')" />
                </u-form-item>
                <view class="label" v-if="!checkshow">{{$t('确认新密码')}}</view>
                <u-form-item v-if="!checkshow" :border-bottom="false">
                    <u-input type="password" v-model="form.newpassword" :placeholder="$t('请再次输入新密码')" />
                </u-form-item>
            </u-form>
            <view class="ctl" v-if="checkshow">
                <button class="btn-login" @click="onCheck($event)">{{$t('下一步')}}</button>
            </view>
            <view class="ctl" v-if="!checkshow">
                <button class="btn-login" @click="onUpdate($event)">{{$t('确认修改')}}</button>
            </view>
            <view class="ctl register-link">
                <text @click="gotoPage('login')">{{$t('返回登录')}}</text>
            </view>
        </view> 
    </view>
</view>
</template>
  
<script>
 
import navLanguage from "@/components/navLanguage";
export default {
    components: {
        
        navLanguage
    },
    setup() {},
    data() {
        return {
            checkshow:true,
          form:{}
        };
    },
    onLoad() {
        var that = this;
        
    },
    onReady() {
        
    },
    methods: {
        goBack(){
            var that=this;
            that.navigateBack();
        },
        getCode(){
            var that=this,value=that.get("form.account");
            if(!/\d+/.test(value)){that.Alert("手机号码格式无效");return;}
            // TODO: 调用获取验证码接口
            that.Alert("验证码已发送");
        },
        onCheck(){
            this.checkshow=false;
        },
        onUpdate(){
            this.gotoPage('login');
        }
    },
};
</script>
  
<style lang="scss" scoped>
.forget {
    position:relative;
    min-height:100vh;
    background:#1f1f1f;
    .wrapper{
        position:relative;
        z-index:1;
        padding:2rem 1.2rem;
        min-height:calc(100vh - 4rem);
        display:flex;
        flex-direction:column;
        justify-content:center;
    }
    .header{
        display:flex;
        align-items:center;
        justify-content:space-between;
        width:100%;
        background:#000;
        height:5.5rem !important;
        border-radius:10px;
        padding:0 1rem;
    }
    .logo-icon{
        width:10rem;
        margin-right:0.5rem;
    }
    .close-btn{
        width:2rem;
        height:2rem;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .panel{
        width:100%;
    }
    .title{
        font-size:1rem;
        font-weight:700;
        color:#08E07F !important;
        margin-bottom:1.3rem;
        text-align:center;
        line-height:1.5rem;
    }
    .form,.ctl{
        width: 100%;
        margin: 0 auto;
    }
    .label{
        color:#FFFFFF;
        font-size:0.9rem;
        margin-bottom:0.5rem;
        margin-top:1rem;
    }
    .label:first-child{
        margin-top:0;
    }
    .code-btn{
        padding:0rem 0.8rem;
        background:#08E07F;
        color:#FFFFFF;
        border-radius:4px;
        font-size:0.8rem;
        white-space:nowrap;
    }
    .btn-login{
        width:100%;
        height:2.8rem;
        background:#08E07F;
        color:#FFFFFF;
        border-radius:8px;
        font-size:1rem;
        font-weight:600;
        border:none;
        margin-top:2rem;
    }
    .register-link{
        text-align:left;
        margin-top:1.5rem;
        text{
            color:#08E07F;
            font-size:0.9rem;
        }
    }
    .ctl{
        color:#fff;
    }
}
</style>