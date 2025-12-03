<template>
    <view class="payment body" :class="$store.state.setting.theme">
      <navBar :back="back" :title="title">
      </navBar>
      <view class="wrapper" style="justify-content: flex-start;padding-top:5rem;">
        <view class="navigations" v-if="page=='default'">
          <view class="card-item" @click="change($event,'alipay')">
            <image class="card-bg" src="/static/images/Rectangle65.png" mode="widthFix" />
            <view class="card-content">
              <image class="card-icon"  src="/static/images/image164.png" mode="widthFix" />
              <view class="card-text">
                <text class="card-title">{{$t(alipayAccount&&alipayCertificate?'已绑定支付宝':'未绑定支付宝')}}</text>
                <view v-if="!alipayAccount||!alipayCertificate" class="card-btn">{{$t('去绑定')}}</view>
              </view>
            </view>
          </view>
    
          <view class="card-item" @click="change($event,'wechat')">
            <image class="card-bg" src="/static/images/wx2.png" mode="widthFix" />
            <view class="card-content">
              <image class="card-icon" src="/static/images/image161.png" mode="widthFix" />
              <view class="card-text">
                <text class="card-title">{{$t(wxpayAccount&&wxpayCertificate?'已绑定微信':'未绑定微信')}}</text>
                <view v-if="!wxpayAccount||!wxpayCertificate" class="card-btn">{{$t('去绑定')}}</view>
              </view>
            </view>
          </view>
    
          <view class="card-item" @click="change($event,'bank')">
            <image class="card-bg" src="/static/images/wx3.png" mode="widthFix" />
            <view class="card-content">
              <image class="card-icon" src="/static/images/image165.png" mode="widthFix" />
              <view class="card-text">
                <text class="card-title">{{$t(openBank&&bankCardAccount&&cardholderName?'已绑定银行卡':'未绑定银行卡')}}</text>
                <view v-if="!openBank||!bankCardAccount||!cardholderName" class="card-btn">{{$t('去绑定')}}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="page" v-if="page=='alipay'||page=='wechat'||page=='bank'">
          <view class="tabs">
            <view class="tabs-container">
              <view class="tabs-slider" :style="{transform: `translateX(${(page === 'alipay' ? 0 : page === 'wechat' ? 100 : 200)}%)`}"></view>
              <text class="item" :class="{active:page=='alipay'}" @click="change($event,'alipay')" >{{$t('绑定支付宝')}}</text>
              <text class="item" :class="{active:page=='wechat'}" @click="change($event,'wechat')">{{$t('绑定微信')}}</text>
              <text class="item" :class="{active:page=='bank'}" @click="change($event,'bank')">{{$t('绑定银行卡')}}</text>
            </view>
          </view>
          <view class="form s01">
            <view class="split" v-if="form.split">{{$t(form.split||"未知")}}</view>
            <view class="input-row" v-if="form.split">
              <input class="input-field" v-model="form.value" :placeholder="$t(form.tips||'未知')" />
            </view>
            <view class="split" v-if="form.split01">{{$t(form.split01||"未知1")}}</view>
            <view class="box-cc" v-if="form.split01">
              <view class="upload-item" @click="upload($event,'image')">
                <view class="upload-box">
                  <image 
                    v-if="form.image"
                    :src="formatUrl(form.image)"
                    mode="aspectFill"
                    class="uploaded-image"
                  />
                  <view v-else class="upload-placeholder">
                    <image class="upload-icon" src="/static/images/chat.png" mode="widthFix" />
                  </view>
                </view>
              </view>
            </view>

            <view class="split" v-if="form.split02">{{$t(form.split02||"未知")}}</view>
            <view class="input-row" v-if="form.split02">
              <input class="input-field" v-model="form.value01" :placeholder="$t(form.tips02||'未知')" />
            </view>

            <view class="split" v-if="form.split03">{{$t(form.split03||"未知")}}</view>
            <view class="input-row" v-if="form.split03">
              <input class="input-field" v-model="form.value02" :placeholder="$t(form.tips03||'未知')" />
            </view>

            <view class="ctl">
              <button class="btn" @click="submit($event)">{{$t('确认提交')}}</button>
            </view>
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
          back:"/pages/member/security",
          title:"支付方式",
          page:"default",
          id:"",
          alipayAccount:"",
          alipayCertificate:"",
          bankCardAccount:"",
          cardholderName:"",
          openBank:"",
          wxpayAccount:"",
          wxpayCertificate:"",
          form:{
            tips:"",
            tips01:"",
            tips02:"",
            tips03:"",
            tips04:"",
            value:"",
            value01:"",
            value02:"",
            value03:"",
            image:""
          },
          maps:{
            alipay:{
              split:"支付宝账号(可选)",
              tips:"请输入支付宝账号",
              split01:"上传支付宝收款二维码",
              tips01:"支付宝收款码照片",
              split02:"",
              tips02:"",
              split03:"",
              tips03:""
            },
            wechat:{
              split:"微信号(可选)",
              tips:"请输入微信号",
              split01:"上传微信收款二维码",
              tips01:"微信收款码照片",
              split02:"",
              tips02:"",
              split03:"",
              tips03:""
            },
            bank:{
              split:"开户行",
              tips:"请输入开户行",
              split01:"",
              tips01:"",
              split02:"银行卡号",
              tips02:"请输入银行卡号",
              split03:"持卡人姓名",
              tips03:"请输入持卡人姓名"
            }
          },
          rows:[]
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
        load(sender) {
            var that = this, sender = sender|| that.sender|| {};
            sender.page=that.page||"default";
            that.extend(sender);
            if(sender.page!="default")return;
            that.transfer.request({
                url: "GET app/member/security/payment?way="+that.page,
            })
            .then((resp) => {
                var data = resp.data;
                data = data.data || data;
                that.extend(data);
                if(data.dataView)that.extend(data.dataView);
            });
        },
        change(event,page){
          var that=this;
          if(page=='alipay'||page=='wechat'||page=='bank')that.back="/pages/member/security/payment";
          else that.back="/pages/member/security/security";
          var form=that.get("maps."+page);
          if(page=="alipay"){
            form.value=that.alipayAccount||"";
            form.image=that.alipayCertificate||"";
          }
          else if(page=="wechat"){
            form.value=that.wxpayAccount||"";
            form.image=that.wxpayCertificate||"";
          }
          else if(page=="bank"){
            form.value=that.openBank||"";
            form.value01=that.bankCardAccount||"";
            form.value02=that.cardholderName||"";
          }
          that.extend({page:page,form:form});

          that.load({page:page});

        },
        upload(event,field){
            var that=this;
            uni.chooseImage({
						count: 1,
						sizeType: ['original', 'compressed'],
						sourceType: ['album'],
						success: function(res) {
							var tempFile = res.tempFilePaths[0];
                            console.log(["chooseImage",res]);
							new Promise((resolve, reject) => {
								const path = tempFile
								const options = {
									filePath: path,
                                    file:res.tempFiles[0],
									cloudPath: Date.now() + '.jpg'
								}
								resolve(options)
							}).then((options) => {
								uni.showLoading({
									title: that.$t('上传中...')
								})
								return that.transfer.uploadFile({
									...options,
									onUploadProgress(e) {

									}
								})
							}).then(res => {
								uni.hideLoading();
                                if (res.fileID.indexOf("cloud://") != -1) {
                                    that.transfer.getTempFileURL({
                                    fileList: [res.fileID],success(res){
                                        let file=res.fileList && res.fileList[0]?res.fileList[0]:{},fileURL=file.tempFileURL;
                                        that.set(fileURL,"form."+field)
                                        console.log(["fileURL",fileURL]);
                                        
                                    }});

                            }		 
                }).catch((err) => {
                    uni.hideLoading();
                    console.log(["uploadFile.err",err]);
                    if (err.message !== 'Fail_Cancel') {
                        that.Alert("文件上传失败");
                    }
                })
            }
          });


        },
        submit(event){
          var that=this,page=that.page,data={},form=that.get("form");
          

          if(page=="alipay"){
            data={
             alipayAccount:form.value,
             alipayCertificate:form.image
            }
          }
          else if(page=="wechat"){
            data={
             wxpayAccount:form.value,
             wxpayCertificate:form.image
            }
          }
          else if(page=="bank"){
            data={
             openBank:form.value,
             bankCardAccount:form.value01,
             cardholderName:form.value02
            }
          }
          data.type=page;
          that.transfer.request({
              url: "POST app/member/security/payment",
              data:data
          })
          .then((resp) => {
              var data = resp.data;
              data = data.data || data;
              that.extend(data);
              
              if(data.dataView)that.extend(data.dataView);
              that.Alert("资料更新成功");
              setTimeout(function(){
                that.load({page:"default"});
              },3000);
          });

          console.log(["data",data]);


        }
          
      },
    };
    </script>
          
    <style lang="scss" scoped>
    .payment {
      .wrapper{
        padding: 1rem;
      }
      .navigations{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        padding: 0 0.5rem;
      }
      .card-item{
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        aspect-ratio: 1;
        .card-bg{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          object-fit: cover;
        }
        .card-content{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 1.2rem 0.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        .card-icon{
          width: 2.5rem;
          margin-bottom: 0.4rem;
        }
        .card-text{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
          margin-top: 0.3rem;
        }
        .card-title{
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }
        .card-btn{
          padding: 0.35rem 1.2rem;
          border: 1px solid #08E07F;
          border-radius: 6px;
          color: #08E07F;
          font-size: 0.75rem;
          font-weight: 600;
          text-align: center;
          white-space: nowrap;
        }
      }
      .page,.form{width:93%; margin:0 auto;}
      .form{ width:90%;margin:1rem auto;}
      .page{
        width: 100%;
        padding: 1rem;
        .tabs{
          width:100%;
          margin:0 auto 1.5rem;
          .tabs-container{
            position: relative;
            display:flex;
            flex-direction: row;
            flex-wrap: nowrap;
            border-radius:10px;
            border: 1px solid #08E07F;
            padding: 0.2rem;
            background: rgba(255, 255, 255, 0.1);
            .tabs-slider{
              position: absolute;
              top: 0.2rem;
              left: 0.2rem;
              width: calc(33.333% - 0.27rem);
              height: calc(100% - 0.4rem);
              background: linear-gradient(90deg, #08E07F, #1AFFAA);
              border-radius: 8px;
              transition: transform 0.3s ease;
              z-index: 0;
            }
            .item{
              position: relative;
              flex: 1;
              height: 2rem;
              text-align: center;
              line-height: 2rem;
              color: rgba(255, 255, 255, 0.6);
              border-radius: 8px;
              z-index: 1;
              transition: color 0.3s ease;
              &.active{
                color: #000;
                font-weight: 600;
              } 
            }
          }
        }
        .form{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .split{
          width:100%;
          line-height:2rem;
          margin: 1.5rem 0 1rem;
          font-size: 0.9rem;
          color: #FFFFFF;
          text-align: left;
        }
        .input-row{
          width: 100%;
          margin-bottom: 1rem;
          .input-field{
            width: 100%;
            height: 2.8rem;
            padding: 0 1rem;
            background: url(/static/images/Rectangle52.png) center center no-repeat;
            background-size: 100% 100%;
            color: #FFFFFF;
            font-size: 0.9rem;
            box-sizing: border-box;
            border: none;
            border-radius: 8px;
          }
          .input-field::placeholder{
            color: #999999;
          }
        }
        .box-cc{
          width:100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin-bottom: 2rem;
          .upload-item{
            width: 6rem;
            .upload-box{
              width: 100%;
              aspect-ratio: 1;
              border: 1px solid #08E07F;
              border-radius: 8px;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
              .upload-placeholder{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .upload-icon{
                  width: 1.5rem;
                  height: auto;
                }
              }
              .uploaded-image{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
        .ctl{
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          .btn{
            width: 10rem;
            height: 2.3rem;
            line-height: 2.3rem;
            background: linear-gradient(90deg, #08E07F, #1AFFAA);
            border: none;
            border-radius: 15px;
            color: #000;
            font-size: 0.8rem;
            font-weight: 600;
          }
        }
      }
     
     
      .wrapper{
        color:#fff;
        overflow: hidden;
      }
      uni-scroll-view {
        height: auto;
      }
    
    }
    </style>