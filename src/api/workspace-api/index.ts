import { MethodEnum, YiuAip } from 'yiu-axios/type'

const entityUrl = '/workspace'

const workspaceApi = {
    search: <YiuAip>{
        url: entityUrl,
        method: MethodEnum.GET,
    },
    add: <YiuAip>{
        url: entityUrl,
        method: MethodEnum.POST,
    },
    view: <YiuAip>{
        url: entityUrl + '/{id}',
        method: MethodEnum.GET,
    },
    update: <YiuAip>{
        url: entityUrl,
        method: MethodEnum.PUT,
    },
    del: <YiuAip>{
        url: entityUrl + '/{id}',
        method: MethodEnum.DELETE,
    },
    up: <YiuAip>{
        url: entityUrl + '/up/{id}',
        method: MethodEnum.PUT,
    },
    down: <YiuAip>{
        url: entityUrl + '/down/{id}',
        method: MethodEnum.PUT,
    },
}

export default workspaceApi
