import Vue from 'vue'
import axios from 'axios'

import App from './App'
// import router from './router'
// import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.http = Vue.prototype.$http = Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   components: { App },
//   router,
//   store,
//   template: '<App/>'
// }).$mount('#app')
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
