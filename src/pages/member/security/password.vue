<template>
	<view class="password body" :class="$store.state.setting.theme">
		<navBar :title="title" :back="back"></navBar>
		<view class="wrapper">
            <u-form class="form s01" ref="uForm" :model="form" >

                <view class="label" >{{$t('登陆密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.password" :placeholder="$t('请输入登陆密码')" />
                </u-form-item>

                <view class="label" >{{$t('新登陆密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.newPassword" :placeholder="$t('请输入新登陆密码')" />
                </u-form-item>

                <view class="label" >{{$t('确认新登陆密码')}}</view>
                <u-form-item :border-bottom="false">
                    <u-input type="password" v-model="form.reNewPassword" :placeholder="$t('请输入确认新登陆密码')" />
                </u-form-item>
                <view class="ctl"><button class="btn" @click="submit($event)">确认修改</button></view>
            </u-form>
		</view>
	</view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  components: {navBar},
		data() {
			return {
				back:"/pages/member/security",
				title:"修改登陆密码",
                form:{
                    password:"",
                    newPassword:"",
                    reNewPassword:""
                }
			};
		},
	onLoad(sender) {
		var that = this;
		that.sender=sender;
		that.load(sender);
  	},
	methods: {
		load(sender){
      		var that=this,sender=that.sender||sender||{},id=sender.id;
    	},
        submit(event){
            var that=this;
            that.transfer.request({
              url: "POST app/member/security/password",
              data:that.get("form"),
              headers:{'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then((resp) => {
              var data = resp.data;
              data = data.data || data;
              that.Alert("密码修改成功");
              that.extend({form:{
                    password:"",
                    newPassword:"",
                    reNewPassword:""
                }});
                setTimeout(()=>{
                    that.gotoPage(that.get("back"));
                },3000)
            });

        }
	},
};
</script>

<style lang="scss" scoped>
.password {
    .form{width:90%;margin:0 auto;}
    .form{
        color:#fff;
        ::v-deep .u-form-item{padding:0.6rem 0 0.6rem 0;width:100%;}
        ::v-deep .u-form-item--left__content__icon {
        display: flex;
        }
        ::v-deep .u-input__input{color:#fff;}
        ::v-deep .u-form-item__body {
        display: flex;
        background: transparent;
        border: 1px solid #417B68;
        padding: 0.1rem 0.3rem;
        border-radius: .4rem;
        }
        ::v-deep .u-tabs {
        background: transparent !important;
        }
        ::v-deep .u-tab-item{
        font-size: 0.75rem !important;
        font-weight:normal !important;
        }
        .btn{font-weight:bold;line-height:2rem;font-size:.7rem;}

    }
   


}
 
</style>