import { createApp } from 'vue'
import { isReady, setupRouter } from '/@/router'
import { setupStore } from '/@/store'

import App from './App.vue'

import 'virtual:windi.css'
import 'virtual:windi-devtools'
import '@purge-icons/generated'
import '/@/design/index.less'
import '/@/prism'

async function bootstrap() {
    const app = createApp(App)
    setupStore(app)
    setupRouter(app)
    await isReady()
    app.mount('#app')
}

void bootstrap()
