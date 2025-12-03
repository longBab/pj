<template>
<view class="vip body">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper" style="padding-top:5rem;">
        <scroll-view scroll-y="true" scroll-x="false">
            <view class="statistics">
                <view class="statistics-left">
                    <image src="/static/images/image263.png" mode="widthFix" class="hero-image" />
                </view>
                <view class="statistics-right">
                    <view class="item r01">{{$t('全球VIP')}}</view>
                    <view class="item r02">{{$t('多层级激励网络')}}</view>
                    <view class="item r03">
                        <text class="btn" @click="gotoPage('/pages/content/vip')">{{$t('查看规则')}}</text>
                        <text class="btn" @click="gotoPage('invite')">{{$t('去邀请')}}</text>
                    </view>
                </view>
            </view>  
            <view class="split-row" style="margin-top:4rem;margin-bottom:1rem;">
                <view class="cl"></view>
                <view class="cc" style="font-size:1.2rem;">
                <text>{{$t('我的VIP概览')}}</text>
                </view>
                <view class="cr"></view>
            </view>  

            <view class="stat-bar">
                <view class="r01">
                    <view class="cl">
                        <text class="label">{{$t('当前等级')}}</text>
                        <text class="level">{{user.levelName}}</text>
                    </view>
                    <view class="cr">
                        <image src="/static/images/image78.png" mode="widthFix" class="level-icon" />
                    </view>
                </view>
                <view class="r02">
                    <view class="progress">
                        <view class="line">
                            <view class="active" :style="{width:(user.levelIndex/user.levelTotal*100)+'%'}"></view>
                        </view>
                    </view>
                </view>
                <view class="r03">
                    下一级条件:直推≥0 人(还差 0 人)
                </view>
            </view>

            <view class="vip-stat-board">
                <view class="row">
                    <view class="cell">
                        <text class="label">可参与深度</text>
                        <text class="value">5代</text>
                    </view>
                    <view class="cell">
                        <text class="label">今日释放0.8%数量</text>
                        <text class="value">1087 枚</text>
                    </view>
                </view>
                <view class="divider-h"></view>
                <view class="row">
                    <view class="cell">
                        <text class="label">名义比例</text>
                        <text class="value">5.00%</text>
                    </view>
                    <view class="cell">
                        <text class="label">本月有效直推</text>
                        <text class="value">8 人</text>
                    </view>
                </view>
            </view>

            <!-- <view class="board01">
                <view class="item split">
                    <text>{{$t('量化产出比')}}</text>
                    <text>0%</text>
                </view>
                <view class="item split">
                    <text>{{$t('社区总量化值')}}</text>
                    <text>0 $</text>
                </view>
                <view class="item">
                    <text>{{$t('社区同级比率')}}</text>
                    <text>0.00</text>
                </view>
                <view class="item">
                    <text>{{$t('社区总量化规模')}}</text>
                    <text>0 $</text>
                </view>
            </view> -->

            <view class="split-row"  style="margin-top:2rem;margin-bottom:1rem;">
                <view class="cl"></view>
                <view class="cc"  style="font-size:1.2rem;">
                <text>{{$t('今日结算预估')}}</text>
                </view>
                <view class="cr"></view>
            </view>

            <view class="stat-detail-card">
                <view class="row">
                    <text class="label">我的直推释放合计(今日)</text>
                    <text class="value">12,345.67 枚</text>
                </view>
                <view class="row">
                    <text class="label">名义比例</text>
                    <text class="value">3.00%</text>
                </view>
                <view class="row">
                    <text class="label">归一化系数 k</text>
                    <text class="value">0.8889</text>
                </view>
                <view class="row emphasis">
                    <text class="label">预计今日分润</text>
                    <text class="value highlight">321.09 枚</text>
                </view>
                <view class="divider"></view>
                <view class="tips">
                    <image class="tips-icon" src="/static/images/fi-ss-comment-info.png" mode="widthFix" />
                    <view class="tips-text">
                        <text>预计仅供参考，最终以 12:00 结算为准。</text>
                        <text>名义合计>40%时系统自动等比归一化。</text>
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
				back:"/pages/member",
				title:"全球VIP",
                user:{levelName:"VIP0",levelIndex:0,levelTotal:8}
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
                url: "GET app/member/vip",
            })
            .then((resp) => {
                var data = resp.data;
                data = data.data || data;
                that.extend(data);
            });
        }
	},
};
</script>

