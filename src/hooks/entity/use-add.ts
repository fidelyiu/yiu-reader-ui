import { Ref, ref } from 'vue'
import { isFunction } from 'lodash'

export function useAddRef() {
    return ref<any>()
}

export function useAddModal() {
    return ref(false)
}

export function useAddLoading() {
    return ref(false)
}

export function useOnAdd(addModal: Ref<boolean>) {
    return () => {
        addModal.value = true
    }
}

export function useOnAddOk(addFormRef: Ref, addLoading: Ref<boolean>) {
    return () => {
        if (!addLoading.value) {
            // 不在加载中情况下
            if (!addFormRef.value) {
                console.error('无有效的\'addFormRef\'')
                return
            }
            if (!isFunction(addFormRef.value.submitAdd)) {
                console.error('\'addFormRef\'中无有效的\'submitAdd\'方法')
                return
            }
            addFormRef.value.submitAdd()
        }
    }
}

export function useOnAddStart(addLoading: Ref<boolean>) {
    return () => {
        addLoading.value = true
    }
}

export function useOnAddCancel(addModal: Ref<boolean>, addLoading: Ref<boolean>) {
    return () => {
        addLoading.value = false
        addModal.value = false
    }
}

export function useOnAddSuccess(onAddCancel: any, searchFunc?: any) {
    return () => {
        if (isFunction(onAddCancel)) {
            onAddCancel()
        }
        if (isFunction(searchFunc)) {
            searchFunc()
        }
    }
}

export function useOnAddError(addLoading: Ref<boolean>) {
    return () => {
        addLoading.value = false
    }
}

