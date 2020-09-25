<template>
  <div class="page">
      <div class='instruntion' ref='page1'>
          <div class='item'>
              <span>缩略图</span>
              <img :src='introduceData.headImg'/>
              <Button class='modify' type='primary'>
                  修改图片
                  <input type="file" accept="image/*"
                    @change='uploadPic'
                    name="uploader-input" 
                    class="uploader_file"
                    id="upload">
              </Button>
              
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
                    <span v-for="item in tags" :key='item.key'>
                      <input type="checkbox" :checked='item.checked' :value="item.label" />
                      <span>{{item.label}}</span>
                    </span>   
              </div>
              <div class='addtion'>
                  <span>其他:</span><input v-model="selfTags"/>
              </div>
          </div>
          <div class='item'>
              <span>推荐等级</span>
              <input type="text" v-model="introduceData.level">
          </div>

          <div class='ctlButton'>
            <Button class='btn' type='primary'>预览</Button> 
            <Button class='btn' type='primary'>编辑详情</Button>
          </div>
      </div>
      <div class='detail' ref=page2>
          <div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo reqw</div>
            <div>wo shihaha</div>
            <div>wo reqw</div>
            <div>wo reqw</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
            <div>wo rewq</div>
            <div>wo reqw</div>
            <div>wo yyy</div>
            <div>wo shihaha</div>
            <div>wo shihaha</div>
          </div>
          
      </div>
  </div>
</template>
<script>
import api from '@/service/api'
import {myFetch} from '@/service/fetch'
import config  from '@/config'

export default {
   data(){
       return {
        selfTags:'',
        introduceData:{},
        tags:[{key:'bilei',label:'币类',checked:false},
          {key:'zhuce',label:'注册账号',checked:false},
          {key:'tuiguang',label:'应用推广',checked:false},
          {key:'jutou',label:'巨头应用',checked:false},
          {key:'fanlu',label:'返撸套路',checked:false},
          {key:'renwu',label:'手机任务',checked:false}]
       }
   },
    
  beforeCreate(){
      console.log('before create')
  },
  created(){
      this.myId = this.$route.query.myId
  },
  mounted(){
    this.getData()

    this.clientHeight = this.$refs.page1.clientHeight

    this.$refs.page1.ontouchstart = (event)=>{
        this.startY = event.targetTouches[0].pageY

        this.$refs.page1.ontouchmove = (e)=>{
            this.endY = e.targetTouches[0].pageY
            
            this.delta = this.startY - this.endY
            if(this.delta > 0){
                this.$refs.page1.style.top = 0 - this.delta + 'px'
                this.$refs.page2.style.top = this.clientHeight - this.delta + 'px'
            }

        }

        this.$refs.page1.ontouchend = ()=>{
            this.$refs.page1.ontouchmove = null;
            if(this.delta > 200){
                this.$refs.page1.style.top = 0 - this.clientHeight + 'px'
                this.$refs.page2.style.top = 0 + 'px'
            }
        }
    }

    this.$refs.page2.ontouchstart = (event)=>{
        // this.startY = event.targetTouches[0].pageY
        if(this.$refs.page2.scrollTop){
            return;
        }
        this.startY = event.targetTouches[0].pageY

        this.$refs.page2.ontouchmove = (e)=>{
            this.endY = e.targetTouches[0].pageY
            
            this.delta = this.startY - this.endY
            if(this.delta < 0){
                this.$refs.page1.style.top = -this.clientHeight - this.delta + 'px'
                this.$refs.page2.style.top = 0 - this.delta + 'px'
            }

        }

        this.$refs.page2.ontouchend = ()=>{
            this.$refs.page2.ontouchmove = null;
            if(this.delta < -200){
                this.$refs.page1.style.top = 0
                this.$refs.page2.style.top = this.clientHeight + 'px'
            }
        }

    }



        
  },
  methods:{
      formatData(obj) {
        //   console.log(obj)
        obj.headImg = config.tmpImgBase + '/' + obj.headImg;
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
        }
        if(!obj.level){
            obj.level = 0;
        }
        this.introduceData = obj
      },
      async getData() {
          console.log(this.$http)
        // let dd = this.$http.post(api.getWebItem,{myId:this.myId})
        let dd = await myFetch({url:api.getWebItem, data:{myId:this.myId}});
        this.formatData(dd)
      },
      uploadPic(event){
        console.log(event)
        // var $file = event.currentTarget;
        // var formData = new FormData();
        // var file = $file.files;
        // formData = new FormData();
        // formData.append(file[0].name, file[0]);
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
        background:red;
        font-size:0.4rem;
        width:100%;
        height:100%;
        top:100%;
    }

    .instruntion{
        position:absolute;
        width:100%;
        height:100%;
        .item{
            border-bottom: 1px dashed #222;
            padding-bottom: 0.2rem;
            margin-bottom: 0.2rem;
            text-align: left;
            img{
                height: 2rem;

            }
            span{
                display: block;
                font-weight:bold;
                font-size:0.4rem;
            }
            .modify{
                float:right;
                height:0.6rem;
                position:relative;
                font-size:0.4rem;
            }
            textarea{
                width:6.7rem;
                font-size:0.4rem;
                height:2.5rem;
                border:1px solid #aaa;
            }
            .options{
                width:5rem;
                height:0.8rem;
            }
            .checkboxGroup{
                font-size:0.3rem;
                display: flex;
                flex-wrap: wrap;
                span{
                    display: inline;
                    margin-left: 0.3rem;
                    input{
                        width:0.3rem;
                        height:0.3rem;
                    }
                    span{
                        margin-left:0.1rem;
                        font-weight: 300;
                    }
                }
                
            }
            .addtion{
                margin-top:0.1rem;
                font-size:0.3rem;
                span{
                    display: inline;
                    font-weight: 300;
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