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
    dirTree: <YiuAip>{
        url: entityUrl + '/dir/tree/{id}',
        method: MethodEnum.GET,
    },
    getNumDocument: <YiuAip>{
        url: entityUrl + '/num/document/{id}',
        method: MethodEnum.GET,
    },
    setNumDocument: <YiuAip>{
        url: entityUrl + '/num/document',
        method: MethodEnum.PUT,
    },
    getNumMainPoint: <YiuAip>{
        url: entityUrl + '/num/main/point/{id}',
        method: MethodEnum.GET,
    },
    setNumMainPoint: <YiuAip>{
        url: entityUrl + '/num/main/point',
        method: MethodEnum.PUT,
    },
    getNumDir: <YiuAip>{
        url: entityUrl + '/num/dir/{id}',
        method: MethodEnum.GET,
    },
    setNumDir: <YiuAip>{
        url: entityUrl + '/num/dir',
        method: MethodEnum.PUT,
    },
}

export default noteApi
