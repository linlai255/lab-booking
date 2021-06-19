import * as http from './index'

const verifyCode = (param) => {
    return http.$getWithPathVar(http.apis.verifyCode$get, param)
}

const checkVerifyCode = (param) => {
    return http.$getWithPathVar(http.apis.checkVerifyCode$get, param)
}

const register = (data) => {
    return http.$post(http.apis.register$post, data)
}

const login = (data) => {
    return http.$post(http.apis.login$post, data)
}

const logout = () => {
    return http.$post(http.apis.logout$post)
}

export { verifyCode, checkVerifyCode, register, login, logout }
