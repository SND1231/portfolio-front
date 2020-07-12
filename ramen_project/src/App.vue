<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >
      <a href="/" class="d-flex align-center">
        <v-img
          alt="Ramen Logo"
          class="shrink mr-2"
          contain
          src="@/img/ramen_img.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Ramen Font"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/img/ramen_top_font.png"
          width="100"
        />
      </a>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn color="grey" to="/">Topに戻る</v-btn>
        <v-btn v-show="!isAuthenticated" color="grey" to="/Login">ログイン</v-btn>
        <v-btn v-show="!isAuthenticated" color="grey" v-on:click="clickSimpleLogin">簡易ログイン</v-btn>
        <v-btn v-show="!isAuthenticated" color="grey" to="/users/create">ユーザー登録</v-btn>
        <v-btn v-show="isAuthenticated"  color="grey" v-on:click="deleteCookie">ログアウト</v-btn>
        <v-btn v-show="isAuthenticated"  color="grey" to="/posts/create">投稿作成</v-btn>
        <v-btn v-show="isAuthenticated"  color="grey" :to="{name: 'DetailUser', params: {userId: user_id}}">ユーザ画面</v-btn>
      </v-card-actions>
    </v-app-bar>
    <v-content
      color="blue"
      dark
    >
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import loginUser from "@/js/auth.js"
import getCookieDataByKey from "@/js/getCookieData.js"

export default {
  data: () => ({
    user_id: null,
  }),
  mounted: function () {
    this.user_id = getCookieDataByKey("user_id")
  },
  methods: {
    deleteCookie: function() {
      document.cookie = "token=;max-age=0";
      document.cookie = "user_id=;max-age=0";
      document.cookie = "authenticated=;max-age=0";
      window.location.href = "/";
    },
    clickSimpleLogin: function() {
      loginUser(process.env.VUE_APP_LOGIN_EMAIL, process.env.VUE_APP_LOGIN_PASSWORD)
    },
  },
  computed: {
    isAuthenticated: function() {
      let authenticated = getCookieDataByKey("authenticated");
      if(authenticated=="True"){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

