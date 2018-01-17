import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
import SvgDemo from '@/demos/SvgDemo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/svg',
      name: 'svg',
      component: SvgDemo
    }
  ]
})
