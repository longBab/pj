<template>
<view class="product body" :class="$store.state.setting.theme">
  <navBar :title="title" :back="back">
    <!--
  <template #quicker="{}">
    <navLanguage :source="this" />
  </template>
  -->
  </navBar>
  <view class="wrapper">
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
        <view class="r02 panel"> 
          {{formatMoney(totalAmount,2)}} $
          <view class="bdlg"></view>
        </view>
      </view>
      <view class="progress panel">
        <view class="line">
              <view class="active" :style="{width:(saleAmount/totalAmount*100)+'%'}"></view>
        </view>
        <view class="value">{{formatMoney(saleAmount,2)}}/{{formatMoney(totalAmount,2)}}$</view>
      </view>
 
      <view class="board">
        <view class="item panel">
          <text class="title">{{ $t('个人量化产出比') }}</text>
          <text class="value">{{formatMoney(expectedRevenue,2)}}%</text>
          <view class="bdlg"></view>
        </view>

        <view class="item panel">
          <text class="title">{{ $t('平台产出比') }}</text>
          <text class="value">{{formatMoney(expectedRevenue01,2)}}%</text>
          <view class="bdlg"></view>
        </view>

      </view>
    
        
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('参与量化') }}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="detail panel">
        <view class="row">
          <text class="cl">{{$t('账号余额')}}</text>
          <text class="cr clr1">{{formatMoney((user.balance*1)+(user.rechargeAmount*1),2)}} $</text>
        </view>
        <view class="row">
          <text class="cl">{{$t('已配量化')}}</text>
          <text class="cr clr1">{{formatMoney(purchedAmount,2)}}$</text>
        </view>
        <view class="row">
          <text class="cl">{{$t('未配量化')}}</text>
          <text class="cr clr1">{{formatMoney(maxInvestment-purchedAmount,2)}}$</text>
        </view>
        <view class="row">
          <text class="cl">{{$t('量化周期')}}</text>
          <text class="cr">{{$t(releaseCycle||'暂无')}}</text>
        </view>
        <view class="row">
          <text class="cl">{{$t('项目总长')}}</text>
          <text class="cr">{{projectDuration}}</text>
        </view>
        <view class="row">
          <text class="cl">{{$t('配置区间')}}</text>
          <text class="cr">{{formatMoney(minInvestment,2)}}-{{formatMoney(maxInvestment,2)}}</text>
        </view>
         <view class="row">
          <text class="cl">{{$t('总结算比例')}}</text>
          <text class="cr">{{formatMoney(expectedTotalRevenue,2)}}%</text>
        </view>
        <view class="row" v-if="false">
          <text class="cl">{{$t('周期产出比例')}}</text>
          <text class="cr">{{formatMoney(expectedRevenue,2)}}%</text>
        </view>
        <view class="row">
          <text class="cl">{{$t('量化金额')}}</text>
          <text class="cr input"><input class="txt" :placeholder="$t('请输入量化金额')" type="number" v-model="form.value" />$</text>
        </view>
        <view class="row">
          <text class="cl">{{$t('量化总产出')}}</text>
          <text class="cr">{{formatMoney(expectedTotalRevenue*form.value,2)}}$</text>
        </view>
        <view class="ctl" >
              <button class="sbtn" @click="submit($event)">{{ $t('开启量化') }}</button>
        </view>
        <view class="bdlg"></view>
      </view>

      
      <view class="split-row">
        <view class="cl"></view>
        <view class="cc">
          <text>{{ $t('您的量化') }}</text>
        </view>
        <view class="cr"></view>
      </view>

      <view class="safebox">
        <button class="btn" @click="changePopuper({})">{{ $t('量化保护仓') }}</button>
      </view>
      <view class="detail panel">
        <view class="row" v-for="(item, i) in statistics.groups[1]" :key="i">
          <text class="cl">{{ $t(item.title||'未知') }}</text>
          <text class="cr">{{ get(item.field)||get('statistics.data.'+item.field)||'暂无' }}</text>
        </view>
        <view class="ctl">
              <view class="btn panel" @click="gotoPage('product/detail?id='+id)">
                {{ $t('查看全部') }}
                <view class="bdlg"></view>
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
      <view class="r1">{{$t('量化保护仓')}}</view> 
      <view class="r2 panel">
        <text class="cl">{{$t('保护仓金额')}}</text>
        <text class="cr">{{form.value}}$</text>
        <view class="bdlg"></view>
      </view>
      <view class="r3"><u-icon name="bell"></u-icon>{{$t('保护本金')}}</view>
      <view class="r4">
        <input v-model="popuper.safeBox.isCheck" class="check" type="checkbox" placeholder="" />
        {{$t('查看合约并勾选确认')}}
      </view>
      <view class="ctl">
        <button class="sbtn">{{ $t('确认开启') }}</button>
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
    .popuper{

      ::v-deep .u-mode-center-box{
        width:85% !important;
        border-radius:10px;
        border:0px solid #000;
        background:url(/static/images/popuper-bg1.png) center center no-repeat !important;
        background-size:100% auto;
      }
      .close{
        color:#fff;
      }
      .safeBox{
        width:100%;
        margin:0 auto;
        padding:2rem;
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: center;
        flex-wrap: wrap;
        color:#fff;
        .check{
          display: inline-block;
          vertical-align: middle;
          border:1 solid #929292;
        }
        .r1{
          color:#0EFFB0;
          text-align: center;
          font-size:1rem;
          line-height:3rem;

        }
        .r2{
          height:2rem;
          line-height:0;
          padding:1rem;
          display:flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: space-around;
          
        }
        .r3{
          line-height:2rem;
          
        }
        .r4{
          text-align: center;
          line-height:3rem;
        }
        .ctl{padding:0rem;}
      }
    }
    .sbtn {
      width: 7.5rem;
      height: 1.55rem;
      line-height: 1.55rem;
      font-size: 0.75rem;
      background-color: #0EFFB0;
      border-radius: 0.65rem;
      left:calc(50% - 3.25rem);
       position: absolute;z-index:9;
    }
    .split-row {
      .cc {
        font-size: 0.8rem;
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
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: flex-start;
        text-align: center;
        font-size:0.6rem;
        background:url(/static/images/products/p1.png) right center no-repeat;
        background-size:auto 70%;
        .r01,.r02{width:50%;}
        .r02{height:2rem;line-height:2rem;}
    }
    .progress{
      $_height:1.5rem;
      height:$_height;
      position:relative;
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-end;
      box-shadow: 2px 1px 24.1px 3px #8C8784 inset,4px 4px 5.2px 29px #0EFFB01A inset;
      background: #000000;
      border-radius: 0.7rem;
      .line{
        $_heightL:0.25rem;
        width:95%;
        margin: 0  auto 0.2rem auto;
        border-radius: 0.65rem;
        height: $_heightL;
        background-color: #726B6B;
        .active{
          width: 35%;
          border-radius: 0.65rem;
          height: $_heightL;
          background-color: #0EFFB0;
        }
      }
      .value{
        width:100%;
        position:absolute;
        top:-0.3rem;right:0.5rem;left:0;text-align:center;
        line-height:$_height;
        width:auto;
        z-index:1;
      }
    }
    .board{
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      .item{
        width:45%;
        height:3rem;
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: space-around;
        text-align: center;
      }

    }
    .detail{
      display:flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      background: radial-gradient(100% 100% at 0% 0%, rgba(62, 190, 202, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
      padding:0.7rem;
      .row{
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-around;
        height:1.5rem;
        .cl{
          width:6rem;
          text-align:left;
        }
        .cr{
          width:calc(100% - 6rem);
          text-align:right;
          &.clr1{
            color:#9C9C9C;
          }
          &.input{
            position:relative;
            height:2rem;
            .txt{
              border:1px solid rgba(62, 190, 202, 0.6) ;
              position: absolute;
              font-size:0.6rem;
              width:40%;
              top:0; 
              right:0.5rem; 
              text-align: center;
              z-index:9;
              border-radius:5px;
            }
          }
        }
      }
      .ctl{
        height:1.5rem;
        display:flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: center;
        .btn{width:30%;text-align: center;line-height:1.4rem;}
      }
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
      
      .btn{
        width:7rem;
        height:2rem;
        border:1px solid #0EFFB0;
        border-radius:5px;
        color:#fff;
        font-size:0.7rem;
        background: radial-gradient(100% 100% at 0% 0%, rgba(250, 250, 250, 0.2) 0%, rgba(247, 247, 247, 0) 100%);
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