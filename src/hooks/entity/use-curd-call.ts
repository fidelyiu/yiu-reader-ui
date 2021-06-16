/**
 * 这是 Yiu 之前在项目中封装的 mixins，目前还没想好怎么在 vue3 中使用
 */
import { propTypes } from '/@/utils/propTypes'
import { MethodEnum, YiuAip } from 'yiu-axios/type'
import { toBoolWithFalseLog } from 'yiu-js/script'
import { reactive, ref } from 'vue'
import { yiuHttp } from '/@/utils/http'
import { isFunction } from 'lodash'
import { Ref, UnwrapNestedRefs } from '@vue/reactivity'

export type FormType = 'add' | 'edit' | 'view'
export const FormTypeList: Array<FormType> = ['add', 'edit', 'view']

export function useCurdCallType() {
    return propTypes.oneOf<Array<FormType>>(FormTypeList).def('add')
}

export function useCRUDCall<I = any>(entityBaseUrl: any, formItem: UnwrapNestedRefs<any>, loading: Ref<boolean>, emit: any) {
    const formRef = ref<any>(null)
    const showFormItem = ref(false)
    const entityId = ref<I>()
    toBoolWithFalseLog(entityBaseUrl, 'useCRUDCall：请定义并传入\'entityBaseUrl\'')
    const addApi = reactive<YiuAip>({
        url: '',
        method: MethodEnum.POST,
    })
    const editApi = reactive<YiuAip>({
        url: '',
        method: MethodEnum.PUT,
    })
    const viewApi = reactive<YiuAip>({
        url: '',
        method: MethodEnum.GET,
    })

    // initApiByField(addApi, entityBaseUrl, 'add')
    // initApiByField(editApi, entityBaseUrl, 'edit')
    // initApiByField(viewApi, entityBaseUrl, 'view')
    const checkFormAndSendAddHttp = (beforeSubmitAdd: any,
                                     addSuccessCallback: any,
                                     addErrorCallback: any,
                                     afterSubmitAdd: any) => {
        if (!toBoolWithFalseLog(formRef.value, 'useCRUDCall：Form组件的\'formRef\'未指定!')) return
        if (!toBoolWithFalseLog(isFunction(formRef?.value?.validate), 'useCRUDCall：formRef无\'validate\'方法，请检查是否正确配置!')) return
        formRef.value.validateFields((errors) => {
            if (!errors) {
                if (isFunction(beforeSubmitAdd)) {
                    beforeSubmitAdd()
                }
                if (showFormItem.value) {
                    console.log('确保formItem内容完整后,覆写showFormItem变量为false,之后发送请求')
                    console.log('formItem内容如下:')
                    console.log(formItem)
                    emit('addError', 'formError')
                    return
                }
                yiuHttp({
                    api: addApi,
                    data: formItem,
                    loading: { flag: loading },
                    tips: {
                        error: {
                            show: false,
                        },
                    },
                    success: (res) => {
                        if (isFunction(addSuccessCallback)) {
                            addSuccessCallback(res)
                        }
                    },
                    error: (e) => {
                        if (isFunction(addErrorCallback)) {
                            addErrorCallback(e)
                        }
                    },
                    finally: () => {
                        if (isFunction(afterSubmitAdd)) {
                            afterSubmitAdd()
                        }
                    },
                })
            } else {
                emit('addError', 'formError')
            }
        })
    }
    const submitAdd = () => {
        checkFormAndSendAddHttp(
            () => {
                // beforeSubmitBase()
                // beforeSubmitAdd()
            },
            (res) => {
                emit('addSuccess', res)
                // afterSubmitRestFrom(res)
                // addSuccessCallback(res)
            },
            (_e) => {
                emit('addError', 'httpError')
                // addErrorCallback(e)
            },
            // afterSubmitAdd,
            null,
        )
    }
    // const beforeSubmitBase = () => {}
    // const afterSubmitRestFrom = (_res: any) => {}
    //
    // const beforeSubmitAdd = () => {}
    // const addSuccessCallback = (_res: any) => {}
    // const addErrorCallback = (_err: any) => {}
    // const afterSubmitAdd = () => {}

    const setFormItem = (_res: any) => {
        console.error('useCRUDCall：请重写\'setFormItem\'方法')
    }
    const loadData = (id: I) => {
        entityId.value = id
        yiuHttp({
            api: viewApi,
            pathData: { id: id as unknown as string },
            loading: { flag: loading },
            success: (res) => {
                setFormItem(res)
            },
        })
    }

    const checkFormAndSendEditHttp = (beforeSubmitEdit: any,
                                      editSuccessCallback: any,
                                      editErrorCallback: any,
                                      afterSubmitEdit: any) => {
        if (!toBoolWithFalseLog(formRef.value, 'useCRUDCall：Form组件的\'formRef\'未指定!')) return
        if (!toBoolWithFalseLog(isFunction(formRef?.value?.validate), 'useCRUDCall：formRef无\'validate\'方法，请检查是否正确配置!')) return
        formRef.value.validateFields((errors) => {
            if (!errors) {
                if (isFunction(beforeSubmitEdit)) {
                    beforeSubmitEdit()
                }
                if (showFormItem.value) {
                    console.log('确保formItem内容完整后,覆写showFormItem变量为false,之后发送请求')
                    console.log('formItem内容如下:')
                    console.log(formItem)
                    emit('editError', 'formError')
                    return
                }
                yiuHttp({
                    api: editApi,
                    data: formItem,
                    loading: { flag: loading },
                    tips: {
                        error: {
                            show: false,
                        },
                    },
                    success: (res) => {
                        if (isFunction(editSuccessCallback)) {
                            editSuccessCallback(res)
                        }
                    },
                    error: (e) => {
                        if (isFunction(editErrorCallback)) {
                            editErrorCallback(e)
                        }
                    },
                    finally: () => {
                        if (isFunction(afterSubmitEdit)) {
                            afterSubmitEdit()
                        }
                    },
                })
            } else {
                emit('editError', 'formError')
            }
        })
    }


    // const beforeSubmitEdit = () => {}
    // const editSuccessCallback = (_res: any) => {}
    // const editErrorCallback = (_err: any) => {}
    // const afterSubmitEdit = () => {}

    const submitEdit = () => {
        checkFormAndSendEditHttp(
            () => {
                // beforeSubmitBase()
                // beforeSubmitEdit()
            },
            (res) => {
                emit('editSuccess', res)
                // afterSubmitRestFrom(res)
                // editSuccessCallback(res)
            },
            (_e) => {
                emit('editError', 'httpError')
                // editErrorCallback(e)
            },
            // afterSubmitEdit,
            null,
        )
    }
    return {
        formRef,
        showFormItem,
        entityId,
        addApi,
        editApi,
        viewApi,
        checkFormAndSendAddHttp,
        submitAdd,
        // beforeSubmitBase,
        // afterSubmitRestFrom,
        // beforeSubmitAdd,
        // addSuccessCallback,
        // addErrorCallback,
        // afterSubmitAdd,
        setFormItem,
        loadData,
        checkFormAndSendEditHttp,
        // beforeSubmitEdit,
        // editSuccessCallback,
        // editErrorCallback,
        // afterSubmitEdit,
        submitEdit,
    }
}
