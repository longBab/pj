<template>
	<view class="start body">
        <!--
        <image class="fixed-top-png" src="/static/images/start/bg.png" mode="widthFix"></image>
        <image class="fixed-bottom-png" src="/static/images/start/bg.png" mode="widthFix"></image>
        -->
        <view class="wrapper">
            <view class="loader">
                <view class="logo"></view>
                <view class="enter" v-if="isEnter">
                     <u-form class="form" ref="uForm" :model="form">
                        <u-form-item :border-bottom="false">
                            <u-input v-model="form.account" :placeholder="$t('准入码')" />
                            <view class="arrow-right-wrapper" @click="gotoPage('login')">
                                <u-icon name="arrow-right" color="#000" size="20"></u-icon>
                            </view>
                        </u-form-item>
                    </u-form>
                </view>
                <view class="version">{{version}}</view>
            </view>
        </view>
    </view>
</template>
<style lang="scss"  scoped>
.start{ 
    ::v-deep .u-form-item{padding:0.6rem 0 0.6rem 0;width:100%;}
    ::v-deep .u-form-item--left__content__icon {
        display: flex;
    }
    ::v-deep .u-input__input{color:#fff;}
    
    ::v-deep .u-form-item__body {
        display: flex;
        background: #011a12;
        border: 1px solid #417B68;
        padding: 0.1rem 0.3rem;
        border-radius: .4rem;
    }
    .fixed-bottom-png {
        position: fixed;
        bottom: 0px;
        left: 0px;
        z-index: 2;
        width: 300rpx;
        transform: rotate(180deg);
    }
    .fixed-top-png {
        width: 300rpx;
        position: fixed;
        top: 0px;
        right: 0px;
        z-index: 2;
    }
    .loader{
        width:70%;
        text-align: center;
        color:#fff;
        .logo{
            height:5rem;
            background:url(../static/images/logo.png) center center no-repeat;
            background-size:8rem auto;
            overflow:hidden;
        }
       
    }
    &.body.light{
        background:#fff;
        .loader{
            color:#000;
            .logo{background-image:url(../static/images/logo-light.png);}
        }
    }
    
}
</style>
<script>
export default {
    data() {
        return {
            form:{
                
            },
          version:"0.0.0",
          isEnter:true
        }
    },
    onLoad(sender) {
            var that = this,sender=sender||{},globalData=getApp().globalData||{};
            that.version=globalData.version;
            that.sender=sender;
            that.load(sender); 
    },
    methods: {
        async load(sender){
            var that=this,sender=that.sender||sender||{};
        } 
    }
}
</script>
