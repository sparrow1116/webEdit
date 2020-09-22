<template>
  <div class="home">
    <div class="item">
      <div class='left'>
        <img src='https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg' />
      </div>
      <div class="right">
          <div class="title">
            <h2>去拍拍商城：竞拍得红包 免费撸商品</h2>
            <span>置顶</span>
          </div>
          <div class='content'>去拍拍商城，史上最强褥羊毛攻略【自用省钱，分享赚钱】（0.01元撸羊毛+大额竞拍红包+竞拍费用全额返还）1：50以内商品通通1分钱薅羊毛，人人可得2：发动机ask了JFK达拉斯接口里的方法大师金克拉
          </div>
          <div class='foot'>
            <span class='time'>09-18</span>
            <span>浏览：</span>
            <span>2000</span>
            <span class='tag'>什么</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home'
}
</script>
<style scoped lang="scss">
  
.item {
    display: flex;
    border-bottom: 1px dashed;
    padding: 0.5rem 0.1rem;
    .left{
      width:26%;
      img{
        width:100%;
        height:100%;
      }
    }
    .right{
      width:70%;
      padding-left:0.5rem;
      .title{
        text-align: left;
        position: relative;
        h2{
          width:84%;
          display: inline-block;
        }
      }
    }
}

  @media screen and (max-width:600px) and (orientation:portrait){
   .item {
    display: flex;
    border-bottom: 1px dashed;
    padding: 0.5rem 0.1rem;
    .left{
      width:26%;
      img{
        width:100%;
        height:100%;
      }
    }
    .right{
      width:70%;
      padding-left:0.5rem;
      .title{
        text-align: left;
        position: relative;
        h2{
          font-size:0.3rem;
          width:84%;
          display: inline-block;
        }
        span{
          position: absolute;
          right: 0;
          top:0;
          font-size:0.3rem;
          color: red;
          padding: 2px 8px;
          border:1px solid red;
        }
      }
      .content{
        font-size:0.3rem;
        line-height:1rem;
        margin-top:0.1rem;
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
        margin-top:0.3rem;
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
  }

</style>
