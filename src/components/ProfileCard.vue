<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item class="text-left">
      <v-row>
        <v-col cols="2">
            <v-list-item-avatar size="75">
              <img :src="'https://randomuser.me/api/portraits/men/' + id + '.jpg'">
            </v-list-item-avatar>
        </v-col>
        
        <v-divider
          class="mx-3 my-4"
          vertical
        ></v-divider>
        <v-col>
          <v-list-item-content>
            <v-list-item-title class="headline">{{name}}</v-list-item-title>
            <v-list-item-subtitle>{{city}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
      
      </v-row>
    </v-list-item>

    
    <v-card-actions>
        <v-btn
          text
          color="green"
          
        >
            <i class="mdi mdi-account-box-outline"></i>
            <div class="mx-2">Перейти в профиль</div>
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: ['name', 'username', 'id', 'city'],
    data(){
        return {
            imageSrc: 'https://randomuser.me/api/portraits/men/' + this.$route.params.id + '.jpg',
        }
    }
}
</script>

<style>
.mdi {
  font-size: 20px;
}
</style>
