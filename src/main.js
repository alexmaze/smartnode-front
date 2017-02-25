import Vue from 'vue'
import App from './App'
import router from './router'
import Promise from 'es6-promise'
import ElementUI from 'element-ui'
import 'isomorphic-fetch'
import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import { jsPlumb, jsPlumbUtil, jsBezier, Mottle, Katavorio, Biltong } from 'jsplumb'

window.jsPlumb = jsPlumb
window.jsPlumbUtil = jsPlumbUtil
window.jsBezier = jsBezier
window.Mottle = Mottle
window.Katavorio = Katavorio
window.Biltong = Biltong

Promise.polyfill()
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
