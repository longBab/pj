<template>
	<view class="coins body">
		<navBar :title="title" :back="back"></navBar>
		<view class="wrapper">
			<scroll-view scroll-y="true" scroll-x="false">
                
                <view class="chart">
                    <view class="chart-content">
                        <image src="/static/images/Group48095818.png" mode="widthFix" class="chart-image" />
                    </view>
                </view>

                <view class="statistics">
                    <view class="statistics-left">
                        <view class="item r1">
                            <text class="text">动静态10%·双层防护</text>
                        </view>
                        <view class="item r2">
                            <text class="text">总保险池(平台维度)</text>
                        </view>
                        <view class="item r3">
                            <text class="text">0.00 U</text>
                        </view>
                    </view>
                    <view class="statistics-right">
                        <image src="/static/images/icons_bg01.png" mode="widthFix" class="statistics-3d" />
                    </view>
                </view>
				 
                <view class="statBar">
                    <view class="statBar-top">
                        <view class="item">
                            <text class="r1">静态安全层</text>
                            <text class="r2">5%</text>
                            <text class="r3">(稳健收益/低风险对冲)</text>
                        </view>
                        <view class="item">
                            <text class="r1">动态对冲层</text>
                            <text class="r2">5%</text>
                            <text class="r3">(极端行情防守/机动补位)</text>
                        </view>
                    </view>
                    <view class="statBar-bottom">
                        <view class="progress-bar">
                            <view class="progress-left"></view>
                            <view class="progress-right"></view>
                        </view>
                        <view class="progress-labels">
                            <text class="label-left">静态 5%</text>
                            <text class="label-right">动态 5%</text>
                        </view>
                    </view>
                </view>

                <view class="split-row">
                    <view class="cl"></view>
                    <view class="cc">
                        <text>{{ $t('我的保险池权益') }}</text>
                    </view>
                    <view class="cr"></view>
                </view>

                <view class="board">
                    <view class="rt">
                        <view class="s01">与个人产品仓位挂钩</view>
                    </view>
                    <view class="row">
                        <text class="cl">我的保险池金额</text>
                        <view class="cr">
                          <text class="color1">0.00</text> U
                        </view>
                    </view>
                    <view class="row">
                        <text class="cl">其中参与代币分配</text>
                        <view class="cr">
                          <text class="color1">1.00%</text> / 天
                        </view>
                    </view>

                    <view class="row cols">
                        <view class="cl">
                            <text class="title">当前日释放比例</text>
                            <text class="des">仅在「有的运行产品」时保持 1% 日返</text>
                        </view>
                        <view class="cr des">
                          <text class="color1">50%</text> (用于日返Token)
                        </view>
                    </view>

                    <view class="row cols">
                        <view class="cl">
                            <text class="title">预计今日可释放Token</text>
                            <text class="des">以个人可释放额度×日比例粗略估算</text>
                        </view>
                        <view class="cr des">
                          <text class="color1">0</text>
                        </view>
                    </view>
                </view>

                <view class="split-row">
                    <view class="cl"></view>
                    <view class="cc">
                        <text>{{ $t('产品状态&释放资格') }}</text>
                    </view>
                    <view class="cr"></view>
                </view>

                <view class="statistics s01">
                    <view class="statistics-left-content">
                        <view class="item r11">
                          <u-icon class="point"/><text class="text">当前:有在运行产品</text>
                        </view>
                        <view class="item r12">
                            <text class="r01">无在运行产品天数(模拟)</text>
                            <text class="r02">0天</text>
                        </view>
                        <view class="item r13">
                            <u-icon class="point"/><text class="text">状态:正常日返1.00%/天</text>
                        </view>
                    </view>
                    <view class="statistics-right-content">
                        <image src="/static/images/icons_bg02.png" mode="widthFix" class="statistics-icon" />
                    </view>
                </view>
                <view class="split-row">
                    <view class="cl"></view>
                    <view class="cc">
                        <text>{{ $t('释放与停止规则(摘要)') }}</text>
                    </view>
                    <view class="cr"></view>
                </view>
                <view class="board rules-board">
                    <view class="content">
                        <view class="rule-item">
                            <text class="dot">·</text>
                            <text class="rule-text">10% 保险资金来自所有产品的统一注入，仅用于风控、防守与<text class="highlight-green">LXS</text> 权益分配。</text>
                        </view>
                        <view class="rule-item">
                            <text class="dot">·</text>
                            <text class="rule-text">保险池中约 50%额度可参与灵犀币(<text class="highlight-green">LXS</text>)分配，默认目标为日返<text class="highlight-yellow">1%</text>(有产品时)。</text>
                        </view>
                        <view class="rule-item">
                            <text class="dot">·</text>
                            <text class="rule-text">连续<text class="highlight-yellow">1-9 天</text>无在运行产品:日释放比例从 <text class="highlight-yellow">1%</text> 逐级降至0.1%。</text>
                        </view>
                        <view class="rule-item">
                            <text class="dot">·</text>
                            <text class="rule-text">连续<text class="highlight-red">≥10 天</text>无在运行产品:Token 释放资格暂停，需重新参与产品后由系统评估恢复。</text>
                        </view>
                        <view class="rule-item">
                            <text class="dot">·</text>
                            <text class="rule-text">所有比例与参数以实际公告与系统页面为准，本界面仅为逻辑示意。</text>
                        </view>
                    </view>
                </view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  components: {navBar},
		data() {
			return {
				back:"/pages/home",
				title:"保险池"
			};
		},
	onLoad(sender) {
		var that = this;
		that.sender=sender;
		that.load(sender);
  	},
	methods: {
        load(sender) {
            var that = this, sender = that.sender || sender || {};
            that.transfer.request({
                url: "GET app/coins",
            })
            .then((resp) => {
                var data = resp.data;
                data = data.data || data;
                that.extend(data);
            });
            },
        },
};
</script>

