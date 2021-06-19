import axios from 'axios'
import '../router/index'
import router from '../router/index'

const tokenKey = 'Authorization'

const paramsDebug = true

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.timeout = 5000

// const hostname = 'http://localhost:8000/api'

const $http = axios.create({
    // baseURL: ,
    headers: {},
})

$http.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem(tokenKey)
        if (token !== null && token !== '') {
            config.headers.Authorization = token
        }
        return Promise.resolve(config)
    },
    (error) => {
        return Promise.reject(error)
    }
)

$http.interceptors.response.use(
    (response) => {
        console.log(response)
        if (
            response.status == 200 &&
            typeof response.data.code !== 'undefined' &&
            response.data.code === 0
        ) {
            return response
        } else if (
            response.data.code !== null &&
            typeof response.data.code !== 'undefined' &&
            response.data.code >= 11000 &&
            response.data.code <= 11007
        ) {
            localStorage.removeItem(tokenKey)
            router.replace('/login')
            return Promise.reject(response)
        } else {
            return Promise.reject(response)
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

const $get = (uri, params = {}) =>
    $http.get(uri, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        params: params,
    })

const $getWithPathVar = (uri, params = {}) => {
    if (paramsDebug) {
        console.log(uri)
        console.log(params)
    }
    if (Object.keys(params).length) {
        for (let key in params) {
            let reg = new RegExp('{' + key + '}', 'g')
            uri = uri.replace(reg, params[key])
        }
    }
    return $http.get(uri)
}

const $post = (uri, data = {}) => {
    if (paramsDebug) {
        console.log(uri)
        console.log(data)
    }
    return $http.post(uri, data)
}

const $put = (uri, data = {}) => $http.put(uri, data)

const $deleteWithPathVar = (uri, params = {}) => {
    if (paramsDebug) {
        console.log(uri)
        console.log(params)
    }
    if (Object.keys(params).length) {
        for (let key in params) {
            let reg = new RegExp('{' + key + '}', 'g')
            uri = uri.replace(reg, params[key])
        }
    }
    return $http.delete(uri)
}

const $deleteWithBody = (uri, data = {}) => {
    if (paramsDebug) {
        console.log(uri)
        console.log(data)
    }
    return $http.delete(uri, {
        data: data,
    })
}

const apis = {
    // account
    verifyCode$get: '/api/v1/verify-code/{account}/{registerType}/{mode}',
    checkVerifyCode$get: '/api/v1/check-verify-code/{account}/{verifyCode}',
    login$post: '/api/v1/login',
    logout$post: '/api/v1/logout',
    register$post: '/api/v1/register',

    // rbac
    apiSave$post: '/api/v1/rbac/api',
    apiUpdate$put: '/api/v1/rbac/api',
    apiSearch$get: '/api/v1/rbac/api',

    // course
    courseSearch$get: '/api/v1/course',
    courseSave$post: '/api/v1/course',
    courseUpdate$put: '/api/v1/course',
    courseDetail$get: '/api/v1/course/{id}',
    courseDelete$delete: '/api/v1/course/{id}',
}

export {
    tokenKey,
    paramsDebug,
    apis,
    $http,
    $get,
    $getWithPathVar,
    $post,
    $put,
    $deleteWithPathVar,
    $deleteWithBody,
}
