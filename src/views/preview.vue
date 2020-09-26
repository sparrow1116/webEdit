<template>

  <div class="preview">
   <van-nav-bar
        title="预览页面"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <ListItem v-if='type == "list"' :data=listData></ListItem>
    <div v-if='type=="detail"'>
        <div>
          <h2>{{detailData.title}}</h2>
        </div>
        <div class='block' v-for='(block,index) in detailData.contentArr' :key='index'>
          <div class="content">
            <p style='text-align: left' v-if='block.type == "text"'>{{block.data}}
              </p>
            <img v-if='block.type =="img"' title='请插入图片'
                :src='block.data' @click='previewPic(block.data)'/>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import ListItem from '@/components/listItem.vue'


export default {
  name: 'Preview',
  data(){
    return {
        type:'',
        listData:{},
        detailData:{}
    }
  },
  components:{
    ListItem
  },
  created(){
      let list  = this.$route.params.dataList
      let detail  = this.$route.params.detail
      if(!list){
          this.type = 'detail'
          detail.contentArr = JSON.parse(detail.contentArr)
          this.detailData = detail
      }else{
          this.type='list'
          this.listData = list;
      }
      console.log(list)
      console.log(detail)
  },
  methods:{
      onClickLeft(){
          this.$router.back()
      }
  }
}
</script>

<style scoped lang="scss">
.block{
  padding: 0 1rem;
}

</style>