<style lang="scss" scoped>
.vip {
    color:#fff;
.statistics,.stat-bar,.board01,.vip-stat-board,.stat-detail-card{
        width:93%;margin:0.5rem auto;
    }
    .statistics{
        height:7rem;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.5rem 0 0;
        .statistics-left{
            position:relative;
            width:10rem;
            flex-shrink: 0;
            .hero-image{
                width: 15rem;
                display:block;
                position:absolute;
                top:-5rem;
                left:-1rem;
                z-index:1;
            }
        }
        .statistics-right{
            position:relative;
            z-index:2;
            flex: 1;
            display:flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }
        .item{
            width:100%;
            margin:0 0 0 0;
            text-align:left;
            &.r01{
                font-size:1.4rem;
                font-weight:700;
                margin-bottom:0.2rem;
            }
            &.r02{
                font-size:0.9rem;
                opacity:0.9;
                margin-bottom:0.6rem;
            }
            &.r03{
                display:flex;
                flex-direction: row;
                justify-content: flex-start;
                gap:0.6rem;
            }
            .btn{
                min-width:4.5rem;
                padding:0.35rem 0.9rem;
                border-radius:999px;
                background:#0EFFB0;
                color:#000;
                font-size:0.8rem;
                text-align:center;
            }
        }
    }
    .stat-bar{
        position: relative;
        width: 93%;
        margin: 0.8rem auto 1rem auto;
        padding: 1.2rem 1.5rem;
        display:flex;
        flex-direction: column;
        background: url(/static/images/Rectangle835.png) center center no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        .r01{
            display:flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.9rem;
            .label{
                display:block;
                font-size: 0.9rem;
                opacity: 0.9;
                margin-bottom: 0.25rem;
            }
            .level{
                display:block;
                font-size: 2.2rem;
                font-weight: 700;
            }
            .cr{
                display:flex;
                align-items: center;
                justify-content: center;
                .level-icon{
                    width: 7rem;
                    display:block;
                }
            }
        }
        .r02{
            margin-bottom: 0.7rem;
            .progress{
                width: 100%;
            }
            .line{
                width: 100%;
                height: 0.3rem;
                border-radius: 999px;
                background: rgba(255,255,255,0.06);
                overflow: hidden;
            }
            .active{
                height: 100%;
                border-radius: 999px;
                background: linear-gradient(90deg, #08E07F 0%, #1AFFAA 100%);
            }
        }
        .r03{
            font-size: 0.85rem;
            text-align: right;
            opacity: 0.9;
        }
    }
    .vip-stat-board{
        width:93%;
        margin:0.5rem auto 1rem auto;
        padding:1.2rem 1.5rem;
        background: url(/static/images/Rectangle59.png) center center no-repeat;
        background-size: 100% 100%;
        border-radius:12px;
        display:flex;
        flex-direction: column;
        color:#fff;
        .row{
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding:0.4rem 0;
        }
        .cell{
            width:50%;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-right:1px solid rgba(255,255,255,0.07);
            &:last-child{
                border-right:none;
            }
            .label{
                font-size:0.75rem;
                opacity:0.9;
                margin-bottom:0.3rem;
            }
            .value{
                font-size:1.3rem;
                font-weight:700;
            }
        }
        .divider-h{
            height:1px;
            margin:0.2rem 0;
            background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.25), rgba(255,255,255,0));
        }
    }
    .stat-detail-card{
        width:93%;
        margin:0.5rem auto 1.2rem auto;
        padding:1.3rem 1.6rem 1.1rem;
        background:url(/static/images/Rectangle78.png) center center no-repeat;
        background-size:100% 100%;
        border-radius:14px;
        color:#fff;
        .row{
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            align-items:center;
            padding:0.45rem 0;
            border-bottom:1px solid rgba(255,255,255,0.08);
            &:last-of-type{
                border-bottom:none;
            }
            &.emphasis{
                margin-bottom:0.3rem;
            }
            .label{
                font-size:0.9rem;
                opacity:0.9;
            }
            .value{
                font-size:1rem;
                font-weight:600;
                &.highlight{
                    color:#0EFFB0;
                }
            }
        }
        .divider{
            width:100%;
            border-bottom:1px dashed rgba(255,255,255,0.25);
            margin:0.35rem 0 0.8rem 0;
        }
        .tips{
            display:flex;
            flex-direction: row;
            align-items:flex-start;
            font-size:0.78rem;
            line-height:1.2rem;
            color:rgba(255,255,255,0.85);
            .tips-icon{
                width:1.2rem;
                margin-right:0.5rem;
                flex-shrink:0;
            }
            .tips-text{
                display:flex;
                flex-direction: column;
                gap:0.15rem;
            }
        }
    }
    .board01{
      
        border:1px solid rgba(59, 211, 211, 0.5);
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        padding:0.5rem;
        .item{
            width:50%;
            display:flex;  
            flex-direction: column;
            flex-wrap: wrap;
            text-align: center;
            line-height:1.3rem;
            &.split{
                border-bottom: 1px solid rgba(146, 146, 146, 0.4);
            }
        }
    }
    .wrapper{
        justify-content: flex-start;
        height: calc(100% - 0.5rem);
        padding: 2.5rem 0 0 0;
        color: #fff;
      
    }

}
 
</style>