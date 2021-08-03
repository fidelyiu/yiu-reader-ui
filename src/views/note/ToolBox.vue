<template>
  <div class="w-full">
    <div class="flex justify-between text-xs tool-bar-bg">
      <div class="flex-grow p-2 text-gray-600 font-bold">{{ title }}</div>
      <div class="tool-bar-icon-box fa-center"
           @click="hidden=!hidden">
        <div class="fa-center transition-all transform ease-in-out tool-bar-icon"
             :class="{'rotate-180': hidden}">
          <span class="iconify text-base" data-icon="mdi:chevron-down" data-inline="false"></span>
        </div>
      </div>
    </div>
    <div v-show="hidden" class="p-2 border-t border-b">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default {
    name: 'ToolBox',
    props: {
      title: propTypes.string.isRequired,
    },
    setup() {
      const hidden = ref(true)
      return {
        hidden,
      }
    },
  }
</script>

<style scoped>
  .tool-bar-bg {
    background-image: linear-gradient(to right, rgb(191, 219, 254), rgb(191, 219, 254), rgb(191, 219, 254), white);
  }

  /*text-black*/
  .tool-bar-icon-box {
    @apply pl-4 cursor-pointer flex-none mr-2 active:select-none transition-all text-blue-600;
  }

  .tool-bar-icon-box:hover .tool-bar-icon{
    @apply scale-125;
  }
</style>
