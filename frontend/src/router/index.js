import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleRouter from '@/router/articles'
import UserRouter from '@/router/users'

import Index from '@/views/Index'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/*',
    name: 'NotFound',
    component: NotFound
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

router.beforeEach((to, from, next) => {
  if (to.name !== 'Index' && !window.$cookies.get('token')) {
    next({ 'name' : 'Index' });
  } else {
    next();
  }
})

export default router
