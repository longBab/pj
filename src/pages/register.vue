<template>
<view class="register body">
    <view class=" wrapper">
        <view class="panel">
            <view class="logo">
                <view class="image"></view>
            </view>
            <view class="title">{{$t(way.textMaps[way.current]+'注册')}}</view>
            <u-tabs class="tabs"
                    :list="way.items"    
                    :current="way.current"
                    :is-scroll="false"
                    :lineWidth="100"
                    :lineHeight="16"
                    active-color="#0EFFB0" 
                    inactive-color="#FFFFFFB2" 
                    @change="change" 
             />
            <scroll-view scroll-y="true" scroll-x="false">
            <u-form class="form" ref="uForm" :model="form">
                <view class="label"  v-if="way.current==0">{{$t('手机号码')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==0">
                    <picker  :range="areaCode.items" @change="change($event,'areaCode')">
                        <view class="area-code">
                            <text class="value">{{areaCode.items[areaCode.current]}}</text>
                            <!--<text class="arrow">▼</text>-->
                        </view>
					</picker>
                    <u-input v-model="form.phone" :placeholder="$t('请输入手机号码')" />
                </u-form-item>

                <view class="label"  v-if="way.current==1">{{$t('邮箱地址')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==1">
                    <u-input v-model="form.mail" :placeholder="$t('请输入邮箱地址')" />
                </u-form-item>

                <view >{{$t('验证码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.code" :placeholder="$t('验证码')" />
                    <view class="right-btn" @click="sendVerify($event)">{{senderCode}}</view>
                </u-form-item>
                <view class="label">{{$t('设置密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.password" :placeholder="$t('设置密码')" />
                </u-form-item>
                <view class="label">{{$t('确认密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.rePassword" :placeholder="$t('确认密码')" />
                </u-form-item>
                <view class="label">{{$t('邀请码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input v-model="form.inviteCode" :placeholder="$t('邀请码')" />
                </u-form-item>
            </u-form>
            </scroll-view>
            <view class="ctl">
                <button class="btn bdr05 bggr01" @click="onSubmit($event)">{{$t('立即注册')}}</button>
            </view>
            <view class="ctl info" >
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
                code:"",
                inviteCode:""
            },
        
        }
    },
    onLoad(sender) {
        let that=this;
        that.extend({form:{inviteCode:sender.code},senderCode:that._senderCode});
    },
    methods: {
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
            if(!/[\s\S]{4}/.test(that.get("form.inviteCode"))){that.Alert("邀请码格式无效");return;}
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

.register{
    .wrapper{
        justify-content: flex-start;
        padding: 3.5rem 0 0 0;
        color:#fff;
    }
    .panel{
        height:97%;
    }
    
    uni-scroll-view {
        height:calc(100% - 14.8rem);
    }
    
}
</style>