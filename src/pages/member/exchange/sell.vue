<template>
    <view class="sell body" :class="$store.state.setting.theme">
        <navBar :title="title" :back="back"></navBar>
        <view class=" wrapper">
            <scroll-view scroll-y="true" scroll-x="false">
                <view class=" tabs">
                    <text class="item">购买</text>
                    <text class="item active">出售</text>
                </view>
                <view class="split-row">
                    <view class="cl"></view>
                    <view class="cdl"></view>
                    <view class="cc">
                        <text>{{ $t('出售数额') }}</text>
                    </view>
                    <view class="cdr"></view>
                    <view class="cr"></view>
                </view>
                <view class="tab-label">
                    (USDT)
                </view>

                <view class="momey-panel">
                    <view class="dp input-row">
                        <view class="f1">
                            <input class="input" placeholder="请输入提现金额" type="number" max="20" />
                        </view>
                        <view class="icon-box">
                            <view class="icon"></view>
                        </view>
                        <view>
                            USDT
                        </view>
                    </view>
                    <view class="dp pay-row">
                        <view class="btn">
                            金额
                        </view>
                        <view class="btn">
                            支付
                        </view>
                        <view class="btn active">
                            神盾
                        </view>
                    </view>
                </view>
                <view class="mt10 wc93" style="font-size: 0.8rem;margin-left:2rem;">
                    {{ $t('请选择收款方式') }}
                </view>

                <view class="wc93 dp pay-checkbox">
                    <view class="dp ck active">
                        <u-icon  name="weixin-fill" style="color:#08ba00;margin-right:0.3rem;" size="40" />
                        微信
                    </view>
                    <view class="dp ck">
                        <u-icon  name="zhifubao-circle-fill" style="color:#00b6ff;margin-right:0.3rem;" size="40" />
                        支付宝
                    </view>
                    <view class="dp ck">
                        <u-icon  name="rmb-circle-fill" style="color:#ffd731;margin-right:0.3rem;" size="40" />
                        银行卡
                    </view>
                </view>
                <view class="mt5">
                    <view class="sell-btn">
                        确认出售
                    </view>
                </view>
                <view class="wc93 mt20 dp">
                    <view class="dp record-btn" @click="gotoPage('/pages/member/security/payment')">
                        <view class="icon-box icon1"></view>
                        换汇资金方式管理
                    </view>
                    <view class="dp record-btn" @click="gotoPage('records')">
                        <view class="icon-box icon2"></view>
                        换汇记录
                    </view>
                </view>

            </scroll-view>
        </view>
    </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
    components: { navBar },
    data() {
        return {
            back: "/pages/member/exchange",
            title: "一键兑换"
        }

    },

    onReady() { },
    onLoad(sender) {
        var that = this, sender = sender || {};
        that.sender = sender;
        that.load(sender);
    },
    methods: {
        load(sender) {
            var that = this, sender = that.sender || sender || {}, currency = sender.currency || that.currency;

        },
    }

};
</script>

<style lang="scss" scoped>
.split-row {

    .cl,.cr {
        width: 20%;
        text-align: center;
        height: 1px;
        margin: 0.5rem 0 0 0;
        border-radius: 1.5px;
        background: linear-gradient(90deg, #00FFBD 0%, #00000000 100%);
    }

    .cdl,
    .cdr {
        width: 6px;
        height: 6px;
        background: #0EFFB0;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    .cdl {
        margin: 0.35rem 0 0 -0.2rem;
    }

    .cdr {
        margin: 0.35rem -0.2rem 0 0;
    }

    .cc {
        font-size: 0.8rem;
    }
}

.sell {
    $_marginT: 0.5rem; //面板下移
    $_heightT: 1.5rem; //tab,statistics高
    .split-row,.momey-panel,.tabs{width:93%;margin:0.5rem auto;}
    .tabs {
            height: $_heightT;
            width: 70% !important;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-evenly;
            border-radius: 10px;
            border: 1px solid #417B68;

            .item {
                line-height: $_heightT;
                width: 50%;
                height: 100%;
                text-align: center;
                color: #fff;

                &.active {
                    border-radius: 10px;
                    background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
                    color: #000;
                }

            }
        }
    .wrapper {
        justify-content: flex-start;
        height: calc(100% - 14vh);
        padding: 6vh 0 8vh 0;
        color: #fff;

      

       
        .tab-label{
            text-align: center;color:#FFFFFFB2;
        }

        .momey-panel {
            height: 6rem;
            backdrop-filter: blur(10px);
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid transparent;
            background-image: linear-gradient(to bottom, #000000 0%, #121a2488 100%), linear-gradient(180deg, #3BD3D344, transparent);
            background-origin: border-box;
            background-clip: padding-box, border-box;


            .input-row {
                justify-content: center;
                align-items: center;
                border-bottom: 0.5px dashed #FBD53699;
                padding-bottom: 0.5rem;

                .input {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #fff;
                    line-height: normal;
                    height:1.5rem;
                    line-height:1.5rem;
                }

                .icon-box {
                    margin: 0 0.2rem;

                    .icon {
                        height: 0.8rem;
                        width: 0.8rem;
                        background: url(/static/images/member/m10.png) center center no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }

            .pay-row {
                justify-content: center;
                align-items: center;
                padding: 1rem;

                .btn {
                    margin: 0 0.5rem;
                    border: 1px solid #417B68;
                    background: #0EFFB01A;
                    width: 3rem;
                    height: 1.3rem;
                    text-align: center;
                    line-height: 1.3rem;
                    border-radius: 10px;
                    border-width: 1px;
                }

                .active {
                    color: #000000;
                    border: 1px solid #417B68;
                    background: var(--Color-4, #0EFFB0);
                }
            }
        }

        .pay-checkbox {
            justify-content: center;
            align-items: center;
            padding: 1rem;

            .ck {
                margin: 0 0.5rem;
                border: 1px solid #417B68;
                width: 5rem;
                height: 2rem;
                text-align: center;
                line-height: 2rem;
                border-radius: 10px;
                border-width: 1px;
                justify-content: center;
                align-items: center;
                border: 1px solid #417B68;
                color: #FFFFFFB2;
                background: #0EFFB01A;

                .ck-box {
                    margin-right: 0.3rem;
                    height: 0.65rem;
                    width: 0.65rem;
                    background: #141414;
                    line-height: 0.5rem;
                    border: 1px solid #417B68;
                }
            }

            .active {
                border: 1px solid #417B68;
                background: #0EFFB0;
                color: #000000;

                .ck-box {
                    background: #141414;
                    line-height: 0.65rem;
                    border: 0px;
                }
            }
        }

        .sell-btn {
            background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
            border-radius: 5px;
            color: #000000;
            width: 6rem;
            height: 1.8rem;
            line-height: 1.8rem;
            text-align: center;
            font-weight: 600;
            font-size: 0.7rem;
            margin: 0 auto;
        }

        .record-btn {
            background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
            border-radius: 5px;
            color: #000000;
            width: 40%;
            height: 1.8rem;
            line-height: 1.8rem;
            margin: 0 auto;
            justify-content: center;
            align-items: center;

            .icon-box {
                width: 1.8rem;
                height: 1.8rem;
                line-height: 1.8rem;
            }

            .icon1 {

                background: url(/static/images/member/m11.png) center center no-repeat;
                background-size: 50% 50%;
            }

            .icon2 {

                background: url(/static/images/member/m12.png) center center no-repeat;
                background-size: 50% 50%;
            }
        }
    }

    uni-scroll-view {
        height: calc(100vh - 14vh - 0.3rem);
    }
}</style>