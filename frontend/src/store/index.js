import Vue from 'vue'
import Vuex from 'vuex'

import { registerRequest, loginRequest, logoutRequest, createRequest, getRequestWithoutToken } from '@/api/api'
// import { hashPassword } from '@/utils/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
  },
  mutations: {
    changeUser : function(state, payload) {
      state.user = payload
    }
  },
  actions: {
    // 회원가입
    async register(context, payload) {
      const response = await registerRequest(payload);
      return response.data
    },

    // 로그인
    async login(context, payload) {
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
        response = await getRequestWithoutToken('pictures', { limit : limit });
      } else {
        response = await getRequestWithoutToken('pictures');
      }
      return response.data
    }
  },
  modules: {
  }
})
