<template>
  <n-spin :show="spinShow">
    <n-form ref="formRef"
            label-placement="left"
            :rules="rules"
            :model="model"
            label-align="right"
            :label-width="60">
      <n-formItem label="名称" path="name">
        <n-input v-model:value="model.name" placeholder="请输入">
        </n-input>
      </n-formItem>
      <n-formItem label="路径" path="url">
        <n-input v-model:value="model.url" placeholder="请输入">
        </n-input>
      </n-formItem>
    </n-form>
  </n-spin>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { NForm, NFormItem, NInput, NSpin, useNotification } from 'naive-ui'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'

  export default defineComponent({
    name: 'LinkForm',
    components: {
      NForm,
      NFormItem,
      NInput,
      NSpin,
    },
    emits: [
      'editLoadingStart', 'editLoadingSuccess', 'editLoadingError',
      'editStart', 'editSuccess', 'editError',
    ],
    setup(_props, { emit }) {
      const entityId = ref()
      const notification = useNotification()
      const formRef = ref()
      // 表单加载
      const spinShow = ref(false)
      // 表单数据
      const model = reactive({
        name: '',
        url: '',
      })
      // 规则
      const rules = {
        name: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入名称',
        },
        url: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入链接地址',
        },
      }
      // 加载数据
      const loadData = (id: any) => {
        entityId.value = id
        emit('editLoadingStart')
        yiuHttp({
          api: SERVER_API.layoutApi.view,
          pathData: { id },
          loading: { flag: spinShow },
          tips: { anyObj: notification, error: { show: true } },
          success: (res) => {
            if (res?.data?.result) {
              Object.assign(model, res.data.result.setting)
              emit('editLoadingSuccess')
            } else {
              emit('editLoadingError')
            }
          },
          error: () => {
            emit('editLoadingError')
          },
        })
      }
      const submitEdit = () => {
        if (formRef.value!.validate) {
          formRef.value!.validate((errors) => {
            if (!errors) {
              emit('editStart')
              yiuHttp({
                api: SERVER_API.layoutApi.update,
                data: {
                  id: entityId.value,
                  setting: model,
                },
                loading: { flag: spinShow },
                tips: { anyObj: notification, error: { show: true } },
                success: (res) => {
                  emit('editSuccess', res)
                },
                error: () => {
                  emit('editError')
                },
              })
            }
          })
        }
      }
      return {
        formRef,
        spinShow,
        model,
        rules,
        loadData,
        submitEdit,
      }
    },
  })
</script>

<style scoped>

</style>
