<template>
<div class="item" @click="choseItem">
        
  <div class="title">
      <h2>{{formatData.title}}</h2>
      <span>置顶</span>
  </div>
  <div class='body'> 
    <div class='left'>
      <img :src=formatData.headImg />
    </div>
    <div class="right">
        <div class='content'>
            {{formatData.desciption}}
        </div>
    </div>
  </div> 
   <div class='foot'>
      <span class='time'>{{formatData.time}}</span>
      <span>浏览：</span>
      <span>{{formatData.browseCount}}</span>
      <span class='tag' v-for="(tag,index) in formatData.tags" :key='index'>{{tag}}</span>
    </div> 
</div>
</template>

<script>
import config from '@/config'


export default {
  name: 'ListItem',
  data() {
      return {
          formatData:{}
      }
  },
  props: {
    data: {
        type:Object,
        default:() => {}
    }
  },
  watch:{
      data:{
           immediate: true,    // 这句重要
            handler (val) {
                // console.log('val')
                // console.log(val)
                if(val.headImg.indexOf('http') < 0){
                    val.headImg = config.tmpImgBase + '/' + val.headImg
                }
                
                if(val.time){
                  val.time = new Date(val.time).Format('yyyy-MM-dd')
                }
                val.tags = JSON.parse(val.tags)
                this.formatData = val;

            }
      }
  },
  methods:{
    choseItem(){
      this.$emit('choseItem',this.formatData.myId)
    }
  }
}
</script>
<style scoped lang="scss">

.item {
    border-bottom: 1px dashed;
    padding: 0.8rem 0.8rem;
    .title{
        text-align: left;
        display: flex;
        h2{
          font-size:1rem;
          font-weight:bold;
          width:84%;
          margin:0;
        }
        span{
          font-size:0.8rem;
          color: red;
          padding: 0.02rem 0.08rem;
          width:2rem;
          height:1rem;
          text-align: center;
          border:1px solid red;
        }
    }
    .body{
      display: flex;
      margin-top: 0.5rem;
      .left{
        width:8rem;
        img{
          align-self: center;
          width:100%;
          height:7rem;
        }
      }
      .right{
        width:20rem;
        padding-left:0.5rem;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        
        .content{
          font-size:1rem;
          line-height:1.6rem;
          margin-top:0.1rem;
          text-align: left;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }
    }
    .foot{
        font-size:0.8rem;
        position:relative;
        margin-top:0.5rem;
        .time{
          position: absolute;
          left:0;
          top:0.1rem;
        }
        .tag{
          position: absolute;
          right:0;
          top:0.1rem;
        }
      }
  }
</style>