<style lang="scss" scoped>
.coins {
    .chart,.statistics,.statBar,.split-row,.board{
        width:93%;margin:0.5rem auto;
    }
    .chart{
        position: relative;
        width: 93%;
        margin: 0.5rem auto;
        padding: 1rem;
        border-radius: 10px;
        background: url(/static/images/Rectangle3591.png) center center no-repeat;
        background-size: 100% 100%;
        .chart-title{
            text-align: center;
            color: #fff;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .chart-content{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .chart-image{
                width: 100%;
                max-width: 100%;
            }
        }
    }
    .statistics{
        position: relative;
        width: 93%;
        margin: 0.5rem auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        min-height: 8rem;
        .statistics-left{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-right: 1rem;
            .item{
                width: 100%;
                display: flex;
                justify-content: center;
                margin-bottom: 0.4rem;
                &.r1{
                    .text{
                        display: inline-block;
                        padding: 0.4rem 1rem;
                        border-radius: 20px;
                        background: url(/static/images/Rectangle3572.png) center center no-repeat;
                        background-size: 100% 100%;
                        color: #fff;
                        font-size: 0.7rem;
                        text-align: center;
                        white-space: nowrap;
                    }
                }
                &.r2{
                    margin-top: 0.2rem;
                    margin-bottom: 0.2rem;
                    .text{
                        color: #fff;
                        font-size: 0.85rem;
                        font-weight: 500;
                        line-height: 1.4;
                        text-align: center;
                    }
                }
                &.r3{
                    margin-top: 0.2rem;
                    .text{
                        display: inline-block;
                        padding: 0.5rem 2rem;
                        background: url(/static/images/Rectangle1095.png) center center no-repeat;
                        background-size: 100% 100%;
                        color: #08E07F;
                        font-size: 1.4rem;
                        font-weight: 700;
                        white-space: nowrap;
                        line-height: .8rem;
                    }
                }
            }
        }
        .statistics-right{
            width: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            .statistics-3d{
                width: 100%;
                max-width: 100%;
            }
        }
        .item{
            &.r11,&.r13{
                text-align: left;
                display:block;
                color: #0EFFB0;
                margin-bottom: 0.5rem;
                .text{
                    padding:0 0 0 0.3rem;
                    color: #0EFFB0;
                }
                .point{
                    background: #0EFFB0;
                    width:0.8rem;
                    height:0.8rem;
                    vertical-align:middle;
                    border-radius:50%;
                    box-shadow: 0 0 5px 1px #0EFFB0;
                }
            }
            &.r12{
                padding: 0.2rem 1rem;
                background: url(/static/images/Rectangle3590.png) center center no-repeat;
                background-size: 100% 100%;
                margin: 0.5rem 0;
                display: flex;
                flex-direction: column;
                .r01{
                    color: #fff;
                    font-size: 0.65rem;
                    margin-bottom: 0.3rem;
                }
                .r02{
                    color: #fff;
                    font-size: 0.7rem;
                    font-weight: 600;
                }
            }
        }
        &.s01{
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            min-height: 8rem;
            padding: 1rem;
            .statistics-left-content{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                padding-right: 1rem;
            }
            .statistics-right-content{
                width: 40%;
                display: flex;
                justify-content: center;
                align-items: center;
                .statistics-icon{
                    width: 100%;
                    max-width: 100%;
                }
            }
        }
    }
    .statBar{
        position: relative;
        width: 93%;
        margin: 0.5rem auto;
        padding: 1rem;
        border-radius: 10px;
        background: url(/static/images/Rectangle3571.png) center center no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        .statBar-top{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 1rem;
            .item{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 0 0.5rem;
                .r1{
                    color: #fff;
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin-bottom: 0.3rem;
                }
                .r2{
                    color: #08E07F;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.2rem;
                }
                .r3{
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.65rem;
                    line-height: 1.3;
                }
            }
        }
        .statBar-bottom{
            display: flex;
            flex-direction: column;
            .progress-bar{
                width: 100%;
                height: 0.5rem;
                border-radius: 0.5rem;
                display: flex;
                flex-direction: row;
                overflow: hidden;
                .progress-left{
                    flex: 1;
                    height: 100%;
                    background: linear-gradient(90deg, #00FFFF 0%, #0EFFB0 100%);
                }
                .progress-right{
                    flex: 1;
                    height: 100%;
                    background: linear-gradient(90deg, #08996A 0%, #0EFFB0 100%);
                }
            }
            .progress-labels{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 0.3rem;
                .label-left, .label-right{
                    color: #fff;
                    font-size: 0.7rem;
                }
                .label-left{
                    text-align: left;
                }
                .label-right{
                    text-align: right;
                }
            }
        }
    }
    .board{
        position: relative;
        width: 93%;
        margin: 0.5rem auto;
        padding: 1rem;
        border-radius: 10px;
        background: url(/static/images/Rectangle58.png) center center no-repeat;
        background-size: 100% 100%;
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        .rt{
            width:100%;
            text-align: center;
            margin-bottom: 1rem;
            .s01{
                display: inline-block;
                padding: 0.4rem 1rem;
                border-radius: 20px;
                background: url(/static/images/Group48095812.png) center center no-repeat;
                background-size: 100% 100%;
                color: #fff;
                font-size: 0.75rem;
                white-space: nowrap;
            }
        }
        .row{
            width:100%;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.8rem;
            .cl{
                color: #fff;
                font-size: 0.8rem;
            }
            .cr{
                color: #0EFFB0;
                font-size: 0.9rem;
                font-weight: 600;
                .color1{
                    color: #0EFFB0;
                }
            }
            &.cols{
                align-items: flex-start;
                margin-bottom: 0.5rem;
                .cl{
                    flex: 1;
                    display:flex; 
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .title{
                        color: #fff;
                        font-size: 0.8rem;
                        margin-bottom: 0.2rem;
                    }
                    .des{
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 0.65rem;
                        line-height: 1.3;
                    }
                }
                .cr.des{
                    color: #0EFFB0;
                    font-size: 0.9rem;
                    font-weight: 600;
                    .color1{
                        color: #0EFFB0;
                    }
                }
            }
        }
        .progress-section{
            width: 100%;
            margin: 0.5rem 0 1rem 0;
            .progress-bar-wrapper{
                position: relative;
                width: 100%;
                padding: 0.8rem 1rem;
                border-radius: 10px;
                background: url(/static/images/Rectangle3571.png) center center no-repeat;
                background-size: 100% 100%;
                .progress-bar{
                    width: 100%;
                    height: 0.5rem;
                    border-radius: 0.25rem;
                    display: flex;
                    flex-direction: row;
                    overflow: hidden;
                    .progress-left{
                        flex: 1;
                        height: 100%;
                        background: linear-gradient(90deg, #00FFFF 0%, #0EFFB0 100%);
                    }
                    .progress-right{
                        flex: 1;
                        height: 100%;
                        background: linear-gradient(90deg, #08996A 0%, #0EFFB0 100%);
                    }
                }
            }
        }
        .content{
            line-height:1.3rem;
        }
        &.rules-board{
            position: relative;
            width: 93%;
            margin: 0.5rem auto;
            padding: 1rem 1.2rem;
            border-radius: 10px;
            background: url(/static/images/Roundedrectangle.png) center center no-repeat;
            background-size: 100% 100%;
            .content{
                display: flex;
                flex-direction: column;
                .rule-item{
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    margin-bottom: 0.6rem;
                    line-height: 1.5;
                    .dot{
                        color: #fff;
                        font-size: 0.75rem;
                        margin-right: 0.3rem;
                        flex-shrink: 0;
                    }
                    .rule-text{
                        flex: 1;
                        color: #fff;
                        font-size: 0.75rem;
                        line-height: 1.5;
                        .highlight-green{
                            color: #0EFFB0;
                        }
                        .highlight-yellow{
                            color: #F2FA1C;
                        }
                        .highlight-red{
                            color: #F26764;
                        }
                    }
                }
            }
        }
    }
    .split-row .cc{font-size:0.7rem;}
    .wrapper{
        justify-content: flex-start;
        height: calc(100% - 0.5rem);
        padding: 2.5rem 0 0 0;
        color: #fff;
      
    }

}
 
</style>