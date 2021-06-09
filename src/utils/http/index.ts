import { yiuAxios } from 'yiu-axios'
import axios, { Canceler } from 'axios'
import { Ref } from 'vue'
import { YiuRequestConfig } from 'yiu-axios/type'

const defYiuAxios = yiuAxios.create<any, Ref<boolean>>({
    baseURL: 'http://localhost:8080/',
    timeout: 6000,
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

export function yiuHttp<D = any, T = any>(c: YiuRequestConfig<D, T>): Canceler | undefined {
    return defYiuAxios.send(c, defAxios)
}
