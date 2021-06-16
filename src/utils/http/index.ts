import { yiuAxios } from 'yiu-axios'
import axios, { Canceler } from 'axios'
import { Ref } from 'vue'
import { YiuRequestConfig } from 'yiu-axios/type'
import { Result } from '/#/types'
import { getEnvObj } from '/@/utils/env'
import { isFunction } from 'lodash'

const defYiuAxios = yiuAxios.create<Result, Ref<boolean>, 'notification'>({
    baseURL: getEnvObj().VITE_GLOB_API_URL_PREFIX as string,
    timeout: 6000,
    debug: !import.meta.env.PROD,
    isError: (res) => {
        return res.data.type === 'error'
    },
    tips: {
        success: {
            showFunc: ({ result, content, title, anyObj }) => {
                if (isFunction(anyObj?.info)) {
                    anyObj.info({
                        // 标题
                        content: title || '请求成功',
                        // 内容
                        meta: result?.data?.message || content,
                    })
                }
            },
        },
        error: {
            showFunc: ({ result, content, title, anyObj }) => {
                console.log(result)
                if (!result.data) {
                    if (isFunction(anyObj?.error)) {
                        anyObj.error({
                            // 标题
                            content: title || '请求失败',
                            // 内容
                            meta: content || '请联系官方检查该功能',
                        })
                    }
                } else {
                    let outStr = ''
                    if (result?.data?.message) {
                        const splitArr = result.data.message.split(' & ')
                        if (splitArr.length > 1) {
                            splitArr.forEach(item => {
                                outStr += item + '\n'
                            })
                        } else {
                            outStr += result.data.message
                        }
                    }
                    if (isFunction(anyObj?.error)) {
                        anyObj.error({
                            // 标题
                            content: title || '请求失败',
                            // 内容
                            meta: outStr || content || '请联系官方检查该功能',
                        })
                    }
                }
            },
        },
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
