<template>
<div>
    <v-row class="text-left">
        <v-col cols="10">
            <h1 class="green--text text--darken-2">
                <v-icon large color="green darken-2">mdi-account-outline</v-icon>
                {{profile.name}}
            </h1>
        </v-col>
    </v-row>
    <v-row class="text-left">
        <v-col cols="2">
            <img src="https://randomuser.me/api/portraits/men/7.jpg" style="max-width: 100%">
        </v-col>
        <v-col cols="10" class="text-left">
            <p>
                Веб-сайт: <a :href="profile.website" target="_blank">{{profile.website}}</a>
            </p>
            <p>
                E-mail: <a :href="`mailto:${profile.email}`">{{profile.email}}</a>
            </p>
            <p>
                Город: {{profile.address.city}}
            </p>
            <p>
                Место работы: {{profile.company.name}}
            </p>
        </v-col>
    </v-row>
    
    <v-divider class="my-3"></v-divider>
    <v-row class="text-left">
        <v-col cols="2">
            <h2>Публикации</h2>
        </v-col>
        <v-col cols="8">
            <Post v-for="post in posts"
                  :key="post.id"
                  :title="post.title"
                  :author="profile.name"
                  :text="post.body"
                  class="post">
            </Post>
        </v-col>
    </v-row>

</div>
</template>


<script>
import Post from '../components/Post.vue'

export default {
    components: {
      Post
    },
    data(){
        return {
            profile: null,
            posts: [],
        }
    },
    watch: {
        $route: {
            handler(){
                this.$axios.get('http://188.225.47.187/api/jsonplaceholder.php?endpoint=users/'+ this.$route.params.id)
                .then(response=>{
                    console.log('response', response)
                    this.profile = response.data
                })
                this.$axios.get('http://188.225.47.187/api/jsonplaceholder.php?endpoint=posts')
                .then(response=>{
                    console.log('response', response)
                    this.posts = response.data
                })
            },
            immediate: true,
        }
    }
}
</script>

<style>
.post {
    margin-top: 60px;
}
</style>