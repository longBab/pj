<template>
<view class="vip body">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper">
        <scroll-view scroll-y="true" scroll-x="false">
            <view class="statistics">
                <view class="item r01">{{$t('全球VIP')}}</view>
                <view class="item r02">{{$t('多层级激励网络')}}</view>
                <view class="item r03">
                    <text class="btn" @click="gotoPage('/pages/content/vip')">{{$t('查看规则')}}</text>
                    <text class="btn" @click="gotoPage('invite')">{{$t('去邀请')}}</text>
                </view>
            </view>  
            <view class="split-row">
                <view class="cl"></view>
                <view class="cc">
                <text>{{$t('我的VIP概览')}}</text>
                </view>
                <view class="cr"></view>
            </view>  

            <view class="stat-bar">
                <view class="r01">
                    <view class="cl">
                        <text>{{$t('当前等级')}}</text>
                        <text>{{user.levelName}}</text>
                    </view>
                    <view class="cr">.</view>
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

            <view class="board01">
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
            </view>

            <view class="split-row">
                <view class="cl"></view>
                <view class="cc">
                <text>{{$t('今日结算预估')}}</text>
                </view>
                <view class="cr"></view>
            </view>

            <view class="board panel">
                <view class="row">
                    <text class="cl">{{$t('社区当日量化产出')}}</text>
                    <text class="cr">0.00</text>
                </view>

                <view class="row">
                    <text class="cl">{{$t('同级当日量化产出')}}</text>
                    <text class="cr">0.00</text>
                </view>

                <view class="row">
                    <text class="cl">{{$t('同级量化总产出')}}</text>
                    <text class="cr">0.00 $</text>
                </view>

                <view class="row" v-if="false">
                    <text class="cl">{{$t('预计今日分润')}}</text>
                    <text class="cr color01">0.00 $</text>
                </view>
                <view class="row tips" v-if="false">
                    <u-icon name="order"/>
                    估仅供参考，最终以 12:00 结算为准,名义合计>40%时系统自动等比归一化 
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
				back:"/pages/member",
				title:"全球VIP",
                user:{leveName:"Lv0",levelIndex:0,levelTotal:8}
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
    .statistics,.stat-bar,.board01,.board{
        width:93%;margin:0.5rem auto;
    }
    .statistics{
        background: url(../../static/images/member/vip_bg01.png) 80% center no-repeat;
        background-size:auto 90%;
        height:5rem;
        display:flex;
        flex-direction: column;
        align-content: flex-start;
        justify-content: space-evenly;
        .item{
            width:40%;
            margin:0 0 0 2rem;
            display:flex;
            flex-direction: row;
            justify-content:flex-start;
           
            text-align:left;
            &.r03{
                display:flex;
                flex-direction: row;
                justify-content: space-around;
            }
            .btn{
               
                background:  rgba(14, 255, 176, 1);
                border-radius: 10px;
                padding:0.1rem 0.5rem 0.1rem 0.5rem;
            }
            

        }
       
       
    }
    .stat-bar{
        padding:0.5rem 1rem 0.5rem 1rem;
        display:flex;
        flex-direction: column;
        border: 1px solid rgba(14, 255, 176, 0.3);
        border-radius:5px;
        box-shadow: 4px 0px 149.4px 29px rgba(14, 255, 176, 0.1) inset;
        .r01{
            display:flex;
            flex-direction: row; 
            justify-content: space-between;
            .cl,.cr{
                display:flex;  
                flex-direction: column; 
                text-align: center;
            }
        }
        .r03{text-align: right;}
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
    .board{
        display:flex;
        flex-direction: column;
        padding:0.5rem;
        .row{
				width:100%;
				display:flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				align-content: space-around;
				height:1.3rem;
				
				.cl{
					text-align:left;
				}
				.cr{
					text-align:right;
					&.color01{
                       color:rgba(14, 255, 176, 1);
					}
				}
                &.tips{
                    display:block;
                    width:100%;
                    height:2rem;
                   line-height:1rem; 
                   text-align: left;
                   padding:0.4rem 1rem 0.4rem 1rem;
                  
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