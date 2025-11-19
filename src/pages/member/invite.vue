<template>
  <view class="invite body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <view class=" wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
       

      </scroll-view>
    </view>
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  setup() {},
  components: {navBar},
  data() {
    return {
    back:"/pages/member/team",
    title:"投资理财",
    url:""
  };
  },
  onReady() {
 
  },
  onLoad(sender) {
    var that = this,sender=sender||{};
    that.sender=sender;
    that.load(sender); 
  },
  methods: {
    load(sender){
      var that=this,sender=that.sender||sender||{};
      
    },
   
  }
};
</script>

<style lang="scss" scoped>
.invite {
  .wrapper{
    justify-content: flex-start;
    margin:3.5rem auto;
    height: calc(100% - 4rem);
    padding: 0rem 0rem 5rem 0rem;
  }
  uni-scroll-view {
    height: calc(100% - 2rem);
  }
}
</style>