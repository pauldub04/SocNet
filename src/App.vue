<template>
  <v-app id="app">
      <v-navigation-drawer color="green"
                           dark
                           expand-on-hover
                           hide-overlay
                           permanent
                           right
                           app>
        <v-list
            nav 
            shaped
            dense>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img :src="'https://randomuser.me/api/portraits/men/1.jpg'" alt="мужчина">
            </v-list-item-avatar>

            <v-list-item-content class="text-left">
              <v-list-item-title class="font-weight-black">SocialLink</v-list-item-title>
              <v-list-item-subtitle>Иван Иванов</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-3"></v-divider>

          <v-list-item link
                       v-for="link in links" 
                       :key="link.path" 
                       :to="link.path"
                       exact>
            <v-list-item-icon>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-icon> 

            <v-list-item-content>
              <v-list-item-title class="text-left">{{link.label}}</v-list-item-title>
            </v-list-item-content>       
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    
    <v-content class="px-12 py-3">
      <v-container fluid>
        <router-view v-on:login="updateUser"/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          label: "Главная",
          path: "/",
          icon: "mdi-home-outline"
        },
        {
          label: "Профиль",
          path: "/users/1",
          icon: "mdi-account"
        },
        {
          label: "Найти друзей",
          path: "/users",
          icon: "mdi-account-plus"
        },
        {
          label: "Войти",
          path: "/login",
          icon: "mdi-login"
        }
      ],
    }
  },
  methods: {
    updateUser(_id) {
      this.links[1].path = "/users/" + _id;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
