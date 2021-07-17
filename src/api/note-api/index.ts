import { MethodEnum, YiuAip } from 'yiu-axios/type'

const entityUrl = '/note'

const noteApi = {
    refresh: <YiuAip>{
        url: entityUrl + '/refresh',
        method: MethodEnum.GET,
    },
    searchTree: <YiuAip>{
        url: entityUrl + '/tree',
        method: MethodEnum.POST,
    },
    search: <YiuAip>{
        url: entityUrl,
        method: MethodEnum.GET,
    },
    del: <YiuAip>{
        url: entityUrl + '/{id}',
        method: MethodEnum.DELETE,
    },
    delFile: <YiuAip>{
        url: entityUrl + '/file/{id}',
        method: MethodEnum.DELETE,
    },
    positionFile: <YiuAip>{
        url: entityUrl + '/position/{id}',
        method: MethodEnum.GET,
    },
}

export default noteApi
