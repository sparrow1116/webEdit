<template>
  <div class="detail">
      <div class='instruntion'>
          <div class='item'>
              <span>缩略图</span>
              <img src='https://butaolu.com/zb_users/upload/2020/09/202009181600441466492443.jpg'/>
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
              <textarea></textarea>
          </div>
          <div class='item'>
              <span>简介</span>
              <textarea></textarea>
          </div>
          <div  class='item'>
              <span>标签</span>
              <div class='checkboxGroup'>
                    <span v-for="item in tags" :key='item.key'>
                      <input type="checkbox" :value="item.label" />
                      <span>{{item.label}}</span>
                    </span>   
              </div>
              <div class='addtion'>
                  <span>其他:</span><input />
              </div>
          </div>
          <div class='item'>
              <span>推荐等级</span>
              <input type="text">
          </div>
      </div>
      <div class='ctlButton'>
          <Button class='btn' type='primary'>预览</Button> 
          <Button class='btn' type='primary'>编辑详情</Button>
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
           introduceData:{},
        model10:[],
        tags:[{key:'bilei',label:'币类'},
          {key:'zhuce',label:'注册账号'},
          {key:'tuiguang',label:'应用推广'},
          {key:'jutou',label:'巨头应用'},
          {key:'fanlu',label:'返撸套路'},
          {key:'renwu',label:'手机任务'}]
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
        
  },
  methods:{
      formatData(obj) {
        //   console.log(obj)
        obj.headImg = 
          this.introduceData = config.obj
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
.detail{
    max-width: 1000px;
    margin:0 auto;

    .uploader_file{
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }


    .instruntion{
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
                font-size:0.3rem;
                span{
                    display: inline;
                    font-weight: 300;
                }
            }
            input{
                height:0.5rem;
                border:1px solid #aaa;
            }
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

</style>