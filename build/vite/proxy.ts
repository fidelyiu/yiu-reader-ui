/**
 * 解析 `.env.development` 代理配置
 */
import type { ProxyOptions } from 'vite'

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>;

const httpsRE = /^https:\/\//

/**
 * 创建代理对象
 */
export function createProxy(list: ProxyList = []): ProxyTargetList {
    const ret = {}
    for (const [prefix, target] of list) {
        const isHttps = httpsRE.test(target)
        // https://github.com/http-party/node-http-proxy#options
        ret[prefix] = {
            target: target,
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
            // https is require secure=false
            ...(isHttps ? { secure: false } : {}),
        }
    }
    return ret
}