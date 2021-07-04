import { defineStore } from 'pinia'
import { WorkspaceEntity } from '/@/vo/workspace'
import { yiuHttpWithPromise } from '/@/utils/http'
import SERVER_API from '/@/api'
import { ObjStatus } from '/@/vo/enum/obj-status'

export const useMainStore = defineStore({
    id: 'main',
    state() {
        return {
            /**
             * @type {WorkspaceEntity}
             */
            currentWorkspace: {
                id: '',
                status: ObjStatus.NoValue,
                path: '',
            },
            currentPath: '',
        }
    },
    getters: {
        getCurrentWorkspace(state) {return state.currentWorkspace},
        getCurrentPath(state) {
            if (state.currentPath) {
                return state.currentPath
            } else {
                return state.currentWorkspace.path || '-'
            }
        },
    },
    actions: {
        setCurrentWorkspace(workspace: WorkspaceEntity) {this.currentWorkspace = workspace as any},
        async refreshCurrentWorkspaceWithHttp() {
            try {
                const result = await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.getCurrentWorkspace,
                })
                this.$reset()
                if (result?.data?.result?.id) {
                    this.currentWorkspace = result.data.result
                }
            } catch (e) {
            }
        },
        setCurrentPath(path: string) { this.currentPath = path },
    },
})
