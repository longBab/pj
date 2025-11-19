<template>
    <view class="products body" :class="$store.state.setting.theme">
        <navBar :back="back" :title="title">
        </navBar>
        <view class="wrapper">
            <view class="mt5 wc93 income-panel">
                <view class="title">
                    当前组合年华收益率（预估）
                </view>
                <view class="percentage">
                    36,011.9373%
                </view>
                <view class="des">
                    数据由链上真实成交与 AI 回测综合计算，仅作策略表现参考。
                </view>
                <view class="dp mt5 board">
                    <view class="f1 box">
                        <view>当前托管本金</view>
                        <view class="money">24,146.30 U</view>
                    </view>
                    <view class="f1 box">
                        <view>今日已实现收益</view>
                        <view class="money">+760.00 U</view>
                    </view>
                    <view class="f1 box">
                        <view>当前托管本金</view>
                        <view class="money">97.60%</view>
                    </view>
                </view>
            </view>
            <view class="mt5 dp wc93 t1">
                <view class="f1 t">
                    请选择量化周期
                </view>
                <view class="des">
                    <view class="panel des-panel">
                        <view class="container des-container">
                            <view class="text">
                                托管随进随出 · 到期可续约
                            </view>
                        </view>
                        <view class="bdlg bdlg-cp20"></view>
                    </view>
                </view>
            </view>
            <view class="mt5 wc93 tab">
                <view class="panel tab-panel">
                    <view class="container tab-container">
                        <view class="tab-wp">
                            <view class="dp row">
                                <view class="f1 active">
                                    7天 · 入门
                                </view>
                                <view class="f1">
                                    15天 · 加强
                                </view>
                                <view class="f1">
                                    30天 · 稳健
                                </view>
                                <view class="f1">
                                    60天 · 进阶
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="bdlg bdlg-cp20"></view>
                </view>
            </view>
            <scroll-view scroll-y="true" scroll-x="true">
                <view class="list">
                    <view class="item">
                        <view class="panel item-panel item-active">
                            <view class="container item-container">
                                <view class="box">
                                    <view class="title">24 小时快返</view>
                                    <view class="dp">
                                        <view class="f1">
                                            日化区间
                                        </view>
                                        <view style="color:#0EFFB0;">
                                            0.40% - 2.00%
                                        </view>
                                    </view>
                                    <view class="dp">
                                        <view class="f1">
                                            结算方式
                                        </view>
                                        <view style="color:#0EFFB0;">
                                            T+1 复利
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="bdlg"></view>
                        </view>
                    </view>

                    <view class="item" v-for="(item, i) in rows" :key="i">
                        <view class="panel item-panel">
                            <view class="container item-container">
                                <view class="box">
                                    <view class="title">24 小时快返</view>
                                    <view class="dp">
                                        <view class="f1">
                                            日化区间
                                        </view>
                                        <view style="color:#0EFFB0;">
                                            0.40% - 2.00%
                                        </view>
                                    </view>
                                    <view class="dp">
                                        <view class="f1">
                                            结算方式
                                        </view>
                                        <view style="color:#0EFFB0;">
                                            T+1 复利
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="bdlg"></view>
                        </view>
                    </view>
                </view>
            </scroll-view>


            <view class="mt10 wc93 buy">
                <view class="panel buy-panel">
                    <view class="container">
                        <view class="dp box">
                            <view class="f1 col1">
                                <view>
                                    您当前选择的收益方案
                                </view>
                                <view class="title">
                                    60 天进阶收益
                                </view>
                                <view class="des">
                                    家期进阶策略，净值波动 相对
                                </view>
                            </view>
                            <view class="col2" @click="gotoPage('/pages/product/detail')">
                                <view class="dp btn">
                                    确认并进入产品
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="bdlg"></view>
                </view>
            </view>
            <view class="nodata mt5 wc93">
                风险提示：以上为策略目标区间，并非固定收益承诺。实际表现受市场波动、流动性以 及成交滑点影响，以系统最终结算结果为准。
            </view>
        </view>
        <mrFooter page="products" />
    </view>
