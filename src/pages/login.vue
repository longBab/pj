<template>
<view class="login body">
    <view class="wrapper">
        <view class="panel">
            <view class="logo">
                <view class="image"></view>
            </view>
            <view class="title">欢迎登录</view>
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
            <u-form class="form" ref="uForm" :model="form" >
                
                <view class="label" v-if="way.current==0">{{$t('手机号码')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==0">
                    <picker :range="areaCode.items" @change="change($event,'areaCode')">
                        <view class="area-code">
                            <text class="value">{{areaCode.items[areaCode.current]}}</text>
                            <!--<text class="arrow">▼</text>-->
                        </view>
					</picker>
                    <u-input type="number" v-model="form.phone" :placeholder="$t('请输入手机号码')" />
                </u-form-item>

                <view class="label" v-if="way.current==1">{{$t('邮箱地址')}}</view>
                <u-form-item :border-bottom="false" v-if="way.current==1">
                    <u-input v-model="form.mail" :placeholder="$t('请输入邮箱地址')" />
                </u-form-item>

                <view class="label">{{$t('密码')}}</view>
                <u-form-item  :border-bottom="false">
                    <u-input type="password" v-model="form.password" :placeholder="$t('密码')" />
                    <view class="right-btn" @click="gotoPage('service?back=/pages/login')">忘记密码？</view>
                </u-form-item>
            </u-form>
            <view class="ctl">
                <checkbox-group @change="change($event,'form.isSave')">
                    <label class="checkbox-label">
                        <checkbox style="transform:scale(0.5)" :checked="form.isSave" color="#0EFFB0" />
                        <text>记住密码</text>
                    </label>
                </checkbox-group>
            </view>
            <view class="ctl">
                <button class="btn bdr05 bggr01" @click="onSubmit($event)">{{$t('立即登录')}}</button>
            </view>
           
            
            <view class="ctl info" >
                <text @click="gotoPage('register')">注册帐号</text> 
                <text @click="gotoPage('forget')">忘记密码</text>
            </view>
            <view class="ctl version">{{version}}</view>
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
                    { name: '手机' },
                    { name: '邮箱' }
                ],textMaps:{
                    "0":"手机",
                    "1":"邮箱"
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
        var that=this,store=that.$store,setting = store&&store.state?store.state.setting:{},current=0,value="",rkey="loginPlain",
        data={clientId:setting.clientId,tenantId:setting.tenantId,grantType:"password"};
        store.commit("setSetting",{__path:rkey,__data:{}});
        if(that.way.current==0){
            current=that.get("areaCode.current");
            value=that.get("form.phone");
            if(!/\d+/.test(value)){that.Alert("手机号码格式无效");return;}
            data.username=that.get("areaCode.items")[current]+value;
        }
        if(that.way.current==1){
            value=that.get("form.mail");
            if(!/[^@]+@[^@]+/.test(value)){that.Alert("邮箱地址格式无效");return;}
            data.username=value;
        }
        value=that.get("form.password");
        if(!/[\s\S]{6}/.test(value)){that.Alert("密码长度不能少于6位");return;}
        data.password=value;
        
        that.transfer.request({
              url: "POST auth/login",data:data
          })
          .then((resp) => {
                var data = resp.data;
                data = data.data||data;
                if(that.get("form.isSave")){
                    store.commit("setSetting",{__path:rkey,__data:{
                        phone:that.get("form.phone"),
                        mail:that.get("form.mail"),
                        password:that.get("form.password")
                    }});
                }
                store.commit("setUser",{id:data.access_token,token:data.access_token});
                that.gotoPage('home'); 
        });
        
        //console.log([that.get("areaCode.items")[0],data]);
        


        //this.gotoPage('home');
    }
},
};
</script>

<style lang="scss" scoped>
.tab-panel{
    padding:0.22rem 0.5rem 1.5rem 0.5rem;
}

.login {
    .form,.ctl{
        width: 90%;
        margin: 0 auto;
    }
    .ctl{
        color:#fff;
        height:2rem;
        line-height:1.2rem;
        
    }
    .CKBox{display: inline-block;vertical-align: middle;}

    
}
</style>