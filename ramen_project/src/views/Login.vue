<template>
  <v-card width="400px" class="login mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">ログイン</h1>
    </v-card-title>
    <v-card-text>
      <v-form ref="loginForm">
        <v-text-field v-model="email" :rules="emailRules" label="email" prepend-icon="mdi-account-circle" />
        <v-text-field v-model="password" :rules="passwordRules" v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" @click:append="showPassword = !showPassword" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="info mx-auto" @click="clickLogin">ログイン</v-btn>
    </v-card-actions>
    <v-card-text class="red--text">
      <v-layout justify-center>
        {{ message }} 
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import loginUser from "@/js/auth.js"

export default {
  name: "Login",
  data: () => ({
    message: "",
    toggle: false,
    email: "",
    password: "",
    showPassword : false,
    emailRules: [
      value => !!value || "必ず入力してください",
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || "Invalid e-mail."
      },
    ],
    passwordRules:[
      value => !!value || "必ず入力してください",
      value => (value || "").length >= 8 || "最低8文字は入力してください",
    ]
  }),
  methods: {
    clickLogin: function() {
      console.log(this.$refs.loginForm.validate())
      if (!this.$refs.loginForm.validate()){
          return
      }
      loginUser(this.email, this.password).then(data =>{
        if (!data.success){
          this.message = data.message.error
        }
      });
    }
  }
}
</script>
