<template>
<view class="login body">
    <view class="wrapper">
        <view class="panel">
            <view class="logo">
                <view class="image"></view>
            </view>
            <view class="title">欢迎登录</view>
            <view class="tab-panel">
                <u-tabs
                    :list="tabList"    
                    :current="current"
                    :is-scroll="false"
                    :lineWidth="100"
                    :lineHeight="16"
                    active-color="#0EFFB0" 
                    inactive-color="#FFFFFFB2" 
                    @change="tabChange" 
                    />
            </view>
            <u-form class="form" ref="uForm" :model="form">
                <view>{{$t('手机号码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.account" :placeholder="$t('手机号码')" />
                </u-form-item>
                <view v-if="current==1">{{$t('密码')}}</view>
                <u-form-item v-if="current==1" :border-bottom="false">
                    <u-input v-model="form.password" :placeholder="$t('密码')" />
                    <view class="right-btn" @click="gotoPage('forget')">
                        忘记密码？
                    </view>
                </u-form-item>
                <view  v-if="current==0">{{$t('验证码')}}</view>
                <u-form-item  v-if="current==0" :border-bottom="false">
                    <u-input v-model="form.checkcode" :placeholder="$t('验证码')" />
                    <view class="right-btn">
                        获取验证码
                    </view>
                </u-form-item>
            </u-form>
            <view class="ctl">
                <button class="btn bdr05 bggr01" @click="onSubmit($event)">{{$t('立即登录')}}</button>
            </view>
            <view class="foot-link" @click="gotoPage('register')">
                注册帐号
            </view>
        </view>
    </view>
</view>
</template>

<script>
export default {
 
setup() {},
data() {
    return {
      current: 0,   // 默认选中第 0 项
      tabList: [
        { name: '验证码登录' },
        { name: '密码登录' }
      ],
        form:{
            
        },
    };
},
onLoad() {
    var that = this;
    
},
onReady() {
    
},
methods: {
    tabChange(index){
        this.current = index;
    },
    onSubmit(){
        this.gotoPage('home');
    }
},
};
</script>

<style lang="scss" scoped>
.tab-panel{
    padding:0.22rem 0.5rem 1.5rem 0.5rem;
}
::v-deep .u-tabs {
  background: transparent !important;
}
::v-deep .u-tab-item{
  font-size: 0.75rem !important;
  font-weight:normal !important;
}
.login {

    uni-scroll-view {
        height: calc(100% - 2rem);
    }
}
</style>