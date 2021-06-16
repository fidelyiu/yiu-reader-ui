<template>
  <div class="relative" :class="{'h-full': workspaceListLoading||!workspaceList.length}">
    <!--搜索框-->
    <div class="w-full flex px-4 pb-4 sticky top-0 bg-white">
      <div class="flex-grow mr-4">
        <div class="flex rounded-3xl border-1 border-blue-100 bg-blue-50 overflow-hidden transition-all ease-in-out"
             :class="{'!bg-white': searchActive}">
        <span class="iconify self-center ml-3 mr-2 text-lg text-gray-500"
              data-icon="mdi:magnify"
              data-inline="false"></span>
          <input v-model="workspaceKey"
                 class="w-full h-[30px] outline-none text-sm bg-blue-50 transition-all ease-in-out"
                 :class="{'!bg-white': searchActive}"
                 type="text"
                 @input="onWorkspaceKeyChange"
                 @focus="searchActive = true"
                 @blur="searchActive = false">
        </div>
      </div>
      <!--添加按钮-->
      <div class="flex-none">
        <SquareButton @click="onAdd">
          <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
        </SquareButton>
      </div>
    </div>
    <!--空数据栏-->
    <div v-if="!workspaceListLoading && !workspaceList.length"
         class="absolute inset-0 mt-[32px] grid place-items-center">
      <div class="flex items-center text-gray-500">
        <span class="iconify text-2xl" data-icon="mdi:inbox" data-inline="false"></span>
        <span class="leading-10 text-base">暂无数据</span>
      </div>
    </div>
    <!--加载栏-->
    <div v-if="workspaceListLoading" class="absolute inset-0 mt-[32px] grid justify-center content-center">
      <LoadingIcon class="text-2xl object-center"></LoadingIcon>
    </div>
    <!--列表-->
    <template v-else>
      <div v-for="item in workspaceList"
           :key="item.id"
           class="py-3 px-4 hover:bg-blue-50 flex">
        <template v-if="item.status === ObjStatus.Valid">
          <span class="iconify block flex-none text-4xl self-center mr-4 text-blue-400"
                data-icon="mdi:book"
                data-inline="false"></span>
        </template>
        <template v-else>
          <span class="iconify block flex-none text-4xl self-center mr-4 text-red-400"
                data-icon="mdi:book-remove"
                data-inline="false"></span>
        </template>
        <div class="flex-grow w-0 mr-4">
          <div class="w-full truncate text-gray-700 font-medium"
               :class="{'!text-red-400': item.status === ObjStatus.Invalid}">
            {{ item.name }}
          </div>
          <div class="w-full truncate text-gray-500 font-light"
               :class="{'!text-red-300': item.status === ObjStatus.Invalid}">
            {{ item.path }}
          </div>
        </div>
        <div class="flex-none flex">
          <div v-if="item.status === ObjStatus.Invalid" class="self-center mr-4">
            <n-tooltip :style="{ maxWidth: '300px' }" placement="top">
              <template #trigger>
                <div>
                  <SquareButton disable>
                    <span class="iconify block" data-icon="mdi:help-circle" data-inline="false"></span>
                  </SquareButton>
                </div>
              </template>
              <span>该工作空间路径已失效，请将丢失的文件夹还原，或者删除该工作空间!</span>
            </n-tooltip>
          </div>
          <div class="self-center mr-4">
            <SquareButton :disable="item.status === ObjStatus.Invalid">
              <span class="iconify block" data-icon="mdi:pencil-outline" data-inline="false"></span>
            </SquareButton>
          </div>
          <div class="self-center mr-4">
            <SquareButton>
              <span class="iconify block" data-icon="mdi:arrow-up" data-inline="false"></span>
            </SquareButton>
          </div>
          <div class="self-center mr-4">
            <SquareButton>
              <span class="iconify block" data-icon="mdi:arrow-down" data-inline="false"></span>
            </SquareButton>
          </div>
          <div class="self-center">
            <SquareButton>
              <span class="iconify block" data-icon="mdi:delete-forever-outline" data-inline="false"></span>
            </SquareButton>
          </div>
        </div>
      </div>
    </template>
  </div>
  <n-modal v-model:show="addModal" :mask-closable="false">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">添加工作空间</div>
      <SquareButton class="absolute top-4 right-4" transparent @click="onAddCancel">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </SquareButton>
      <div class="text-base mt-6">
        <WorkspaceForm ref="addRef"
                       type="add"
                       @addSuccess="onAddSuccess"
                       @addError="onAddError"></WorkspaceForm>
        <div class="flex justify-end">
          <n-button class="focus:outline-none mr-4" @click="onAddCancel">取消</n-button>
          <n-button class="focus:outline-none" type="primary" @click="onAddOk">确定</n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import LoadingIcon from '/@/components/LoadingIcon.vue'
  import SquareButton from '/@/components/SquareButton.vue'
  import { NButton, NCard, NModal, NTooltip } from 'naive-ui'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { debounce } from 'lodash'
  import WorkspaceForm from '/@/views/system/workspace-list/WorkspaceForm.vue'
  import {
    useAddLoading,
    useAddModal,
    useAddRef,
    useOnAdd,
    useOnAddCancel,
    useOnAddError,
    useOnAddOk,
    useOnAddSuccess,
  } from '/@/hooks/entity/use-add'
  import { workspaceEntity } from '/@/vo/workspace'
  import { ObjStatus } from '/@/vo/enum/obj-status'

  export default defineComponent({
    name: 'WorkspaceList',
    components: {
      LoadingIcon,
      SquareButton,
      NTooltip,
      NModal,
      NCard,
      NButton,
      WorkspaceForm,
    },
    setup() {
      onMounted(() => {
        getWorkspaceList()
      })
      // 工作空间加载状态
      const workspaceListLoading = ref(false)
      const workspaceKey = ref('')
      // 工作空间列表
      let workspaceList = ref<Array<workspaceEntity>>([])
      // 获取工作空间的方法
      const getWorkspaceList = () => {
        workspaceList.value = []
        yiuHttp({
          loading: { flag: workspaceListLoading },
          api: SERVER_API.workspaceApi.search,
          params: { key: workspaceKey.value },
          success: (res) => {
            if (res.data.result) {
              // workspaceList.
              workspaceList.value = res.data.result
            }
          },
        })
      }
      const onWorkspaceKeyChange = debounce(() => {
        getWorkspaceList()
      }, 500)
      // 搜索栏是否激活状态
      const searchActive = ref(false)

      // 添加功能
      const addRef = useAddRef()
      const addModal = useAddModal()
      const addLoading = useAddLoading()
      return {
        workspaceListLoading,
        workspaceKey,
        onWorkspaceKeyChange,
        workspaceList,
        getWorkspaceList,
        searchActive,
        // ↓添加
        addRef,
        addModal,
        addLoading,
        onAdd: useOnAdd(addModal),
        onAddOk: useOnAddOk(addRef, addLoading),
        onAddCancel: useOnAddCancel(addModal),
        onAddSuccess: useOnAddSuccess(addModal, addLoading),
        onAddError: useOnAddError(addLoading),
        ObjStatus,
      }
    },
  })
</script>

<style scoped>

</style>
