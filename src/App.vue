<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex-grow flex-shrink-0 flex flex-col h-0">
      <router-view></router-view>
    </div>
    <BottomBox class="flex-none"></BottomBox>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BottomBox from '/@/components/BottomBox.vue'

  export default defineComponent({
    name: 'App',
    components: { BottomBox },
  })
</script>

<style>
  .yiu-input {
    /*基础样式*/
    @apply text-sm placeholder-gray-400 outline-none transition-all ease-in-out
    /*输入时外轮廓阴影*/
    @apply focus:ring-2 ring-blue-100
    /*边框样式*/
    @apply focus:border-blue-400 rounded border-1 border-gray-300 hover:border-blue-400
  }

  .yiu-input-error {
    @apply ring-2 ring-red-100
    @apply border-red-400 border-red-400 focus:border-red-400 hover:border-red-400
  }
</style>
