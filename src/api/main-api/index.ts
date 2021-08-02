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
    getCurrentEditSoft: <YiuAip>{
        url: entityUrl + '/edit/soft',
        method: MethodEnum.GET,
    },
    setCurrentEditSoft: <YiuAip>{
        url: entityUrl + '/edit/soft/{id}',
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
    getOsPathSeparator: <YiuAip>{
        url: entityUrl + '/os/pathSeparator',
        method: MethodEnum.GET,
    },
    getNoteTextDocument: <YiuAip>{
        url: entityUrl + '/note/txt/document',
        method: MethodEnum.GET,
    },
    setNoteTextDocument: <YiuAip>{
        url: entityUrl + '/note/txt/document',
        method: MethodEnum.PUT,
    },
    getNoteTextMainPoint: <YiuAip>{
        url: entityUrl + '/note/txt/main/point',
        method: MethodEnum.GET,
    },
    setNoteTextMainPoint: <YiuAip>{
        url: entityUrl + '/note/txt/main/point',
        method: MethodEnum.PUT,
    },
    getNoteTextDir: <YiuAip>{
        url: entityUrl + '/note/txt/dir',
        method: MethodEnum.GET,
    },
    setNoteTextDir: <YiuAip>{
        url: entityUrl + '/note/txt/dir',
        method: MethodEnum.PUT,
    },
}

export default mainApi
