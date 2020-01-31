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
    props: ['axiosLink'],
    data() {
      return {
          password: '',
          login: '',
      }  
    },
    methods: {
        auth() {
            this.axios.get(this.axiosLink)
                .then((responce) => {
                    let users =  responce.data;
                    let found = false;
                    for (let index in users) {
                        if (this.login == users[index].login && this.password == users[index].password) {
                            let id = parseInt(index) + 1;
                            this.$emit('login', id, users[index]);
                            this.$router.push('/users/' + id);
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