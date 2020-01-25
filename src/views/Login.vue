<template>
    <div class="d-flex justify-center">
        <v-card width="600px" class="mt-12 pa-10">
            <v-card-title>
                Войдите в аккаунт
            </v-card-title>

            <v-text-field
                label="Введите логин"
                v-model="login"
                outlined
                @keyup.enter="auth"
            ></v-text-field>

            <v-text-field
                label="Введите пароль"
                v-model="password"
                outlined
                @keyup.enter="auth"
            ></v-text-field>

            <v-btn @click="auth"
                   @keyup.enter="auth"
                   
            >
                Войти
            </v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
      return {
          password: '',
          login: '',
      }  
    },
    methods: {
        auth() {
            this.axios.get('http://188.225.47.187/api/jsonstorage/d69cd49ad6075b12ccaf4eeffd4f412f')
                .then((responce) => {
                    let users =  responce.data;
                    let found = false;
                    for (let index in users) {
                        if (this.login == users[index].login && this.password == users[index].password) {
                            this.$emit('login', users[index].id);
                            this.$router.push('/users/' + users[index].id);
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        window.alert('Неверный логин или пароль!');
                    }
                })
        }
    } 
}
</script>