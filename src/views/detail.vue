<template>
  <div class="page">
      <van-nav-bar
        title="编辑页面"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-tabs v-model="active">
            <van-tab title="列表页">
                <div class='instruntion' ref='page1'>
                <div class='item'>
                    <span>缩略图</span>
                    <img :src='introduceData.headImg' @click='previewPic(introduceData.headImg)'/>
                    <van-button class='modify' type='primary'>
                        修改图片
                        <input type="file" accept="image/*"
                            @change='uploadPic($event,introduceData.headImg)'
                            name="uploader-input" 
                            class="uploader_file"
                            id="upload">
                    </van-button>
                    
                    <!-- <Button class='modify' type='primary'>修改</Button> -->
                </div>
                <div class='item'>
                    <span>标题</span>
                    <textarea v-model="introduceData.title"></textarea>
                </div>
                <div class='item'>
                    <span>简介</span>
                    <textarea v-model="introduceData.desciption"></textarea>
                </div>
                <div  class='item'>
                    <span>标签</span>
                    <div class='checkboxGroup'>   
                        <van-checkbox class='checkbox' v-for="item in tags" :key='item.key' v-model="item.checked">{{item.label}}</van-checkbox>
                    </div>
                    <div class='addtion'>
                        <van-field v-model="selfTags" 
                        placeholder='是否为其他分类'
                        label="其他分类" />
                    </div>
                </div>
                <div class='item'>
                    <van-field v-model="introduceData.level" label="推荐等级" />
                </div>

                <div class='item' style="padding-bottom:8rem;">
                    <van-button type='primary' @click='preview(0)'>预览</van-button> 
                    <van-button v-if='myId' style="margin-left:10rem" type='primary' @click='deleteData'>删除</van-button> 
                </div>
                <div class='item'></div>
            </div>
            </van-tab>
            <van-tab title="详情页">
                <div class='detail' ref=page2>

                    <div class='head'>
                        <div class='title'>标题</div>
                        <textarea v-model="detailData.title"/>
                    </div>
                    <div class='block' v-for='(block,index) in detailData.contentArr' :key='index'>
                        <div class='title'>段落{{index}}</div>
                        <div class="content">
                            <textarea v-if='block.type == "text"' v-model="block.data"
                                placeholder="请输入文字"/>
                            <img v-if='block.type =="img"' title='请插入图片'
                                :src='block.data' @click='previewPic(block.data)'/>
                            <div class='ctrlBtns'>
                                <van-button class='btn' @click='insertPic(index)'>插入图片</van-button>
                                <van-button class='btn' @click='insertText(index)'>插入文字</van-button>
                                <van-button class='btn' @click='deleteBlock(index)'>删除</van-button>
                                <van-button class='btn' v-if='block.type =="img"'>
                                    修改图片
                                    <input type="file" accept="image/*"
                                        @change='uploadPic2($event,index)'
                                        name="uploader-input" 
                                        class="uploader_file"
                                        id="upload" />
                                    </van-button>
                            </div>
                        </div>
                    </div>
                    <div v-if="detailData.contentArr.length === 0">
                        <div class='ctrlBtns'>
                                <van-button class='btn' @click='insertPic(0,true)'>插入图片</van-button>
                                <van-button class='btn' @click='insertText(0,true)'>插入文字</van-button>
                            </div>
                    </div>
                    <div class='block foot'>
                        <van-button class='btn' type='primary' @click='preview(1)'>预览</van-button>
                        <van-button class='btn' type='primary' @click='release'>发布</van-button>
                    </div>
                    
                </div>
            </van-tab>
            
        </van-tabs>
      
      
  </div>
</template>
<script>
import api from '@/service/api'
import {myFetch} from '@/service/fetch'

