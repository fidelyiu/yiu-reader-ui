import { RouteRecordRaw } from 'vue-router'

// https://next.router.vuejs.org/zh/
export const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/dashboard' },
    {
        path: '/dashboard',
        component: () => import('/@/views/dashboard/Dashboard.vue'),
    },
    {
        path: '/system',
        component: () => import('/@/views/system/System.vue'),
    },
    {
        path: '/note/:id',
        component: () => import('/@/views/note/NotePage.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('/@/views/not-found/NotFound.vue'),
    },
]
