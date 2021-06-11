<template>
  <div class="flex justify-center text-gray-500 select-none">
    <div class="tab-item">
      <span class="iconify tab-item-icon" data-icon="mdi:view-list" data-inline="false"></span>
      <span class="tab-item-title">工作空间</span>
    </div>
    <div class="text-blue-400 tab-item border-b-2 border-blue-400">
      <span class="iconify tab-item-icon" data-icon="mdi:puzzle-edit" data-inline="false"></span>
      <span class="tab-item-title">编辑软件</span>
    </div>
    <div class="tab-item">
      <span class="iconify tab-item-icon" data-icon="mdi:image" data-inline="false"></span>
      <span class="tab-item-title">缓存图片</span>
    </div>
    <div class="tab-item">
      <span class="iconify tab-item-icon" data-icon="mdi:database-search" data-inline="false"></span>
      <span class="tab-item-title">数据管理</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: '',
  })
</script>

<style scoped>
  .tab-item {
    @apply flex self-center px-3 py-2 rounded-t hover:bg-gray-100
  }

  .tab-item-icon {
    @apply text-3xl pr-1
  }

  .tab-item-title {
    @apply flex self-center
  }
</style>
