<template>
  <v-card class="pa-3">
    <v-list-item>
      <v-list-item-avatar color="grey" size="80">
        <img :src="img">
      </v-list-item-avatar>

      <v-divider vertical class="mr-4"></v-divider>
      <v-list-item-content class="text-left">
          <v-list-item-title class="font-weight-bold">{{name}}</v-list-item-title>
          <v-list-item-subtitle>{{city}}</v-list-item-subtitle>

          <v-btn color="green" outlined class="mt-3" :to="'/users/' + (id + 1)" >
            <v-icon class="mr-3">mdi-account-badge-horizontal-outline</v-icon> Перейти в профиль
          </v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
    props: ['name', 'id', 'city', 'img'],
    data(){
        return {
        }
    }
}
</script>

<style>
.mdi {
  font-size: 20px;
}
</style>
