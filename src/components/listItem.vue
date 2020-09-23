<template>
<div class="item">
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
              <span class='time'>09-18</span>
              <span>浏览：</span>
              <span>2000</span>
              <span class='tag'>什么</span>
            </div>
        </div>
      </div>
</template>

<script>
// import config from '@/config'


export default {
  name: 'ListItem',
  data() {
      return {
          formatData:{}
      }
  },
  watch:{
      data:{
           immediate: true,    // 这句重要
            handler (val) {
                console.log(val)
                console.log(val.headImg)
                // val.headImg = config.tmpImgBase + val.headImg
                
                this.formatData = val;
            }
      }
  },
  props: {
    data: {
        type:Object,
        default:() => {}
    }
  }
}
</script>
<style scoped lang="scss">
.item {
    display: flex;
    border-bottom: 1px dashed;
    padding: 0.1rem 0.1rem;
    .left{
      width:26%;
      img{
        width:100%;
        height:100%;
      }
    }
    .right{
      width:70%;
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
          width:0.7rem;
          height:0.4rem;
          text-align: center;
          border:1px solid red;
        }
      }
      .content{
        font-size:0.3rem;
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
        font-size:0.3rem;
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
