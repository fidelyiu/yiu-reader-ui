import { execSync } from 'child_process'

export default function vitePluginEslintOnSave(lintOnSave: boolean, isBuild: boolean) {
    return {
        name: 'vite-plugin-eslint-on-save',
        handleHotUpdate({ file, server }) {
            if (isBuild || !lintOnSave) {
                return
            }
            if (file && typeof file === 'string' && file.indexOf(server.config.root + '/src') !== -1) {
                setTimeout(() => {
                    try {
                        // const url = `http://localhost:${server.config.server.port}${server.config.base}`
                        // console.log(`Local: ${url}`)
                        execSync('npx eslint ' + file, { stdio: [0, 1, 2] })
                    } catch (e) {
                    }
                })
            }
        },
    }
}
