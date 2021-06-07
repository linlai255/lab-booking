import {ElMessage} from 'element-plus'
import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  //to到哪儿; from从哪儿离开; next跳转, 为空就是放行

  //取出localStorage判断
  let token = localStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      next({path: '/home'})
      router.addRoute('/home')
    } else if (to.path === '/') {
      next({path: '/home'})
      router.addRoute('/home')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    }
    ElMessage.error('please login first.')
    next({path: '/login'})
  }
})

export default router
