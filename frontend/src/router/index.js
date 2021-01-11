import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleRouter from '@/router/articles'
import UserRouter from '@/router/users'

import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    ...ArticleRouter,
    ...UserRouter,
    ...routes,
  ]
})

export default router
