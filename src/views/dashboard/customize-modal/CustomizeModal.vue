<template>
  <div>
    <!--头部-->
    <div class="fa-center !justify-start text-base p-4">
      <span class="flex-none iconify mr-1" data-icon="mdi:plus-box-multiple" data-inline="false"></span>
      <span class="flex-grow">添加布局</span>
      <button class="flex-none yiu-square-btn hover:bg-blue-50 active:bg-blue-100"
              @click="$emit('close')">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'CustomizeModal',
    emits: ['close'],
  })
</script>

<style scoped>

</style>
