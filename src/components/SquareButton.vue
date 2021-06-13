<template>
  <button :class="{'disable-button': disable, 'square-button': !disable}" :disabled="disable">
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  // 正方形按钮
  export default defineComponent({
    name: 'SquareButton',
    props: {
      disable: propTypes.bool.def(false),
    },
  })
</script>

<style scoped>
  .square-button {
    /*公共样式*/
    @apply p-2 outline-none focus:outline-none border-1
    /*背景颜色*/
    @apply bg-blue-100 hover:bg-gray-50 active:bg-gray-100
    /*边框颜色*/
    @apply border-transparent active:border-blue-100
  }

  .disable-button {
    @apply p-2 outline-none focus:outline-none border-1
    @apply bg-gray-50
    @apply border-blue-100
    @apply cursor-not-allowed
  }
</style>
