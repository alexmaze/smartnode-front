import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import Promise from 'es6-promise'
import ElementUI from 'element-ui'
import 'isomorphic-fetch'
import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import '../static/iconfont.css'
import { jsPlumb, jsPlumbUtil, jsBezier, Mottle, Katavorio, Biltong } from 'jsplumb'

window.jsPlumb = jsPlumb
window.jsPlumbUtil = jsPlumbUtil
window.jsBezier = jsBezier
window.Mottle = Mottle
window.Katavorio = Katavorio
window.Biltong = Biltong

Promise.polyfill()
Vue.use(ElementUI)
// Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
