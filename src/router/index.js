import Vue from 'vue'
import Router from 'vue-router'

import Index from 'components'
import Login from 'components/login'
import Console from 'components/console'
import CoursesTab from 'components/courses-tab'
import PlaygroundTab from 'components/playground-tab'
import Playground from 'components/playground'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    component: Index,
    redirect: '/login',
    children: [{
      path: 'console',
      component: Console,
      redirect: '/console/courses',
      children: [{
        path: 'courses',
        component: CoursesTab
      }, {
        path: 'playground',
        component: PlaygroundTab
      }]
    }, {
      name: 'playground',
      path: 'playground/:id',
      component: Playground
    }]
  }, {
    path: '/login',
    component: Login
  }]
})
