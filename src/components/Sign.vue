<template>
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
</template>