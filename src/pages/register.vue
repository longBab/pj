<template>
<view class="register body">
    <view class="wrapper">
        <view class="header">
            <image class="logo-icon" src="/static/images/Group48095820.png" mode="widthFix" />
            <view class="close-btn" @click="goBack">
                <u-icon name="close" color="#08E07F" size="20"></u-icon>
            </view>
        </view>
        <view class="panel" style="padding:1rem;margin-top:-1rem; height:40rem; ">
            <view class="title" style="color:#08E07F;">{{$t(way.textMaps[way.current]+'注册')}}</view>
            <view class="register-tabs">
                <view 
                    class="tab-item" 
                    :class="{ active: way.current === 0 }"
                    @click="change(0)"
                >
                    <text>{{ $t('手机') }}</text>
                    <view v-if="way.current === 0" class="tab-underline"></view>
                </view>
                <view 
                    class="tab-item" 
                    :class="{ active: way.current === 1 }"
                    @click="change(1)"
                >
                    <text>{{ $t('邮箱') }}</text>
                    <view v-if="way.current === 1" class="tab-underline"></view>
                </view>
            </view>
            <scroll-view scroll-y="true" scroll-x="false">
            <u-form class="form" ref="uForm" :model="form">
                <view class="label" v-if="way.current==0">{{$t('手机号码')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==0">
                    <picker :range="areaCode.items" @change="change($event,'areaCode')">
                        <view class="area-code">
                            <text class="value">{{areaCode.items[areaCode.current]}}</text>
                        </view>
					</picker>
                    <u-input type="number" v-model="form.phone" :placeholder="$t('请输入手机号码')" />
                </u-form-item>

                <view class="label" v-if="way.current==1">{{$t('邮箱地址')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==1">
                    <u-input v-model="form.mail" :placeholder="$t('请输入邮箱地址')" />
                </u-form-item>

                <view class="label">{{$t('验证码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="number" v-model="form.code" :placeholder="$t('请输入验证码')" />
                    <view class="code-btn" @click="sendVerify($event)">{{senderCode}}</view>
                </u-form-item>

                <view class="label">{{$t('设置密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.password" :placeholder="$t('请输入密码')" />
                </u-form-item>
                <view class="label">{{$t('确认密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.rePassword" :placeholder="$t('请再次输入密码')" />
                </u-form-item>

                <view class="label">{{$t('设置支付密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.passwordX" @input="onInput($event,'form.passwordX')" :placeholder="$t('请输入6位数字支付密码')" />
                </u-form-item>
                <view class="label">{{$t('确认支付密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.rePasswordX" @input="onInput($event,'form.passwordX')" :placeholder="$t('请再次输入支付密码')" />
                </u-form-item>

                <view class="label">{{$t('邀请码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.inviteCode" :placeholder="$t('请输入邀请码')" />
                </u-form-item>
                
                <view class="ctl">
                    <button class="btn-login" @click="onSubmit($event)">{{$t('立即注册')}}</button>
                </view>
                <view class="ctl login-link">
                    <text>{{$t('已有账号')}}？</text>
                    <text class="login-text" @click="gotoPage('login')">{{$t('立即登陆')}}</text>
                </view>
            </u-form>
            </scroll-view>
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
            senderCode:'获取验证码',
            inputStyle:{color:'#000'},
            way: {
                current:0,
                items:[
                    { name: '手机' },
                    { name: '邮箱' }
                ],textMaps:{
                    "0":"手机",
                    "1":"邮箱"
                },nameMaps:{
                    "0":"mobile",
                    "1":"mail"
                }
            },
            areaCode:{
                current:0,
                items: ['+86', '+852', '+853', '+886', '+81', '+82', '+60', '+65', '+66', '+84', '+63', '+62', '+91', '+1', '+44', '+61', '+33', '+49']
            },
            
            form: {
                phone:"",
                mail:"",
                password:"",
                rePassword:"",
                passwordX:"",
                rePasswordX:"",
                code:"",
                inviteCode:""
            },
        
        }
    },
    onLoad(sender) {
        let that=this;
        // 从路由参数中读取推荐码，优先 ref，其次兼容原来的 code 字段
        let _sender = sender || {};
        let invite = _sender.ref || _sender.code || "";
        that.extend({form:{inviteCode:invite},senderCode:that._senderCode});
    },
    methods: {
        goBack(){
            var that=this;
            that.navigateBack();
        },
        sendVerify(event) {
            var that = this,url,data={},
            current=that.get("way.current"),way=that.get("way.nameMaps")[current],
            areaCode,url,data;
            current=that.get("areaCode.current"),areaCode=that.get("areaCode.items")[current];
            url="resource/sms/code";
            data={
                phonenumber: areaCode+that.get("form.phone"),
                type:1,
                mediaType:1
            }
            if(way=="mail"){
                data.phonenumber=that.get("form.mail");
                data.mediaType=2;
            }
           
            //resource/sms/code?phonenumber=%2B86133084400001&type=1&mediaType=1
            //console.log([way,data]);return false;
            that.transfer
            .request({
            url: "GET "+url,
            data: data,
            })
            .then((resp) => {
              
            var data = resp.data || {},
                data = data.data || data,
                index = data.expire || 120;
                console.log(data);
            if (that.timer) clearInterval(that.timer);
            that.timer = setInterval(function () {
                that.senderCode = index;
                index--;
                if (index <= 0) {
                that.senderCode = that.$t(that._senderCode||"0");
                clearInterval(that.timer);
                }
            }, 1000);
            });
        },
        onInput(event,type) {
            // 使用正则表达式移除非数字字符
            var that=this,value=event.detail?event.detail.value:event;
            //console.log(["ww",event]);
             that.set(value.replace(/[^\d]/g, ''),type);
           
        },
        onSubmit() {
            var that = this,url,
            current=that.get("way.current"),way=that.get("way.nameMaps")[current],
            areaCode,url,data,value;
            current=that.get("areaCode.current"),areaCode=that.get("areaCode.items")[current];
            url="api/user/register";
            data={
                code:that.get("form.code"),
                password:that.get("form.password"),
                confirmPassword:that.get("form.rePassword"),
                payPassword:that.get("form.passwordX"),
                confirmPayPassword:that.get("form.rePasswordX"),
                invitationCode:that.get("form.inviteCode")
            }
            if(that.way.current==0){
                current=that.get("areaCode.current");
                value=that.get("form.phone");
                if(!/\d+/.test(value)){that.Alert("手机号码格式无效");return;}
                data.phone=areaCode+value;
            }
            if(that.way.current==1){
                value=that.get("form.mail");
                if(!/[^@]+@[^@]+/.test(value)){that.Alert("邮箱地址格式无效");return;}
                data.email=value;
            }
            if(!/[\s\S]{4}/.test(that.get("form.code"))){that.Alert("验证格式无效");return;}
            if(!/[\s\S]{6}/.test(that.get("form.password"))){that.Alert("密码长度不能少于6位");return;}
            if(that.get("form.password")!=that.get("form.rePassword")){that.Alert("确认密码与密码不一致");return;}

            if(!/^[\d]{6}$/.test(that.get("form.passwordX"))){that.Alert("支付密码为6位数字");return;}
            if(that.get("form.passwordX")!=that.get("form.rePasswordX")){that.Alert("确认支付密码与支付密码不一致");return;}

            if(!/[\s\S]{4}/.test(that.get("form.inviteCode"))){that.Alert("邀请码格式无效");return;}

            if(that.get("form.password")==that.get("form.passwordX")){that.Alert("登陆密码与支付密码不能一致");return;}
            that.transfer.request({
            url:"POST "+url,
            data: data,
           /* headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            */
            })
            .then((resp) => {
            let data = resp.data || resp;
            console.log(["register",data]);
            data = data.data || data;
            //store.commit("setUser", data);
            that.gotoPage("login");
            });
            

        },
        change(event,type){
            var that=this,type=type||"way",value=0;
            if(type=="areaCode"){
                value=event.detail.value;
            }
            console.log([event,type]);
            if(/[\d]/.test(event))value=event;
            that.set(value,type+".current");

        }
        
    }
}
</script>
     
<style lang="scss" scoped>
.register {
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
        justify-content:flex-start;
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
        height:calc(100vh - 8rem);
        display:flex;
        flex-direction:column;
    }
    .title{
        font-size:1rem;
        font-weight:700;
        color:#08E07F !important;
        margin-bottom:1.3rem;
        text-align:center;
        line-height:1.5rem;
    }
    .register-tabs{
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
    .login-link{
        text-align:center;
        margin-top:1.5rem;
        font-size:0.9rem;
        color:#FFFFFF;
        display:flex;
        justify-content:center;
        align-items:center;
        text{
            color:#FFFFFF;
        }
        .login-text{
            color:#08E07F;
            text-decoration:underline;
        }
    }
    .ctl{
        color:#fff;
    }
    uni-scroll-view {
        max-height:calc(100vh - 20rem);
    }
}
</style>