<template>
<div>
    <div v-if="!$store.getters.getIsLogined">
        <v-list-item link
                     to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon> 


          <v-list-item-content>
            <v-list-item-title class="text-left">На главную</v-list-item-title>
          </v-list-item-content>       
        </v-list-item>
    </div>
    <div>
        <v-row class="text-left">
            <v-col cols="10">
                <h1 class="teal--text text--darken-2">
                    <v-icon large color="cyan darken-2">mdi-account-outline</v-icon>
                    {{user.name}}
                </h1>
            </v-col>
        </v-row>

        <v-row class="text-left">
            <v-col cols="2">
                <img :src="user.photo" style="max-width: 100%">
            </v-col>
            <v-col cols="10" class="text-left">
                <p>
                    Веб-сайт: <a :href="user.website" target="_blank">{{user.website}}</a>
                </p>
                <p>
                    E-mail: <a :href="`mailto:${user.email}`">{{user.email}}</a>
                </p>
                <p>
                    Город: {{user.city}}
                </p>
                <p>
                    Место работы: {{user.company}}
                </p>
            </v-col>
        </v-row>
        
        <div v-if="$store.getters.getIsLogined">
            <v-divider class="my-3"></v-divider>
            <v-row v-if="$route.params.id == $store.getters.getId" class="text-left mb-10">
                <v-col cols="12" sm="10">
                    <v-text-field outlined label="Заголовок" v-model="title"></v-text-field>
                    <v-textarea outlined label="Текст" v-model="text"></v-textarea>
                    <v-btn @click="send">Опубликовать</v-btn>
                </v-col>
            </v-row>
        </div>
        
        <div v-if="posts.length > 0">
            <v-divider class="my-3"></v-divider>
            <v-row class="text-left">
                <v-col cols="9">
                    <h2 class="mb-5">Публикации</h2>
                    <Post v-for="post in posts"
                          :title="post.title"
                          :text="post.text"
                          :key="post.userId"
                          :author="allUsers[post.userId - 1].name"
                          :img="allUsers[post.userId - 1].photo"
                          class="mb-5">
                    </Post>
                </v-col>
            </v-row>
        </div>
    </div>
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
            posts: [],
            user: {},
            allUsers: [],
            title : '',
            text : ''
        }
    },
    watch: {
        $route: {
            handler(){
                this.upd();
            },
            immediate: true,
        }
    },
    methods: {
        getPosts(){
            this.axios.get(this.$store.getters.getPostLink)
                .then((response)=>{
                    for(let post of response.data){
                        if(post.userId == this.$route.params.id)
                            this.posts.unshift(post);
                    }
                })
        },
        upd () {
            this.$axios.get(this.$store.getters.getUserLink)
                .then(response=>{
                    this.user = response.data[(this.$route.params.id - 1)];
                    this.allUsers = response.data;
                })
            this.getPosts();
        },
        send() {
            this.axios.get(this.$store.getters.getPostLink)
                .then((response) => {
                    let posts = response.data;

                    let newPost = {
                        userId: this.$store.getters.getId,
                        title: this.title,
                        text: this.text
                    }
                    posts.push(newPost);

                    this.axios.put(this.$store.getters.getPostLink, posts)
                        .then(
                            (response) => {
                                if(response.data == "ok") {
                                    window.alert('Вы успешно оствили запись!');
                                    this.upd();
                                } else {
                                    window.alert('Что-то пошло не так! Попробуйте ещё раз');
                                }
                            } 
                        );

                    this.posts.unshift(newPost);
                })
        }
    },
    mounted() {
        this.upd();
    }
}
</script>

<style>
</style>