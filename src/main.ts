import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { isReady, setupRouter } from '/@/router'

if (import.meta.env.DEV) {
    import('ant-design-vue/dist/antd.less')
}

async function bootstrap() {
    const app = createApp(App)
    setupRouter(app)
    await isReady()
    app.mount('#app')
}

void bootstrap()
