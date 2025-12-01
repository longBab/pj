<template>
    <view :data-theme="systemStyle">
        <view class="header" >
            <view class="left" @click="goBack($event)"><text>.</text></view>
            <view class="title" ><text v-if="false">{{ $t('换兑客服') }}</text></view>
        </view>
        <cu-custom class="text-white" :isBack="true" fixed>
            <block slot="content"></block>
        </cu-custom>
        <view class="padding content flex align-center flex-direction justify-center">
        <!-- <web-view :src="config.format_customer_service_url"></web-view> -->
            <web-view src="/src/hybrid/html/serviceChangeX.html"></web-view>
        </view>
    </view>
    </template>
    <script>
    import { mapGetters } from "vuex";
    export default {
        computed: mapGetters(['systemStyle']),
        data() {
            return {
                
            }
        },
        methods:{
            goBack(event){
                var that=this;
                that.gotoPage("/pages/member/exchange");
            }
        }
    }
    </script>
    <style lang="scss">
    .header{
        position: absolute;
        width:100%;
        left: 0;
        top: 30rpx;
        z-index: 99999;
        font-size: 40rpx;
        font-family: system-ui;
        line-height: 80rpx;
        display: flex;
        color: #fff;
        .left{
            padding:0 0 0 10rpx;
            width:100rpx;
        }
        .title{
            width:calc(100% - 200rpx);
            text-align: center;
        }
    }
</style>
    