import { yiuAxios } from 'yiu-axios'
import axios, { Canceler } from 'axios'
import { Ref } from 'vue'
import { YiuRequestConfig } from 'yiu-axios/type'
import { Result } from '/#/types'
import { getEnvObj } from '/@/utils/env'

const defYiuAxios = yiuAxios.create<Result, Ref<boolean>>({
    baseURL: getEnvObj().API_URL_PREFIX as string,
    timeout: 6000,
    debug: !import.meta.env.PROD,
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
