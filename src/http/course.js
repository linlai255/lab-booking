import * as http from './index'

const search = (param) => {
    return http.$get(http.apis.courseSearch$get, param)
}

const save = (data) => {
    return http.$post(http.apis.courseSave$post, data)
}

const update = (data) => {
    return http.$put(http.apis.courseUpdate$put, data)
}

const detail = (data) => {
    return http.$get(http.apis.courseDetail$get, data)
}

const del = (param) => {
    return http.$deleteWithPathVar(http.apis.courseDelete$delete, param)
}

export { search, save, update, detail, del }
