import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { timeGetStr2 } from 'yiu-js/time/time-get'

export const useLogStore = defineStore({
    id: 'log',
    state(): {
        logList: Array<{
            id: string,
            level: 'info' | 'warning' | 'success' | 'error',
            message: string,
            time: string,
        }>
    } {
        return {
            logList: [{
                id: nanoid(),
                level: 'info',
                message: '初始化YiuReader',
                time: timeGetStr2(),
            }],
        }
    },
    getters: {
        getLastLog(state) {
            return state.logList[state.logList.length - 1]
        },
    },
    actions: {
        pushLog(id: string, level: 'info' | 'warning' | 'success' | 'error', message: string) {
            this.logList.push({
                id,
                level,
                message,
                time: timeGetStr2(),
            })
        },
        changeById(id: string, level: 'info' | 'warning' | 'success' | 'error', message: string) {
            let changeIndex = this.logList.findIndex(i => i.id === id)
            if (changeIndex != -1) {
                this.logList[changeIndex] = {
                    id,
                    level,
                    message,
                    time: timeGetStr2(),
                }
            }
        },
    },
})
