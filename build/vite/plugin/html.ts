/**
 * 一个为index.html提供minify和基于EJS模板功能的Vite插件。
 * https://github.com/anncwb/vite-plugin-html
 */
import html from 'vite-plugin-html'
import { Config } from '/#/config'

export function configHtmlPlugin(env: Config.ViteEnv, isBuild: boolean) {
    const { VITE_GLOB_APP_TITLE } = env
    // const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env

    // const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`

    // const getAppConfigSrc = () => {
    //     return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`
    // }

    return html({
        minify: isBuild,
        inject: {
            // Inject data into ejs template
            injectData: {
                title: VITE_GLOB_APP_TITLE,
            },
            // Embed the generated app.config.js file
            // tags: isBuild
            //     ? [
            //         {
            //             tag: 'script',
            //             attrs: {
            //                 src: getAppConfigSrc(),
            //             },
            //         },
            //     ]
            //     : [],
        },
    })
}
