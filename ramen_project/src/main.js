import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import getCookieDataByKey from "@/js/getCookieData.js"

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    let authenticated = getCookieDataByKey("authenticated");
    if(authenticated=="True"){
      next()
    }else{
      next({
        path: 'Login',
        query: {redirect: to.fullPath}
      })
    }
  }

  next()
})
