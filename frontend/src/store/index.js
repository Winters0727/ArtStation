import Vue from 'vue'
import Vuex from 'vuex'

import { loginRequest, logoutRequest, createRequest, getRequest } from '@/api/api'
import { hashPassword } from '@/utils/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    // 로그인
    async login(context, payload) {
      const hashedPayload = payload;
      hashedPayload['userPassword'] = await hashPassword(payload['userPassword']);
      const response = await loginRequest(payload);
      return response.data
    },

    // 로그아웃
    async logout() {
      const response = await logoutRequest();
      return response.data
    },

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
