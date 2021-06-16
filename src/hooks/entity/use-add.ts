import { Ref, ref } from 'vue'
import { isFunction } from 'lodash'

export function useAddRef() {
    return ref<any>(null)
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
        if (!addLoading.value && isFunction(addFormRef.value.submitAdd)) {
            addFormRef.value.submitAdd()
        } else {
            console.error('无效的\'addFormRef\'')
        }
    }
}

export function useOnAddStart(addLoading: Ref<boolean>) {
    return () => {
        addLoading.value = true
    }
}

export function useOnAddCancel(addModal: Ref<boolean>) {
    return () => {
        addModal.value = false
    }
}

export function useOnAddSuccess(addModal: Ref<boolean>, addLoading: Ref<boolean>, searchFunc?: any) {
    return () => {
        addModal.value = false
        addLoading.value = false
        if (isFunction(searchFunc)) {
            searchFunc()
        }
    }
}

export function useOnAddError(addLoading: Ref<boolean>) {
    return (_errorType: string) => {
        addLoading.value = false
    }
}

