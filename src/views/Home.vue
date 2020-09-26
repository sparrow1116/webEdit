<template>

  <div class="home">
    <van-nav-bar
      title="编辑仓库列表页"
    />
    <div class='list'>
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
      list:[]
    }
  },
  components:{
    ListItem
  },
  mounted(){
      console.log('>>>')
      this.getData()
  },
  methods:{
      async getData(){
          let data = await myFetch({url:api.getList});
          this.list = Object.freeze(data);
      },
      choseItem(id){
        console.log('id::' + id)
        this.$router.push({ name: 'detail', query:{myId:id}})
      }
  }
}
</script>
<style scoped lang="scss">


</style>
