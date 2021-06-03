import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginEslintOnSave from './build/vite/plugin/vite-plugin-eslint-on-save'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vitePluginEslintOnSave(),
    ],
})
