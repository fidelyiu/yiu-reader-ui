<template>
  <div class="flex-none bg-blue-200 text-gray-800 dark:bg-gray-700 dark:text-white shadow-md">
    <div class="text-2xl text-center p-4 relative">
      <!--返回箭头-->
      <div v-if="false" class="absolute inset-y-0 left-3 h-full flex flex-col justify-center">
        <div class="p-2 text-xs rounded-t hover:bg-gray-200">
          <span class="iconify block text-base" data-icon="mdi:keyboard-backspace" data-inline="false"></span>
        </div>
      </div>
      <span>系统设置</span>
      <!--问号-->
      <div class="absolute inset-y-0 right-3 h-full flex flex-col justify-center">
        <div class="p-2 text-xs rounded-t hover:bg-blue-100">
          <span class="iconify block text-base" data-icon="mdi:help-circle" data-inline="false"></span>
        </div>
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
          <div>editSoft</div>
        </template>
        <template v-else-if="tabKey==='cacheImage'">
          <div>cacheImage</div>
        </template>
        <template v-else>
          <WorkspaceList></WorkspaceList>
        </template>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { systemTabKey } from '/@/views/system/tab/types'
  import SystemTab from '/@/views/system/tab/SystemTab.vue'
  import WorkspaceList from '/@/views/system/workspace-list/WorkspaceList.vue'

  export default defineComponent({
    name: 'System',
    components: { SystemTab, WorkspaceList },
    setup() {
      const tabKey = ref<systemTabKey>('workspace')
      const onTabKeyChange = (key) => {
        tabKey.value = key
      }
      return {
        tabKey,
        onTabKeyChange,
      }
    },
  })
</script>

<style scoped>

</style>
