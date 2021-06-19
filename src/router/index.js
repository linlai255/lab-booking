import { tokenKey } from '@/http/index'
import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'

const routes = [
    {
        path: '/',
        meta: {
            show: false,
        },
    },
    {
        path: '/index',
        name: 'Index',
        component: Layout,
        meta: {
            show: false,
        },
        children: [
            {
                path: '',
                component: Index,
            },
        ],
    },
    {
        path: '/course',
        name: 'Course',
        meta: {
            sort: 1,
            level: 2,
            label: '课程',
            icon: 'el-icon-school',
        },
        component: () => import('../views/Layout.vue'),
        children: [
            {
                path: '/course/course',
                name: 'Course',
                component: () => import('../views/course/Course.vue'),
                meta: {
                    sort: 1,
                    level: 2, // 0或undefined普通 1管理员 2教师
                    label: '课程记录',
                    icon: 'el-icon-notebook-1',
                },
            },
        ],
    },
    {
        path: '/laboratory',
        name: 'Laboratory',
        meta: { sort: 3, level: 1, label: '实验室', icon: 'el-icon-office-building' },
        component: () => import('../views/Layout.vue'),

        children: [
            {
                path: '/laboratory/booking',
                name: 'Booking',
                component: () => import('../views/laboratory/Booking.vue'),
                meta: { sort: 1, level: 1, label: '预约记录', icon: 'el-icon-notebook-2' },
            },
            {
                path: '/laboratory/lab',
                name: 'Lab',
                component: () => import('../views/laboratory/Lab.vue'),
                meta: { sort: 2, level: 1, label: '实验环境', icon: 'el-icon-reading' },
            },
        ],
    },
    {
        path: '/rbac',
        name: 'Rbac',
        meta: {
            sort: 4,
            level: 1,
            label: '权限操作',
            icon: 'el-icon-lock',
        },
        component: () => import('../views/Layout.vue'),

        children: [
            {
                path: '/rbac/api',
                name: 'Api',
                component: () => import('../views/rbac/Api.vue'),
                meta: { sort: 1, level: 1, label: 'API', icon: 'el-icon-collection-tag' },
            },
            {
                path: '/rbac/bind',
                name: 'Bind',
                component: () => import('../views/rbac/Bind.vue'),
                meta: { sort: 2, level: 1, label: '绑定', icon: 'el-icon-connection' },
            },
            {
                path: '/rbac/menu',
                name: 'Menu',
                component: () => import('../views/rbac/Menu.vue'),
                meta: {
                    sort: 3,
                    level: 1,
                    label: '菜单',
                    icon: 'el-icon-date',
                },
            },
            {
                path: '/rbac/role',
                name: 'Role',
                component: () => import('../views/rbac/Role.vue'),
                meta: {
                    sort: 4,
                    level: 1,
                    label: '角色',
                    icon: 'el-icon-user',
                },
            },
        ],
    },
    {
        path: '/file',
        name: 'File',
        meta: { sort: 5, level: 0, label: '文件操作', icon: 'el-icon-folder' },
        component: () => import('../views/Layout.vue'),

        children: [
            {
                path: '/filedownload',
                name: 'Download',
                component: () => import('../views/file/Download.vue'),
                meta: { sort: 1, level: 0, label: '下载', icon: 'el-icon-document-copy' },
            },
            {
                path: '/fileupload',
                name: 'Upload',
                component: () => import('../views/file/Upload.vue'),
                meta: { sort: 2, level: 0, label: '上传', icon: 'el-icon-document-add' },
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            show: false,
        },
    },
    {
        path: '/registration/:type(\\d+)',
        name: 'Registration',
        component: Registration,
        meta: {
            show: false,
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    //to到哪儿; from从哪儿离开; next跳转, 为空就是放行

    // 取出localStorage判断
    let token = localStorage.getItem(tokenKey)

    // 每个if或else内只包含一个'next'，可以防止守卫混乱，发生无限循环
    if (token) {
        if (to.path === '/') {
            next('/index')
        } else if (to.path === '/login') {
            next()
            router.push('/index')
        } else {
            next()
        }
    } else if (to.path === '/login') {
        next()
    } else if (new String(to.path).startsWith('/registration')) {
        next()
    } else {
        ElMessage.error('please login first.')
        next('/login')
    }
})

export default router
