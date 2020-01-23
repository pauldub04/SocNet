<template>
<div>
    <v-row v-for="n in (users.length / 2)"
           justify="center"
           :key="n"
    >
        <v-col cols="5"
               v-for="k in 2"
               :key="k"
        >
            <ProfileCard :name="users[n + k - 2 + cardValue(k)].name"
                         :username="users[n + k - 2 + cardValue(k)].username"
                         :id="n + k - 2 + cardValue(k)"
                         :city="users[n + k - 2 + cardValue(k)].address.city"
            ></ProfileCard>

        </v-col>
    </v-row>
</div>
</template>


<script>
import ProfileCard from '../components/ProfileCard.vue'

export default {
    components: {
      ProfileCard
    },
    data(){
        return {
            users: [],
        }
    },
    watch: {
        $route: {
            handler(){
                this.$axios.get('http://jsonplaceholder.typicode.com/users')
                // /http://188.225.47.187/api/jsonplaceholder.php?endpoint=users/
                .then(response=>{
                    console.log('response', response)
                    this.users = response.data
                })
            },
            immediate: true,
        }
    },
    methods: {
        cardValue(x) {
            if (x == 1)
                return 0
            else
                return 1
        }
    }
}
</script>

<style>

</style>