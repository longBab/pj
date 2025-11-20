<template>
<view class="forget body">
    <view class="wrapper">
      <view class="panel">
            <view class="logo">
                <view class="image"></view>
            </view>
            <view class="title">{{$t('找回密码')}}</view>
            <u-form class="form" ref="uForm" :model="form">
                <view  v-if="checkshow">{{$t('手机号码')}}</view>
                <u-form-item  v-if="checkshow" :border-bottom="false">
                    <u-input v-model="form.account" :placeholder="$t('手机号码')" />
                </u-form-item>
                <view  v-if="checkshow">{{$t('验证码')}}</view>
                <u-form-item   v-if="checkshow"  :border-bottom="false">
                    <u-input v-model="form.checkcode" :placeholder="$t('验证码')" />
                    <view class="right-btn">
                        获取验证码
                    </view>
                </u-form-item>
                <view v-if="!checkshow">{{$t('新密码')}}</view>
                <u-form-item v-if="!checkshow" :border-bottom="false">
                    <u-input v-model="form.password" :placeholder="$t('新密码')" />
                </u-form-item>
                <view v-if="!checkshow">{{$t('确认新密码')}}</view>
                <u-form-item v-if="!checkshow" :border-bottom="false">
                    <u-input v-model="form.newpassword" :placeholder="$t('确认新密码')" />
                </u-form-item>
            </u-form>
            <view class="ctl" v-if="checkshow">
                <button class="btn bdr05 bggr01" @click="onCheck($event)">{{$t('下一步')}}</button>
            </view>
            <view class="ctl" v-if="!checkshow">
                <button class="btn bdr05 bggr01" @click="onUpdate($event)">{{$t('确认修改')}}</button>
            </view>
            <view class="foot-link" >
                <text @click="gotoPage('login')">注册帐号</text> <text @click="gotoPage('forget')">忘记密码</text>
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
    uni-scroll-view {
      height: calc(100% - 2rem);
    }
  }
  </style>