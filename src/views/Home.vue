<template>
<div>

  <h1>Главная страница</h1>
  <div class="d-flex justify-center" v-if="!$store.getters.getIsLogined">
    <v-card width="600px" class="mt-12 pa-10">
      <v-list nav 
              shaped
              >
        <v-list-item link
                     to="login"
                     exact>
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon> 

          <v-list-item-content>
            <v-list-item-title class="text-left">Войти</v-list-item-title>
          </v-list-item-content>       
        </v-list-item>
        <v-list-item link
                     to="signup"
                     exact>
          <v-list-item-icon>
            <v-icon>mdi-plus-box</v-icon>
          </v-list-item-icon> 

          <v-list-item-content>
            <v-list-item-title class="text-left">Зарегистрироваться</v-list-item-title>
          </v-list-item-content>       
        </v-list-item>
      </v-list>
    </v-card>
  </div>
  <div class="d-flex justify-center" v-else>
    <v-card width="600px" class="mt-12 pa-10">
      <v-list nav 
              shaped
              >
        <v-list-item link
                     to="/users"
                     exact>
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon> 

          <v-list-item-content>
            <v-list-item-title class="text-left">Найти друзей</v-list-item-title>
          </v-list-item-content>       
        </v-list-item>
        <v-list-item link
                     :to="'/users/' + $store.getters.getId"
                     exact>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon> 

          <v-list-item-content>
            <v-list-item-title class="text-left">Профиль</v-list-item-title>
          </v-list-item-content>       
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</div>
</template>

<script>
export default {

}
</script>
