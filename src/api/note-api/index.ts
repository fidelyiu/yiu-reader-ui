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
}

export default noteApi
