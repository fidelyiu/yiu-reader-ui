import { MethodEnum, YiuAip } from 'yiu-axios/type'

const entityUrl = '/main'

const mainApi = {
    getCurrentWorkspace: <YiuAip>{
        url: entityUrl + '/current/workspace',
        method: MethodEnum.GET,
    },
    setCurrentWorkspace: <YiuAip>{
        url: entityUrl + '/current/workspace/{id}',
        method: MethodEnum.PUT,
    },
    getMainBoxShowText: <YiuAip>{
        url: entityUrl + '/main/box/txt',
        method: MethodEnum.GET,
    },
    setMainBoxShowText: <YiuAip>{
        url: entityUrl + '/main/box/txt',
        method: MethodEnum.PUT,
    },
    getMainBoxShowIcon: <YiuAip>{
        url: entityUrl + '/main/box/icon',
        method: MethodEnum.GET,
    },
    setMainBoxShowIcon: <YiuAip>{
        url: entityUrl + '/main/box/icon',
        method: MethodEnum.PUT,
    },
    getMainBoxShowNum: <YiuAip>{
        url: entityUrl + '/main/box/num',
        method: MethodEnum.GET,
    },
    setMainBoxShowNum: <YiuAip>{
        url: entityUrl + '/main/box/num',
        method: MethodEnum.PUT,
    },
    getSidebarStatus: <YiuAip>{
        url: entityUrl + '/sidebar/status',
        method: MethodEnum.GET,
    },
    setSidebarStatus: <YiuAip>{
        url: entityUrl + '/sidebar/status',
        method: MethodEnum.PUT,
    },
}

export default mainApi
