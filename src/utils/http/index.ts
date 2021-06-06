import { YiuAxios } from 'yiu-axios'
import axios, { Canceler } from 'axios'
import { YiuRequestConfig } from 'yiu-axios/dist/type'

const defYiuAxios = new YiuAxios({
    baseURL: 'http://localhost:8080/',
    // timeout: 1000,
    debug: true,
})
const defAxios = axios.create()

export function yiuHttp<D = any, T = any>(c: YiuRequestConfig<D, T>): Canceler | undefined {
    return defYiuAxios.send(c, defAxios)
}
