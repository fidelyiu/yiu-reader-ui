<template>
  <NForm ref="formRef"
         label-placement="left"
         :rules="rules"
         :model="model"
         label-align="right"
         :label-width="60">
    <NFormItem label="名称" path="name">
      <NInput v-model:value="model.name" placeholder="请输入">
      </NInput>
    </NFormItem>
    <NFormItem label="路径" path="path">
      <NInput v-model:value="model.path" placeholder="请输入">
      </NInput>
    </NFormItem>
  </NForm>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { NForm, NFormItem, NInput } from 'naive-ui'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'

  export default defineComponent({
    name: 'WorkspaceForm',
    components: {
      NForm,
      NFormItem,
      NInput,
    },
    setup() {
      const model = reactive({
        name: null,
        path: null,
      })
      const formRef = ref(null)
      const submitAdd = () => {
        formRef.value.validate((errors) => {
          if (!errors) {
            yiuHttp({
              api: SERVER_API.workspaceApi.add,
              data: model,
              success: (res) => {
                console.log(res)
              },
              error: (err) => {
                console.log(err)
              },
            })
          }
        })
      }
      return {
        formRef,
        rules: {
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
        },
        model,
        submitAdd,
      }
    },
  })
</script>

<style scoped>

</style>
