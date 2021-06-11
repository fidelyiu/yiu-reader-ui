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
    <SystemTab></SystemTab>
  </div>
  <div>
    <span class="iconify" data-icon="fa:home"></span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SystemTab from '/@/views/system/SystemTab.vue'

  export default defineComponent({
    name: 'System',
    components: {
      SystemTab,
    },
  })
</script>

<style scoped>

</style>
