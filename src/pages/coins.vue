<template>
	<view class="coins body">
		<navBar :title="title" :back="back"></navBar>
		<view class="wrapper">
			<scroll-view scroll-y="true" scroll-x="false">
                
                <view class="chart panel">
                    <view class="bdlg"></view>
                </view>

                <view class="statistics">
                    <view class="item r1">
                        <text class="text">动静态10%·双层防护</text>
                    </view>
                    <view class="item r2">
                        <text class="text">总保险池(平台维度)
                        </text>
                    </view>
                    <view class="item r3">
                        <text class="text">2,580000 U</text>
                    </view>

                </view>
				 
                <view class="statBar panel">
                    <view class="item">
                        <text class="r1">静态安全层</text>
                        <text class="r2">5%</text>
                        <text class="r3">(稳健收益/低风险对冲)</text>
                        <view class="progress">
                            <view class="line">
                                <view class="active" :style="{width:'10%'}"></view>
                            </view>
                        </view>
                    </view>
                    <view class="item">
                        <text class="r1">动态对冲层</text>
                        <text class="r2">5%</text>
                        <text class="r3">(极端行情防守/机动补位)</text>
                        <view class="progress">
                            <view class="line">
                                <view class="active" :style="{width:'10%'}"></view>
                            </view>
                        </view>
                    </view>
                    <view class="bdlg"></view>
                </view>

                <view class="split-row">
                    <view class="cl"></view>
                    <view class="cc">
                        <text>{{ $t('我的保险池权益') }}</text>
                    </view>
                    <view class="cr"></view>
                </view>

                <view class="board panel">
                    <view class="rt">
                        <text class="s01">与个人产品仓位挂钩</text>
                    </view>
                    <view class="row">
                        <text class="cl">我的保险池金额</text>
                        <view class="cr">
                          <text class="color1">1,250</text>U
                        </view>
                    </view>
                    <view class="row">
                        <text class="cl">其中参与代币分配</text>
                        <view class="cr">
                          <text class="color1">1%</text>/天
                        </view>
                    </view>

                    <view class="row cols">
                        <view class="cl">
                            <text class="title">当前日释放比例</text>
                            <text class="des">仅在有的运行产品时保持1%日返</text>
                        </view>
                        <view class="cr des">
                          <text class="color1">5%</text>(用于日返Token)
                        </view>
                    </view>

                    <view class="row cols">
                        <view class="cl">
                            <text class="title">预计今日可释放Token</text>
                            <text class="des">以个人可释放额度 x 日比例粗略估算</text>
                        </view>
                        <view class="cr des">
                          0
                        </view>
                    </view>

                    <view class="bdlg"></view>
                </view>

                <view class="split-row">
                    <view class="cl"></view>
                    <view class="cc">
                        <text>{{ $t('产品状态&释放资格') }}</text>
                    </view>
                    <view class="cr"></view>
                </view>

                <view class="statistics s01">
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
                <view class="split-row">
                    <view class="cl"></view>
                    <view class="cc">
                        <text>{{ $t('释放与停止规则(摘要)') }}</text>
                    </view>
                    <view class="cr"></view>
                </view>
                <view class="board panel">
                    <view class="content">
                        . 10% 保险资金来自所有产品的统一注入，仅用于风控、防守与LXS 权益分配。<br>
                        · 保险池中约 50%额度可参与灵犀币(LXS)分配，默认目标为日返1%(有产品时)。<br>
                        · 连续1-9 天无在运行产品:日释放比例从 1% 逐级降至0.1%。<br>
                        · 连续≥10 天无在运行产品:Token 释放资格暂停，需重新参与产品后由系统评估恢复。<br>
                        · 所有比例与参数以实际公告与系统页面为准，本界面仅为逻辑示意。<br>
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
        width:80%;
        height:7rem;
        
    }
    .statistics{
       
        background: url(../../static/images/icons_bg01.png?rnd=1) 80% center no-repeat;
        background-size:auto 80%;
        height:5rem;
        display: flex;
        align-content: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        flex-wrap: nowrap;
        
        .item{
            text-align: center;
            margin:0.2rem 0 0 0.3rem;
            width:60%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            flex-direction: column;
            align-content: space-around;
            &.r1 .text{
                border:1px solid #00FFFF;
                border-radius:5px;
                padding:0 0.3rem 0 0.3rem;
                background: linear-gradient(90.79deg, rgba(146, 146, 146, 0.3) -5.06%, rgba(102, 102, 102, 0.3) 99.32%);
            }
            &.r3 .text{
                padding:0 0.3rem 0 0.3rem;
                border:1px solid rgba(59, 211, 211, 0.5);
                border-radius:5px;
                background: radial-gradient(100% 100% at 0% 0%, rgba(250, 250, 250, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
                color:#00FFFF;
            }
            &.r11,&.r13{
                text-align: left;
                display:block;
                color:rgba(14, 255, 176, 1);
                .text{padding:0 0 0 0.3rem;}
                .point{
                    background: rgba(14, 255, 176, 1);
                    width:0.8rem;
                    height:0.8rem;
                    vertical-align:middle;
                    border-radius:50%;
                    box-shadow: 0 0 5px 1px rgb(14 255 176);
                }
            }
            &.r12{
                background: radial-gradient(100% 100% at 0% 0%, rgba(250, 250, 250, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
                border:1px solid rgba(59, 211, 211, 0.5);
                border-radius:10px;
                line-height:1rem;
            }
        }
        &.s01{
            background-image:url(../../static/images/icons_bg02.png);
            background-size:auto 60%;
            height:6rem;
           
            .item{
                margin:0.5rem 0 0 2rem;
                &.r12{width:40%;}
            }
        }
    }
    .statBar{
        display:flex;
        .item{
            width:50%;
            padding:0.3rem;
            display:flex;
            flex-direction: column;
            align-content: stretch;
            flex-wrap: wrap;
            justify-content: space-around;
            .r2{color:#0EFFB0;}
        }
    }
    .board{
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        padding:0.3rem 0.3rem 1rem 0.3rem;
        background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
       .rt{
        width:100%;
        text-align: center;
        padding:0.6rem 0 0 0;
        .s01{
            background: linear-gradient(90.79deg, rgba(146, 146, 146, 0.3) -5.06%, rgba(102, 102, 102, 0.3) 99.32%);
            border: 1px solid rgba(0,255,255, 0.2);
            border-radius:16px;
            padding:0 1rem 0 1rem;
        }
       }
        .row{
            width:100%;
            display:flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-around;
            height:1.5rem;
            .color1{color:rgba(0, 255, 189, 1);}
            &.cols{
                height:2.4rem;
                .cl{
                   
                    display:flex; 
                    flex-direction: column;
                    justify-content: center;
                    flex-wrap: wrap;
                    align-content: flex-start;
                    .title{

                    }
                    .des{
                        color:rgba(176, 168, 168, 1);
                    }
                }
                .cr.des{
                line-height:5rem;
                }
            }
           
          
        }
        .content{
            line-height:1.3rem;
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