import config  from '@/config'
import { ImagePreview,Toast } from 'vant';
import {deepClone, random,guid} from '@/util/tools';
import ossClient from '@/util/oss.js'
let OSS = require('ali-oss');
export default {
   data(){
       return {
           active:0,
        selfTags:'',
        introduceData:{},
        myId:'',
        detailData:{
            contentArr:[]
        },
        tags:[{key:'bilei',label:'币类',checked:false},
          {key:'zhuce',label:'注册账号',checked:false},
          {key:'tuiguang',label:'应用推广',checked:false},
          {key:'jutou',label:'巨头应用',checked:false},
          {key:'fanlu',label:'返撸套路',checked:false},
          {key:'renwu',label:'手机任务',checked:false}]
       }
   },
    beforeRouteEnter(to, from, next){
        console.log('detail to')
        console.log(to)
        console.log(from)
        if(from.name === 'preview'){
            to.meta.isBack = true;
        }else{
            to.meta.isBack = false
        }
        next()
    },
  beforeCreate(){
    //   console.log('before create')
  },
  created(){
    //   console.log('created')
      
  },
  mounted(){
    //   console.log('mounted')
    
    // this.initScrollPage();
        
  },
  activated(){
      if(!this.$route.meta.isBack){
        this.myId = this.$route.query.myId
        this.getData()
      }
  },
  methods:{
      getListResult(){
          let resultTags = []
          for(let i = 0; i<this.tags.length; i++){
              if(this.tags[i].checked){
                resultTags.push(this.tags[i].label)
              }
          }  
          if(this.selfTags){
              resultTags.push(this.selfTags)
          }
          let dd = deepClone(this.introduceData)
          dd.tags = JSON.stringify(resultTags)
          if(window.baseCang === 'cangku'){
            dd.browseCount = random(10,100)
          }
          
          return dd
      },
      getDetailResult(){
          let dd = deepClone(this.detailData)
          dd.contentArr = JSON.stringify(dd.contentArr)
          return dd
      },
      async deleteData(){
        await myFetch({url:window.baseCang==='cangku'?api.deleteItem:api.deleteItemOnline, data:{myId:this.myId}});
        Toast('删除成功');
		this.$router.back()
      },
      async release(){
          let dd = {
              instruction: this.getListResult(),
              detail: this.getDetailResult()
          }
          if(this.myId){
            await myFetch({url:window.baseCang==='cangku'?api.saveItem:api.saveItemOnline, data:dd});
          }else{
              let myId = guid()
              dd.instruction.myId = myId;
              dd.detail.myId = myId;
              dd.instruction.time = (new Date()).valueOf()
              await myFetch({url:api.create,data:dd})
          }
          
          Toast('发布成功');
          this.$router.back()
          
      },
      preview(index){
          if(index == 0){
              this.$router.push({ name: 'preview', params:{dataList:this.getListResult()}})
          }else if(index == 1){
              this.$router.push({ name: 'preview', params:{detail:this.getDetailResult()}})
          }
      },
      onClickLeft(){
        this.$router.back()
      },
      previewPic(url){
        console.log(url)
        ImagePreview({
            images: [
                url
            ],
            closeable: true,
        });
      },
    //   initScrollPage(){
    //     this.clientHeight = this.$refs.page1.clientHeight

    //     this.$refs.page1.ontouchstart = (event)=>{
    //         this.startY = event.targetTouches[0].pageY

    //         this.$refs.page1.ontouchmove = (e)=>{
    //             this.endY = e.targetTouches[0].pageY
                
    //             this.delta = this.startY - this.endY
    //             if(this.delta > 0){
    //                 this.$refs.page1.style.top = 0 - this.delta + 'px'
    //                 this.$refs.page2.style.top = this.clientHeight - this.delta + 'px'
    //             }

    //         }

    //         this.$refs.page1.ontouchend = ()=>{
    //         this.$refs.page1.ontouchmove = null;
    //         if(this.delta > 200){
    //             this.$refs.page1.style.top = 0 - this.clientHeight + 'px'
    //             this.$refs.page2.style.top = 0 + 'px'
    //         }
    //     }
    //     }

    //     this.$refs.page2.ontouchstart = (event)=>{
    //         // this.startY = event.targetTouches[0].pageY
    //         if(this.$refs.page2.scrollTop){
    //             return;
    //         }
    //         this.startY = event.targetTouches[0].pageY

    //         this.$refs.page2.ontouchmove = (e)=>{
    //             this.endY = e.targetTouches[0].pageY
                
    //             this.delta = this.startY - this.endY
    //             if(this.delta < 0){
    //                 this.$refs.page1.style.top = -this.clientHeight - this.delta + 'px'
    //                 this.$refs.page2.style.top = 0 - this.delta + 'px'
    //             }

    //         }

    //         this.$refs.page2.ontouchend = ()=>{
    //         this.$refs.page2.ontouchmove = null;
    //         if(this.delta < -200){
    //             this.$refs.page1.style.top = 0
    //             this.$refs.page2.style.top = this.clientHeight + 'px'
    //         }
    //     }
    //     }
    //   },
      formatData(obj) {
        //   console.log(obj)
        if(obj.headImg.indexOf('http') < 0){
            obj.headImg = config.tmpImgBase + '/' + obj.headImg;
        }
        
        if(obj.tags){
            obj.tags = JSON.parse(obj.tags);
            let newTags = []
            for(let i = 0; i<obj.tags.length; i++){
                let findIt = false;
                for(let j = 0; j<this.tags.length; j++){
                    if(obj.tags[i] == this.tags[j].label){
                        findIt = true;
                        this.tags[j].checked = true;
                        break;
                    }
                }
                if(!findIt){
                    newTags.push(obj.tags[i]);
                }
            }
            this.selfTags = newTags.join(',')
        }else{
            this.selfTags = ''
        }
        if(!obj.level){
            obj.level = 0;
        }
        this.introduceData = obj
      },
      formatDetail(obj) {
          obj.contentArr = JSON.parse(obj.contentArr)
          let arr = []
          for(let i = 0; i<obj.contentArr.length; i++){
              if(obj.contentArr[i].type === 'img'){
                  if(obj.contentArr[i].data.indexOf('http')<0){
                    obj.contentArr[i].data = config.tmpImgBase + '/' + obj.contentArr[i].data
                  }
              }
              if(obj.contentArr[i].data){
                  arr.push(obj.contentArr[i])
              }
          }
          obj.contentArr = arr
          this.detailData = obj
      },
      async getData() {
        // let dd = this.$http.post(api.getWebItem,{myId:this.myId})
        this.introduceData = {
            headImg:'',
            title:'',
            description:'',
            tag:'',
            type:'',
            level:0
        };
        this.detailData = {
            title:'',
            contentArr:[]
        };
        if(!this.myId){
            return;
        }
        let dd = await myFetch({url:window.baseCang==='cangku'?api.getWebItem:api.getWebItemOnline, 
                    data:{myId:this.myId}});
        let bb = await myFetch({url:window.baseCang==='cangku'?api.getDetail:api.getDetailOnline, 
                    data:{myId:this.myId}});
        this.formatData(dd)
        this.formatDetail(bb)
        // console.log(bb)
      },
      insertPic(index,initail){
        // console.log(index)
        let d = {
            type:'img',
            data:''
        }
        if(initail){
            this.detailData.contentArr = [d]
        }else{
            this.detailData.contentArr.splice(index+1,0,d);
        }
        let dd = deepClone(this.detailData)
        this.detailData = dd;
      },
      insertText(index,initail){
        let d = {
            type:'text',
            data:''
        }
        if(initail){
            this.detailData.contentArr = [d]
        }else{
            this.detailData.contentArr.splice(index+1,0,d);
        }
        let dd = deepClone(this.detailData)
        this.detailData = dd;
        // console.log(this.detailData)
        // console.log(index)
      },
      deleteBlock(index){
        console.log(index)
        this.detailData.contentArr.splice(index,1);
      },
      readFileAsBuffer(file) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            try{
                reader.readAsDataURL(file);
                reader.onload = function() {
                    
                const base64File = reader.result.replace(
                    /^data:\w+\/\w+;base64,/,
                    ""
                );
                resolve(new OSS.Buffer(base64File, "base64"));
                };
            }catch(e){
                reject(e.stack)
            }
            
        });
      },
      async uploadPic2(event,index){
        let file = event.target.files[0];
        let file_re = await this.readFileAsBuffer(file)

        let picName = ''
        if(this.detailData.contentArr[index].data){
        let nameArr = this.detailData.contentArr[index].data.split('/')
        picName = nameArr[nameArr.length-1]
        }else{
            picName = guid() + '.png'
        }
        let result = await ossClient.put(picName, file_re);
        console.log('result')
        // console.log(result)
        this.detailData.contentArr[index].data = result.url;
      },
      async uploadPic(event,name){
         let file = event.target.files[0];
        let file_re = await this.readFileAsBuffer(file)
        // var imgtype = file.type.substr(6,4);
        let picName = ''
        if(name){
            let nameArr = name.split('/')
            picName = nameArr[nameArr.length-1]
        }else{
            picName = guid() + '.png'
        }
        
        let result = await ossClient.put(picName, file_re);
        // console.log('result')
        // console.log(result)
        this.introduceData.headImg = result.url;
        // $.ajax({
        //     url: '/upload',
        //     type: 'POST',
        //     dataType: 'json',
        //     data: formData,
        //     contentType: false,
        //     processData: false
        // })
        // .done(data => {
        //     $('#box').append(`<div class="photo-item">
        //         <img class="item-image" width="100%" height="100%" src="${data.url}"/>
        //     </div>`);
        // })
        // .fail(data => {
        //     console.log(data);
        // });
      }
  }
}
</script>
<style scoped lang='scss'>
.page{
    position:relative;
    overflow: hidden;
    width:100%;
    height:100%;

    .uploader_file{
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .detail{
        position:absolute;
        font-size:1rem;
        width:100%;
        height:45rem;
        overflow: auto;
        
        .head{
            padding:0.8rem;
            textarea{
                text-align: left;
                width:21rem;
                height:5rem;
                border: 1px solid #333;
            }
        }
        .title{
            font-size:1.5rem;
            text-align: left;
            font-weight: bold;
        }
        .block{
            padding:0.8rem;
            border-top: 1px dashed #333;
            .content{
                display: flex;
                justify-content: space-between;
                height:13rem;
                flex-direction: column;
                img{
                    width:14rem;
                    height:10rem;
                }
                textarea{
                    padding:0.2rem;
                    width: 20rem;
                    border: 1px solid #333;
                    height:9rem;
                }
                .ctrlBtns{
                    
                    margin-right:0.8rem;
                    margin-top:0.6rem;
                    display: flex;
                    justify-content: space-around;
                    text-align: right;
                        .btn{
                        margin-top:0.1rem;
                        
                    }
                }
            }
        }
        .foot{
            padding-bottom:8rem;
            text-align: left;
            .btn{
                margin-left:5rem;
            }
        }
       
    }

    .instruntion{
        overflow-y:scroll;
        height:45rem;
        .item{
            border-bottom: 1px dashed #222;
            padding:0.5rem;
            text-align: left;
            img{
                height: 7rem;

            }
            span{
                display: block;
                font-weight:bold;
                font-size:1.5rem;
            }
            .modify{
                float:right;
                position:relative;
                input{
                    width:100%;
                    height:100%;
                }
            }
            textarea{
                width:22rem;
                font-size:1rem;
                height:7rem;
                border:1px solid #aaa;
            }
            .options{
                width:5rem;
                height:0.8rem;
            }
            .checkboxGroup{
                display: flex;
                flex-wrap: wrap;
                .checkbox{
                    margin-left:1rem;
                    margin-top:1rem;
                }
                
            }
            
            input{
                height:0.6rem;
                padding-left:0.2rem;
                font-size: 0.4rem;
                border:1px solid #aaa;
            }
        }
        .ctlButton{
            display: flex;
            justify-content: space-around;
            .btn{
                font-size:0.37rem;
                width:2rem;
                height:0.7rem;
            }
        }
    }
    
}

</style>