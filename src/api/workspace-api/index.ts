import { MethodEnum, YiuAipObj } from 'yiu-axios/type'

const workspaceApi: YiuAipObj = {
    getSortListBySearchDto: {
        url: '/workspace',
        method: MethodEnum.GET,
    },
    add: {
        url: '/workspace',
        method: MethodEnum.POST,
    },
}

export default workspaceApi
