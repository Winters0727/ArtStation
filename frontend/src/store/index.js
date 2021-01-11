import Vue from 'vue'
import Vuex from 'vuex'

import { createRequest, getRequest } from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async uploadPicture(context, payload) {
      const response = await createRequest('pictures', payload);
      return response.data
    },

    async getPictures() {
      const response = await getRequest('pictures');
      return response.data
    }
  },
  modules: {
  }
})
