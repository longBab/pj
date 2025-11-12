<template>
<view class="navLanguage" @click="change($event)">
  <view class="wrapper" style="position: relative">
    <image class="btn" mode="scaleToFill"></image>
    <view class="lang" v-if="isOpen" >
      <view v-for="(item, index) in items" :key="index">
        <view
          :class="{ 'item': true, active: lang === item.code }"
          @click="change(item, 'lang')"
          >{{ item.name }}</view
        >
        <view class="line"></view>
      </view>
    </view>
  </view>
</view>
</template>
    <script>
export default {
  props: ["source"],
  data() {
    return {
      current: 3,
      isOpen: false,
      lang:"zh",
      items:[],
       
    };
  },
  mounted() {
    let that = this,
      state = that && that.$store ? that.$store.state : {},
      setting = state.setting || {};
      that.extend({lang:setting.lang,items: setting.languageItems });
      console.log(["navLanguage.mounted", state]);
  },
  methods: {
    change(event, type) {
      let that = this,
        store = that.$store,
        state = that.$store ? that.$store.state : {},
        setting = state.setting || {},
        value,
        doc = typeof window && window.document ? window.document : {};
      if (type == "lang") {
        that.isOpen = true;
        value = event.code;
        console.log(["$i18n", that.$i18n.getLocaleMessage(value)]);
        store.commit("setSetting", { __path: "lang", __data: value });
        that.$i18n.locale = value;
        doc.title = that.$t(setting.title);
        that.lang=value;
        if (that.source && that.source.load) that.source.load(event);
        //console.log(["source",that.source]);
        return false;
      }
      that.isOpen = !that.isOpen;
    },
  },
};
</script>
<style lang="scss" scoped="true">
.navLanguage {
  width: 100%;
  .wrapper {
    display: flex;
	  align-items: center;
    width: 100%;
    justify-content: flex-end;
   
  }
  .btn{
    width: 1.3rem; height: 1.3rem
  }
  
  .lang {
    position: absolute;
    bottom: -17.6rem;
    right: 0rem;
    width: 236rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 20rpx;
    .item {
      font-size: 30rpx;
      text-align: center;
    }
    .line {
      margin: 18rpx 0;
      width: 100%;
      height: 6rpx;
      background: linear-gradient(0deg, #ffffff 0%, #ffe7e7 100%);
    }
  }
  .active {
    color: #f00;
  }
}
</style>