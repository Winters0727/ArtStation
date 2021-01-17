import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies'
import VueSession from 'vue-session'

const sessionOptions = {
  persist: true
}

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(VueSession, sessionOptions)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')