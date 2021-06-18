import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '/@/router/routes'
import nProgress from 'nprogress'
import { useMainStore } from '/@/store/modules/main'
import { statusIsNotValid } from '/@/vo/enum/obj-status'

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, _from, next) => {
    const mainStore = useMainStore()
    nProgress.start()
    if (to.path !== '/system') {
        mainStore.refreshCurrentWorkspaceWithHttp().then()
        if (statusIsNotValid(mainStore.getCurrentWorkspace.status)) {
            next('/system')
        } else {
            next()
        }
        nProgress.done()
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

export default router
