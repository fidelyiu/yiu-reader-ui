<template>
  <div class="h-full flex">
    <Menu class="border-r"></Menu>
    <div class="w-full flex flex-col">
      <div class="flex-none h-[64px] bg-blue-100 flex justify-between px-[8px]">
        <div class="fa-center text-2xl">{{ mainStore.currentWorkspace.name || '-' }}</div>
        <div class="fa-center">
          <button class="yiu-blue-big-circular-btn fa-center mr-2">
            <span class="iconify block mr-1" data-icon="mdi:magnify" data-inline="false"></span>
            <span>全局搜索</span>
          </button>
          <button v-show="!customizeMode"
                  class="yiu-blue-big-circular-btn fa-center"
                  @click="customizeMode=!customizeMode">
            <span class="iconify block mr-1" data-icon="mdi:pencil-outline" data-inline="false"></span>
            <span>自定义</span>
          </button>
          <button v-show="customizeMode"
                  class="yiu-blue-big-circular-btn fa-center"
                  @click="customizeMode=!customizeMode">
            <span class="iconify block mr-1" data-icon="mdi:check" data-inline="false"></span>
            <span>完成</span>
          </button>
        </div>
      </div>
      <div class="bg-blue-50 h-full overflow-hidden flex">
        <div class="relative flex-grow overflow-auto w-full bg-red-50">内容</div>
        <transition name="yiu-x-right">
          <div v-show="customizeMode" class="flex-none">自定义内容</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Menu from '/@/views/dashboard/Menu.vue'
  import { useMainStore } from '/@/store/modules/main'

  export default defineComponent({
    name: 'Dashboard',
    components: {
      Menu,
    },
    setup() {
      const mainStore = useMainStore()
      const customizeMode = ref(false)
      return {
        mainStore,
        customizeMode,
      }
    },
  })
</script>

<style scoped>

</style>
