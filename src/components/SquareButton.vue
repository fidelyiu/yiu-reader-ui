<template>
  <button :class="btnClass" :disabled="disable">
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { squareButtonTypeList } from '/@/components/types'

  // 正方形按钮
  export default defineComponent({
    name: 'SquareButton',
    props: {
      disable: propTypes.bool.def(false),
      transparent: propTypes.bool.def(false),
      type: propTypes.oneOf(squareButtonTypeList).def('blue'),
    },
    setup(props) {
      const btnClass = reactive({
        'square-button': true,
        'disable-button': props.disable,
        'disable-blue-border': props.disable && props.type === 'blue',
        'blue-btn-bg': props.type === 'blue' && !props.transparent,
        'blue-btn-border': props.type === 'blue',
        'transparent-btn': props.transparent,
        'transparent-blue-btn': props.transparent && props.type === 'blue',
      })
      return {
        btnClass,
      }
    },
  })
</script>

<style scoped>
  .square-button {
    /*公共样式*/
    @apply p-2 outline-none focus:outline-none border-1
  }

  .disable-button {
    @apply p-2 outline-none focus:outline-none border-1
    @apply bg-gray-50
    @apply cursor-not-allowed
  }

  .disable-blue-border {
    @apply border-blue-100
  }

  .transparent-btn {
    @apply bg-transparent
  }

  .transparent-blue-btn {
    @apply hover:bg-blue-50
  }

  .blue-btn-bg {
    /*背景颜色*/
    @apply bg-blue-100 hover:bg-gray-50 active:bg-gray-100
  }

  .blue-btn-border {
    /*边框颜色*/
    @apply border-transparent active:border-blue-100
  }
</style>
