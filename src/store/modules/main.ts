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
                name: '',
                status: ObjStatus.NoValue,
                path: '',
            },
            currentPath: '',
            // 是否初始化以下值
            initBool: false,
            mainBoxShowText: false,
            mainBoxShowIcon: false,
            mainBoxShowNum: false,
            sidebarStatus: false,
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
        getMainBoxShowText(state) {return state.mainBoxShowText},
        getMainBoxShowIcon(state) {return state.mainBoxShowIcon},
        getMainBoxShowNum(state) {return state.mainBoxShowNum},
        getSidebarStatus(state) {return state.sidebarStatus},
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
        async initBoolValue() {
            if (this.initBool) return
            try {
                const result = await Promise.all(
                    [
                        yiuHttpWithPromise({
                            api: SERVER_API.mainApi.getMainBoxShowText,
                        }),
                        yiuHttpWithPromise({
                            api: SERVER_API.mainApi.getMainBoxShowIcon,
                        }),
                        yiuHttpWithPromise({
                            api: SERVER_API.mainApi.getMainBoxShowNum,
                        }),
                        yiuHttpWithPromise({
                            api: SERVER_API.mainApi.getSidebarStatus,
                        }),
                    ],
                )
                if (result && result.length) {
                    this.mainBoxShowText = result[0].data.result
                    this.mainBoxShowIcon = result[1].data.result
                    this.mainBoxShowNum = result[2].data.result
                    this.sidebarStatus = result[3].data.result
                }
                this.initBool = true
            } catch (e) {
            }
        },
        async setMainBoxShowText(showText: boolean) {
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setMainBoxShowText,
                    data: { showText },
                })
                this.mainBoxShowText = showText
            } catch (e) {
            }
        },
        async setMainBoxShowIcon(showIcon: boolean) {
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setMainBoxShowIcon,
                    data: { showIcon },
                })
                this.mainBoxShowIcon = showIcon
            } catch (e) {
            }
        },
        async setMainBoxShowNum(showNum: boolean) {
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setMainBoxShowNum,
                    data: { showNum },
                })
                this.mainBoxShowNum = showNum
            } catch (e) {
            }
        },
        async setSidebarStatus(sidebarStatus: boolean) {
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setSidebarStatus,
                    data: { sidebarStatus },
                })
                this.sidebarStatus = sidebarStatus
            } catch (e) {
            }
        },
    },
})
