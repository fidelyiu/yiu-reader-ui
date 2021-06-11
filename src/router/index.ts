import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '/@/router/routes'
import { yiuHttp } from '/@/utils/http'
import SERVER_API from '/@/api'
import nProgress from 'nprogress'

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, _from, next) => {
    nProgress.start()
    if (to.path !== '/system') {
        yiuHttp({
            api: SERVER_API.mainApi.getCurrentWorkspace,
            success: () => {
                next()
            },
            error: () => {
                next('/system')
            },
            finally: () => {
                nProgress.done()
            },
        })
    } else {
        next()
        nProgress.done()
    }
})

export function setupRouter(app: App<Element>) {
    app.use(router)
}

export function isReady() {
    return router.isReady()
}
