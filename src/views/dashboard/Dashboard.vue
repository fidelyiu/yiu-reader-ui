<template>
  <div class="h-full flex">
    <Menu class="border-r"></Menu>
    <div class="w-full flex flex-col">
      <div class="flex-none h-[64px] bg-blue-100 flex justify-between px-[16px]">
        <div class="fa-center text-2xl">{{ mainStore.currentWorkspace.name || '-' }}</div>
        <div class="fa-center">
          <button class="yiu-blue-big-circular-btn fa-center mr-2">
            <span class="iconify block mr-1" data-icon="mdi:magnify" data-inline="false"></span>
            <span>全局搜索</span>
          </button>
          <button class="yiu-blue-big-circular-btn fa-center">
            <span class="iconify block mr-1" data-icon="mdi:pencil-outline" data-inline="false"></span>
            <span>自定义</span>
          </button>
        </div>
      </div>
      <div class="bg-blue-50 h-full">内容</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Menu from '/@/views/dashboard/Menu.vue'
  import { useMainStore } from '/@/store/modules/main'

  export default defineComponent({
    name: 'Dashboard',
    components: {
      Menu,
    },
    setup() {
      const mainStore = useMainStore()
      return {
        mainStore,
      }
    },
  })
</script>

<style scoped>

</style>
