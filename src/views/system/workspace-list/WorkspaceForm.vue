<template>
  <NForm ref="formRef"
         label-placement="left"
         :rules="rules"
         :model="model"
         label-align="right"
         :label-width="60">
    <NFormItem style="--feedback-text-color-error: rgba(248, 113, 113, 1)"
               label="名称"
               path="name">
      <input v-model="model.name"
             class="px-3 w-full h-[34px] yiu-input"
             :class="{'yiu-input-error': formError.name}"
             placeholder="请输入"
             type="text">
    </NFormItem>
    <NFormItem label="路径" path="path">
      <input v-model="model.path"
             class="px-3 w-full h-[34px] yiu-input"
             placeholder="请输入"
             type="text">
    </NFormItem>
    <NButton @click="onSend">验证</NButton>
  </NForm>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { NForm, NFormItem, NButton } from 'naive-ui'

  export default defineComponent({
    name: 'WorkspaceForm',
    components: {
      NForm,
      NFormItem,
      NButton,
    },
    setup() {
      const formRef = ref(null)
      const workspaceName = ref('')
      const workspacePath = ref('')
      const formInitialErrorState = {
        name: false,
      }
      let formError = reactive({ ...formInitialErrorState })
      const initFormError = () => {
        Object.assign(formError, formInitialErrorState)
      }
      const onSend = (e) => {
        e.preventDefault()
        formRef.value.validate((errors) => {
          if (!errors) {
            initFormError()
          } else {
            errors.forEach(item => {
              if (item[0] && item[0].field === 'name') {
                formError.name = ref(true)
              }
            })
          }
        })
      }
      return {
        formRef,
        workspaceName,
        workspacePath,
        rules: {
          name: {
            required: true,
            trigger: ['blur', 'input'],
            message: '请输入名称',
          },
        },
        formError,
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
