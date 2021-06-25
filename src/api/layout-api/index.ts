import { MethodEnum, YiuAip } from 'yiu-axios/type'

const entityUrl = '/layout'

const layoutApi = {
    add: <YiuAip>{
        url: entityUrl,
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
}

export default layoutApi
