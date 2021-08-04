import { MethodEnum, YiuAip } from 'yiu-axios/type'

const entityUrl = '/db'

const dbApi = {
    search: <YiuAip>{
        url: entityUrl,
        method: MethodEnum.POST,
    },
}

export default dbApi
