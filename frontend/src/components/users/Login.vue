<template>
  <v-dialog
        v-model="loginDialog"
        max-width="500px"
        max-height="auto"
      >
    <template v-slot:activator="{ on, attrs }">
        <v-btn
        class="btn white--text mx-3"
        :color="btnColor"
        dark
        v-bind="attrs"
        v-on="on"
        >
        로그인
        </v-btn>
    </template>

    <v-card>
        <v-card-title class="white--text" id="headline">
          로그인
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
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions id="card-footer">
        <v-spacer></v-spacer>
          <v-btn
                class="btn white--text mx-3"
                :color="btnColor"
                dark
                @click="login"
                >
                로그인
              </v-btn>
              <v-btn
                class="btn white--text mx-3"
                :color="btnColor"
                dark
                @click="loginDialog = false"
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
    name : 'Login',
    data() {
        return {
            themeColor : '#6464ff',
            btnColor : '#9696ff',
            loginDialog: false,
            userEmail : new String(),
            userPassword : new String(),
            errorMessage : new String(),
        }
    },
    methods : {
      ...mapActions(['login']),
      login : async function() {
        const payload = {
          userEmail : this.userEmail,
          userPassword : this.userPassword
        };
        const result = await this.$store.dispatch('login', payload);
        if (Object.keys(result).includes('error')) {
          const errorCode = result['error'];
          if (errorCode === 4001) {
            this.errorMessage = '존재하지 않는 이메일입니다.';
            console.log(this.errorMessage);
          } else if (errorCode === 4002) {
            this.errorMessage = '비밀번호가 올바르지 않습니다.';
            console.log(this.errorMessage);
          }
        } else {
          console.log(result);
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

.btn {
  font-family: 'Do Hyeon', sans-serif;
  font-weight: bold;
  border: solid 0.1rem white;
}

</style>