<template>
	<view class="vip body">
		<navBar :title="title" :back="back"></navBar>
		<view class="wrapper" style="padding-top:3rem;">
			<scroll-view scroll-y="true" scroll-x="false" class="vip-scroll">
				<!-- 顶部：左侧整块文案（卡片 + 说明） + 右侧插画 ICON -->
				<view class="vip-top">
					<view class="vip-top-left-col">
						<view class="vip-top-left">
							<image class="vip-top-left-bg" src="/static/images/Rectangle79.png" mode="widthFix" />
							<view class="vip-top-left-content">
								<view class="vip-top-title">
									{{ $t('分层成长·透明标准') }}
								</view>
								<view class="vip-top-subtitle">
									{{ $t('逐级塑造全球化组织版图') }}
								</view>
							</view>
						</view>
						<!-- 文案说明（与上方卡片作为一整块靠左） -->
						<view class="vip-desc">
							<view class="vip-desc-title">
								{{ $t('评定口径') }}
							</view>
							<view class="vip-desc-main">
								{{ $t('仅统计有效客户的真实业绩') }}
							</view>
							<view class="vip-desc-sub">
								{{ $t('内循环/测试资金不计入。') }}
							</view>
						</view>
					</view>
					<view class="vip-top-right">
						<image  src="/static/images/image265.png" mode="widthFix" />
					</view>
				</view>

				<!-- 平行激励 & 阶差回报 卡片 -->
				<view class="vip-cards">
					<view class="vip-card">
						<image class="vip-card-bg" src="/static/images/Rectangle80.png" mode="widthFix" />
						<view class="vip-card-content">
							<view class="vip-card-title">
								{{ $t('平行激励') }}
							</view>
							<view class="vip-card-level">
								{{ $t('Lv.5 起生效') }}
							</view>
							<view class="vip-card-tip">
								{{ $t('鼓励同级协同发展。') }}
							</view>
						</view>
					</view>
					<view class="vip-card" style="justify-content:space-between;">
						<image class="vip-card-bg" src="/static/images/Rectangle80.png" mode="widthFix" />
						<view class="vip-card-content">
							<view class="vip-card-title">
								{{ $t('阶差回报') }}
							</view>
							<view class="vip-card-level">
								{{ $t('按上下级进阶差距计算') }}
							</view>
							<view class="vip-card-tip">
								{{ $t('随层级递进 5% → 50%。') }}
							</view>
						</view>
					</view>
				</view>

				<!-- 当前可达等级 -->
				<view class="vip-level">
					<image class="vip-level-bg" src="/static/images/Rectangle477.png" mode="widthFix" />
					<view class="vip-level-content">
						<view class="vip-level-label">
							{{ $t('当前可达等级') }}
						</view>
						<view class="vip-level-value">
							Lv.3
						</view>
					</view>
				</view>

				<!-- 下方数值说明 -->
				<view class="vip-list">
					<view class="vip-list-item">
						<view class="vip-list-label">
							{{ $t('对应平行激励') }}
						</view>
						<view class="vip-list-value">
							15%
						</view>
					</view>
					<view class="vip-list-item">
						<view class="vip-list-label">
							{{ $t('阶差回报(极差)') }}
						</view>
						<view class="vip-list-value">
							—
						</view>
					</view>
				</view>

				<!-- 下一阶段建议 -->
				<view class="vip-next">
					<image class="vip-next-bg" src="/static/images/Rectangle82.png" mode="widthFix" />
					<view class="vip-next-content">
						<view class="vip-next-title">
							{{ $t('下一阶段建议') }}
						</view>
						<view class="vip-next-btn">
							<image class="vip-next-btn-bg" src="/static/images/Rectangle835.png"  />
							<view class="vip-next-btn-text">
								{{ $t('下一阶段：Lv.4 (规模≥500,000 U, ≥2个Lv.3 单元)') }}
							</view>
						</view>
						<view class="vip-next-tip">
							<image class="vip-next-tip-icon" src="/static/images/Vector.png" mode="widthFix" />
							<view class="vip-next-tip-text">
								{{ $t('说明：Lv.3 起需要 ≥ 2 个上一等级单元；示例：要评定 Lv.4，需要有 ≥ 2 个 Lv.3 单元。实际统计以系统口径与风控规则为准。') }}
							</view>
						</view>
					</view>
				</view>

				<!-- 口径与风控说明 -->
				<view class="vip-risk">
					<image class="vip-risk-bg" src="/static/images/Rectangle771.png" />
					<view class="vip-risk-content">
						<view class="vip-risk-title">
							{{ $t('口径与风控说明') }}
						</view>
						<view class="vip-risk-text">
							<text>{{ $t('仅统计有效客户的真实贡献；内循环/测试/异常账户不计入。') }}</text>
							<text>{{ $t('同级“平行激励”自 Lv.5 生效；“阶差回报”按上下级进阶差距计算。') }}</text>
							<text>{{ $t('所有评定与结算以系统与链上记录为准；异常行为将被自动核查与清退。') }}</text>
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
				back:"/pages/member/vip",
				title:"VIP规则"
			};
		},
	onLoad(sender) {
		var that = this;
		that.sender=sender;
		that.load(sender);
  	},
	methods: {
		load(sender){
			var that = this,path=that.$route.path||"",url;
			var sender=(sender&&sender.id?sender:null)||that.sender||{},id=sender.id;
			path=path.replace(/[\/]?pages\/content\/(.*?)/g,"$1");
			url= "GET app/content/"+path;
			if(id)url="GET app/content?id="+id;
			if(that.get("sender.back"))that.set(that.get("sender.back").replace(/\./g,"/"),"back");
			that.transfer.request({
			url: url,
			})
			.then((resp) => {
				var data=resp.data;
				data=data.data||data;
				that.extend(data);
			});
		}
	},
};
</script>

