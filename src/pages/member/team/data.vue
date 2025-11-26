<template>
<view class="data body">
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
                back:"/pages/member/team",
                title:"市场数据"
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
                url: "GET app/member/team/data",
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
.data{


}
uni-scroll-view {
    height: calc(100% - 2rem);
}
</style>