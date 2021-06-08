import axios from 'axios'
import '../router/index'
import router from '../router/index'

const tokenKey = 'Authorization'

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.timeout = 5000

axios.interceptors.request.use(
    (config) => {
        let token = 'hello'
        // let token = localStorage.getItem(tokenKey);

        // if (token) {
        config.headers.hello = token
        // }
        return Promise.resolve(config)
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        if (response.status == 200) {
            return Promise.resolve(response)
        } else if (response.data.code && response.data.code === 0) {
            return Promise.resolve(response)
        } else if (
            response.data.code &&
            response.data.code >= 11000 &&
            response.data.code <= 11007
        ) {
            console.log('error')
            localStorage.removeItem(tokenKey)
            router.push({ path: '/login' })
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

const hostname = 'http://localhost:8000/api'

const $http = axios.create({
    baseURL: hostname,
    headers: {},
})

const $get = (uri, params = {}) =>
    $http.get(uri, {
        method: uri,
        params: params,
    })
const $getWithBody = (uri, data = {}) =>
    $http.get(uri, {
        method: uri,
        data: data,
    })
const $getWithPathVar = (uri, params = {}) => {
    if (Object.keys(params).length) {
        for (let key in params) {
            let reg = new RegExp(key, 'g')
            uri = uri.replace(reg, params[key])
        }
    }
    return $http.get(uri, {
        method: uri,
    })
}

const $getWithPathVarBody = (uri, params = {}, data = {}) => {
    if (Object.keys(data).length) {
        for (let key in data) {
            let reg = new RegExp(key, 'g')
            uri = uri.replace(reg, data[key])
        }
    }
    return $http.get(uri, {
        method: uri,
        params: params,
        data: data,
    })
}

const $post = (uri, data = {}) =>
    $http.post(uri, {
        method: uri,
        data: data,
    })

const $put = (uri, data = {}) =>
    $http.put(uri, {
        method: uri,
        data: data,
    })

const $deleteByPathVar = (uri, params = {}) => {
    if (Object.keys(params).length) {
        for (let key in params) {
            let reg = new RegExp('{' + key + '}', 'g')
            uri = uri.replace(reg, params[key])
        }
    }
    return $http.delete(uri, {
        method: uri,
    })
}

const apis = {
    // account
    verifyCode$get: '/v1/verfify-code/{account}/{registerType}/{mode}',
    checkVerifyCode$get: '/v1/check-verfify-code/{account}/{registerType}',
    login$post: '/v1/login',
    logout$post: '/v1/logout',
    register$post: '/v1/register',

    // rbac
    apiSave$post: '/v1/rbac/api',
    apiUpdate$put: '/v1/rbac/api',
    apiSearch$put: '/v1/rbac/api',
}

export {
    tokenKey,
    apis,
    $http,
    $get,
    $getWithBody,
    $getWithPathVar,
    $getWithPathVarBody,
    $post,
    $put,
    $deleteByPathVar,
}
