<template>
<div class="item" @click="choseItem">
        <div class='left'>
          <img :src=formatData.headImg />
        </div>
        <div class="right">
            <div class="title">
              <h2>{{formatData.title}}</h2>
              <span>置顶</span>
            </div>
            <div class='content'>
                {{formatData.desciption}}
            </div>
            <div class='foot'>
              <span class='time'>{{formatData.time}}</span>
              <span>浏览：</span>
              <span>2000</span>
              <span class='tag'>什么</span>
            </div>
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
                
                val.headImg = config.tmpImgBase + '/' + val.headImg
                if(val.time){
                  val.time = new Date(val.time).Format('yyyy-MM-dd')
                }
                
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

@media screen and (min-width: 1500px){
  .item{
    background:'red';
    .left{
      width: 10% !important;
    }
    .right{
      width: 85% !important;
    }
  }
}

.item {
    display: flex;
    border-bottom: 1px dashed;
    padding: 0.3rem 0.1rem;
    .left{
      width:8rem;
      display: flex;
      img{
        align-self: center;
        width:100%;
        height:2rem;
      }
    }
    .right{
      width:23rem;
      padding-left:0.1rem;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      .title{
        text-align: left;
        display: flex;
        h2{
          font-size:0.3rem;
          font-weight:bold;
          width:84%;
          margin:0;
        }
        span{
          font-size:0.3rem;
          color: red;
          padding: 0.02rem 0.08rem;
          width:1rem;
          height:0.5rem;
          text-align: center;
          border:1px solid red;
        }
      }
      .content{
        font-size:0.2rem;
        line-height:0.4rem;
        margin-top:0.1rem;
        text-align: left;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .foot{
        font-size:0.2rem;
        position:relative;
        margin-top:0.1rem;
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
  }
</style>
