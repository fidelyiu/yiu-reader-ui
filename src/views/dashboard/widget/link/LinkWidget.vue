<template>
  <div class="relative w-full h-full overflow-hidden">
    <!--右上角按钮组-->
    <div class="absolute top-2 right-2">
      <button v-if="showSetting"
              class="yiu-blue-square-btn-5"
              @click="onEdit(layout.id)">
        <span class="iconify block" data-icon="mdi:cog" data-inline="false"></span>
      </button>
    </div>
    <!--内容部分-->
    <div class="p-3 overflow-hidden flex w-full h-full">
      <!--头像部分-->
      <div class="flex-none fa-center mr-3">
        <a :href="layoutUrl" target="_blank">
          <div class="layout-avatar fa-center relative">
            {{ layoutNameAbridge }}
            <div class="absolute bottom-[-4px] right-[-2px] text-sm">
              <span class="iconify text-blue-500 transform rotate-90" data-icon="mdi:link-variant" data-inline="false"></span>
            </div>
          </div>
        </a>
      </div>
      <!--文字部分-->
      <div class="flex-grow w-0 fa-center">
        <div class="w-full">
          <!--标题部分-->
          <div class="layout-link text-base font-semibold">
            <a :href="layoutUrl" target="_blank">{{ layout?.setting?.name || '-' }}</a>
          </div>
          <!--链接部分-->
          <div class="layout-link underline text-gray-500">
            <a :href="layoutUrl" target="_blank">{{ layoutUrl }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <n-modal v-model:show="editModal"
           :mask-closable="false">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">修改链接</div>
      <button class="yiu-modal-close-btn-1" transparent @click="onEditCancel">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="text-base mt-6">
        <LinkForm ref="editRef"
                  type="edit"
                  @editLoadingStart="onEditLoadingStart"
                  @editLoadingSuccess="onEditLoadingSuccess"
                  @editLoadingError="onEditLoadingError"
                  @editStart="onEditStart"
                  @editSuccess="onEditSuccess"
                  @editError="onEditError"></LinkForm>
        <div class="flex justify-end">
          <n-button class="focus:outline-none mr-4" @click="onEditCancel">取消</n-button>
          <n-button class="focus:outline-none"
                    type="primary"
                    :loading="editLoading"
                    :disabled="editDisable"
                    @click="onEditOk">
            确定
          </n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { NButton, NCard, NModal } from 'naive-ui'
  import LinkForm from '/@/views/dashboard/widget/link/LinkForm.vue'
  import {
    useEditDisableRef,
    useEditLoading,
    useEditModal,
    useEditRef,
    useOnEdit, useOnEditCancel, useOnEditError, useOnEditLoadingError,
    useOnEditLoadingStart, useOnEditLoadingSuccess, useOnEditOk, useOnEditStart, useOnEditSuccess,
  } from '/@/hooks/entity/use-edit'

  export default defineComponent({
    name: 'LinkWidget',
    components: {
      NCard,
      NModal,
      NButton,
      LinkForm,
    },
    props: {
      layout: propTypes.object.isRequired,
    },
    emits: ['update'],
    setup(prop, { emit }) {
      const showSetting: any = inject('showSetting')
      const layoutNameAbridge = computed(() => {
        let name = prop.layout?.setting?.name || ''
        if (!name) {
          return '?'
        }
        return name.slice(0, 1)

      })
      const layoutUrl = computed(() => {
        return prop.layout?.setting?.url || ''
      })
      const editRef = useEditRef()
      const editModal = useEditModal()
      const editLoading = useEditLoading()
      const editDisable = useEditDisableRef()
      const onEdit = useOnEdit(editModal, editRef)
      const onEditLoadingStart = useOnEditLoadingStart(editLoading)
      const onEditLoadingSuccess = useOnEditLoadingSuccess(editLoading)
      const onEditLoadingError = useOnEditLoadingError(editLoading, editDisable)
      const onEditOk = useOnEditOk(editRef, editLoading)
      const onEditCancel = useOnEditCancel(editModal, editLoading, editDisable)
      const onEditStart = useOnEditStart(editLoading)
      const onEditSuccess = useOnEditSuccess(onEditCancel, () => {emit('update')})
      const onEditError = useOnEditError(editLoading)
      return {
        showSetting,
        layoutNameAbridge,
        layoutUrl,
        editRef,
        editModal,
        editLoading,
        editDisable,
        onEdit,
        onEditLoadingStart,
        onEditLoadingSuccess,
        onEditLoadingError,
        onEditOk,
        onEditCancel,
        onEditStart,
        onEditSuccess,
        onEditError,
      }
    },
  })
</script>

<style scoped>
  .layout-avatar {
    @apply w-[42px] h-[42px] rounded-3xl bg-blue-100 border-1 border-blue-300 text-center text-2xl;
  }

  .layout-link {
    @apply truncate hover:text-blue-700;
  }

  .layout-link:hover {
    color: #096dd9;
  }
</style>
