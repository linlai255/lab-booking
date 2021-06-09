import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'

const routes = [
    {
        path: '/',
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'course',
                name: 'Course',
                component: () => import('../views/course/Course.vue'),
                meta: {
                    level: 1, // 0普通 1教师 2管理员
                },
            },
            {
                path: 'download',
                name: 'Download',
                component: () => import('../views/file/Download.vue'),
                meta: {
                    level: 0,
                },
            },
            {
                path: 'upload',
                name: 'Upload',
                component: () => import('../views/file/Upload.vue'),
                meta: {
                    level: 0,
                },
            },
            {
                path: 'booking',
                name: 'Booking',
                component: () => import('../views/laboratory/Booking.vue'),
                meta: {
                    level: 0,
                },
            },
            {
                path: 'lab',
                name: 'Lab',
                component: () => import('../views/laboratory/Lab.vue'),
                meta: {
                    level: 2,
                },
            },
            {
                path: 'api',
                name: 'Api',
                component: () => import('../views/rbac/Api.vue'),
                meta: {
                    level: 2,
                },
            },
            {
                path: 'bind',
                name: 'Bind',
                component: () => import('../views/rbac/Bind.vue'),
                meta: {
                    level: 2,
                },
            },
            {
                path: 'menu',
                name: 'Menu',
                component: () => import('../views/rbac/Menu.vue'),
                meta: {
                    level: 2,
                },
            },
            {
                path: 'role',
                name: 'Role',
                component: () => import('../views/rbac/Role.vue'),
                meta: {
                    level: 2,
                },
            },
        ],
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
    {
        path: '/registration/:type',
        name: 'Registration',
        component: Registration,
        // component: () => import('../views/Registration.vue'),
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

    if (to.path === '/') {
        next('/login')
    } else {
        next()
    }

    //取出localStorage判断
    // let token = localStorage.getItem(tokenKey)

    // 每个if或else内只包含一个'next'，可以防止守卫混乱，发生无限循环
    // if (token) {
    //     if (to.path === '/') {
    //         next('/home')
    //     } else if (to.path === '/login') {
    //         next()
    //         router.push('/home')
    //     } else {
    //         next()
    //     }
    // } else if (to.path === '/login') {
    //     next()
    // } else {
    //     ElMessage.error('please login first.')
    //     next('/login')
    // }
})

export default router
