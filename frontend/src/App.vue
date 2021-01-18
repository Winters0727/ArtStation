<template>
  <v-app>
    <v-app-bar
      app
      color="#6464ff"
      class="app-bar"
    >
      <img
      class="d-inline"
      id="logo"
      :src="require('@/assets/images/logo.png')" />
      <div 
      class="d-inline-block mx-2"
      id="logo-text">
        Purple Gallery
      </div>
      <v-spacer></v-spacer>
      <v-input type="text">

      </v-input>
      <v-spacer></v-spacer>
        <div v-if="isLogin" id="navbar">
          <router-link class="nav-link" v-for="(link, index) in loginLinkList" :key="index" :to="link.to" exact>
            <v-btn class="nav-btn">
              {{ link.btnContext }}
            </v-btn>
          </router-link>
          <v-btn class="nav-btn" @click="logout">
              로그아웃
            </v-btn>
          <!-- 로그아웃 버튼 추가 -->
        </div>
        <div v-else id="navbar">
          <router-link class="nav-link" v-for="(link, index) in logoutLinkList" :key="index" :to="link.to" exact>
            <v-btn class="nav-btn">
              {{ link.btnContext }}
            </v-btn>
          </router-link>
          <Login />
          <CreateAccount />
        </div>
    </v-app-bar>

    <v-main class="main">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Login from '@/components/users/Login';
import CreateAccount from '@/components/users/CreateAccount';

import { mapActions, mapMutations } from 'vuex';
import { isLogin } from '@/utils/index';
import { verifyToken } from '@/utils/jwt';

export default {
name : 'App',
data: () => ({
    loginLinkList : [
      {
        to : { name : 'Index'},
        btnContext : '메인페이지'
      },
      {
        to : { name : 'MyPage', params : { userNickname : 'None' }},
        btnContext : '마이페이지'
      },
      {
        to : { name : 'UploadPicture'},
        btnContext : '사진업로드'
      }
    ],
    logoutLinkList : [
      {
        to : { name : 'Index'},
        btnContext : '메인페이지'
      }
    ],
    user : null,
  }),
  components : {
    Login,
    CreateAccount
  },
  methods : {
    ...mapMutations(['changeUser', 'registerToken']),
    ...mapActions(['logout']),
    logout : async function() {
      await this.$store.dispatch('logout');
      this.$session.destroy();
      this.$cookies.remove('token');
      this.$router.go({ name : 'Index' });
    }
  },
  computed : {
    isLogin : isLogin,
  },
  async created() {
    if (this.isLogin && this.$store.state.user === null) {
      const token = this.$cookies.get('token'), refreshToken = this.$session.get('refreshToken');
      const { result } = verifyToken(token, refreshToken);
      await this.$store.commit('changeUser', result);
      this.user = this.$store.state.user;
      this.loginLinkList[1].to.params.userNickname = this.user.userNickname;
      await this.$store.commit('registerToken', { token : token, refreshToken : refreshToken });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');

.main {
  background-color:#c8c8ff;
}

#logo {
  width: 3rem;
  height: auto;
}

#logo-text {
  cursor: default;
  vertical-align: middle;
  font-family: fantasy;
  font-size: 2em;
  color: white;
}

.nav-btn {
  font-family: 'Do Hyeon', sans-serif;
  font-size: 0.8rem;
  color: white;
  border: solid 0.1rem white;
  margin-left: 5px;
  margin-right: 5px;
}

a {
  text-decoration: none;
}

/* .nav-link .nav-btn {
  font-size: 1rem;
  margin-left: 5px;
  margin-right: 5px;
  height: auto;
  animation: navBtnOut 1s forwards 1;
}

.nav-link .nav-btn:hover {
  animation: navBtnIn 1s forwards 1;
}

@keyframes navBtnIn {
  from {
    color: white;
    font-size: 1rem;
  }

  to {
    color: red;
    font-size: 1.5rem;
    font-weight: bold;
  }
}

@keyframes navBtnOut {
  from {
    color: red;
    font-size: 1.5rem;
    font-weight: bold;
  }

  to {
    color: white;
    font-size: 1rem;
  }
} */

</style>