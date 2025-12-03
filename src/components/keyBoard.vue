<template>
<view class="keyBoard" v-if="isOpen">
    <view class="mask"></view>
        <view class="shower">
        <u-icon class="close" name="close" @click="handleCancel"></u-icon>
       
        <view class="title">{{$t(title||"输入支付密码")}}</view>
        <view class="words">
            <view class="key" v-for="(c,i) in keys" :key="i">
                <text class="password" v-if="c!=''"></text>
                <text class="cursor" v-if="current==i&&c==''"></text>
            </view>
          
        </view>
        <view class="tip-text">{{$t('请确认周边安全并输入您的支付密码')}}</view>
        <view class="action-btns">
            <view class="btn ghost" @click="handleCancel">{{$t('在想想')}}</view>
            <view class="btn primary" @click="handleConfirm">{{$t('确认')}}</view>
        </view>
    </view>
    <view class="board">
        <view class="key" v-for="(c,i) in chars" :key="i" @click="chose(c,'key',i)" :class="{del:c=='x',ok:c=='o'}">{{$t(c=='x'?'':(c=='o'?'确定':c))}}</view>
    </view>
</view>
</template>
<script>
export default {
  data() {
    return {
        isOpen:0,
        title:"",
        length:6,
        current:0,
        keys:[],
        chars:[
            "1","2","3",
            "4","5","6",
            "7","8","9",
            "x","0","o"
        ]
      
    };
  },
  props: {
    
  },
  mounted(sender){
    /*
    var that=this,length=that.length,keys=[];
    for(var i=0;i<length;i++){
        keys.push("");
    }
    that.keys=keys;
    */

    //console.log(["length",that.length]);
  },
  methods:{
    open(sender){
        var that=this,i,sender=sender||{};
        console.log(["sender",sender]);
        if(!sender.title)sender.title="支付密码";
        if(!sender.length)sender.length=6;
        that.extend(sender);
        var length=that.length,keys=[];
        for(var i=0;i<length;i++){
            keys.push("");
        }
        that.keys=keys;
        that.current=0;
        that.set(1,"isOpen");
       
    },
    handleCancel(){
        this.set(0,"isOpen");
        this.keys=new Array(this.length).fill("");
        this.current=0;
    },
    handleConfirm(){
        var value=(this.keys||[]).join("").replace(/,/g,"");
        if(value.length!==this.length){
            return;
        }
        this.set(0,"isOpen");
        this.$emit('submit',value);
    },
    chose(event,type,index){
        var that=this,current=this.current,char=event;
      
        if(char=="x"){
            if(current>0){
            that.keys[current-1]="";
            that.current=current-1;
            }
             return false;  
        }
        that.keys[current]=char;
        that.current=current+1;
       
        if(char=="o"||that.current==that.keys.length){
            this.handleConfirm();
            return false;
        }
      
        console.log([char,index]);
    }
  }
 
}
</script>
<style scoped lang="scss">
.keyBoard{
    $_heightS:7rem;
    $_heightB:13rem;
    .mask{
        position: absolute;
        top:0;bottom:0;
        left:0;right:0;
        background-color:#fff !important;
        opacity: 0.6 !important;
        z-index:99;
    }
    .shower{
        display: flex;
	    position: fixed;
        background:#000;
        border-radius:18px;
        width:86%;
        margin:0 auto;
        left: 7%;
        top: 18%;
        padding:1.5rem 1.2rem 1rem;
        min-height: $_heightS + 4rem;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .close{
            width:1.4rem;
            height:1.4rem;
            position:absolute;
            right:0.6rem;
            top:0.6rem;
        }
        .title{
            text-align:center;
            color:#fff;
            font-size:1.3rem;
            font-weight:600;
            margin-bottom:1rem;
        }
        .words{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            margin:0 auto;
            width:100%;
            max-width:18rem;
            .key{
                position:relative;
                width:46px;
                height:46px;
                line-height:46px;
                font-size:18px;
                white-space:nowrap;
                border:1px solid #08E07F;
                border-radius:14px;
                text-align:center;
                @keyframes cursorAni{
                    0%,50%{opacity:1}
                    100%,60%{opacity:0}
                }
                .password{
                   // display: inline-block;
                   // line-height:34px;
                    position:absolute;
                    top:calc(50% - 9px);
                    left:calc(50% - 9px);
                    height:18px;
                    width:18px;
                    border-radius:50%;   
                    background:#08E07F;
                }
                .cursor{
                    position:relative;
                    border-right:3px solid;
                    -moz-border-radius:1px;
                    -webkit-border-radius:1px;
                    border-radius:1px;
                    height:40px;
                    color:#08E07F;
                    background-color:#08E07F;
                    -webkit-animation:cursorAni 1s infinite linear;
                    animation:cursorAni 1s infinite linear;
                    z-index:10;
                    vertical-align:top
                }
                
            }
        }
        .tip-text{
            margin-top:1rem;
            text-align:center;
            font-size:0.85rem;
            color:#08E07F;
        }
        .action-btns{
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-top:1.5rem;
            gap:0.8rem;
            .btn{
                flex:1;
                height:3rem;
                border-radius:999px;
                text-align:center;
                line-height:3rem;
                font-size:1rem;
                font-weight:600;
            }
            .ghost{
                border:1px solid #08E07F;
                color:#FFFFFF;
                background:rgba(8,224,127,0.04);
            }
            .primary{
                color:#000;
                background:linear-gradient(90deg,#08E07F 0%,#1AFFAA 100%);
            }
        }
       
        z-index:100;
        

    }
    .board{
        display: flex;
	    position: fixed;
        bottom:0;
        background:#000;
        width:100%;
        height:$_heightB;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: space-between;
        z-index:100;
        .key{
            width:33%;
            text-align: center;
            color:#fff;
            height: 25%;
            line-height: 250%;
            font-size:1.5rem;
            &.del{
                font-family: iconfont;
                &:before{
                    content: '\E714';
                }
            }
            &.ok{
                font-size:1rem;  
                line-height:3.6rem;
            }
        }
        
    }

}
</style>