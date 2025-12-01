<template>
    <view class="identity body" :class="$store.state.setting.theme">
        <navBar :back="back" :title="title">
        </navBar>
        <view class="wrapper">

            <view class="message panel" v-if="form.realNameStatus==1||form.realNameStatus==2">
                 
                 <text class="wait" v-if="form.realNameStatus==1">{{$t("审核中")}}</text>
                 <text class="success" v-if="form.realNameStatus==2">{{$t("已实名成功")}}</text>
                <view class="bdlg"></view>
            </view>

          <view class="form s01" v-if="form.realNameStatus==0">
            <view class="info"><u-icon name="info-circle-fill" size="16"></u-icon>{{$t('请您使用有效身份信息认证')}}</view>
            
            <view class="row">
                <view class="cl">姓名</view>
                <view class="cr">
                    <input class="input" v-model="form.name" :placeholder="$t('请输入姓名')" />
                </view>
            </view>

            <view class="row">
                <view class="cl">证件号码</view>
                <view class="cr">
                    <input class="input" v-model="form.documentNumber" :placeholder="$t('请输入证件号码')" />
                </view>
            </view>

            <view class="split">{{$t('上传身份证正反面')}}</view>
            <view class="box-col">

                <view class="item panel" @click="upload(event,'frontImage')">
                    <view class="image">
                        <text class="image" v-if="!form.frontImage">正面</text>
                        <image 
                            :src="formatUrl(form.frontImage)"
                            mode="scaleToFill" v-if="form.frontImage"
                        />
                    </view>
                    <view class="bdlg"></view>
                </view>

                <view class="item panel" @click="upload(event,'backImage')">
                     <view class="image" >
                        <text class="image" v-if="!form.backImage">反面</text>
                        <image 
                            :src="formatUrl(form.backImage)"
                            mode="scaleToFill" v-if="form.backImage"
                        />
                    </view>
                    <view class="bdlg"></view>
                </view>
            </view>
            <view class="ctl">
                    <button class="btn" @click="submit($event)">确认提交</button>
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
        width:90%;
        margin: 0 auto;
        .split,.box-col{width:100%;}
        .split{line-height:2rem;}
        .box-col{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            height: 6rem;
            .item{
                width:48%;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;  
                justify-content: space-around;
                align-content: space-around;
                .image{
                    width:100%;height:100%;
                }
                uni-image{width:100%;height:100%;
                border-radius:10px;
                }
            }
        }
    }

    .wrapper {
 
        height: calc(100% - 14vh);
        padding: 6vh 0 8vh 0;
        color: #fff;
    }
 

}
</style>