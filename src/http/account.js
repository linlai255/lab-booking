import * as http from './index'

export const verifyCode = (param) => {
  console.log(http.apis.verifyCode$get)
  console.log(param)
  return http.get(http.apis.verifyCode$get)
}
