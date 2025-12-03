<template>
<view class="node-preview body" :class="$store.state.setting.theme">
  <navBar :back="back" :title="title">
    <template #quicker="{}">
      <navLanguage :source="this" />
    </template>
  </navBar>
  <view class="wrapper">
    <scroll-view scroll-y="true" scroll-x="false">
      <!-- 顶部标题区域 -->
      <view class="header-section">
        <view class="header-content">
          <view class="header-text">
            <text class="main-title">{{$t('全球节点合伙人')}}</text>
            <text class="sub-title">{{$t('共建长期价值')}}</text>
          </view>
          <view class="header-icon">
            <image src="/static/images/image257.png"  mode="aspectFit" />
          </view>
        </view>
      </view>

      <!-- 我的节点激励 -->
      <view class="incentive-section">
          <image style="width: 100%; height: 100%; position: absolute;top: 0;left: 0;right: 0;bottom: 0;" src="/static/images/Rectangle831.png"   />

        <view class="incentive-content">
          <view class="incentive-header">
            <text class="incentive-title">{{$t('我的节点激励')}}</text>
            <text class="incentive-amount">3000U</text>
          </view>
          <view class="incentive-buttons">
            <view class="btn btn-view-rules" @click="viewRules">
              <text>{{$t('查看规则')}}</text>
            </view>
            <view class="btn btn-apply" @click="applyEvaluation">
              <text>{{$t('申请节点评估')}}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 当前节点 -->
      <view class="node-section">
        <view class="node-bg">
          <image src="/static/images/Rectangle780.png"  />
        </view>
        <view class="node-content">
          <view class="node-item">
            <text class="node-label">{{$t('当前节点')}}</text>
            <text class="node-value">Node 3</text>
          </view>
          <view class="node-item">
            <text class="node-label">{{$t('深度范围')}}</text>
            <text class="node-value">4-5代</text>
          </view>
          <view class="node-item">
            <text class="node-label">1代5%</text>
            <text class="node-value">0.50%</text>
          </view>
          <view class="node-item">
            <text class="node-label">{{$t('参与标准')}}</text>
            <text class="node-value">>100.000U</text>
          </view>
          <view class="node-item">
            <text class="node-label">{{$t('状态')}}</text>
            <text class="node-value status-pending">{{$t('待评估')}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
  <mrFooter page="member" />
</view>
</template>

<script>
import navBar from "@/components/navBar.vue";
import mrFooter from "@/components/footer";
import navLanguage from "@/components/navLanguage";

export default {
  components: {
    mrFooter,
    navBar,
    navLanguage
  },
  data() {
    return {
      back: "/pages/member",
      title: "我的节点预览"
    };
  },
  methods: {
    viewRules() {
      // 查看规则逻辑
      this.gotoPage('/pages/member/vip');
    },
    applyEvaluation() {
      // 申请节点评估逻辑
      this.gotoPage('/pages/content/vip');
    }
  }
};
</script>

<style lang="scss" scoped>
.node-preview {
  position: relative;
  min-height: 100vh;
  background: #000;
  color: #fff;

  .wrapper {
    padding: 0 3.5%;
    padding-bottom: 3rem;
  }

  .header-section {
    margin: 1.5rem 0 1.2rem 0;
    padding: 1.5rem 1rem;
    border-radius: 12px;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-text {
        flex: 1;
        display: flex;
        flex-direction: column;
            padding-top: 4rem;

        .main-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .sub-title {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }
      }

      .header-icon {
        width: 8rem;
        height: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        image {
          width: 13rem;
          position: absolute;
          top: -2rem;
          left: -3rem; 
        }
      }
    }
  }

  .incentive-section {
    position: relative;
    margin: 1.2rem 0;
    overflow: hidden;
    height: 7rem;
    .incentive-bg {
      width: 100%;
      image {
        width: 100%;
        height: 100%;
      }
    }

    .incentive-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1.5rem 4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .incentive-header {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .incentive-title {
          font-size: 1rem;
          color: #fff;
          font-weight: 500;
        }

        .incentive-amount {
                    font-size: 1rem;

          font-weight: bold;
          color: #fff;
        }
      }

      .incentive-buttons {
        display: flex;
        gap: 0.8rem;
        margin-top: auto;
        justify-content: center;
        .btn {
          width: 6rem;
          height: 1.7rem;
          line-height: 1.7rem;
          text-align: center;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: bold;
          background: linear-gradient(90deg, #08E07F 0%, #1AFFAA 100%);
          color: #000;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          text {
            display: block;
          }
        }
      }
    }
  }

  .node-section {
    position: relative;
    margin: 1.2rem 0;
    border-radius: 12px;
    overflow: hidden;

    .node-bg {
      width: 100%;
      
      image {
        width: 100%;
        display: block;
      }
    }

    .node-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 1.5rem 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .node-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem 0;

        .node-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .node-value {
          font-size: 0.8rem;
          color: #fff;
          font-weight: 500;

          &.status-pending {
            color: #FFA500;
          }
        }
      }
    }
  }
}
</style>
