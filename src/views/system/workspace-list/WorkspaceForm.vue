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
  import { defineComponent, ref } from 'vue'
  import { NForm, NFormItem, NInput } from 'naive-ui'

  export default defineComponent({
    name: 'WorkspaceForm',
    components: {
      NForm,
      NFormItem,
      NInput,
    },
    setup() {
      const formRef = ref(null)
      const onSend = (e) => {
        e.preventDefault()
        formRef.value.validate((errors) => {
          if (!errors) {
            console.log(errors)
          } else {
            console.log(errors)
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
        model: ref({
          name: null,
          path: null,
        }),
        onSend,
      }
    },
  })
</script>

<style scoped>

</style>
