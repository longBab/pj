<template>
    <view class="identity body" :class="$store.state.setting.theme">
        <navBar :back="back" :title="title">
        </navBar>
        <view class="wrapper" style="padding-top: 5rem;">

            <view class="message panel" v-if="form.realNameStatus==1||form.realNameStatus==2">
                 
                 <text class="wait" v-if="form.realNameStatus==1">{{$t("审核中")}}</text>
                 <text class="success" v-if="form.realNameStatus==2">{{$t("已实名成功")}}</text>
                <view class="bdlg"></view>
            </view>

          <view class="form s01" v-if="form.realNameStatus==0">
            <view class="info">
              <image class="info-icon" src="/static/images/Vector.png" mode="widthFix" />
              <text>{{$t('请您使用有效身份信息认证')}}</text>
            </view>
            
            <view class="input-row">
                <input class="input-field" v-model="form.name" :placeholder="$t('姓名')" />
            </view>

            <view class="input-row">
                <input class="input-field" v-model="form.documentNumber" :placeholder="$t('证件号码')" />
            </view>

            <view class="split">{{$t('上传身份证正反面')}}</view>
            <view class="box-col">

                <view class="item panel" style='margin:0;border:none;' @click="upload(event,'frontImage')">
                    <view class="upload-box">
                        <image 
                            v-if="form.frontImage"
                            :src="formatUrl(form.frontImage)"
                            mode="aspectFill"
                            class="uploaded-image"
                        />
                        <view v-else class="upload-placeholder">
                            <image class="upload-icon" src="/static/images/chat.png" mode="widthFix" />
                        </view>
                    </view>
                </view>

                <view class="item panel" style='margin:0;border:none;' @click="upload(event,'backImage')">
                    <view class="upload-box">
                        <image 
                            v-if="form.backImage"
                            :src="formatUrl(form.backImage)"
                            mode="aspectFill"
                            class="uploaded-image"
                        />
                        <view v-else class="upload-placeholder">
                            <image class="upload-icon" src="/static/images/chat.png" mode="widthFix" />
                        </view>
                    </view>
                </view>
            </view>
            <view class="ctl">
                    <button class="btn" @click="submit($event)" >{{$t('确认提交')}}</button>
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
            back: "/pages/member/security",
            title: "身份认证",
            currency: "",
            status: "",
            path: "",
            rows: [],
            form: {
                id:"",
                name:"",
                documentNumber:"",
                frontImage:"",
                backImage:"",
                realNameStatus:0

            },
        };
    },
    onReady() {

    },
    onLoad(sender) {
        var that = this, sender = sender || {};
        that.sender = sender;
        that.load(sender);
    },
    methods: {
        load(sender) {
            var that = this, sender = that.sender || sender || {};
           
            that.transfer.request({
                url: "GET app/member/security/identity",
            })
            .then((resp) => {
                var data = resp.data;
                data = data.data || data;
                that.extend(data);
            });
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

            var that = this, sender = that.sender || sender || {};
            //that.set(that.get("user.id"),"form.id");
            that.transfer.request({
                url: "POST app/member/security/identity",
                data:that.get("form")
            })
            .then((resp) => {
                var data = resp.data;
                data = data.data || data;
                that.extend(data);
                that.Alert("实名提交成功");
                setTimeout(()=>{
                    that.gotoPage(that.get("back"));
                },3000);
            });

        }

    },
};
</script>
      
<style lang="scss" scoped>
.identity {
    .message{
        width:80%;margin:0 auto;line-height:10rem;font-size:1rem; font-weight:500; text-align: center;
        .success{color:green}
        .wait{color:orange}
    }
    .form{
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .info{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin: 0 auto 1.5rem;
            width: 100%;
            font-size: 0.8rem;
            color: #FFFFFF;
            text-align: center;
            .info-icon{
                width: 0.8rem;
                height: 0.8rem;
            }
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
            }
            .input-field::placeholder{
                color: #999999;
            }
        }
        .split{
            width:100%;
            line-height:2rem;
            margin: 1.5rem 0 1rem;
            font-size: 0.9rem;
            color: #FFFFFF;
            text-align: left;
        }
        .box-col{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            gap: 1rem;
            width:100%;
            margin-bottom: 2rem;
            .item{
                width:6rem;
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

    .wrapper {
        height: calc(100% - 14vh);
        padding: 1rem;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>