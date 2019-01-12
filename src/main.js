import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'

import App from './App'
import Store from '$store'
import Route from './Route'
import Header from '$components/Header'

import './style/reset'
import './style/markdown'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(Element)
Vue.component('Header', Header)

const Router = new VueRouter({
  routes: Route,
})

new Vue({
  router: Router,
  store: Store,
  render: h => h(App),
}).$mount(document.body.appendChild(document.createElement('div')))
