<template>
  <v-app>
    <v-app-bar
      app
      color="warning"
      dark
    >
      <div id="logo">

      </div>
      <v-spacer></v-spacer>
      <v-input type="text">

      </v-input>
      <v-spacer></v-spacer>
      <div id="navbar">
        <router-link class="nav-link" :to="{ name : 'index' }" exact>
          <v-btn class="nav-btn">
            버튼으로 대체
          </v-btn>
        </router-link>
        <router-link class="nav-link" :to="{ name : 'arts' }" exact>
          <v-btn class="nav-btn">
            호로로롤
          </v-btn>
        </router-link>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
name : 'App',
data: () => ({
    //
  }),
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.nav-link .nav-btn {
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
}

</style>