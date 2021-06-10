import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '/@/router/routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, _from, next) => {
    if (to.path !== '/workspace/select') {
        setTimeout(() => {
            if (Math.round(Math.random()) === 1) {
                next()
            } else {
                next('/workspace/select')
            }
        }, 1000)
    } else {
        next()
    }
})

export function setupRouter(app: App<Element>) {
    app.use(router)
}

export function isReady() {
    return router.isReady()
}
