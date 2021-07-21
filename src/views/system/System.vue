<template>
  <div class="flex-none bg-blue-200 text-gray-800 dark:bg-gray-700 dark:text-white shadow-md">
    <div class="text-2xl text-center p-4 relative">
      <!--返回箭头-->
      <div class="absolute inset-y-0 left-3 h-full flex flex-col justify-center">
        <button class="yiu-blue-square-btn-2"
                :class="{'yiu-disable-btn': statusIsNotValid(mainStore.getCurrentWorkspace.status)}"
                :disabled="statusIsNotValid(mainStore.getCurrentWorkspace.status)"
                @click="onBack">
          <span class="iconify block text-base" data-icon="mdi:keyboard-backspace" data-inline="false"></span>
        </button>
      </div>
      <span>系统设置</span>
      <!--问号-->
      <div class="absolute inset-y-0 right-3 h-full flex flex-col justify-center">
        <n-tooltip placement="left">
          <template #trigger>
            <button class="yiu-blue-square-btn-2">
              <span class="iconify block text-base" data-icon="mdi:help-circle" data-inline="false"></span>
            </button>
          </template>
          <span>关于</span>
        </n-tooltip>
      </div>
    </div>
    <SystemTab :tab-key="tabKey" @change="onTabKeyChange"></SystemTab>
  </div>
  <div class="flex-grow flex-shrink-0 w-full max-w-[1200px] p-[16px] mx-auto h-0">
    <div class="h-full overflow-y-auto overflow-x-hidden">
      <transition name="yiu-x">
        <template v-if="tabKey==='dbManage'">
          <div>dbManage</div>
        </template>
        <template v-else-if="tabKey==='editSoft'">
          <div class="h-full">
            <EditSoftList></EditSoftList>
          </div>
        </template>
        <template v-else-if="tabKey==='cacheImage'">
          <div>
            <div class="flex items-center">
              <span class="iconify text-2xl" data-icon="mdi:inbox" data-inline="false"></span>
              <span class="self-center">暂无数据1</span>
              <span class="self-center text-2xl">暂无数据2</span>
            </div>
          </div>
        </template>
        <div v-else class="h-full">
          <WorkspaceList></WorkspaceList>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { systemTabKey } from '/@/views/system/tab/types'
  import SystemTab from '/@/views/system/tab/SystemTab.vue'
  import WorkspaceList from '/@/views/system/workspace-list/WorkspaceList.vue'
  import { NTooltip } from 'naive-ui'
  import { useMainStore } from '/@/store/modules/main'
  import { statusIsNotValid } from '/@/vo/enum/obj-status'
  import router from '/@/router'
  import EditSoftList from '/@/views/system/edit-soft-list/EditSoftList.vue'

  export default defineComponent({
    name: 'System',
    components: {
      SystemTab,
      EditSoftList,
      WorkspaceList,
      NTooltip,
    },
    setup() {
      const mainStore = useMainStore()
      const tabKey = ref<systemTabKey>('workspace')
      const onTabKeyChange = (key) => {
        tabKey.value = key
      }
      const onBack = () => {
        router.replace('/dashboard')
      }
      return {
        mainStore,
        tabKey,
        onTabKeyChange,
        statusIsNotValid,
        onBack,
      }
    },
  })
</script>

<style scoped>

</style>
