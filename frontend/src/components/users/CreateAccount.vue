<template>
  <v-dialog
        v-model="registerDialog"
        max-width="500px"
        max-height="auto"
      >
    <template v-slot:activator="{ on, attrs }">
        <v-btn
        class="nav-btn white--text"
        :color="btnColor"
        dark
        v-bind="attrs"
        v-on="on"
        >
        회원가입
        </v-btn>
    </template>

    <v-card>
        <v-card-title class="white--text" id="headline">
          회원가입
        </v-card-title>

        <v-card-text class="mt-10">
          <v-row>
            <v-col cols=6>
              <v-text-field
              label="User Email"
              type="text"
              v-model="userEmail"
              solo
            ></v-text-field>
            </v-col>
            <v-col cols=6>
              <v-text-field
              label="Password"
              type="password"
              v-model="userPassword"
              solo
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols=6>
              <v-text-field
              label="Nickname"
              type="text"
              v-model="userNickname"
              solo
            ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions id="card-footer">
        <v-spacer></v-spacer>
          <v-btn
                class="nav-btn white--text"
                :color="btnColor"
                dark
                @click="register"
                >
                회원가입
              </v-btn>
              <v-btn
                class="nav-btn white--text"
                :color="btnColor"
                dark
                @click="registerDialog = false"
                >
                닫기
              </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name : 'CreateAccount',
    data() {
        return {
            themeColor : '#6464ff',
            btnColor : '#9696ff',
            registerDialog: false,
            userEmail : new String(),
            userPassword : new String(),
            userNickname : new String(),
            errorMessage : new String(),
        }
    },
    methods : {
      ...mapActions(['register', 'login']),
      register : async function() {
        let payload = {
          userEmail : this.userEmail,
          userPassword : this.userPassword,
          userNickname : this.userNickname
        }
        let result = await this.$store.dispatch('register', payload);
        if (Object.keys(result).includes('error')) {
          const errorCode = result['error'];
          if (errorCode === 4003) {
            this.errorMessage = '회원가입에 실패했습니다.';
            console.log(this.errorMessage);
          } 
        } else {
          delete payload['userNickname'];
          result = await this.$store.dispatch('login', payload);
          this.$session.start();
          this.$cookies.set('token', result['token']);
          this.$session.set('refreshToken', result['refreshToken']);
          this.$router.go(0);
        }
      }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');

#headline {
  background-color: #6464ff;
  font-family: 'Do Hyeon', sans-serif;
  font-weight: bold;
  color: white;
}

#card-footer {
  background-color: #6464ff;
}

.nav-btn {
  font-family: 'Do Hyeon', sans-serif;
  font-size: 0.8rem;
  color: white;
  border: solid 0.1rem white;
  margin-left: 5px;
  margin-right: 5px;
}

</style>