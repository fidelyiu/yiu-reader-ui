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
}

export default layoutApi