</template>
<script>
import navBar from "@/components/navBar.vue";
import mrFooter from "@/components/footer";
import navLanguage from "@/components/navLanguage";
export default {
    components: {
    mrFooter,
    navBar,
    navLanguage
    },
    data() {
        return {
            back: "/pages/home",
            title: "产品",
            currency: "",
            status: "",
            path: "",
            rows: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
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
.products {
    .wrapper {
        justify-content: flex-start;
        height: calc(100% - 6vh);
        padding: 6vh 0rem 0 0rem;
        color: #fff;

        .income-panel {
            background: radial-gradient(141.52% 176.06% at -23.26% 15.47%, #1a6b5167 0%, #0b213139 47.64%, #16669f3b 100%),
                linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #00000000 100%);
            border: 1px solid #2abdbd2d;
            border-width: 1px;
            border-radius: 10px;
            backdrop-filter: blur(2px);
            padding: 0.8rem 0.3rem;

            .title {
                text-align: center;
                font-size: 0.7rem;
            }

            .percentage {
                text-align: center;
                font-size: 1.2rem;
                margin-top: 0.2rem;
            }

            .des {
                margin-top: 1rem;
                text-align: center;
            }

            .board {
                text-align: center;

                .box {
                    height: 3.5rem;
                    backdrop-filter: blur(24px);
                    padding-top: 0.7rem;
                    margin: 0 0.2rem;
                    border-radius: 8px;
                    border: 1px solid transparent;
                    background-image: linear-gradient(to bottom, #000000cc 0%, #121a2488 100%), linear-gradient(180deg, #3BD3D344, transparent);
                    background-origin: border-box;
                    background-clip: padding-box, border-box;

                    .money {
                        margin-top: 0.2rem;
                    }
                }
            }
        }

        .t1 {
            .t {
                font-size: 0.7rem;
            }

            .des {
                .des-panel {
                    height: 1.2rem;
                    width: 7rem;
                    font-size: 0.5rem;
                    border-radius: 1rem;

                    .des-container {
                        height: 1.2rem;
                        line-height: 1.2rem;
                        border-radius: 1rem;

                        .text {
                            margin-top: -1px;
                        }
                    }
                }
            }
        }

        .tab {
            .tab-panel {
                height: 2rem;
                width: 100%;
                font-size: 0.5rem;
                border-radius: 1rem;

                .tab-container {
                    height: 2rem;
                    line-height: 2rem;
                    border-radius: 1rem;

                    .tab-wp {
                        margin-top: -1px;
                        width: 100%;

                        .row {
                            text-align: center;
                            font-weight: bold;
                            font-size: 0.6rem;
                            padding-right: 2px;

                            .active {
                                background: linear-gradient(270deg, #0EFFB1 0%, #31B9D4 100%);
                                border-radius: 20px;
                                margin-top: 1px;
                                color: #000000;
                                height: 1.8rem;
                                line-height: 1.8rem;
                                font-size: 0.7rem;
                            }
                        }
                    }
                }
            }
        }

        .list {
            display: flex;
            flex-wrap: wrap;
            padding: 0 0.5rem;

            .item {
                margin: 0.5rem 0 0.25rem 0;
                width: 50%;
                padding: 0 0.4rem;

                .item-active {
                    border: 0.8px solid;
                    border-image-source: linear-gradient(0deg, #00FFAB, #00FFAB),
                        linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
                    box-shadow: 0px 0px 1.09px 0px #EEFFFF;
                    box-shadow: 0px 0px 2.18px 0px #EEFFFF;
                    box-shadow: 0px 0px 7.62px 0px #EEFFFF;
                    box-shadow: 0px 0px 15.24px 0px #0DFFB5;
                    box-shadow: 0px 0px 26.13px 0px #0DFFB5;
                    box-shadow: 0px 0px 45.73px 0px #0DFFB5;
                }

                .item-panel {
                    height: 4rem;

                    .item-container {
                        height: 4rem;

                        .box {
                            width: 100%;
                            text-align: left;
                            padding: 0.5rem;

                            .title {
                                font-weight: 600;
                            }
                        }
                    }
                }
            }
        }

        .buy {
            .buy-panel {
                height: 5rem;

                .box {
                    padding: 0.5rem;
                    width: 100%;

                    .col1 {
                        width: 100%;

                        .title {
                            color: #0EFFB0;
                            font-weight: bold;
                            font-size: 0.7rem;
                        }

                        .des {
                            color: #FFFFFFB2;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                        }

                    }

                    .col2 {
                        width: 3rem;

                        .btn {
                            background: linear-gradient(270deg, #0EFFB1 0%, #31B9D4 100%);
                            border-radius: 20px;
                            margin-top: 1px;
                            color: #000000;
                            height: 4rem;
                            font-size: 0.7rem;
                            text-align: center;
                            justify-content: center;
                            align-items: center;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }

    uni-scroll-view {
        height: calc(100vh - 6vh - 29.5rem);
    }


}</style>