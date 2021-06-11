<template>
  <div class="bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-white shadow-md">
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
        <div class="p-2 text-xs rounded-t hover:bg-gray-200">
          <span class="iconify block text-base" data-icon="mdi:help-circle" data-inline="false"></span>
        </div>
      </div>
    </div>
    <SystemTab :tab-key="tabKey" @change="onTabKeyChange"></SystemTab>
  </div>
  <transition name="yiu-x">
    <div v-if="tabKey==='dbManage'">
      dbManage
    </div>
    <div v-else-if="tabKey==='editSoft'">
      editSoft
    </div>
    <div v-else-if="tabKey==='cacheImage'">
      cacheImage
    </div>
    <div v-else>
      workspace
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { systemTabKey } from '/@/views/system/tab/types'
  import SystemTab from '/@/views/system/tab/SystemTab.vue'

  export default defineComponent({
    name: 'System',
    components: { SystemTab },
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
