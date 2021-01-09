import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import UploadPicture from '@/components/uploadPicture.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path : '/upload',
    name : 'UploadPicture',
    component : UploadPicture
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
