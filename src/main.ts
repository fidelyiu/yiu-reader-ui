import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'

if (import.meta.env.DEV) {
    import('ant-design-vue/dist/antd.less')
}
createApp(App).mount('#app')
