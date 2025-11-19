<template>
    <view class="myproduct body" :class="$store.state.setting.theme">
        <navBar :back="back" :title="title">
        </navBar>
        <view class="wrapper">
            <scroll-view scroll-y="true" scroll-x="false">
                <view class="wc93 money-panel">
                    <view class="title">
                        {{ $t('总配置金额') }}
                    </view>
                    <view class="money">
                        {{ $t('30020U') }}
                    </view>
                    <view class="dp s-wrapper">
                        <view class="f1"></view>
                        <view class="dp s-container">
                            <view class="f1">
                                项目数
                            </view>
                            <view class="f1 num">
                                200
                            </view>
                        </view>
                    </view>
                </view>
                <view class="mt10 wc93 products-panel">
                    <view class="dp w100 tab">
                        <view class="f1 btn active">
                            <view>全 部</view>
                            <view class="line"></view>
                        </view>
                        <view class="f1 btn">
                            <view>众筹中</view>
                            <view class="line"></view>
                        </view>
                        <view class="f1 btn">
                            <view>待启动</view>
                            <view class="line"></view>
                        </view>
                        <view class="f1 btn">
                            <view>进行中</view>
                            <view class="line"></view>
                        </view>
                    </view>
                    <view class="mt5 list">
                        <view class="dp r1">
                            <view class="f1 title">
                                7天代投
                            </view>
                            <view class="status">
                                已完成
                            </view>
                        </view>
                        <view class="dp mt5 r2">
                            <view class="dp f1">
                                <text>完成度:&nbsp;</text>
                                <text class="money">
                                    10000
                                </text>
                                <text>
                                    /
                                </text>
                                <text>
                                    10000
                                </text>
                                <text>
                                    USDT
                                </text>
                            </view>
                            <view class="d">
                                截止: 2025-07-03
                            </view>
                        </view>
                        <view class="mt5 r3">
                            <view class="progress">
                                <view class="active" style="width:30%"></view>
                            </view>
                        </view>

                        <view class="mt5 dp r1">
                            <view class="f1 title">
                                7天代投
                            </view>
                            <view class="status">
                                已完成
                            </view>
                        </view>
                        <view class="dp mt5 r2">
                            <view class="dp f1">
                                <text>完成度:&nbsp;</text>
                                <text class="money">
                                    10000
                                </text>
                                <text>
                                    /
                                </text>
                                <text>
                                    10000
                                </text>
                                <text>
                                    USDT
                                </text>
                            </view>
                            <view class="d">
                                截止: 2025-07-03
                            </view>
                        </view>
                        <view class="mt5 r3">
                            <view class="progress">
                                <view class="active" style="width:30%"></view>
                            </view>
                        </view>
                    </view>

                    <view class="nodata">沒有更多數據了</view>

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
            title: "我的产品",
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
.myproduct {
    .wrapper {
        justify-content: flex-start;
        height: calc(100% - 6vh);
        padding: 6vh 0rem 0 0rem;
        color: #fff;

        .money-panel {
            padding: 0 2rem;
            background: linear-gradient(rgba(0, 0, 0, 0.585), rgba(0, 0, 0, 0.585)), url(/static/images/products/p4.png) center center no-repeat;
            background-size: 100% 100%;
            border-radius: 0.3rem;
            border: 1px solid;
            border-image-source: linear-gradient(109deg, #00FFFF -29.08%, #000000 46.11%, #00FFBD 117.09%);

            .title {
                text-align: right;
                height: 2rem;
                line-height: 2rem;
                font-size: 0.8rem;
            }

            .money {
                text-align: right;
                color: #0EFFB0;
                font-size: 1.2rem;
                height: 2rem;
                line-height: 2rem;
            }

            .s-wrapper {
                height: 2rem;
                justify-content: center;
                align-items: center;
                line-height: 2rem;

                .s-container {
                    width: 4rem;
                    height: 1.2rem;
                    line-height: 1.2rem;
                    text-align: center;
                    border: 1px solid #ffffff;
                    font-size: 0.5rem;
                    border-radius: 0.7rem;

                    .num {
                        background-color: #0EFFB0;
                        border-radius: 40rpx;
                        color: #000000;
                        font-weight: bold;
                        font-size: 0.6rem;
                    }
                }
            }
        }

        .products-panel {
            min-height: 6rem;
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid transparent;
            background-image: linear-gradient(to bottom, #000000 0%, #121a24dd 100%), linear-gradient(180deg, #3BD3D344, transparent);
            background-origin: border-box;
            background-clip: padding-box, border-box;

            .tab {
                justify-content: center;
                align-items: center;
                text-align: center;

                .btn {
                    .line {
                        width: 30%;
                        text-align: center;
                        height: 1.5px;
                        margin: 0.2rem auto;
                    }
                }

                .active {
                    color: #0EFFB0;

                    .line {
                        background: linear-gradient(90deg, #00FFBD 40%, #000000 100%);
                    }
                }

            }
        }

        .products-panel {
            min-height: 6rem;
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid transparent;
            background-image: linear-gradient(to bottom, #000000 0%, #121a24dd 100%), linear-gradient(180deg, #3BD3D344, transparent);
            background-origin: border-box;
            background-clip: padding-box, border-box;

            .tab {
                justify-content: center;
                align-items: center;
                text-align: center;

                .btn {
                    .line {
                        width: 30%;
                        text-align: center;
                        height: 2.5px;
                        margin: 0.2rem auto;
                    }
                }

                active {
                    color: #0EFFB0;

                    .line {
                        background: linear-gradient(90deg, #00FFBD 40%, #000000 100%);
                    }
                }

            }

            .list {
                padding-bottom: 0.5rem;
                .r1 {
                    border-top: 1rpx dashed #0EFFB099;
                    padding-top: 0.5rem;

                    .title {
                        font-size: 0.8rem;
                        color: #0EFFB0;
                    }

                    .status {
                        color: #B0A8A8
                    }
                }

                .r2 {
                    .money {
                        color: #0EFFB0;
                    }

                    .d {
                        color: #B0A8A8
                    }
                }

                .r3 {
                    
                    padding-bottom: 0.5rem;
                    .progress {
                        width: 100%;
                        border-radius: 0.65rem;
                        height: 0.25rem;
                        background-color: #726B6B;

                        .active {
                            width: 35%;
                            border-radius: 0.65rem;
                            height: 0.25rem;
                            background-color: #0EFFB0;

                        }
                    }
                }
            }
        }

    }

    uni-scroll-view {
        height: calc(100vh - 6vh);
    }


}</style>