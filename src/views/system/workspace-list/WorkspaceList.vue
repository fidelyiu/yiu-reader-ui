<template>
  <div class="relative" :class="{'h-full': searchLoading||!workspaceList.length}">
    <!--搜索框-->
    <div class="w-full flex px-4 pb-4 sticky top-0 bg-white">
      <div class="flex-grow mr-4">
        <div class="flex rounded-3xl border-1 border-blue-100 bg-blue-50 overflow-hidden transition-all ease-in-out"
             :class="{'!bg-white': searchActive}">
        <span class="iconify self-center ml-3 mr-2 text-lg text-gray-500"
              data-icon="mdi:magnify"
              data-inline="false"></span>
          <input v-model="searchKey"
                 class="w-full h-[30px] outline-none text-sm bg-blue-50 transition-all ease-in-out"
                 :class="{'!bg-white': searchActive}"
                 type="text"
                 @input="onSearchKeyChange"
                 @focus="searchActive = true"
                 @blur="searchActive = false">
        </div>
      </div>
      <div class="flex-none">
        <!--有效按钮-->
        <button class="yiu-blue-square-btn-3 mr-4" :disabled="searchLoading" @click="onStatusChange">
          <div v-show="statusIsNoValue(searchStatus)">
            <span class="iconify block" data-icon="mdi:text-box-outline" data-inline="false"></span>
          </div>
          <div v-show="statusIsValid(searchStatus)">
            <span class="iconify block" data-icon="mdi:text-box-check-outline" data-inline="false"></span>
          </div>
          <div v-show="statusIsInvalid(searchStatus)">
            <span class="iconify block" data-icon="mdi:text-box-remove-outline" data-inline="false"></span>
          </div>
        </button>
        <!--排序按钮-->
        <button class="yiu-blue-square-btn-3 mr-4" :disabled="searchLoading" @click="onSortChange">
          <div v-show="sortTypeIsAse(searchSort)">
            <span class="iconify block" data-icon="mdi:menu-down" data-inline="false"></span>
          </div>
          <div v-show="sortTypeIsDesc(searchSort)">
            <span class="iconify block" data-icon="mdi:menu-up" data-inline="false"></span>
          </div>
        </button>
        <!--添加按钮-->
        <button class="yiu-blue-square-btn-3" @click="onAdd">
          <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
        </button>
      </div>
    </div>
    <!--空数据栏-->
    <div v-if="!searchLoading && !workspaceList.length"
         class="absolute inset-0 mt-[32px] grid place-items-center">
      <div class="flex items-center text-gray-500">
        <span class="iconify text-2xl" data-icon="mdi:inbox" data-inline="false"></span>
        <span class="leading-10 text-base">暂无数据</span>
      </div>
    </div>
    <!--加载栏-->
    <div v-if="searchLoading" class="absolute inset-0 mt-[32px] grid justify-center content-center">
      <n-spin></n-spin>
    </div>
    <!--列表-->
    <template v-else>
      <div v-for="item in workspaceList"
           :key="item.id"
           class="py-3 px-4 hover:bg-blue-50 flex"
           :class="{'bg-blue-50': workspaceItemIsCurrentWorkspace(item)}">
        <template v-if="statusIsInvalid(item.status)">
          <span class="iconify block flex-none text-4xl self-center mr-4 text-red-400"
                data-icon="mdi:book-remove"
                data-inline="false"></span>
        </template>
        <template v-else>
          <span class="iconify block flex-none text-4xl self-center mr-4 text-blue-400"
                data-icon="mdi:book"
                data-inline="false"></span>
        </template>
        <div class="flex-grow w-0 mr-4">
          <div class="w-full truncate text-gray-700 font-medium"
               :class="{'!text-red-400': statusIsInvalid(item.status)}">
            {{ item.name }}
          </div>
          <div class="w-full truncate text-gray-500 font-light"
               :class="{'!text-red-300': statusIsInvalid(item.status)}">
            {{ item.path }}
          </div>
        </div>
        <div class="flex-none flex">
          <!--问号按钮-->
          <div v-if="statusIsInvalid(item.status)" class="self-center mr-4">
            <n-tooltip :style="{ maxWidth: '300px' }" placement="top">
              <template #trigger>
                <div>
                  <button :key="item.id" class="yiu-blue-disable-btn-1" disable>
                    <span class="iconify block" data-icon="mdi:help-circle" data-inline="false"></span>
                  </button>
                </div>
              </template>
              <span>该工作空间路径已失效，请将丢失的文件夹还原，或者删除该工作空间!</span>
            </n-tooltip>
          </div>
          <!--设置当前工作空间按钮-->
          <div v-if="statusIsNotInvalid(searchStatus)" class="self-center mr-4">
            <!--已经是当前工作空间-->
            <template v-if="workspaceItemIsCurrentWorkspace(item)">
              <button class="yiu-blue-square-btn-1">
                <span class="iconify block" data-icon="mdi:star" data-inline="false"></span>
              </button>
            </template>
            <!--可设置为当前工作空间-->
            <template v-else-if="statusIsValid(item.status)">
              <button class="yiu-blue-square-btn-1" @click="setCurrentWorkspaceById(item.id)">
                <div v-show="setCurrentWorkspaceLoading">
                  <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>
                </div>
                <div v-show="!setCurrentWorkspaceLoading">
                  <span class="iconify block" data-icon="mdi:star-outline" data-inline="false"></span>
                </div>
              </button>
            </template>
            <!--不能设置为当前工作空间-->
            <template v-else>
              <n-tooltip :style="{ maxWidth: '300px' }" placement="top">
                <template #trigger>
                  <div>
                    <button :key="item.id" class="yiu-blue-disable-btn-1" disable>
                      <span class="iconify block" data-icon="mdi:star-outline" data-inline="false"></span>
                    </button>
                  </div>
                </template>
                <span>无效工作空间不能设置为当前工作空间!</span>
              </n-tooltip>
            </template>
          </div>
          <!--修改按钮-->
          <div class="self-center mr-4">
            <button class="yiu-blue-square-btn-1" @click="onEdit(item.id)">
              <span class="iconify block" data-icon="mdi:pencil-outline" data-inline="false"></span>
            </button>
          </div>
          <!--上移按钮-->
          <div v-show="statusIsNoValue(searchStatus)" class="self-center mr-4">
            <button class="yiu-blue-square-btn-1" @click="onMove(item.id, 'up')">
              <div v-show="moveLoading">
                <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>
              </div>
              <div v-show="!moveLoading">
                <span class="iconify block" data-icon="mdi:arrow-up" data-inline="false"></span>
              </div>
            </button>
          </div>
          <!--下移按钮-->
          <div v-show="statusIsNoValue(searchStatus)" class="self-center mr-4">
            <button class="yiu-blue-square-btn-1" @click="onMove(item.id, 'down')">
              <div v-show="moveLoading">
                <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>
              </div>
              <div v-show="!moveLoading">
                <span class="iconify block" data-icon="mdi:arrow-down" data-inline="false"></span>
              </div>
            </button>
          </div>
          <!--删除按钮-->
          <div class="self-center">
            <n-popconfirm placement="top-end"
                          negative-text="取消"
                          positive-text="确认"
                          @positive-click="onDelete(item.id)">
              <template #icon>
                <span style="color: #ff7875;"
                      class="iconify block"
                      data-icon="mdi:alert-circle"
                      data-inline="false"></span>
              </template>
              <template #trigger>
                <button class="yiu-blue-square-btn-1">
                  <span class="iconify block" data-icon="mdi:delete-forever-outline" data-inline="false"></span>
                </button>
              </template>
              <span class="max-w-55">是否删除该工作空间，此操作将删除该工作空间下所有记录?</span>
            </n-popconfirm>
          </div>
        </div>
      </div>
    </template>
  </div>
  <!--添加Modal-->
  <n-modal v-model:show="addModal" :mask-closable="false">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">添加工作空间</div>
      <button class="yiu-modal-close-btn" transparent @click="onAddCancel">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="text-base mt-6">
        <WorkspaceForm ref="addRef"
                       type="add"
                       @addStart="onAddStart"
                       @addSuccess="onAddSuccess"
                       @addError="onAddError"></WorkspaceForm>
        <div class="flex justify-end">
          <n-button class="focus:outline-none mr-4" @click="onAddCancel">取消</n-button>
          <n-button class="focus:outline-none"
                    type="primary"
                    :loading="addLoading"
                    @click="onAddOk">
            确定
          </n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
  <!--修改Modal-->
  <n-modal v-model:show="editModal" :mask-closable="false">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">修改工作空间</div>
      <button class="yiu-modal-close-btn" transparent @click="onEditCancel">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="text-base mt-6">
        <WorkspaceForm ref="editRef"
                       type="edit"
                       @editLoadingStart="onEditLoadingStart"
                       @editLoadingSuccess="onEditLoadingSuccess"
                       @editLoadingError="onEditLoadingError"
                       @editStart="onEditStart"
                       @editSuccess="onEditSuccess"
                       @editError="onEditError"></WorkspaceForm>
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
  import { defineComponent, onMounted, ref } from 'vue'
  import { NButton, NCard, NModal, NPopconfirm, NSpin, NTooltip, useNotification } from 'naive-ui'
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
    useOnAddStart,
    useOnAddSuccess,
  } from '/@/hooks/entity/use-add'
  import { WorkspaceEntity } from '/@/vo/workspace'
  import { ObjStatus, statusIsInvalid, statusIsNotInvalid, statusIsNoValue, statusIsValid } from '/@/vo/enum/obj-status'
  import {
    useEditDisableRef,
    useEditLoading,
    useEditModal,
    useEditRef,
    useOnEdit,
    useOnEditCancel,
    useOnEditError,
    useOnEditLoadingError,
    useOnEditLoadingStart,
    useOnEditLoadingSuccess,
    useOnEditOk,
    useOnEditStart,
    useOnEditSuccess,
  } from '/@/hooks/entity/use-edit'
  import { SortType, sortTypeIsAse, sortTypeIsDesc } from '/@/vo/enum/sort-type'
  import { YiuAip } from 'yiu-axios/type'
  import { useMainStore } from '/@/store/modules/main'

  export default defineComponent({
    name: 'WorkspaceList',
    components: {
      NTooltip,
      NModal,
      NCard,
      NButton,
      NSpin,
      NPopconfirm,
      WorkspaceForm,
    },
    setup() {
      const mainStore = useMainStore()
      mainStore.refreshCurrentWorkspaceWithHttp().then()
      const notification = useNotification()

      onMounted(() => onSearch())
      // 工作空间加载状态
      const searchLoading = ref(false)
      const searchKey = ref('')
      const searchStatus = ref<ObjStatus>(ObjStatus.NoValue)
      const onStatusChange = () => {
        switch (searchStatus.value) {
          case ObjStatus.NoValue:
            searchStatus.value = ObjStatus.Valid
            break
          case ObjStatus.Valid:
            searchStatus.value = ObjStatus.Invalid
            break
          case ObjStatus.Invalid:
            searchStatus.value = ObjStatus.NoValue
            break
        }
        onSearch()
      }

      const searchSort = ref<SortType>(SortType.ASE)
      const onSortChange = () => {
        if (sortTypeIsAse(searchSort.value)) {
          searchSort.value = SortType.DESC
        } else {
          searchSort.value = SortType.ASE
        }
        onSearch()
      }
      // 工作空间列表
      const workspaceList = ref<Array<WorkspaceEntity>>([])

      const workspaceItemIsCurrentWorkspace = (item: WorkspaceEntity) => {
        if (!mainStore.getCurrentWorkspace.status) {
          return false
        } else {
          return item.id === mainStore.getCurrentWorkspace.id
        }
      }

      const setCurrentWorkspaceLoading = ref(false)
      const setCurrentWorkspaceById = (id: string) => {
        if (setCurrentWorkspaceLoading.value) {
          return
        }
        yiuHttp({
          api: SERVER_API.mainApi.setCurrentWorkspace,
          loading: { flag: setCurrentWorkspaceLoading },
          tips: { anyObj: notification, error: { show: true } },
          pathData: { id },
          success: (res) => {
            mainStore.setCurrentWorkspace(res?.data?.result)
          },
        })
      }

      // 获取工作空间的方法
      const onSearch = () => {
        workspaceList.value = []
        yiuHttp({
          loading: { flag: searchLoading },
          api: SERVER_API.workspaceApi.search,
          params: {
            key: searchKey.value,
            sortType: searchSort.value,
            objStatus: searchStatus.value,
          },
          success: (res) => {
            if (res.data.result) {
              workspaceList.value = res.data.result
            }
          },
        })
      }
      // 500ms防抖处理
      const onSearchKeyChange = debounce(() => {
        onSearch()
      }, 500)

      // 搜索栏是否激活状态
      const searchActive = ref(false)

      // 添加功能
      const addRef = useAddRef()
      const addModal = useAddModal()
      const addLoading = useAddLoading()
      const onAdd = useOnAdd(addModal)
      const onAddOk = useOnAddOk(addRef, addLoading)
      const onAddStart = useOnAddStart(addLoading)
      const onAddCancel = useOnAddCancel(addModal, addLoading)
      const onAddSuccess = useOnAddSuccess(onAddCancel, onSearch)
      const onAddError = useOnAddError(addLoading)
      // 修改功能
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
      const onEditSuccess = useOnEditSuccess(onEditCancel, onSearch)
      const onEditError = useOnEditError(editLoading)


      const moveLoading = ref(false)
      // 移动
      const onMove = (id: string, type: 'up' | 'down') => {
        if (moveLoading.value) {
          return
        }
        let sendApi: YiuAip
        if (type === 'up') {
          sendApi = sortTypeIsAse(searchSort.value) ? SERVER_API.workspaceApi.up : SERVER_API.workspaceApi.down
        } else {
          sendApi = sortTypeIsAse(searchSort.value) ? SERVER_API.workspaceApi.down : SERVER_API.workspaceApi.up
        }

        yiuHttp({
          api: sendApi,
          pathData: { id },
          loading: { flag: moveLoading },
          tips: { anyObj: notification, error: { show: true } },
          success: (_res) => onSearch(),
        })
      }

      // 删除
      const onDelete = (id: string) => {
        yiuHttp({
          api: SERVER_API.workspaceApi.del,
          pathData: { id },
          tips: { anyObj: notification, error: { show: true } },
          success: (_res) => onSearch(),
        })
      }

      return {
        statusIsNoValue,
        statusIsValid,
        statusIsInvalid,
        statusIsNotInvalid,
        workspaceList,
        workspaceItemIsCurrentWorkspace,
        setCurrentWorkspaceById,
        setCurrentWorkspaceLoading,
        searchStatus,
        onStatusChange,
        searchSort,
        sortTypeIsAse,
        sortTypeIsDesc,
        onSortChange,
        searchKey,
        searchActive,
        searchLoading,
        onSearch,
        onSearchKeyChange,
        // ↓添加
        addRef,
        addModal,
        addLoading,
        onAdd,
        onAddOk,
        onAddStart,
        onAddCancel,
        onAddSuccess,
        onAddError,
        // ↓修改
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
        moveLoading,
        // 移动
        onMove,
        // 删除
        onDelete,
      }
    },
  })
</script>

<style scoped>

</style>
