import { MethodEnum, YiuAip } from 'yiu-axios/type'

const workspaceApi = {
    getSortListBySearchDto: <YiuAip>{
        url: '/workspace',
        method: MethodEnum.GET,
    },
    add: <YiuAip>{
        url: '/workspace',
        method: MethodEnum.POST,
    },
}

export default workspaceApi
