<template>
	<view class="records body">
		<navBar :title="title" :back="back"></navBar>
		<view class="wrapper">
			<scroll-view scroll-y="true" scroll-x="false">
				 
				 <view class="record panel" v-for="(row,i) in rows" :key="i">
					<view class="c01">
					<text class="name">{{$t(statusMaps[row.status]||'未知')}}</text>
					<text class="time">{{formatDate(row.withdrawalTime,'yyyy/MM/dd HH:mm')}}</text>
					</view>
					<view class="c02">
					<text class="value">{{ formatMoney(row.withdrawalAmount,2) }}</text>
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
				back:"/pages/member/exchange?type=1",
				title:"换汇记录",
				statusMaps:{"0":"申请中","1":"成功","2":"退回"},
				rows:[]
			};
		},
	onLoad(sender) {
		var that = this;
		that.sender=sender;
		that.load(sender);
  	},
	methods: {
		load(sender) {
            var that = this, sender = sender||that.sender || {},filter=sender;
            if(!filter.pageNum)filter.pageNum=0;
            if(!filter.pageSize)filter.pageSize=10000;
            that.transfer.request({
                url: "GET app/member/exchange/records",
                data:filter
            })
            .then((resp) => {
                var data = resp.data;
                data = data.data || data;
                var rows=(data.dataView?data.dataView.rows:null)||data.rows||[];
                data.rows=rows;
                that.extend(data);
            });
        }
	},
};
</script>

<style lang="scss" scoped>
.records {

	.record{
    margin:0.3rem auto;
    display:flex;
    height:3rem;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    padding:0.5rem;
    .c01{
      width:13rem;
      display:flex;
      flex-direction: column;
      justify-content: space-evenly;
      .name{
        color: #0EFFB0;
        font-weight:400;
        /*font-size:0.4rem;*/
        white-space:nowrap;
        text-overflow:ellipsis;
      }
      .time{/*font-size:0.3rem;*/}
    }
    .c02{
      width:calc(100% - 13rem);
      text-align:right;
      .value{
        line-height:2rem;
        /*font-size:0.4rem;*/
        background: linear-gradient(90deg, #0EFFB1 0%, #31B9D4 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
   .wrapper{
        justify-content: flex-start;
        height: calc(100% - 1.2rem);
        padding: 2.5rem 0 0 0;
        color: #fff;
      
    }


}
 
</style>