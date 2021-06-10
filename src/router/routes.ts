import { RouteRecordRaw } from 'vue-router'

// https://next.router.vuejs.org/zh/
export const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/dashboard' },
    {
        path: '/dashboard',
        component: () => import('/@/views/dashboard/Dashboard.vue'),
    },
    {
        path: '/workspace/select',
        component: () => import('/@/views/workspace-select/WorkspaceSelect.vue'),
    },
]
