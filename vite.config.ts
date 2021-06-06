import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginEslintOnSave from './build/vite/plugin/vite-plugin-eslint-on-save'
import { resolve } from 'path'

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/',
            },
            {
                find: /\/#\//,
                replacement: pathResolve('types') + '/',
            },
        ],
    },
    plugins: [
        vue(),
        vitePluginEslintOnSave(),
    ],
})
