import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import { tokenKey } from '../http/index'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/',
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
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    //to到哪儿; from从哪儿离开; next跳转, 为空就是放行

    //取出localStorage判断
    let token = localStorage.getItem(tokenKey)

    // 每个if或else内只包含一个'next'，可以防止守卫混乱，发生无限循环
    if (token) {
        if (to.path === '/') {
            next('/home')
        } else if (to.path === '/login') {
            next()
            router.push('/home')
        } else {
            next()
        }
    } else if (to.path === '/login') {
        next()
    } else {
        ElMessage.error('please login first.')
        next('/login')
    }
})

export default router
