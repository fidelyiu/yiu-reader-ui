import { createApp } from 'vue'
import App from './App.vue'

if (import.meta.hot) {
    // HMR 代码
    console.log(1)
}

setTimeout(()=> {
    createApp(App).mount('#app')
}, 3000)
