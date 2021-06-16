<template>
  <n-spin :show="spinShow">
    <template v-if="type!=='view'">
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
        <n-formItem label="路径" path="path">
          <n-input v-model:value="model.path" placeholder="请输入">
          </n-input>
        </n-formItem>
      </n-form>
    </template>
    <template v-else>
      <n-form label-placement="left"
              label-align="right"
              :label-width="60">
        <n-formItem label="名称">
          {{ model.name || '-' }}
        </n-formItem>
        <n-formItem label="路径">
          {{ model.path || '-' }}
        </n-formItem>
      </n-form>
    </template>
  </n-spin>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { NForm, NFormItem, NInput, NSpin } from 'naive-ui'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { useCurdCallType } from '/@/hooks/entity/use-curd-call'
  import { useNotification } from 'naive-ui'

  export default defineComponent({
    name: 'WorkspaceForm',
    components: {
      NForm,
      NFormItem,
      NInput,
      NSpin,
    },
    props: { type: useCurdCallType() },
    emits: ['addSuccess', 'addError'],
    setup(_props, { emit }) {
      const notification = useNotification()
      const formRef = ref()
      // 表单加载
      const spinShow = ref(false)
      // 表单数据
      const model = reactive({
        name: null,
        path: null,
      })
      // 规则
      const rules = {
        name: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入名称',
        },
        path: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入路径',
        },
      }
      // 发送添加方法
      const submitAdd = () => {
        if (formRef.value!.validate) {
          formRef.value!.validate((errors) => {
            if (!errors) {
              yiuHttp({
                api: SERVER_API.workspaceApi.add,
                data: model,
                loading: { flag: spinShow },
                tips: { anyObj: notification, error: { show: true } },
                success: (res) => {
                  emit('addSuccess', res)
                },
                error: () => {
                  emit('addError', 'httpError')
                },
              })
            } else {
              emit('addError', 'formError')
            }
          })
        } else {
          emit('addError', 'formError')
        }
      }
      return {
        formRef,
        spinShow,
        model,
        rules,
        submitAdd,
      }
    },
  })
</script>

<style scoped>

</style>
