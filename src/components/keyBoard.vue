<template>
<view class="keyBoard" v-if="isOpen">
    <view class="mask"></view>
    <view class="shower">
        <text class="close" @click="isOpen=false">X</text>
        <view class="title">{{$t(title||"支付密码")}}</view>
        <view class="words">
            <view class="key" v-for="(c,i) in keys" key="i">
                <text class="password" v-if="c!=''"></text>
                <text class="cursor" v-if="current==i&&c==''"></text>
            </view>
          
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
    isOpen:{type:Number,default:0},
    title:{type:String,default:''},
    length:{type:Number,default:6}
  },
  mounted(sender){
    var that=this,length=that.length||6,keys=[];
    for(var i=0;i<length;i++){
        keys.push("");
    }
    that.keys=keys;

    //console.log(["length",that.length]);
  },
  methods:{
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
        opacity: 0.2 !important;
    }
    .shower{
        display: flex;
	    position: fixed;
        background:#000;
        border-radius:10px;
        width:80%;
        margin:0 auto;
        left: 10%;
        top: calc(50% - $_heightS);
        height: $_heightS;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .close{
            width:1rem;
            height:1rem;
            position:absolute;
            right:-0.2rem;
            top:0.2rem;
        }
        .title{
            text-align:center;
            color:#fff;
            font-size:1rem;
            font-weight:600;
        }
        .words{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            .key{
                position:relative;
                width:38px;
                height:34px;
                line-height:34px;
                font-size:16px;
                white-space:nowrap;
                border:1px solid #484f5a;
                border-radius:3px;
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
                    background:#484f5a;
                }
                .cursor{
                    position:relative;
                    border-right:3px solid;
                    -moz-border-radius:1px;
                    -webkit-border-radius:1px;
                    border-radius:1px;
                    height:35px;
                    color:#484f5a;
                    background-color:#484f5a;
                    -webkit-animation:cursorAni 1s infinite linear;
                    animation:cursorAni 1s infinite linear;
                    z-index:10;
                    vertical-align:top
                }
                
            }
        }
       
        z-index:9;
        

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
        z-index:9;
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