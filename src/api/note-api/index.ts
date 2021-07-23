import { MethodEnum, YiuAip } from 'yiu-axios/type'

const entityUrl = '/note'

const noteApi = {
    add: <YiuAip>{
        url: entityUrl,
        method: MethodEnum.POST,
    },
    update: <YiuAip>{
        url: entityUrl,
        method: MethodEnum.PUT,
    },
    view: <YiuAip>{
        url: entityUrl + '/{id}',
        method: MethodEnum.GET,
    },
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
    delBad: <YiuAip>{
        url: entityUrl + '/bad/{id}',
        method: MethodEnum.DELETE,
    },
    positionFile: <YiuAip>{
        url: entityUrl + '/position/{id}',
        method: MethodEnum.GET,
    },
    changeShow: <YiuAip>{
        url: entityUrl + '/change/show/{id}',
        method: MethodEnum.GET,
    },
    up: <YiuAip>{
        url: entityUrl + '/up/{id}',
        method: MethodEnum.PUT,
    },
    down: <YiuAip>{
        url: entityUrl + '/down/{id}',
        method: MethodEnum.PUT,
    },
    editMarkdown: <YiuAip>{
        url: entityUrl + '/edit/md/{id}',
        method: MethodEnum.GET,
    },
    reade: <YiuAip>{
        url: entityUrl + '/reade/{id}',
        method: MethodEnum.GET,
    },
}

export default noteApi
