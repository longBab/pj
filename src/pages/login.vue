<template>
<view class="login body">
    <view class="wrapper">
        <view class="header">
            <image class="logo-icon" src="/static/images/Group48095820.png" mode="widthFix" />
            <view class="close-btn" @click="goBack">
                <u-icon name="close" color="#08E07F" size="20"></u-icon>
            </view>
        </view>
        <view class="panel" style="padding:1rem;margin-top:-1rem;">
            <view class="login-tabs">
                <view 
                    class="tab-item" 
                    :class="{ active: way.current === 0 }"
                    @click="change(0)"
                >
                    <text>{{ $t('验证码登录') }}</text>
                    <view v-if="way.current === 0" class="tab-underline"></view>
                </view>
                <view 
                    class="tab-item" 
                    :class="{ active: way.current === 1 }"
                    @click="change(1)"
                >
                    <text>{{ $t('密码登录') }}</text>
                    <view v-if="way.current === 1" class="tab-underline"></view>
                </view>
            </view>
            <u-form class="form" ref="uForm" :model="form" >
                <view class="label" v-if="way.current==0">{{$t('手机号码')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==0">
                    <view class="phone-input-row">
                        <picker 
                            class="area-code-picker" 
                            mode="selector" 
                            :value="areaCode.current" 
                            :range="areaCode.items" 
                            @change="change($event,'areaCode')"
                        >
                            <view class="area-code-text">
                                {{ areaCode.items[areaCode.current] }}
                            </view>
                        </picker>
                        <u-input 
                            class="phone-input" 
                            type="number" 
                            v-model="form.phone" 
                            :placeholder="$t('请输入手机号码')" 
                        />
                    </view>
                </u-form-item>

                <view class="label" v-if="way.current==0">{{$t('密码')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==0">
                    <u-input type="password" v-model="form.password" :placeholder="$t('请输入密码')" />
                    <view class="forget-btn" @click="gotoPage('forget')">{{$t('忘记密码')}}</view>
                </u-form-item>

                <view class="label" v-if="way.current==1">{{$t('邮箱地址')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==1">
                    <u-input v-model="form.mail" :placeholder="$t('请输入邮箱地址')" />
                </u-form-item>

                <view class="label" v-if="way.current==1">{{$t('密码')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==1">
                    <u-input type="password" v-model="form.password" :placeholder="$t('请输入密码')" />
                    <view class="forget-btn" @click="gotoPage('forget')">{{$t('忘记密码')}}</view>
                </u-form-item>
            </u-form>
            <view class="ctl">
                <button class="btn-login" @click="onSubmit($event)">{{$t('立即登录')}}</button>
            </view>
            <view class="ctl register-link">
                <text @click="gotoPage('register')">{{$t('注册账号')}}</text>
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
      way: {
                current:0,
                items:[
                    { name: '密码登录' },
                    { name: '密码登录' }
                ],textMaps:{
                    "0":"密码登录",
                    "1":"密码登录"
                }
        },
        areaCode:{
            current:0,
            items: ['+86', '+852', '+853', '+886', '+81', '+82', '+60', '+65', '+66', '+84', '+63', '+62', '+91', '+1', '+44', '+61', '+33', '+49']
        },
        form:{
            phone:"",
            mail:"",
            password:""     
        },
        version:"0.0.0",
    };
},
onLoad() {
    var that = this,
    globalData=getApp().globalData||{},
    store=that.$store,setting = store&&store.state?store.state.setting:{};
    that.version=globalData.version;
    if(setting.loginPlain){
        if(setting.loginPlain.password)that.set(true,"form.isSave");
        that.extend({form:setting.loginPlain});
    } 
},
onReady() {
    
},
methods: {
    goBack(){
        var that=this;
        that.navigateBack();
    },
    change(event,type){
        var that=this,type=type||"way",value=0;
        if(type=="form.isSave"){
            that.set(event.detail.value.length > 0,type);
            return;
        }
        if(type=="areaCode"){
            value=event.detail.value;
        }
        console.log([event,type]);
        if(/[\d]/.test(event))value=event;
        that.set(value,type+".current");

    },
    onSubmit(event){
        var that=this,store=that.$store,setting = store&&store.state?store.state.setting:{},value="",rkey="loginPlain",
        data={clientId:setting.clientId,tenantId:setting.tenantId,grantType:"password"};
        store.commit("setSetting",{__path:rkey,__data:{}});
        if(that.way.current==0){
            value=that.get("form.phone");
            if(!/\d+/.test(value)){that.Alert("手机号码格式无效");return;}
            // 拼接区号和手机号，例如 +86XXXXXXXXXXX
            var code = (that.areaCode && that.areaCode.items && that.areaCode.items[that.areaCode.current]) ? that.areaCode.items[that.areaCode.current] : "";
            data.username= code + value;
            value=that.get("form.password");
            if(!/[\s\S]{6}/.test(value)){that.Alert("密码长度不能少于6位");return;}
            data.password=value;
        }
        if(that.way.current==1){
            value=that.get("form.mail");
            if(!/[^@]+@[^@]+/.test(value)){that.Alert("邮箱地址格式无效");return;}
            data.username=value;
        value=that.get("form.password");
        if(!/[\s\S]{6}/.test(value)){that.Alert("密码长度不能少于6位");return;}
        data.password=value;
        }
        
        that.transfer.request({
              url: "POST auth/login",data:data
          })
          .then((resp) => {
                var data = resp.data;
                data = data.data||data;
                store.commit("setUser",{id:data.access_token,token:data.access_token});
                that.gotoPage('home'); 
        });
    }
},
};
</script>

<style lang="scss" scoped>
.login {
    position:relative;
    min-height:100vh;
    background:#1f1f1f;
    .login-bg{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100vh;
        z-index:0;
        object-fit:cover;
    }
    .wrapper{
        position:relative;
        z-index:1;
        padding:2rem 1.2rem;
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
    .logo-text{
        flex:1;
        font-size:1.2rem;
        font-weight:700;
        color:#FFFFFF;
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
    .login-tabs{
        display:flex;
        margin-bottom:2rem;
    }
    .tab-item{
        flex:1;
        text-align:center;
        padding-bottom:0.5rem;
        position:relative;
        text{
            font-size:1rem;
            color:#FFFFFFB2;
        }
        &.active text{
            color:#08E07F;
        }
    }
    .tab-underline{
        position:absolute;
        bottom:0;
        left:50%;
        transform:translateX(-50%);
        width:2rem;
        height:2px;
        background:#08E07F;
    }
    .form,.ctl{
        width: 100%;
        margin: 0 auto;
    }
    .phone-input-row{
        display:flex;
        align-items:center;
    }
    .area-code-picker{
        padding:0 0.5rem;
        margin-right:0.5rem;
        border-right:1px solid rgba(255,255,255,0.2);
    }
    .area-code-text{
        color:#FFFFFF;
        font-size:0.9rem;
        white-space:nowrap;
    }
    .phone-input{
        flex:1;
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
    .forget-btn{
        padding:0rem 0.8rem;
        color:#08E07F;
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