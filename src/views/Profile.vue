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
                    Веб-сайт: <a :href="urlUpgrade(user.website)" target="_blank">{{user.website}}</a>
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
            <v-row class="text-left">
                <v-col cols="9">
                    <h2 class="mb-5">Создать публикацию</h2>
                    <v-text-field
                        color="teal" 
                        outlined
                        label="Заголовок"
                        v-model="title">
                    </v-text-field>
                    <v-text-field 
                        color="teal"
                        outlined
                        label="Текст"
                        v-model="text">
                    </v-text-field>
                <v-btn color="teal"
                       outlined 
                       class="white--text" 
                       @click="send()" >
                   Опубликовать
               </v-btn>
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
                          :key="post.authorId"
                          :author="allUsers[post.authorId].name"
                          :img="allUsers[post.authorId].photo"
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
        urlUpgrade (url) {
            if (url[0] == 'h')
                return url;
            else
                return 'http://' + url;
        },
        upd () {
            this.$axios.get(this.$store.getters.getUserLink)
                .then(response=>{
                    this.user = response.data[(this.$route.params.id - 1)];
                    this.allUsers = response.data;
                })
            this.$axios.get(this.$store.getters.getPostLink)
                .then(response=>{
                    let curPosts = response.data[(this.$route.params.id - 1)];
                    this.posts = curPosts.reverse();
                })
        },
        send() {
            this.axios.get(this.$store.getters.getPostLink)
                .then((responce) => {
                    let curPosts = responce.data;

                    let row = curPosts[(this.$route.params.id - 1)];
                    row.push({
                        'authorId' : this.$store.getters.getId - 1,
                        'title': this.title,
                        'text': this.text,
                    });
                    curPosts[(this.$route.params.id - 1)] = row;

                    this.axios.put(this.$store.getters.getPostLink, curPosts)
                        .then(
                            (response) => {
                                if(response.data == "ok") {
                                    window.alert('Вы успешно оствили запись!');
                                    //this.$router.push('/users/' + this.$route.params.id);
                                    this.upd();
                                } else {
                                    window.alert('Что-то пошло не так! Попробуйте ещё раз');
                                }
                            } 
                        );
                    
                })
            this.title = '';
            this.text = '';
        }
    },
    mounted() {
        this.upd();
    }
}
</script>

<style>
</style>