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
            },
        }
    },
    getters: {
        getCurrentWorkspace(state) {return state.currentWorkspace},
    },
    actions: {
        setCurrentWorkspace(workspace: WorkspaceEntity) {this.currentWorkspace = workspace},
        async refreshCurrentWorkspaceWithHttp() {
            try {
                const result = await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.getCurrentWorkspace,
                })
                if (result?.data?.result?.id) {
                    this.currentWorkspace = result.data.result
                } else {
                    this.currentWorkspace = {
                        id: '',
                        status: ObjStatus.NoValue,
                    }
                }
            } catch (e) {
            }
        },
        // async _setCurrentWorkspaceByIdWithHttp(id:string) {
        //     try {
        //         const result = await yiuHttpWithPromise({
        //             api: SERVER_API.mainApi.getCurrentWorkspace,
        //         })
        //         if (result?.data?.result?.id) {
        //             state.setCurrentWorkspace(result.data.result)
        //         } else {
        //             state.currentWorkspace = {}
        //         }
        //     } catch (e) {
        //     }
        //     return state.currentWorkspace
        // },
    },
})
