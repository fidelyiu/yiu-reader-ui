import { yiuAxios } from 'yiu-axios'
import axios, { Canceler } from 'axios'
import { Ref } from 'vue'
import { YiuAip, YiuAipObj, YiuRequestConfig } from 'yiu-axios/type'
import { Result } from '/#/types'
import { getEnvObj } from '/@/utils/env'
import { get } from 'lodash'

const defYiuAxios = yiuAxios.create<Result, Ref<boolean>>({
    baseURL: getEnvObj().VITE_GLOB_API_URL_PREFIX as string,
    timeout: 6000,
    debug: !import.meta.env.PROD,
    isError: (res) => {
        return res.data.type === 'error'
    },
    loading: {
        beforeSendFunc: function ({ loading }) {
            if (loading) {
                loading.value = true
            }
        },
        finallySendFunc: function ({ loading }) {
            if (loading) {
                loading.value = false
            }
        },
    },
})
const defAxios = axios.create()

export function yiuHttp<D = any, L = any>(c: YiuRequestConfig<Result<D>, L>): Canceler | undefined {
    return defYiuAxios.send(c, defAxios)
}

export function initApiByField(initApi: YiuAip, apiObj: YiuAipObj, field: string) {
    const apiObjItem = get(apiObj, field) as YiuAip
    if (apiObjItem.url && apiObjItem.method) {
        initApi.url = apiObjItem.url
        initApi.method = apiObjItem.method
    }
}
