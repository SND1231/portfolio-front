<template>
  <v-card width="400px" class="login mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" :rules="emailRules" label="email" prepend-icon="mdi-account-circle" />
        <v-text-field v-model="password" :rules="passwordRules" v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" @click:append="showPassword = !showPassword" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="info mx-auto" v-on:click="clickLogin">ログイン</v-btn>
    </v-card-actions>
    <v-card-text>
      <b-container class="message d-flex justify-content-center">
        {{ message }} 
      </b-container>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'

export default Vue.component('login-form', {
  name: 'login',
  data: function() {
    return {
      message: '',
      toggle: false,
      email: "",
      password: "",
      showPassword : false,
      emailRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
      passwordRules:[
        value => !!value || 'Required.',
      ]
    }
  },
  methods: {
    clickLogin: function() {
      var axios = Axios.create({
        baseURL: 'http://192.168.33.10:8080'
      })
      var self = this

      axios.post('/v1/login', {email: self.email, password: self.password}
      ).then(function (response) {
        // cookieとしてトークンを付与
        document.cookie = 'token=' + response.data.token
        document.cookie = 'user_id=' + response.data.id
        document.cookie = 'authenticated=True' 
        // 次のページにジャンプ
        //router.push({name: nextPage, params: { auth: 'authenticated' }})
      }).catch(err => {
        console.log('err:', err.response.data);
        self.message = err.response.data["error"]
    });

    },
    clickSimpleLogin: function() {
      this.toggle = !this.toggle;
      console.log("簡易ログイン")
    },
  }
})
</script>

<style scoped>
  .message{
    color: red;
  }
</style>
