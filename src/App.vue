<template>
  <v-app id="app">
      <v-navigation-drawer v-if="$store.getters.getIsLogined"
                           color="deep-orange"
                           dark
                           expand-on-hover
                           hide-overlay
                           permanent
                           right
                           app>
        <v-list nav 
                shaped
                dense>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img :src="$store.getters.getUser.photo" alt="мужчина">
            </v-list-item-avatar>

            <v-list-item-content class="text-left">
              <v-list-item-title class="font-weight-black">{{$store.getters.getUser.company}}</v-list-item-title>
              <v-list-item-subtitle>{{$store.getters.getUser.name}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          

          <v-list-item link
                       v-if="$store.getters.getIsLogined"
                       @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon> 

              <v-list-item-content>
                <v-list-item-title class="text-left">Выйти</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          <!-------------------------------------------->
          <v-divider class="my-3"></v-divider>

          <v-list-item link
                       v-for="link in links" 
                       :key="link.path" 
                       :to="link.path"
                       @click="link.action"
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
          icon: "mdi-home-outline",
          action: "",
        },
        {
          label: "Профиль",
          path: "/users/",
          icon: "mdi-account",
          action: "",
        },
        {
          label: "Найти друзей",
          path: "/users",
          icon: "mdi-account-plus",
          action: "",
        },
      ],
    }
  },
  methods: {
    updateUser(_id, user) {
      this.$store.dispatch('setUser', {
                                        user: user,
                                        id: _id
                                      });
      this.links[1].path = "/users/" + _id;
    },
    logout() {
      this.$store.dispatch('delUser');
      this.$router.push('/');
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
