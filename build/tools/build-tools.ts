/**
 * 因为vite启动前是不能 `import` 第三方 ES 包，但是可以 `import` 第三方 CommonJS包。
 * 所以这里在本地将一些工具类函数编写在这，共 `vite.config.ts` 和 `vite`插件配置时 使用。
 *
 * 源码中为以下代码的是ES代码,在vite启动前会报错:`Error [ERR_REQUIRE_ESM]: Must use import to load ES Module:`
 * 该报错，可以通过`package.json`中的`"type": "module"`来解决，但是后续可能会出现更多的问题。
 * import toString from './toString.js';
 *
 * 源码中为以下代码的是CommonJS代码,在vite启动前是可以导入的:
 * var baseClamp = require('./_baseClamp');
 */
import { resolve } from 'path'

export function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir)
}
