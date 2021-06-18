import { MethodEnum, YiuAip } from 'yiu-axios/type'

const mainApi = {
    getCurrentWorkspace: <YiuAip>{
        url: '/current/workspace',
        method: MethodEnum.GET,
    },
    setCurrentWorkspace: <YiuAip>{
        url: '/current/workspace/{id}',
        method: MethodEnum.PUT,
    },
}

export default mainApi
