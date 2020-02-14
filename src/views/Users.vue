<template>
<div>
    <h3 v-if="!$store.getters.getIsLogined">Войдите чтобы видеть список пользователей</h3>
    <div class="d-flex justify-center" v-if="!$store.getters.getIsLogined">
        <Sign></Sign>
    </div>

    <div v-else>
        <v-row>
            <v-col cols="12" sm="5" v-for="(user, index) in users" :key="index">
                <ProfileCard :name="user.name"
                             :id="index"
                             :city="user.city"
                             :img="user.photo"                         
                >
                </ProfileCard>
            </v-col>
        </v-row>
    </div>
</div>
</template>


<script>
import ProfileCard from '../components/ProfileCard.vue'
import Sign from '../components/Sign.vue'

export default {
    components: {
      ProfileCard,
      Sign
    },
    data(){
        return {
            users: [],
        }
    },
    watch: {
        $route: {
            handler(){
                this.$axios.get(this.$store.getters.getUserLink)
                .then(response=>{
                    this.users = response.data
                })
            },
            immediate: true,
        }
    },
    methods: {
        cardValue(k, n) {
            if (k == 1)
                return n - 1;
            else
                return n - 1 + (this.users.length / 2);
        }
    }
}
</script>

<style>

</style>