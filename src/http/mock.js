import * as http from './index'

export const mockUser = (username) => {
    return http.$get('https://my-json-server.typicode.com/yalden/mock-api/users', username)
}
