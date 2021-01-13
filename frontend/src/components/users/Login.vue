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
export default {
    name : 'Login',
    data() {
        return {
            themeColor : '#6464ff',
            btnColor : '#9696ff',
            loginDialog: false,
            userEmail : new String(),
            userPassword : new String(),
        }
    },
    methods : {
      login : function() {
        console.log('test');
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