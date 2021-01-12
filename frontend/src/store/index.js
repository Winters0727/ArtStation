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
    // 이미지 업로드 (한 개만 가능)
    async uploadPicture(context, payload) {
      const response = await createRequest('pictures', payload);
      return response.data
    },

    // 이미지 가져오기 (개수 기능 추가)
    async getPictures(context, limit=null) {
      let response = null;
      if (limit !== null) {
        response = await getRequest('pictures', { limit : limit });
      } else {
        response = await getRequest('pictures');
      }
      return response.data
    }
  },
  modules: {
  }
})