<style lang="scss" scoped>
.vip {
	background:#030303;
	min-height:100vh;
	.wrapper{
		padding:0 1.2rem 1.2rem;
	}
}
uni-scroll-view {
	height: calc(100% - 2rem);
}
.vip-scroll{
	padding-top:1rem;
}

.vip-top{
	display:flex;
	justify-content:space-between;
	align-items:flex-start;
	margin-bottom:1.5rem;
}
.vip-top-left-col{
	width:60%;
}
.vip-top-left{
	position:relative;
	width:100%;
}
.vip-top-left-bg{
	width:100%;
	border-radius:16px;
}
.vip-top-left-content{
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	padding:1.2rem 1.2rem 1rem;
	display:flex;
	flex-direction:column;
	justify-content:center;
}
.vip-top-title{
	font-size:1.1rem;
	font-weight:600;
	color:#19FF88;
	margin-bottom:0.5rem;
}
.vip-top-subtitle{
	font-size:0.9rem;
	color:rgba(255,255,255,0.9);
}
.vip-top-right{
	width:48%;
	height:auto;
	margin-left:0.5rem;
	transform:translateY(-12px);
	position:relative;
	image{
		position:absolute;
		width:12rem;
		left:-2rem;
	}
}

.vip-desc{
	margin-top:1.2rem;
	margin-bottom:0;
	color:#FFFFFF;
}
.vip-desc-title{
	font-size:0.9rem;
	color:rgba(255,255,255,0.7);
	margin-bottom:0.4rem;
}
.vip-desc-main{
	font-size:1rem;
	font-weight:600;
	margin-bottom:0.2rem;
}
.vip-desc-sub{
	font-size:0.8rem;
	color:rgba(255,255,255,0.6);
}

.vip-cards{
	display:flex;
	justify-content:space-between;
	margin-bottom:1.5rem;
}
.vip-card{
	position:relative;
	width:48%;
}
.vip-card-bg{
	width:100%;
}
.vip-card-content{
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	padding:1rem;
	display:flex;
	flex-direction:column;
	justify-content:flex-start;
}
.vip-card-title{
	font-size:0.9rem;
	color:rgba(255,255,255,0.75);
	margin-bottom:0.4rem;
}
.vip-card-level{
	font-size:1.1rem;
	font-weight:600;
	color:#FFFFFF;
	margin-bottom:0.3rem;
}
.vip-card-tip{
	font-size:0.5rem;
	color:rgba(255,255,255,0.7);
}

.vip-level{
	position:relative;
	margin-bottom:1.5rem;
}
.vip-level-bg{
	width:100%;
}
.vip-level-content{
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	padding:0 1.4rem;
	display:flex;
	align-items:center;
	justify-content:space-between;
}
.vip-level-label{
	font-size:0.9rem;
	color:#000000;
}
.vip-level-value{
	font-size:1.4rem;
	font-weight:700;
	color:#000000;
}

.vip-list{
	color:#FFFFFF;
}
.vip-list-item{
	display:flex;
	align-items:center;
	justify-content:space-between;
	margin-bottom:0.8rem;
}
.vip-list-label{
	font-size:0.9rem;
	color:rgba(255,255,255,0.7);
}
.vip-list-value{
	font-size:0.95rem;
	font-weight:600;
}

/* 下一阶段建议 */
.vip-next{
	position:relative;
	margin-top:1.5rem;
	margin-bottom:0.5rem;
	height:12.5rem;
}
.vip-next-bg{
	width:100%;
	height:100%;
}
.vip-next-content{
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	padding:1rem 1.4rem 1.2rem;
	display:flex;
	flex-direction:column;
	justify-content:flex-start;
}
.vip-next-title{
	font-size:0.95rem;
	font-weight:600;
	color:#FFFFFF;
	margin-bottom:0.7rem;
}
.vip-next-btn{
	position:relative;
	margin-bottom:2rem;
}
.vip-next-btn-bg{
	width:100%;
	height:2rem;
	border-radius:0.2rem;
}
.vip-next-btn-text{
	position:absolute;
	top:-.2rem;
	left:0;
	right:0;
	bottom:0;
	display:flex;
	align-items:center;
	justify-content:center;
	font-size:0.65rem;
	font-weight:600;
	color:#FFFFFF;
	padding:0 1.2rem;
	text-align:center;
}
.vip-next-tip{
	display:flex;
	align-items:flex-start;
	margin-top:0.4rem;
}
.vip-next-tip-icon{
	width:1.5rem;
	height:auto;
	margin-right:0.5rem;
}
.vip-next-tip-text{
	flex:1;
	font-size:0.7rem;
	color:rgba(255,255,255,0.7);
	line-height:1.4;
}

/* 口径与风控说明 */
.vip-risk{
	position:relative;
	margin-top:-0.6rem; /* 与上方卡片稍微叠加 */
	margin-bottom:1.8rem;
}
.vip-risk-bg{
	width:100%;
	object-fit:cover;
	height:12rem;
}
.vip-risk-content{
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	padding:1.2rem 1.5rem 1.4rem;
	display:flex;
	flex-direction:column;
	justify-content:flex-start;
}
.vip-risk-title{
	font-size:0.95rem;
	font-weight:700;
	color:#FFFFFF;
	margin-bottom:0.8rem;
}
.vip-risk-text{
	display:flex;
	flex-direction:column;
	font-size:0.78rem;
	color:rgba(255,255,255,0.8);
	line-height:1.4;
	text{
		margin-bottom:0.3rem;
	}
}
</style>