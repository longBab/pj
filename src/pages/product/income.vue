<template>
    <view class="Income body" :class="$store.state.setting.theme">
        <navBar :back="back" :title="title">
        </navBar>
        <view class="wrapper">
            <scroll-view scroll-y="true" scroll-x="false">
                <view class="box1">
                    <view class="box1-text">
                        <view class="box1-text-t">
                            {{ $t('总收益') }}
                        </view>
                        <view class="box1-text-money">
                            {{ $t('$28080808080.32') }}
                        </view>
                        <view class="box1-text-n panel">
                            <view class="container box1-text-n-container">
                                <view class="box1-text-n-l">
                                    个人总收益
                                </view>
                                <view class="box1-text-n-r">
                                    {{ $t('53,971,407.27') }}
                                </view>
                                
                            </view>
                            <view class="bdlg"></view>
                        </view>
                    </view>
                    <view class="box1-img">
                        <view class="box1-img-bg"></view>
                    </view>
                </view>
                <view class="panel product-panel wc93">
                    <view class="container product-container">
                        <view class="panel tab-panel">
                            <view class="container tab-container">
                                <view class="dp w100 tab-box">
                                    <view class="f1 active">
                                        天产品
                                    </view>
                                    <view class="f1">
                                        月产品
                                    </view>
                                    <view class="f1">
                                        年产品
                                    </view>
                                    <view class="f1">
                                        年产品
                                    </view>
                                </view>
                            </view>
                            <view class="bdlg"></view>
                        </view>
                        <view class="list">
                            <view class="dp">
                                <view class="f1 title">
                                    7天代投
                                </view>
                            </view>
                            <view class="dp mt5">
                                <view class="dp f1 money">
                                    <text>我的投资额</text>
                                </view>
                                <view>
                                    10000U
                                </view>
                            </view>
                            <view class="dp mt5">
                                <view class="dp f1 money">
                                    <text>最终回报</text>
                                </view>
                                <view>
                                    10700U
                                </view>
                            </view>
                            <view class="dp mt5">
                                <view class="dp f1 money">
                                    <text>最终收益</text>
                                </view>
                                <view>
                                    +700U
                                </view>
                            </view>
                            <view class="dp mt5">
                                <view class="dp f1 money">
                                    <text>支持币种</text>
                                </view>
                                <view class="moneytext">
                                    BTC、ETH、FIL、SOL
                                </view>
                            </view>
                        </view>

                        <view class="list" style="border-bottom: 0;">
                            <view class="dp">
                                <view class="f1 title">
                                    15天高收益
                                </view>
                            </view>
                            <view class="dp mt5">
                                <view class="dp f1 money">
                                    <text>我的投资额</text>
                                </view>
                                <view>
                                    10000U
                                </view>
                            </view>
                        </view>
                        <view class="nodata">
                            沒有更多數據了
                        </view>
                    </view>
                    <view class="bdlg"></view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>
<script>
import navBar from "@/components/navBar.vue";
export default {
    components: {
        navBar
    },
    data() {
        return {
            back: "/pages/member/QView",
            title: "产品收益",
            currency: "",
            status: "",
            path: "",
            rows: []
        };
    },
    onReady() {

    },
    onLoad(sender) {
        var that = this, sender = sender || {};
        that.sender = sender;
        that.load(sender);
    },
    methods: {
        load(sender) {
            var that = this, sender = that.sender || sender || {};

        }

    },
};
</script>
      
<style lang="scss" scoped>
.split-row {
    .cc {
        font-size: 1.1rem;
    }
}

.Income {
    .wrapper {
        justify-content: flex-start;
        height: calc(100% - 6vh);
        padding: 6vh 0rem 0 0rem;
        color: #fff;

        .box1 {
            display: flex;

            .box1-text {
                position: fixed;
                top:4.5rem;
                width:70%;
                padding-left: 1.5rem;
                left:0prx;
                z-index: 1;
                flex: 1;
                text-align: left;

                .box1-text-t {
                    color:#0EFFB0;
                    margin-top: 0.8rem;
                    font-size: 1rem;
                    font-weight: 600;
                }

                .box1-text-money{
                    color:#0EFFB0;
                    margin-top: 0.8rem;
                    font-size: 1rem;
                    font-weight: 600;

                }

                .box1-text-n {
                    width:auto;
                    font-size: 0.8rem;
                    margin-top: 0.8rem;
                    height: 2rem;
                    line-height: 2rem;
                    align-content:center;
                    margin: 1.2rem auto;
                    text-align: center;
                    border-radius: 10px;
                    background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
                    .box1-text-n-container{
                        width:auto;
                        color:#0EFFB0;
                        padding-left: 0.5rem;
                        justify-content: left;
                        .box1-text-n-l{

                        }
                        .box1-text-n-r{
                            margin-left: 0.5rem;
                        }
                    }

                }
            }

            .box1-img {
                position: fixed;
                right: 0;
                z-index: 0;
                height: 13rem;
                width: 16rem;

                .box1-img-bg {
                    height: 13rem;
                    width: 16rem;
                    background: url(/static/images/products/p3.png) center center no-repeat;
                    background-size: 16rem 13rem;
                }
            }
        }
        .product-panel {
            margin-top: 12rem;
            height: 19rem;

            .product-container {
                display: block;
                padding-left: 1.3rem;
                padding-right: 1.3rem;

                .tab-panel {
                    width: 100%;
                    height: 1.7rem;
                    margin:  1.2rem 0 0 0;
                    border-radius: 0.75rem;
                    clip-path: inset(0 round 13px);
                }

                .tab-container {
                    text-align: center;

                    .tab-box {
                        margin-top: -0.05rem;
                        margin-left: -0.1rem;
                        font-size: 0.68rem;
                        height: 1.7rem;
                        line-height: 1.7rem;

                        .active {
                            background-color: #0EFFB0;
                            border-radius: 0.65rem;
                            color: #000000;
                            font-weight: bold;
                        }
                    }
                }
            }

            .list {
                border-bottom: 1rpx dashed #0EFFB099;
                padding-bottom: 1rem;
                font-size: 0.65rem;
                padding-top: 0.5rem;

                .title {
                    font-size: 0.8rem;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    color:#0EFFB0;
                }

                .money {

                }
                
                .moneytext{
                    color : #FFFFFFB2;
                }
            }
        }
    }

    uni-scroll-view {
        height: calc(100vh - 6vh);
    }


}</style>