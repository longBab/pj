<template>
<view class="register body">
    <view class=" wrapper">
        <view class="panel">
            <view class="logo">
                <view class="image"></view>
            </view>
            <view class="title">{{$t('用户注册')}}</view>
            <scroll-view scroll-y="true" scroll-x="false">
            <u-form class="form" ref="uForm" :model="form">
                <view>{{$t('手机号码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.account" :placeholder="$t('手机号码')" />
                </u-form-item>
                <view >{{$t('验证码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.checkcode" :placeholder="$t('验证码')" />
                    <view class="right-btn">
                        获取验证码
                    </view>
                </u-form-item>
                <view>{{$t('设置密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.password" :placeholder="$t('设置密码')" />
                </u-form-item>
                <view>{{$t('确认密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.password" :placeholder="$t('确认密码')" />
                </u-form-item>
                <view>{{$t('邀请码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.password" :placeholder="$t('邀请码')" />
                </u-form-item>
            </u-form>
            </scroll-view>
            <view class="ctl">
                <button class="btn bdr05 bggr01" @click="onSubmit($event)">{{$t('立即注册')}}</button>
            </view>
            <view class="foot-link" >
                <text @click="gotoPage('login')">返回登录</text> <text @click="gotoPage('forget')">忘记密码</text>
            </view>
        </view> 
    </view>
</view>
</template>
<script>
export default {
    components: {
    
    },
    data() {
        return {
            back:'login',
            title: '注册',
            _senderCode:'获取验证码',
            senderCode:'',
            inputStyle:{color:'#000'},
            form: {
                
            },
        
        }
    },
    onLoad(sender) {
        let that=this;
        that.extend({form:{inviteCode:sender.code},senderCode:that._senderCode});
    },
    methods: {
        onSubmit() {
            let that = this,kpath="form.",store=that.$store;
            this.gotoPage('login');
        }
    }
}
</script>
     
<style lang="scss" scoped>
.register{
    .wrapper{
        justify-content: flex-start;
        padding: 3.5rem 0 2rem 0;
        color:#fff;
    }
    .panel{
        height:100%;
    }
    
    uni-scroll-view {
        height:calc(100% - 8rem);
    }
    
}
</style>