import { MethodEnum, YiuAipObj } from 'yiu-axios/type'

const mainApi: YiuAipObj = {
    getCurrentWorkspace: {
        url: '/current/workspace',
        method: MethodEnum.GET,
    },
}

export default mainApi
