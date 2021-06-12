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
