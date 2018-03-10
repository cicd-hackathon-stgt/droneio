import Vue from 'vue'
import Router from 'vue-router'
import Library from '@/components/Library'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Library'
    },
    {
      path: '/library',
      name: 'Library',
      component: Library
    }
  ]
})
