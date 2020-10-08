<template>

  <div class="home" @scroll='myScroll'>
    <van-nav-bar
      title="编辑仓库列表页"
    />
    <span class='addNew' @click='addNew'>
      添加数据
    </span>
    <span class="self_button" @click="isPopShow = !isPopShow">数据源</span>
    <div class="popSelect" v-show='isPopShow'>
      <div @click="choseBase('cangku')" :class="{active: currentBase=='cangku' ? true: false}">
        仓库数据
      </div>
      <div @click="choseBase('xianshang')" :class="{active: currentBase=='xianshang' ? true: false}">
        线上数据
      </div>
    </div>
    <div class='list' ref='list'>
      <ListItem v-for="item in list" :key='item.myId' :data=item @choseItem="choseItem"></ListItem>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import ListItem from '@/components/listItem.vue'

import api from '@/service/api'
import {myFetch} from '@/service/fetch'

export default {
  name: 'Home',
  data(){
    return {
      list:[],
      isPopShow:false,
      currentBase:'cangku'//cangku xianshang
    }
  },
  components:{
    ListItem
  },
  mounted(){
      
      // this.currentBase = 'cangku';
      window.baseCang = this.currentBase;
      this.currentIndex = 0;
      this.getData()
  },
  methods:{
    choseBase(base){
      this.isPopShow = false;
      if(this.currentBase == base){
        return
      }
      this.currentBase = base;
      window.baseCang = this.currentBase;
      this.currentIndex = 0;
      this.getData()
    },
    async myScroll(e){
      if(this.list.length >= this.count){
        return
      }
      if(this.isLoading){
        console.log('back')
        return
      }
      // console.log("on scroll")
      // console.log(this.$refs.list.clientHeight)
      // console.log(e.target.scrollTop)
      if(e.target.scrollTop + 816 + 300 >=this.$refs.list.clientHeight){
        this.currentIndex++;
        this.isLoading = true
        console.log('start')
        await this.getData()
        console.log('end')
        this.isLoading = false
      }
      
    },
    async getData(){
      console.log('cnakgu')
      console.log(window.baseCang)
        let data = await myFetch({url:window.baseCang==='cangku'?api.getList:api.getListOnline,
                  data:{index:this.currentIndex}});
        this.count = data.count
        if(this.currentIndex == 0){
          this.list = data.rows
        }else{
          this.list = [...this.list,...data.rows]
        }
        

    },
    addNew(){
      this.$router.push({ name: 'detail'})
    },
    choseItem(id){
      console.log('id::' + id)
      this.$router.push({ name: 'detail', query:{myId:id}})
    }
  }
}
</script>
<style scoped lang="scss">
.home{
  height:51rem;
  overflow-y:scroll;
}
.addNew{
  position: absolute;
  left: 1rem;
  top: 0.7rem;
  color: #1989fa;
  z-index: 10;
}
.self_button{
  position: absolute;
    right: 1rem;
    top: 0.7rem;
    color: #1989fa;
    z-index: 10;
}
.popSelect{
    position: absolute;
    width: 6rem;
    background: #fff;
    border: 1px solid #ccc;
    right: 0;
    div{
      padding:0.5rem 1rem;
      border-bottom:1px solid #ccc;
    }
    div.active{
      color:#1989fa
    }
    
}

</style>
