<template>
  <n-spin :show="spinShow">
    <template v-if="type!=='view'">
      <n-form ref="formRef"
              label-placement="left"
              :rules="rules"
              :model="model"
              label-align="right"
              :label-width="80">
        <n-formItem label="名称" path="name">
          <n-input v-model:value="model.name" :disabled="!editName && type==='edit'" placeholder="请输入">
            <template #suffix>
              <span v-show="!model.isDir">.md</span>
            </template>
          </n-input>
        </n-formItem>
        <n-formItem v-if="type==='edit'"
                    label="修改名称">
          <n-switch v-model:value="editName" class="mr-2"/>
          <n-popover trigger="hover" :style="{ maxWidth: '160px' }">
            <template #trigger>
              <div class="fa-center">
                <span class="iconify text-lg" data-icon="mdi:help-circle-outline" data-inline="false"></span>
              </div>
            </template>
            <div class="break-all">
              修改名称将修改硬盘上的文件名。
            </div>
          </n-popover>
        </n-formItem>
        <n-formItem label="别名" path="alias">
          <n-input v-model:value="model.alias" placeholder="请输入">
          </n-input>
        </n-formItem>
        <n-formItem label="文件类型" path="isDir">
          <n-radio-group v-model:value="model.isDirStr"
                         :disabled="type==='edit'"
                         name="isDir">
            <n-space>
              <n-radio value="false">文件</n-radio>
              <n-radio value="true">目录</n-radio>
            </n-space>
          </n-radio-group>
        </n-formItem>
        <n-formItem label="路径" path="path">
          <n-input v-model:value="model.path" disabled placeholder="请输入">
          </n-input>
        </n-formItem>
      </n-form>
    </template>
  </n-spin>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watch } from 'vue'
  import {
    NForm,
    NFormItem,
    NInput,
    NPopover,
    NRadio,
    NRadioGroup,
    NSpace,
    NSpin,
    NSwitch,
    useNotification,
  } from 'naive-ui'
  import { NoteEntity } from '/@/vo/note'
  import { useCurdCallType } from '/@/hooks/entity/use-curd-call'
  import { useMainStore } from '/@/store/modules/main'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { strGetDelEndStr } from 'yiu-js/str/str-get'

  export default defineComponent({
    name: 'NoteForm',
    components: {
      NForm,
      NFormItem,
      NInput,
      NSpin,
      NRadioGroup,
      NSpace,
      NRadio,
      NPopover,
      NSwitch,
    },
    props: { type: useCurdCallType() },
    emits: [
      'addStart', 'addSuccess', 'addError',
      'editLoadingStart', 'editLoadingSuccess', 'editLoadingError',
      'editStart', 'editSuccess', 'editError',
    ],
    setup(_props, { emit: emit }) {
      const mainStore = useMainStore()
      mainStore.initOsPathSeparator()
      const editName = ref(false)
      const entityId = ref()
      const parentEntity = ref<any>()
      const notification = useNotification()
      const formRef = ref()
      // 表单加载
      const spinShow = ref(false)
      // 表单数据
      const model = reactive<Partial<NoteEntity>>({})
      model.isDirStr = 'false'
      // 规则
      const rules = {
        name: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入名称',
        },
      }
      watch(() => model.name, (v) => {
        if (!v) {
          model.path = parentEntity.value?.absPath || mainStore.currentPath
        } else {
          model.path = (parentEntity.value?.absPath || mainStore.currentPath) + mainStore.osPathSeparator + v
          if (!model.isDir) {
            model.path += '.md'
          }
        }
      })
      watch(() => parentEntity.value, () => {
        model.path = parentEntity.value?.absPath || mainStore.currentPath
      })
      watch(() => model.isDirStr, () => {
        model.isDir = model.isDirStr === 'true'
        if (model.name) {
          model.path = (parentEntity.value?.absPath || mainStore.currentPath) + mainStore.osPathSeparator + model.name
          if (!model.isDir) {
            model.path += '.md'
          }
        }
      })

      // 发送添加方法
      const submitAdd = () => {
        if (parentEntity.value.id) {
          model.parentId = parentEntity.value.id
        }
        if (formRef.value!.validate) {
          formRef.value!.validate((errors) => {
            if (!errors) {
              emit('addStart')
              yiuHttp({
                api: SERVER_API.noteApi.add,
                data: model,
                loading: { flag: spinShow },
                tips: { anyObj: notification, error: { show: true } },
                success: (res) => {
                  emit('addSuccess', res)
                },
                error: () => {
                  emit('addError')
                },
              })
            }
          })
        }
      }

      // 加载数据
      const loadData = (id: any) => {
        entityId.value = id
        emit('editLoadingStart')
        yiuHttp({
          api: SERVER_API.noteApi.view,
          pathData: { id },
          loading: { flag: spinShow },
          tips: { anyObj: notification, error: { show: true } },
          success: (res) => {
            if (res?.data?.result) {
              Object.assign(model, res.data.result)
              if (res.data.result.isDir) {
                model.isDirStr = 'true'
              } else {
                model.isDirStr = 'false'
                if (model.name) {
                  model.name = strGetDelEndStr(model.name, '.md')
                }
              }
              if (model.parentId) {
                parentEntity.value.id.value = model.parentId
              }
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
        const tempModel = model
        if (!tempModel.isDir) {
          tempModel.name = tempModel.name + '.md'
        }
        if (formRef.value!.validate) {
          formRef.value!.validate((errors) => {
            if (!errors) {
              emit('editStart')
              yiuHttp({
                api: SERVER_API.noteApi.update,
                data: tempModel,
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
        parentEntity,
        formRef,
        spinShow,
        model,
        rules,
        submitAdd,
        loadData,
        submitEdit,
        editName,
      }
    },
  })
</script>

<style scoped>

</style>
