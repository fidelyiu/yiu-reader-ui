import { defineStore } from 'pinia'

export const useWidgetStore = defineStore({
    id: 'widget',
    state() {
        return {
            selectWidgetId: '',
        }
    },
    getters: {
        getSelectWidgetId(state) {
            return state.selectWidgetId
        },
    },
    actions: {
        setSelectWidgetId(id: string) {
            this.selectWidgetId = id
        },
    },
})
