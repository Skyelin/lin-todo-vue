import Vue from 'vue'
import Router from 'vue-router'
//require懒加载
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirection: '/index',
      component: () => import('@/pages/todoList')
    }
  ]
})
