<template>
  <div class="detail">
      <div class='instruntion'>
          <p class='item'>
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
          </p>
          <p class='item'>
              <span>标题</span>
              <textarea></textarea>
          </p>
          <p class='item'>
              <span>简介</span>
              <textarea></textarea>
          </p>
          <p  class='item'>
              <span>标签</span>
              <Select v-model="model10" multiple class='options'>
                    <Option v-for="item in tags" :value="item.label" :key="item.key">{{ item.label }}</Option>
              </Select>
          </p>
      </div>
  </div>
</template>
<script>
export default {
   data(){
       return {
            model10:[],
            tags:[]
       }
   },
    
  beforeCreate(){
      console.log('before create')
  },
  created(){
      console.log(this.$route.query)
  },
  mounted(){
        this.tags = [
          {key:'bilei',label:'币类'},
          {key:'zhuce',label:'注册账号'},
          {key:'tuiguang',label:'应用推广'},
          {key:'jutou',label:'巨头应用'},
          {key:'fanlu',label:'返撸套路'},
          {key:'renwu',label:'手机任务'}
        ]
  },
  methods:{
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
            }
            .options{
                width:5rem;
                height:0.8rem;
            }
        }
    }
}

</style>