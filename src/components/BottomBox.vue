<template>
  <div class="flex-none max-h-7 h-7 bg-gray-800 text-white flex">
    <div class="px-2 flex h-full hover:bg-gray-700 flex-none cursor-pointer" @click="onToSystem">
      <span class="iconify text-base self-center" data-icon="mdi:home" data-inline="false"></span>
    </div>
    <div class="flex-grow self-center truncate">text-center</div>
    <div class="flex-none self-center ml-2 flex h-full">
      <div class="px-2 self-center">
        <span class="font-thin text-xs text-gray-300">{{ nowTimeStr }}</span>
      </div>
      <div class="px-2 flex h-full hover:bg-gray-700 cursor-pointer">
        <span class="iconify text-base self-center" data-icon="mdi:invert-colors" data-inline="false"></span>
      </div>
      <div class="px-2 flex h-full hover:bg-gray-700 cursor-pointer">
        <span class="iconify text-base self-center" data-icon="mdi:google-translate" data-inline="false"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onUnmounted, ref } from 'vue'
  import { timeGetStr2 } from 'yiu-js/time/time-get'
  import router from '/@/router'

  export default defineComponent({
    name: 'BottomBox',
    setup() {
      const nowTimeStr = ref('')
      const updateNowTimeStr = setInterval(() => {
        nowTimeStr.value = timeGetStr2()
      }, 1000)
      onUnmounted(() => {
        clearInterval(updateNowTimeStr)
      })
      const onToSystem = () => {
        router.push('/system')
      }
      return {
        nowTimeStr,
        onToSystem,
      }
    },
  })
</script>

<style scoped>

</style>
