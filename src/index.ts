import Vue from 'vue'
import App from './App.vue'
import { FormTagsPlugin } from 'bootstrap-vue'
Vue.use(FormTagsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
    render: h => h(App)
}).$mount('#app')
