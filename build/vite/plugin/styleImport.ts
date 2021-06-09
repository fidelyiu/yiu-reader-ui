/**
 * 按需引入组件库样式。
 * https://github.com/anncwb/vite-plugin-style-import
 */
import styleImport from 'vite-plugin-style-import'

export function configStyleImportPlugin(isBuild: boolean) {
    if (!isBuild) return []
    return styleImport({
        libs: [
            {
                libraryName: 'ant-design-vue',
                esModule: true,
                resolveStyle: (name) => {
                    return `ant-design-vue/es/${name}/style/index`
                },
            },
        ],
    })
}
