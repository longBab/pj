<template>
<view class="product body" :class="$store.state.setting.theme">
  <navBar :title="title" :back="back">
    <!--
  <template #quicker="{}">
    <navLanguage :source="this" />
  </template>
  -->
  </navBar>
  <view class="wrapper" >
    <scroll-view scroll-y="true" scroll-x="false">
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('量化中心') }}</text>
        </view>
        <view class="cr"></view>
      </view>
      <view class="statistics">
        <view class="r01"> {{ $t('量化总金额') }} </view>
        <view class="r02">
          <image class="total-bg" src="/static/images/Rectangle1096.png" mode="widthFix" />
          <view class="total-content">
            {{formatMoney(totalAmount,2)}} $
          </view>
        </view>
      </view>
      <view class="progress">
        <image class="progress-bg" src="/static/images/Rectangle3533.png"   />
        <view class="progress-content" style="margin-top:.2rem;">
          <view class="progress-line">
            <view class="line">
              <view class="active" :style="{width:(saleAmount/totalAmount*100)+'%'}"></view>
            </view>
          </view>
          <view class="progress-amount" >
            <text class="current">{{formatMoney(saleAmount,2)}}</text>
            <text class="total">/{{formatMoney(totalAmount,2)}} USDT</text>
          </view>
        </view>
      </view>
 
      <view class="board">
        <view class="item">
          <image class="board-card-bg" src="/static/images/Rectangle1098.png" mode="widthFix" />
          <view class="board-card-content">
            <text class="title">{{ $t('个人量化产出比') }}</text>
            <text class="value">{{formatMoney(expectedRevenue,2)}}%</text>
          </view>
        </view>

        <view class="item">
          <image class="board-card-bg" src="/static/images/Rectangle1098.png" mode="widthFix" />
          <view class="board-card-content">
            <text class="title">{{ $t('平台产出比') }}</text>
            <text class="value">{{formatMoney(expectedRevenue01,2)}}%</text>
          </view>
        </view>

      </view>

      <view  style="height:1.5rem;"></view>
        
        
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('参与量化') }}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="detail panel" style="border:none;border-radius:0;">
        <image class="detail-bg" src="/static/images/Rectangle12.png" mode="widthFix" />
        <view class="detail-content">
          <view class="row balance-row">
            <text class="cl">{{$t('余额')}}</text>
            <text class="cr clr1">{{formatMoney((user.balance*1)+(user.rechargeAmount*1),2)}} USDT</text>
          </view>
           <view class="amount-input-meta" v-if="investmentStats.max">
                <text class="meta-range">{{formatMoney(investmentStats.purched,2)}}/{{formatMoney(investmentStats.max,2)}} USDT</text>
                <text class="meta-remaining">剩余可配置 {{formatMoney(investmentStats.remaining,2)}} USDT</text>
              </view>
          <view class="amount-input-row">
            <image class="amount-bg" src="/static/images/Rectangle1090.png" mode="widthFix" />
           
            <view class="amount-input-content">
             
              <input
                class="txt"
                type="number"
                v-model="form.value"
                :placeholder="$t('产品金额')"
              />
            </view>
          </view>

          <view class="row">
            <text class="cl">{{$t('量化周期')}}</text>
            <text class="cr">{{$t(releaseCycle || '天, 周, 月, 季, 年')}}</text>
          </view>
          <view class="row">
            <text class="cl">{{$t('周期产出比例')}}</text>
            <text class="cr">{{formatMoney(totalRevenueRate,2)}} %</text>
          </view>
          <view class="row" v-if="investmentStats.max">
            <text class="cl">{{$t('配置区间')}}</text>
            <text class="cr">{{formatMoney(investmentStats.min,2)}}~{{formatMoney(investmentStats.max,2)}} USDT</text>
          </view>
          <view class="row">
            <text class="cl">{{$t('周期总产出')}}</text>
            <text class="cr">{{formatMoney(expectedTotalRevenue*form.value,2)}} USDT</text>
          </view>

          <view class="ctl" >
                <button class="sbtn" @click="submit($event)">{{ $t('开启量化') }}</button>
          </view>
        </view>
      </view>

       <view  style="height:1.5rem;"></view>
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('您的量化') }}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="safebox">
        <view class="safebox-btn" @click="changePopuper({})">
          <image class="safebox-btn-bg" src="/static/images/Rectangle1104.png" mode="widthFix" />
          <view class="safebox-btn-text">
            {{ $t('量化保护仓') }}
          </view>
        </view>
      </view>
       <view  style="height:.8rem;"></view>
      <view class="detail panel" style="border:none;border-radius:0;">
        <image class="detail-bg" src="/static/images/Rectangle1103.png" mode="widthFix" />
        <view class="detail-content detail-stat-content">
          <view class="row" v-for="(item, i) in statistics.groups[1]" :key="i">
            <text class="cl">{{ $t(item.title||'未知') }}</text>
            <text class="cr">{{ get(item.field)||get('statistics.data.'+item.field)||'暂无' }}</text>
          </view>
          <view class="ctl">
            <view class="view-all-btn" @click="gotoPage('product/detail?id='+id)">
              <image class="view-all-bg" src="/static/images/Rectangle3534.png" mode="widthFix" />
              <view class="view-all-text">
                {{ $t('查看全部') }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="nodata" v-if="false">
        {{$t('沒有更多数据了')}}
      </view>
    </scroll-view>
  </view>
  <u-popup class="popuper" v-model="popuper.isShow" mode="center" >
    <u-icon class="close" name="close" @click="changePopuper(null,'close')"></u-icon>
    <view class="safeBox">
      <image class="safeBox-bg" src="/static/images/Rectangle1105.png"  />
      <view class="safeBox-content">
        <view class="r1">{{$t('量化保护仓')}}</view> 
        <view class="r2">
          <image class="amount-bg" src="/static/images/Rectangle421.png" mode="widthFix" />
          <view class="amount-content">
            <text class="cl">{{$t('保护仓金额')}}</text>
            <text class="cr">{{form.value}}$</text>
          </view>
        </view>
        <view class="r3">
          <image class="info-icon" src="/static/images/fi-ss-comment-info.png" mode="widthFix" />
          <text>{{$t('保护本金')}}</text>
        </view>
        <view class="r4">
          <input v-model="popuper.safeBox.isCheck" class="check" type="checkbox" placeholder="" />
          {{$t('查看合约并勾选确认')}}
        </view>
        <view class="ctl">
          <button class="sbtn">{{ $t('确认开启') }}</button>
        </view>
      </view>
    </view>
  </u-popup>
  <keyBoard ref="keyBoard"  @submit="submit"  />
  
</view>
</template>
  
<script>
import navBar from "@/components/navBar.vue";
import keyBoard from "@/components/keyBoard.vue";
export default {
  components: {
    navBar,
    keyBoard
  },
  setup() { },
  data() {
    return {
      back: "/pages/products",
      title: "产品详情",
      popuper:{isShow:false,safeBox:{isCheck:false},dialog:{icon:"",title:"",content:""}},
      id:0,
      releaseCycle:"",
      projectDuration:0,
      expectedRevenue:0,
      expectedTotalRevenue:0,
      purchedAmount:0,
      totalAmount:1,
      minInvestment:0,
      maxInvestment:0,
      expectedRevenue:0,
      expectedRevenue01:0,
      expectedTotalRevenue:0,
      saleAmount:0,
      startTime:"",
      regulation:"",
      user:{balance:0,rechargeAmount:0},
      statusMap:{
        "0":"准备中",
        "1":"量化中",
        "2":"量化完成"
      },
      statusName:"暂无",
      form: {value:""},
      statistics: {
        groups: [
          [
           
          ],
          [
            { field: "regulation", title: "监管机构" },
            { field: "statusName", title: "状态" },
            { field: "startTime", title: "开启时间",type:"time" },
          ]
        ],
        data: {
           
        },
        data: {
          v01: '量化保护',
          v02: '能量释放中',
          v03: '0',
          v04: '0'
        }
      }
    };
  },
  onLoad(sender) {
    var that = this;
    that.sender = sender;
    that.load(sender);

  },
  onReady() {
    //this.getServerData();
  },
  computed:{
    investmentStats(){
      const min = Number(this.minInvestment) || 0;
      const max = Number(this.maxInvestment) || 0;
      const purched = Number(this.purchedAmount) || 0;
      const remaining = max > 0 ? Math.max(max - purched,0) : 0;
      return {min,max,purched,remaining};
    },
    totalRevenueRate(){
      const personal = Number(this.expectedRevenue) || 0;
      const platform = Number(this.expectedRevenue01) || 0;
      return personal + platform;
    }
  },
  methods: {
    load(sender) {
          var that = this,sender=sender|| that.sender|| {},id=sender.id||0;
          that.transfer.request({
              url: "GET app/product/"+id,
          })
          .then((resp) => {
              var data = resp.data;
              data = data.data || data;
              var _data=data.dataView||{};
              data.statusName=that.get("statusMap")[_data.status];
              //console.log(["statusMap",that.get("statusMap"),_data.status]);
              that.extend(data);
              if(_data) that.extend(_data);
          });
    },
    changePopuper(sender,type){
      var that=this,item=sender||{};
     
      if(type=='close'){that.extend(that.popuper,{isShow:false});return false;}
      that.extend(that.popuper,{isShow:true,safeBox:{}});
      console.log(["....",item]);
    },
    submit(event){
      var that=this,value=that.get("form.value")||0,keyBoard=that.get("$refs.keyBoard");
     
       //console.log(["keyBoard",keyBoard]);
      if(typeof(event)=="string"){
         
         that.transfer.request({
              url: "POST app/product/"+that.id,
              data:{productId:that.id,payPassword:event,amount:value}
          })
          .then((resp) => {
              var data = resp.data;
              data = data.data || data;
              that.gotoPage("/pages/member/products");
              console.log(["data",data]);
          });
          return false;
      }
    
      keyBoard.open({title:"支付密码",length:6});

    }
    
  },
};
</script>
  
  <style lang="scss" scoped>

  .product {
    .amount-input-meta{
          display:flex;
          flex-direction:column;
          width:100%;
          font-size:0.65rem;
          line-height:0.95rem;
          color:#CFEFE6;
          margin-bottom:0.1rem;
          .meta-range{
            color:#0EFFB0;
            font-weight:600;
          }
          .meta-remaining{
            color:#FFFFFF;
            opacity:0.85;
          }
        }
    .popuper{

      ::v-deep .u-mode-center-box{
        width:85% !important;
        border-radius:0;
        border:0;
        background:transparent !important;
      }
      .close{
        color:#fff;
      }
      .safeBox{
        position:relative;
        width:100%;
        margin:0 auto;
        padding:0;
        color:#fff;
        .safeBox-bg{
          width:100%;
          height:18rem;
          object-fit:cover;
        }
        .safeBox-content{
          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          padding:2.2rem 2rem 3rem;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .check{
          display: inline-block;
          vertical-align: middle;
          border:1 solid #929292;
        }
        .r1{
          color:#0EFFB0;
          text-align: left;
          font-size:1.2rem;
          line-height:2rem;
        }
        .r2{
          position:relative;
          margin-top:1.2rem;
          .amount-bg{
            width:100%;
          }
          .amount-content{
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            padding:1.2rem 2rem;
            display:flex;
            align-items:center;
            justify-content:space-between;
            font-size:0.95rem;
          }
        }
        .r3{
          margin-top:1rem;
          display:flex;
          align-items:center;
          font-size:0.85rem;
          .info-icon{
            width:.8rem;
            height:.8rem;
            margin-right:0.4rem;
          }
        }
        .r4{
          text-align: center;
          line-height:3rem;
          font-size:0.8rem;
        }
        .ctl{padding:0rem;}
      }
    }
    .sbtn {
      width: 7.5rem;
      height: 2rem;
      line-height: 2rem;
      font-size: 0.75rem;
      background: linear-gradient(90deg, #08E07F 40%, #1AFFAA 100%);
      border-radius: 999px;
      left:calc(50% - 3.25rem);
       position: absolute;z-index:9;
    }
    .split-row {
      .cc {
        font-size: 1.38rem;
        margin-bottom:1rem;
      }
    }
    .split-row,.statistics,.progress,.board,.detail,.safebox{
      width:93%;
      margin:0.5rem auto;
    }
    .statistics{
        height:5rem;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:flex-start;
        font-size:0.6rem;
        background:url(/static/images/products/p1.png) right center no-repeat;
        background-size:auto 120%;
        .r01{
          width:50%;
          text-align:center;
          font-size:1.1rem;
          margin-bottom:0.6rem;
        }
        .r02{
          width:50%;
          position:relative;
          .total-bg{
            width:100%;
          }
          .total-content{
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:0.9rem;
          }
        }
    }
    .progress{
      position:relative;
      margin-top:1.5rem;
      height:2rem;
      position:relative;
      .progress-bg{
        width:100%;
        height:100%;
        position:absolute;
      }
      .progress-content{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        padding:1rem 1.5rem;
      }
      .progress-line{
        width:100%;
        display:flex;
        justify-content:center;
      }
      .line{
        $_heightL:0.3rem;
        width:100%;
        margin:0;
        height: $_heightL;
        border-radius:999px;
        background-color: #726B6B;
        .active{
          width: 35%;
          height: $_heightL;
          border-radius:999px;
          background-color: #0EFFB0;
        }
      }
      .progress-amount{
        width:100%;
        display:flex;
        justify-content: flex-end;
        font-size:0.7rem;
        color:#FFFFFF;
        .current{
          color:#0EFFB0;
          font-size:.7rem;
        }
        .total{
          color:#FFFFFF;
          opacity:0.85;
          font-size:.7rem;
        }
      }
    }
    .board{
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top:1.5rem;
      .item{
        position:relative;
        width:47%;
      }
      .board-card-bg{
        width:100%;
      }
      .board-card-content{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        .title{
          font-size:0.85rem;
          margin-bottom:0.5rem;
        }
        .value{
          font-size:1rem;
        }
      }
    }
    .detail{
      position:relative;
      padding:0;
      background:transparent;
      .detail-bg{
        width:100%;
      }
      .detail-content{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        padding:1.6rem 1.8rem 2.4rem;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
      }
      .row{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items:center;
        height:1.8rem;
        .cl{
          text-align:left;
          font-size:0.85rem;
        }
        .cr{
          text-align:right;
          font-size:0.85rem;
          &.clr1{
            color:#9C9C9C;
          }
        }
      }
      .balance-row{
        margin-bottom:1rem;
      }
      .amount-input-row{
        position:relative;
        margin-bottom:1.2rem;
        .amount-bg{
          width:100%;
        }
        .amount-input-content{
          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
          display:flex;
          flex-direction:column;
          align-items:flex-start;
          justify-content:center;
          padding:0.6rem 1.5rem;
        }
        .txt{
          width:100%;
          background:transparent;
          border:none;
          outline:none;
          color:#fff;
          font-size:0.9rem;
          margin-top:-0.2rem;
          line-height:1.4rem;
        }
        
      }
      .ctl{
        margin-top:1.2rem;
        display:flex;
        justify-content:center;
        align-items:center;
      }
    }
    .detail-stat-content{
      padding:1.4rem 1.8rem 2.2rem;
    }
    .view-all-btn{
      position:relative;
      width:7.5rem;
      height:2.2rem;
    }
    .view-all-bg{
      width:100%;
      height:100%;
    }
    .view-all-text{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:0.8rem;
      color:#FFFFFF;
    }
    .safebox{
      height:6rem;
      display:flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-end;
      background:url(/static/images/products/p2.png) left center no-repeat;
      background-size:auto 100%;
      
      .safebox-btn{
        position:relative;
        width:8.5rem;
        height:3rem;
      }
      .safebox-btn-bg{
        width:6.5rem;
        position:absolute;
        top:.3rem;
        left:.84rem;
        object-fit:cover;
      }
      .safebox-btn-text{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:0.78rem;
        font-weight:600;
        color:#fff;
      }
    }
    .wrapper {
      justify-content: flex-start;
      height: calc(100% - 0vh);
      padding: 6vh 1rem 8vh 1rem;
      color: #fff;
    }
  
    uni-scroll-view {
      height: calc(100vh - 12vh);
    }
  }

  </style>