import Vue from 'vue'
import App from './App.vue'
import router from './router'
import bulma from 'bulma'
import scss from "@/assets/css/site.scss"


Vue.config.productionTip = false

new Vue({
  router,
  bulma,
  scss,
  render: h => h(App)
}).$mount('#app')
