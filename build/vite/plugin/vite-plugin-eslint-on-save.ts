import { execSync } from 'child_process'

export default function vitePluginEslintOnSave() {
    return {
        name: 'vite-plugin-eslint-on-save',
        handleHotUpdate({ file, server }) {
            if (file && typeof file === 'string' && file.indexOf(server.config.root + '/src') !== -1) {
                setTimeout(() => {
                    execSync('npx eslint ' + file, { stdio: [0, 1, 2] })
                })
            }
        },
    }
}
