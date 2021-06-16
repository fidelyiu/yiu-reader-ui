/**
 * 这是 Yiu 之前在项目中封装的 mixins，目前还没想好怎么在 vue3 中使用
 */
import { MethodEnum, YiuAip } from 'yiu-axios/type'
import { reactive, ref } from 'vue'
import { toBoolWithFalseLog } from 'yiu-js/script'
import { isFunction } from 'lodash'
import { yiuHttp } from '/@/utils/http'
import { useDialog } from 'naive-ui'

const dialog = useDialog()

export function useCURD<I = any>(entityBaseUrl: any) {
    toBoolWithFalseLog(entityBaseUrl, 'useCURD：请定义并传入\'entityBaseUrl\'')
    const viewHooks = useView()
    const saveHooks = useSave()
    const editHooks = useEdit<I>()
    const deleteHooks = useDelete<I>(entityBaseUrl)
    return {
        viewHooks,
        saveHooks,
        editHooks,
        deleteHooks,
    }
}

export function useView() {
    const viewRef = ref<any>(null)
    const viewModal = ref(false)
    const onView = (id) => {
        viewModal.value = true
        // nextTick(() => {
        if (!toBoolWithFalseLog(viewRef.value, 'useView：List组件的\'viewRef\'未指定!')) return
        if (!toBoolWithFalseLog(isFunction(viewRef?.value?.loadData), 'useView：Form子组件内部未定义\'loadData\'方法!')) return
        viewRef.value.loadData(id)
        // })
    }
    return {
        viewRef,
        viewModal,
        onView,
    }
}

export function useSave(search?: any) {
    const addRef = ref<any>(null)
    const addModal = ref(false)
    const addLoading = ref(false)
    // ↓点击添加按钮
    const onAdd = () => {
        addModal.value = true
    }
    // ↓点击保存按钮
    const onAddOk = () => {
        if (!toBoolWithFalseLog(addRef.value, 'useSave：List组件的\'addRef\'未指定!')) return
        if (!toBoolWithFalseLog(isFunction(addRef?.value?.submitAdd), 'useSave：Form子组件内部未定义\'submitAdd\'方法!')) return
        addRef.value.submitAdd()
        addLoading.value = true
    }
    // ↓点击添加取消按钮
    const onAddCancel = () => {
        addModal.value = false
    }
    // ↓添加成功后重置表单
    const onAddOkWithReset = () => {
        if (!toBoolWithFalseLog(addRef.value, 'useSave：List组件的\'addRef\'未指定!')) return
        if (!toBoolWithFalseLog(isFunction(addRef?.value?.submitAddWithReset), 'useSave：Form子组件内部未定义\'submitAddWithReset\'方法!')) return
        addRef.value.submitAddWithReset()
        addLoading.value = true
    }
    // ↓添加成功后保留表单
    const onAddOkWithCopy = () => {
        if (!toBoolWithFalseLog(addRef.value, 'useSave：List组件的\'addRef\'未指定!')) return
        if (!toBoolWithFalseLog(isFunction(addRef?.value?.submitAddWithCopy), 'useSave：Form子组件内部未定义\'submitAddWithCopy\'方法!')) return
        addRef.value.submitAddWithCopy()
        addLoading.value = true
    }
    const onAddSuccess = () => {
        addModal.value = false
        addLoading.value = false
        if (isFunction(search)) {
            search()
        }
    }
    const onAddSuccessWithReset = () => {
        addLoading.value = false
        if (isFunction(search)) {
            search()
        }
    }
    const onAddSuccessWithCopy = () => {
        addLoading.value = false
        if (isFunction(search)) {
            search()
        }
    }
    const onAddError = () => {
        // errorType: string
        // if (errorType === 'formError') {
        //     // 表单验证失败
        // } else if (errorType === 'httpError') {
        //     // 网络请求失败
        //     // this.$nextTick(() => {
        //     //   this.addModal = false
        //     // })
        // }
        // $nextTick(() => {
        addLoading.value = false
        // })
    }
    return {
        addRef,
        addModal,
        addLoading,
        onAdd,
        onAddOk,
        onAddCancel,
        onAddOkWithReset,
        onAddOkWithCopy,
        onAddSuccess,
        onAddSuccessWithReset,
        onAddSuccessWithCopy,
        onAddError,
    }
}

export function useEdit<I = any>() {
    const editRef = ref<any>(null)
    const editModal = ref(false)
    const editLoading = ref(false)
    const onEdit = (id: I) => {
        editModal.value = true
        // this.$nextTick(() => {
        if (!toBoolWithFalseLog(editRef.value, 'useEdit：List组件的\'editRef\'未指定!')) return
        if (!toBoolWithFalseLog(isFunction(editRef?.value?.loadData), 'useEdit：Form子组件内部未定义\'loadData\'方法!')) return
        editRef.value.loadData(id)
        // })
    }
    return {
        editRef,
        editModal,
        editLoading,
        onEdit,
    }
}

export function useDelete<I = any>(entityBaseUrl: any, search?: any) {
    toBoolWithFalseLog(entityBaseUrl, 'useDelete：请定义并传入\'entityBaseUrl\'')
    const deleteApi = reactive<YiuAip>({
        url: '',
        method: MethodEnum.DELETE,
    })
    const deleteMoreApi = reactive<YiuAip>({
        url: '',
        method: MethodEnum.DELETE,
    })
    // initApiByField(deleteApi, entityBaseUrl, 'delete')
    // initApiByField(deleteMoreApi, entityBaseUrl, 'deleteMore')

    // const beforeDelete = () => {}
    // const afterDelete = (_res: any) => {}
    // const afterDeleteSuccess = (_res: any) => {}
    // const afterDeleteError = () => {}

    const onDeleteConfirm = (id: I) => {
        // beforeDelete()
        yiuHttp({
            api: deleteMoreApi,
            pathData: { id: id as unknown as string },
            success: (_res) => {
                // afterDelete(res)
                if (isFunction(search)) {
                    search()
                }
            },
            error: (_e) => {
                // afterDeleteSuccess(e)
            },
            finally: () => {
                // afterDeleteError()
            },
        })
    }
    const onDelete = (id, confirmString) => {
        dialog.error({
            title: '确认删除操作?',
            content: confirmString || '此数据将会被删除',
            positiveText: '删除',
            negativeText: '取消',
            onPositiveClick: () => {
                onDeleteConfirm(id)
            },
        })
    }

    return {
        deleteApi,
        deleteMoreApi,
        // beforeDelete,
        // afterDelete,
        // afterDeleteSuccess,
        // afterDeleteError,
        onDeleteConfirm,
        onDelete,
    }
}
