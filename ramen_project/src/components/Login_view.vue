<template>
  <div class="login">
    <form>
      <dl>
        <dt>Email</dt>
        <dd><input v-model="email" placeholder="Email アドレス"></dd>
        <dt>パスワード</dt>
        <dd><input v-model="password" placeholder="パスワード"></dd>
      </dl>
    </form>
    <button v-on:click="clickLogin">ログイン</button>
    <div class="error" v-show="toggle">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function() {
    return {
      message: 'Hello World!',
      toggle: false,
      email: "",
      password: "",
    }
  },
  methods: {
    clickLogin: function() {
      this.toggle = !this.toggle;
      console.log(this.email)
      console.log(this.password)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error span{
  color:red;
}

.login{
  background-color: silver;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  padding:10px
}

</style>
