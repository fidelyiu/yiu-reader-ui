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
            changingWorkspace: false,
            currentPath: '',
            // 是否初始化以下值
            initBool: false,
            mainBoxShowText: false,
            mainBoxShowIcon: false,
            mainBoxShowNum: false,
            sidebarStatus: false,
            /**
             * @type {EditSoftEntity}
             */
            currentEditSoft: {
                id: '',
                name: '',
                img: '',
                status: ObjStatus.NoValue,
                path: '',
            },
            currentEditSoftPath: '',
            initEditSoft: false,
            osPathSeparator: '\\',
            initOsPathSeparatorValue: false,

            // 笔记页面3个bool值
            initNotePageBool: false,
            showDocumentTxt: true,
            showDirTxt: true,
            showMainPointTxt: true,
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
        setCurrentWorkspaceNull() {
            this.currentPath = ''
            this.currentWorkspace = {
                id: '',
                name: '',
                status: ObjStatus.NoValue,
                path: '',
            }
        },
        setCurrentEditSoftNull() {
            this.currentEditSoftPath = ''
            this.currentEditSoft = {
                id: '',
                name: '',
                img: '',
                status: ObjStatus.NoValue,
                path: '',
            }
        },
        setCurrentWorkspace(workspace: WorkspaceEntity) {this.currentWorkspace = workspace as any},
        async refreshCurrentWorkspaceWithHttp() {
            try {
                const result = await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.getCurrentWorkspace,
                })
                if (result?.data?.result?.id) {
                    this.currentWorkspace = result.data.result
                    this.currentPath = result.data.result.path
                }
            } catch (e) {
            }
        },
        setCurrentPath(path: string) { this.currentPath = path },
        async setCurrentEditSoft(editSoftId: string) {
            try {
                const result = await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setCurrentEditSoft,
                    pathData: { id: editSoftId },
                })
                if (result?.data?.result?.id) {
                    this.currentEditSoft = result.data.result
                    this.currentEditSoftPath = result.data.result.path
                }
            } catch (e) {
            }
        },
        async initOsPathSeparator() {
            if (this.initOsPathSeparatorValue) return
            try {
                const result = await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.getOsPathSeparator,
                })
                if (result?.data?.result?.id) {
                    this.osPathSeparator = result.data.result
                    this.initOsPathSeparatorValue = true
                }
            } catch (e) {
            }
        },
        async initCurrentEditSoft() {
            if (this.initEditSoft) return
            try {
                const result = await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.getCurrentEditSoft,
                })
                if (result?.data?.result?.id) {
                    this.currentEditSoft = result.data.result
                    this.currentEditSoftPath = result.data.result.path
                    this.initEditSoft = true
                }
            } catch (e) {
            }
        },
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
        async initNotePageBoolValue() {
            if (this.initNotePageBool) return
            try {
                const result = await Promise.all(
                    [
                        yiuHttpWithPromise({
                            api: SERVER_API.mainApi.getNoteTextDocument,
                        }),
                        yiuHttpWithPromise({
                            api: SERVER_API.mainApi.getNoteTextDir,
                        }),
                        yiuHttpWithPromise({
                            api: SERVER_API.mainApi.getNoteTextMainPoint,
                        }),
                    ],
                )
                if (result && result.length) {
                    this.showDocumentTxt = result[0].data.result
                    this.showDirTxt = result[1].data.result
                    this.showMainPointTxt = result[2].data.result
                }
                this.initNotePageBool = true
            } catch (e) {
            }
        },
        async setShowDocumentTxt(noteTextDocument: boolean) {
            this.showDocumentTxt = noteTextDocument
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setNoteTextDocument,
                    data: { noteTextDocument },
                })
            } catch (e) {
            }
        },
        async setShowDirTxt(noteTextDir: boolean) {
            this.showDirTxt = noteTextDir
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setNoteTextDir,
                    data: { noteTextDir },
                })
            } catch (e) {
            }
        },
        async setShowMainPointTxt(noteTextMainPoint: boolean) {
            this.showMainPointTxt = noteTextMainPoint
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setNoteTextMainPoint,
                    data: { noteTextMainPoint },
                })
            } catch (e) {
            }
        },
        async setMainBoxShowText(showText: boolean) {
            this.mainBoxShowText = showText
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setMainBoxShowText,
                    data: { showText },
                })
            } catch (e) {
            }
        },
        async setMainBoxShowIcon(showIcon: boolean) {
            this.mainBoxShowIcon = showIcon
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setMainBoxShowIcon,
                    data: { showIcon },
                })
            } catch (e) {
            }
        },
        async setMainBoxShowNum(showNum: boolean) {
            this.mainBoxShowNum = showNum
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setMainBoxShowNum,
                    data: { showNum },
                })
            } catch (e) {
            }
        },
        async setSidebarStatus(sidebarStatus: boolean) {
            this.sidebarStatus = sidebarStatus
            try {
                await yiuHttpWithPromise({
                    api: SERVER_API.mainApi.setSidebarStatus,
                    data: { sidebarStatus },
                })
            } catch (e) {
            }
        },
    },
})
