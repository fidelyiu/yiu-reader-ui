<template>
  <div class="relative w-full h-full overflow-hidden py-3 pr-1">
    <!--右上角按钮组-->
    <div class="absolute top-2 right-2">
      <button class="yiu-blue-square-btn-5">
        <span class="iconify block" data-icon="mdi:cog" data-inline="false"></span>
      </button>
    </div>
    <!--内容部分-->
    <div class="w-full h-full overflow-auto pl-3 pr-2">
      <div>Hello</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'MainBoxWidget',
    props: {
      layout: propTypes.object.isRequired,
    },
  })
</script>

<style scoped>

</style>
