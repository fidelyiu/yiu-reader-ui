import { MethodEnum, YiuAip } from 'yiu-axios/type'

const mainApi = {
    getCurrentWorkspace: <YiuAip>{
        url: '/current/workspace',
        method: MethodEnum.GET,
    },
}

export default mainApi
