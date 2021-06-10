<template>
  <div class="flex-none max-h-7 h-7 bg-gray-800 text-white flex">
    <div class="px-2 flex h-full hover:bg-gray-700 flex-none">
      <span class="iconify text-base self-center" data-icon="mdi:home" data-inline="false"></span>
    </div>
    <div class="flex-grow self-center">text-center</div>
    <div class="flex-none self-center ml-2 flex h-full">
      <div class="px-2 self-center">
        <span class="font-thin text-xs text-gray-300">时间</span>
      </div>
      <div class="px-2 flex h-full hover:bg-gray-700">
        <span class="iconify text-base self-center" data-icon="mdi:invert-colors" data-inline="false"></span>
      </div>
      <div class="px-2 flex h-full hover:bg-gray-700">
        <span class="iconify text-base self-center" data-icon="mdi:google-translate" data-inline="false"></span>
      </div>
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

</style>
