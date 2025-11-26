<template>
    <view class="identity body" :class="$store.state.setting.theme">
        <navBar :back="back" :title="title">
        </navBar>
        <view class="wrapper">

          <view class="form s01">
            <view class="info"><u-icon name="info-circle-fill" size="16"></u-icon>请您使用有效身份信息认证</view>
            
            <view class="row">
                <view class="cl">姓名</view>
                <view class="cr">
                    <input class="input" placeholder="请输入" />
                </view>
            </view>

            <view class="row">
                <view class="cl">证件号码</view>
                <view class="cr">
                    <input class="input" placeholder="请输入" />
                </view>
            </view>

            <view class="split">上传身份证正反面</view>
            <view class="box-col">

                <view class="item panel">
                    <text class="image">正面</text>
                    <view class="bdlg"></view>
                </view>

                <view class="item panel">
                    <text class="image">反面</text>
                    <view class="bdlg"></view>
                </view>
            </view>
            <view class="ctl">
                    <button class="btn">确认提交</button>
            </view>
          </view>
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
            back: "/pages/member/security",
            title: "身份认证",
            currency: "",
            status: "",
            path: "",
            rows: [],
            form: {

            },
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
            that.transfer.request({
                url: "GET app/member/security/identity",
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
.identity {
    .form{
        width:90%;
        margin: 0 auto;
        .split,.box-col{width:100%;}
        .split{line-height:2rem;}
        .box-col{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            height: 6rem;
            .item{
                width:48%;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;  
                justify-content: space-around;
                align-content: space-around;
            }
        }
    }

    .wrapper {
 
        height: calc(100% - 14vh);
        padding: 6vh 0 8vh 0;
        color: #fff;
    }
 

}
</style>