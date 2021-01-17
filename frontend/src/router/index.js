import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleRouter from '@/router/articles'
import UserRouter from '@/router/users'

import Index from '@/views/Index'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/*',
    redirect : { 'name' : 'NotFound' }
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

const routerRoutes = router.options.routes;
const routesArray = routerRoutes.map(route => route.name).filter(name => name !== 'NotFound');

router.beforeEach((to, from, next) => {
  if (to.name === 'NotFound') next();

  if (routesArray.includes(to.name)) {
    if (to.name !== 'Index' && !window.$cookies.get('token')) {
      alert('접근 권한이 없습니다.');
      next({ 'name' : 'Index' });
    } else {
      next();
    }
  } else {
    next({ 'name' : 'NotFound' });
  }
})

export default router
