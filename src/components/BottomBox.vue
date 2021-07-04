<template>
  <div v-show="showLog"
       class="flex-none shadow-yiu h-[174px] flex flex-col">
    <div class="flex pl-[16px] py-[6px] pr-[6px] flex-none">
      <div class="fa-center text-base flex-none">
        <span class="iconify mr-1" data-icon="ic:baseline-dvr" data-inline="false"></span>
        <span>日志</span>
      </div>
      <div class="flex-grow"></div>
      <div class="flex-none mr-1">
        <button class="fa-center h-full yiu-blue-square-btn-6" @click="logStore.$reset()">
          <span class="iconify text-base" data-icon="mdi:delete-forever" data-inline="false"></span>
        </button>
      </div>
      <div class="flex-none mr-1">
        <div class="fa-center h-full py-1 pl-1 pr-2">
          <div class="w-[4px] h-[4px] bg-gray-300 rounded-3xl"></div>
        </div>
      </div>
      <div class="flex-none mr-1">
        <button class="fa-center h-full yiu-blue-square-btn-6">
          <span class="iconify text-base" data-icon="mdi:subdirectory-arrow-left" data-inline="false"></span>
        </button>
      </div>
      <div class="flex-none">
        <button class="fa-center h-full yiu-blue-square-btn-6" @click="showLog=!showLog">
          <span class="iconify text-base" data-icon="mdi:close" data-inline="false"></span>
        </button>
      </div>
    </div>
    <div class="flex-grow h-0 px-[16px] overflow-y-auto">
      <template v-for="item in logStore.logList" :key="item.id" >
        <LogItem class="px-[4px] py-[5px] hover:bg-blue-50 text-xs" :log="item"></LogItem>
      </template>
    </div>
  </div>
  <div class="flex-none max-h-7 h-7 bg-gray-800 text-white flex">
    <div class="box-item flex-none flex h-full cursor-pointer fa-center" @click="onToSystem">
      <span class="iconify text-base" data-icon="mdi:home" data-inline="false"></span>
    </div>
    <div class="box-item flex-none fa-center cursor-default">
      <span class="iconify" data-icon="mdi:folder" data-inline="false"></span>
      <span class="ml-1 text-xs fa-center">当前目录</span>
    </div>
    <div class="box-item flex-grow flex items-center cursor-pointer select-none" @click="showLog=!showLog">
      <span class="iconify mr-1 flex-none" data-icon="ic:baseline-dvr" data-inline="false"></span>
      <div class="flex-grow text-xs">
        <LogItem :log="logStore.getLastLog"></LogItem>
      </div>
    </div>
    <div class="flex-none self-center flex h-full">
      <div class="box-item flex h-full cursor-pointer">
        <span class="iconify text-base self-center" data-icon="mdi:invert-colors" data-inline="false"></span>
      </div>
      <div class="box-item flex h-full cursor-pointer">
        <span class="iconify text-base self-center" data-icon="mdi:google-translate" data-inline="false"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import router from '/@/router'
  import LogItem from '/@/components/LogItem.vue'
  import { useLogStore } from '/@/store/modules/log'

  export default defineComponent({
    name: 'BottomBox',
    components: {
      LogItem,
    },
    setup() {
      const showLog = ref(false)
      const logStore = useLogStore()
      const onToSystem = () => {
        router.push('/system')
      }
      return {
        showLog,
        logStore,
        onToSystem,
      }
    },
  })
</script>

<style scoped>
  .shadow-yiu {
    box-shadow: 0 -2px 10px rgb(0 0 0 / 10%);
  }

  .box-item {
    @apply px-2 hover:bg-gray-700;
  }
</style>
