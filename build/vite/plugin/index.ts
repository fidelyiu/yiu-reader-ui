import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { PluginOption } from 'vite'
import { Config } from '/#/config'

import vitePluginEslintOnSave from './vite-plugin-eslint-on-save'

import PurgeIcons from 'vite-plugin-purge-icons'
import windiCSS from 'vite-plugin-windicss'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'

export function createVitePlugins(viteEnv: Config.ViteEnv, isBuild: boolean) {
    const {
        VITE_LINT_ON_SAVE,
        VITE_LEGACY,
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    } = viteEnv
    const vitePlugins: (PluginOption | PluginOption[])[] = [
        vue(),
        vitePluginEslintOnSave(VITE_LINT_ON_SAVE, isBuild),
    ]
    VITE_LEGACY && isBuild && vitePlugins.push(legacy())
    vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))
    vitePlugins.push(PurgeIcons())
    vitePlugins.push(windiCSS())
    if (isBuild) {
        vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
    }
    return vitePlugins
}
