<template>
  <view class="withdraw body" :class="$store.state.setting.theme">
    <navBar :title="title" :back="back"></navBar>
    <view class="wrapper">
      <scroll-view scroll-y="true" scroll-x="false">
        <!-- 提现地址 -->
        <view class="section-header wc93">
          <view class="section-title">
            {{ $t('提现地址') }}
          </view>
          <view class="section-tip">
            <image class="section-tip-icon" src="/static/images/fi-ss-comment-info.png" mode="widthFix" />
            <text class="section-tip-text">{{ $t('长按可粘贴提现地址') }}</text>
          </view>
        </view>
        <view class="wc93 withdraw-card withdraw-address-card">
          <image class="withdraw-card-bg" src="/static/images/Rectangle22.png" mode="widthFix" />
          <view class="withdraw-card-content">
            <input
              class="withdraw-input"
              v-model="form.address"
              :placeholder="$t('请输入或粘贴提现地址')"
            />
          </view>
        </view>

        <!-- 提现数额 -->
        <view class="section-header wc93 mt5">
          <view class="section-title">
            {{ $t('提现数额') }}
            <text class="section-unit">(USDT)</text>
          </view>
        </view>
        <view class="wc93 withdraw-card withdraw-amount-card">
          <image class="withdraw-card-bg" src="/static/images/Rectangle23.png" mode="widthFix" />
          <view class="withdraw-card-content">
            <view class="withdraw-amount-input-row">
              <input
                class="withdraw-input"
                v-model="form.value"
                :placeholder="$t('请输入提现金额')"
                type="number"
                max="20"
              />
              <view class="token-tag">
                <image class="token-icon" src="/static/images/UT.png" mode="widthFix" />
                <text class="token-text">USDT</text>
              </view>
            </view>
            <view class="withdraw-amount-footer">
              <view class="amount-available">
                {{ $t('可用余额') }} {{formatMoney(user.rechargeAmount,2)}} USDT
              </view>
              <view class="btn-all" @click="form.value=user.rechargeAmount">
                {{ $t('全部') }}
              </view>
            </view>
          </view>
        </view>

        <!-- 底部按钮和提示 -->
        <view class="mt5">
          <view class="sell-btn" @click="submit($event)">
            {{ $t('确认提现') }}
          </view>
        </view>
        <view class="mt10 nodata">
          {{ $t('提现手续费') }}: {{formatMoney(withdraw_rate,2)}} USDT
        </view>
        <view class="mt5 nodata">
          {{ $t('最小提现金额') }}: {{formatMoney(min_withdraw_amount,2)}} USDT
        </view>

      </scroll-view>
    </view>
    <keyBoard ref="keyBoard"  @submit="submit"  />
  </view>
</template>

<script>
import navBar from "@/components/navBar.vue";
import keyBoard from "@/components/keyBoard.vue";
export default {
  components: { navBar,keyBoard },
  data() {
    return {
      back: "/pages/member/wallet",
      title: "转出",
      user:{rechargeAmount:0},
      form:{address:"",value:""},
      withdraw_rate:0,
      min_withdraw_amount:0
    }
  },

  onReady() { },
  onLoad(sender) {
    var that = this, sender = sender || {};
    that.sender = sender;
    that.load(sender);
  },
  methods: {
    load(sender) {
      var that = this, sender = that.sender || sender || {};
      that.transfer.request({
        url: "GET app/member/withdraw",
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        that.extend(data);
      });
    },
    submit(event){
      var that=this,keyBoard=that.get("$refs.keyBoard");
      if(typeof(event)!=="string"){
          keyBoard.open({title:"支付密码",length:6});
          return;
      }
      that.transfer.request({
        url: "POST app/member/withdraw",
        data:{address:that.get("form.address"),amount:that.get("form.value"),payPassword:event}
      })
      .then((resp) => {
        var data = resp.data;
        data = data.data || data;
        that.Alert("转出审请成功");
        setTimeout(()=>{
          that.gotoPage("/pages/member/wallet?showType=2");
        },3000);
        that.extend(data);
      });

    }
  }

};
</script>

<style lang="scss" scoped>
.split-row {

  .cl,
  .cr {
    width: 20%;
    text-align: center;
    height: 1px;
    margin: 0.5rem 0 0 0;
    border-radius: 1.5px;
    background: linear-gradient(90deg, #00FFBD 0%, #000000 100%);
  }

  .cdl,
  .cdr {
    width: 6px;
    height: 6px;
    background: #0EFFB0;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  .cdl {
    margin: 0.35rem 0 0 -0.2rem;
  }

  .cdr {
    margin: 0.35rem -0.2rem 0 0;
  }

  .cc {
    font-size: 0.8rem;
  }
}

.withdraw {
  .wrapper {
    justify-content: flex-start;
    height: calc(100% - 14vh);
    padding: 6vh 0 8vh 0;
    color: #fff;

    .tab-label {
      text-align: center;
      color: #FFFFFFB2;
    }

    .sell-btn {
      background: linear-gradient(90deg, #08E07F 100%, #1AFFAA 100%);
      border-radius: 999px;
      color: #000000;
      width: 70%;
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      font-weight: 600;
      font-size: 0.9rem;
      margin: 2.5rem auto 0;
    }
  }

  uni-scroll-view {
    height: calc(100vh - 14vh - 0.3rem);
  }
}

/* 新样式：提现页面 */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.section-title {
  font-size: 0.9rem;
  font-weight: 600;
}
.section-unit {
  margin-left: 0.2rem;
  font-size: 0.7rem;
  color: #FFFFFFB2;
}
.section-tip {
  display: flex;
  align-items: center;
  font-size: 0.65rem;
  color: #FFFFFFB2;
}
.section-tip-icon {
  width: 0.9rem;
  height: 0.9rem;
  margin-right: 0.25rem;
}
.section-tip-text {
  white-space: nowrap;
}

.withdraw-card {
  position: relative;
  margin-top: 0.8rem;
}
.withdraw-card-bg {
  width: 100%;
}
.withdraw-card-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.withdraw-input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 0.8rem;
}

.withdraw-amount-card .withdraw-card-content {
  justify-content: space-between;
}
.withdraw-amount-input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 0.5px dashed rgba(248, 248, 248, 0.2);
}
.token-tag {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
}
.token-icon {
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 0.2rem;
}
.token-text {
  font-size: 0.75rem;
}
.withdraw-amount-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: #FFFFFFB2;
}
.btn-all {
  padding: 0.15rem 0.7rem;
  border-radius: 999px;
  border: 1px solid #417B68;
  background: #0EFFB01A;
  font-size: 0.7rem;
}
.btn-all:active {
  background: var(--Color-4, #0EFFB0);
  color: #000;
}
</style>