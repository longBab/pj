<template>
<view class="incomes body">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
        
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
        back:"/pages/member/quantization",
        title:"产品收益"
        };
    },
    onLoad(sender) {
        let that = this;
        that.sender=sender;
        that.load(sender);
    },
    methods: {
        load(sender) {
        var that = this, sender = that.sender || sender || {};
        that.transfer.request({
            url: "GET app/member/incomes",
        })
        .then((resp) => {
            var data = resp.data;
            data = data.data || data;
            that.extend(data);
        });
        }
    }
};
</script>

<style lang="scss" scoped>
.products {
.incomes{
    justify-content: flex-start;
    height: calc(100% - 6vh);
    padding: 6vh 1rem 0 1rem;
    color: #fff;
    .itme-panel {
    height: 2.8rem;
    line-height: 2.8rem;

    .item {
    padding: 0 1.5rem;
    font-size: 0.75rem;
    }
}
}


}
uni-scroll-view {
    height: calc(100vh - 6vh);
}
</style>