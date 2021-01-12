<template>
  <v-dialog
        v-model="registerDialog"
        max-width="500px"
        max-height="auto"
      >
    <template v-slot:activator="{ on, attrs }">
        <v-btn
        class="mx-3"
        :color="btnColor"
        dark
        v-bind="attrs"
        v-on="on"
        >
        회원가입
        </v-btn>
    </template>

    <v-card>
        <v-card-title class="headline">
        우왕ㅋ굳ㅋ
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols=6>
              <v-text-field
              label="Kakao Email"
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

        <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn
                class="mx-3"
                :color="btnColor"
                dark
                @click="register"
                >
                회원가입
              </v-btn>
              <v-btn
                class="mx-3"
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
export default {
    name : 'CreateAccount',
    data() {
        return {
            themeColor : '#6464ff',
            btnColor : 'red',
            registerDialog: false,
            userEmail : new String(),
            userPassword : new String(),
            userNickname : new String(),
        }
    },
    methods : {
      register : function() {
        console.log('test');
      }
    }
}
</script>

<style scoped>
.headline {
  background-color: #6464ff;
}

</style>