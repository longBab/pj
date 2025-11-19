<template>
  <view class="deposit body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <!-- <image src="../static/image/homebg.png" class="bg_img1"></image> -->
    <view class="wrapper">
       
        <view class="page">
          <view class="title">BSC链</view>
          <view class="qrcode">
            <view class="img"></view>
          </view>
          <view class="split-row">
            <view class="cl"></view>
            <view class="cc">
              <text>{{ $t('您的专属充值地址') }}</text>
            </view>
            <view class="cr"></view>
          </view>
          <u-form class="form" ref="uForm" :model="form">
            <u-form-item class="item" :border-bottom="false">
                <u-input  color="#fff" style="height:1rem;line-height:1rem" />
                <u-icon  slot="right"  name="arrow-right" size="20" />
            </u-form-item>
          </u-form>
          <view class="info">每个用户具备独立地址，该地址入账均算入用户充值。</view>
         

            <button class="btn">{{$t('确认提交')}}</button>
 
        </view>
        
         
     
    </view>
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
import utility from '../../utility';
export default {
  components: {navBar},
  data() {
    return {
      back:"invest",
      title:"钱包充值",
      form: {
        value: "" 
      },
    };
  },

  onReady() {},
  onLoad(sender) {
    var that = this,sender=sender||{};
    that.sender=sender;
    that.load(sender); 
  },
  methods: {
    load(sender){
      var that=this,sender=that.sender||sender||{};
       
    }
  } 
};
</script>

<style lang="scss" scoped>
.deposit {
  .page{
    width:80%;
    background: linear-gradient(180deg, rgba(14, 255, 176, 0.3) 0%, rgba(74, 85, 81, 0.3) 100%);
    border: 1px solid #134D3A;
    padding:0 0 2rem 0;
    border-radius:10px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    .title,.qrcode,.info,.ctl{text-align: center;}
    .title{
      font-size:1rem;
      height:2rem;
      font-weight:600;
      color:#0EFFB0;
      line-height:2.5rem;

    }
    .qrcode{ 
      height:11rem;
      display:flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: space-around;
      .img{
        border:1px solid #fff;
        width:10rem;height:10rem;
      }
    }
    .split-row{
      .cc{
        font-size:0.8rem;
        font-weight:600;
        color: #0EFFB0;

      }
    }
    .info{color:#fff;font-size:0.7rem;}
    .ctl{
      
    }
  }
  .form{
    display:flex;
    .item{
      border-radius:10px;
      border: 1px solid #417B68;
      color:#fff;
      height:2rem;
    }
  }
  .wrapper {
    //justify-content: flex-start;
    margin: 4rem auto;
    height: calc(100% - 4rem);
    padding: 0rem 0.8rem 0 0.8rem;
  }
  
}


</style>