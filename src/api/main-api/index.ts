import { MethodEnum, YiuAip } from 'yiu-axios/type'

export default {
    getCurrentWorkspace: <YiuAip>{
        url: '/current/workspace',
        method: MethodEnum.GET,
    },
}
