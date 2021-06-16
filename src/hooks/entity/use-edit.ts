import { nextTick, Ref, ref } from 'vue'
import { isFunction } from 'lodash'

export function useEditRef() {
    return ref<any>()
}

export function useEditModal() {
    return ref(false)
}

export function useEditDisableRef() {
    return ref(false)
}

export function useEditLoading() {
    return ref(false)
}

export function useOnEdit<ID = any>(editModal: Ref<boolean>, editFormRef: Ref) {
    return async (id: ID) => {
        editModal.value = true
        await nextTick(() => {
            if (!editFormRef.value) {
                console.error('无有效的\'editFormRef\'')
                return
            }
            if (!isFunction(editFormRef.value.loadData)) {
                console.error('\'editFormRef\'中无有效的\'loadData\'方法')
                return
            }
            editFormRef.value.loadData(id)
        })
    }
}

export function useOnEditLoadingStart(editLoading: Ref<boolean>) {
    return () => {
        editLoading.value = true
    }
}

export function useOnEditLoadingSuccess(editLoading: Ref<boolean>) {
    return () => {
        editLoading.value = false
    }
}

export function useOnEditLoadingError(editLoading: Ref<boolean>, editDisable: Ref<boolean>) {
    return () => {
        editLoading.value = false
        editDisable.value = true
    }
}

export function useOnEditOk(editFormRef: Ref, editLoading: Ref<boolean>) {
    return () => {
        if (!editLoading.value) {
            if (!editFormRef.value) {
                console.error('无有效的\'editFormRef\'')
                return
            }
            if (!isFunction(editFormRef.value.submitEdit)) {
                console.error('\'editFormRef\'中无有效的\'submitEdit\'方法')
                return
            }
            editFormRef.value.submitEdit()
        }
    }
}

export function useOnEditCancel(editModal: Ref<boolean>, editLoading: Ref<boolean>, editDisable: Ref<boolean>) {
    return () => {
        editLoading.value = false
        editModal.value = false
        editDisable.value = false
    }
}

export function useOnEditStart(editLoading: Ref<boolean>) {
    return () => {
        editLoading.value = true
    }
}

export function useOnEditSuccess(onAddCancel: any, searchFunc?: any) {
    return () => {
        if (isFunction(onAddCancel)) {
            onAddCancel()
        }
        if (isFunction(searchFunc)) {
            searchFunc()
        }
    }
}

export function useOnEditError(editLoading: Ref<boolean>) {
    return () => {
        editLoading.value = false
    }
}
