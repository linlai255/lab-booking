import * as http from './index'

const apiSearch = (params) => http.$get(http.apis.apiSearch$get, params)
const apiSave = (data) => http.$post(http.apis.apiSave$post, data)

export { apiSearch, apiSave }
