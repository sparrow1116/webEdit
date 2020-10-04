import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail.vue'),
    meta:{
      keepAlive: true
    }
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../views/preview.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.name === 'detail'){
    
//     if(from.name === 'preview'){
//       to.meta.keepAlive = true
//     }else{
//       to.meta.keepAlive = false
//     }

//   }
//   console.log('to')
//   console.log(to)
//   console.log(from)
//   next()
// })

export default router
