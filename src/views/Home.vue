<template>
  <div class="home">
    <div class='list'>
      <ListItem v-for="item in list" :key='item.myId' :data=item></ListItem>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import ListItem from '@/components/listItem.vue'

import api from '@/service/api'
import myFetch from '@/service/fetch'

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
      }
  }
}
</script>
<style scoped lang="scss">
  .list {
    max-width: 1000px;
    margin:0 auto;
  }

</style>
