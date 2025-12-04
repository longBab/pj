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
        <view class="login-type-selector" style="color:#FFFFFF;font-size:1.2rem;font-weight:700;color:#08E07F;">
            用户登录
        </view>
            <u-form class="form" ref="uForm" :model="form" >
                <view class="login-type-selector">
                    <radio-group @change="changeLoginType">
                        <view class="radio-container">
                            <label class="radio-item" :class="{ active: loginType === 'phone' }">
                                <radio value="phone" :checked="loginType === 'phone'" color="#08E07F" />
                                <text class="radio-text">{{$t('手机号')}}</text>
                            </label>
                            <label class="radio-item" :class="{ active: loginType === 'email' }">
                                <radio value="email" :checked="loginType === 'email'" color="#08E07F" />
                                <text class="radio-text">{{$t('邮箱')}}</text>
                            </label>
                        </view>
                    </radio-group>
                </view>

                <!-- <view class="label" v-if="loginType === 'phone'">{{$t('手机号码')}}</view> -->
                <u-form-item :border-bottom="false" v-if="loginType === 'phone'">
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

                <!-- <view class="label" v-if="loginType === 'email'">{{$t('邮箱地址')}}</view> -->
                <u-form-item :border-bottom="false" v-if="loginType === 'email'">
                    <u-input v-model="form.mail" :placeholder="$t('请输入邮箱地址')" />
                </u-form-item>

                <view class="label">{{$t('密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.password" :placeholder="$t('请输入密码')" />
                    <view class="forget-btn" @click="gotoPage('/pages/service')">{{$t('忘记密码')}}</view>
                </u-form-item>
            </u-form>
            <view class="ctl">
                <view class="remember-password">
                    <checkbox-group @change="change($event,'form.isSave')">
                        <label class="checkbox-label">
                            <checkbox :checked="form.isSave" value="remember" color="#08E07F" />
                            <text class="checkbox-text">{{$t('记住密码')}}</text>
                        </label>
                    </checkbox-group>
                </view>
            </view>
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
      loginType: 'email', // 默认选中邮箱登录
      areaCode:{
            current:0,
            items: ['+86', '+852', '+853', '+886', '+81', '+82', '+60', '+65', '+66', '+84', '+63', '+62', '+91', '+1', '+44', '+61', '+33', '+49']
        },
        form:{
            phone:"",
            mail:"",
            password:"",
            isSave:false
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
        if(setting.loginPlain.isSave && setting.loginPlain.password){
            that.set(true,"form.isSave");
            that.set(setting.loginPlain.mail || "","form.mail");
            that.set(setting.loginPlain.password || "","form.password");
        }
    } 
},
onReady() {
    
},
methods: {
    goBack(){
        // var that=this;
        // that.navigateBack();
        window.history.back();
    },
    changeLoginType(event){
        var that=this;
        that.loginType = event.detail.value;
    },
    change(event,type){
        var that=this,value=0;
        if(type=="form.isSave"){
            that.set(event.detail.value.length > 0,type);
            return;
        }
        if(type=="areaCode"){
            value=event.detail.value;
            that.set(value,type+".current");
            return;
        }
        console.log([event,type]);
        if(/[\d]/.test(event))value=event;
        that.set(value,type+".current");

    },
    onSubmit(event){
        var that=this,store=that.$store,setting = store&&store.state?store.state.setting:{},value="",rkey="loginPlain",
        data={clientId:setting.clientId,tenantId:setting.tenantId,grantType:"password"};
        
        if(that.loginType === 'phone'){
            value=that.get("form.phone");
            if(!/\d+/.test(value)){that.Alert("手机号码格式无效");return;}
            // 拼接区号和手机号，例如 +86XXXXXXXXXXX
            var code = (that.areaCode && that.areaCode.items && that.areaCode.items[that.areaCode.current]) ? that.areaCode.items[that.areaCode.current] : "";
            data.username= code + value;
            value=that.get("form.password");
            if(!/[\s\S]{6}/.test(value)){that.Alert("密码长度不能少于6位");return;}
            data.password=value;
        }
        if(that.loginType === 'email'){
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
                
                // 处理记住密码逻辑
                var isSave = that.get("form.isSave");
                if(that.loginType === 'email' && isSave){
                    // 保存邮箱和密码
                    store.commit("setSetting",{
                        __path:rkey,
                        __data:{
                            mail:that.get("form.mail"),
                            password:that.get("form.password"),
                            isSave:true
                        }
                    });
                } else {
                    // 清除保存的登录信息
                    store.commit("setSetting",{__path:rkey,__data:{}});
                }
                
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
    .login-type-selector{
        padding:0.5rem 0;
        width:13rem;
    }
    .radio-container{
        display:flex;
        background:rgba(255,255,255,0.05);
        border-radius:8px;
        padding:0.25rem;
        gap:0.25rem;
    }
    .radio-item{
        flex:1;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:0 1rem;
        border-radius:6px;
        background:transparent;
        transition:all 0.3s ease;
        position:relative;
        radio{
            position:absolute;
            opacity:0;
            width:0;
            height:0;
        }
        .radio-text{
            color:rgba(255,255,255,0.6);
            font-size:0.95rem;
            font-weight:500;
            transition:all 0.3s ease;
        }
        &.active{
            background:#08E07F;
            .radio-text{
                color:#FFFFFF;
                font-weight:600;
            }
        }
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
    .remember-password{
        margin-top:1rem;
        margin-bottom:0.5rem;
    }
    .checkbox-label{
        display:flex;
        align-items:center;
        color:#FFFFFF;
        font-size:0.9rem;
    }
    .checkbox-text{
        margin-left:0.5rem;
        color:#08E07F;
    }
    .ctl{
        color:#fff;
    }
}
</style>