<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex-grow overflow-auto">
      <router-view></router-view>
    </div>
    <BottomBox></BottomBox>
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
