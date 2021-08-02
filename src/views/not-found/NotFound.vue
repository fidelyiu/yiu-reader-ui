<template>
  <div class="h-full w-full bg-blue-50 grid place-items-center">
    <div>
      <div class="fa-center text-gray-500 mb-8">
        <span class="iconify text-3xl mr-2" data-icon="mdi:emoticon-dead-outline" data-inline="false"></span>
        <span class="text-2xl">你访问的页面不存在!</span>
      </div>
      <button class="back-btn" @click="onBack">返回首页</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import router from '/@/router'

  export default defineComponent({
    name: 'NotFound',
    setup() {
      const onBack = () => {
        router.push('/')
      }
      return {
        onBack,
      }
    },
  })
</script>

<style scoped>
  .back-btn {
    @apply inline-block text-gray-500 bg-blue-200 p-2 text-lg font-bold;
    @apply border border-transparent;
    @apply hover:bg-blue-100 hover:border-blue-200;
    @apply active:bg-blue-200;
  }
</style>
