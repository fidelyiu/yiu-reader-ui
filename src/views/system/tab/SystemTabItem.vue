<template>
  <div class="tab-item" :class="{active: isActive}">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'SystemTabItem',
    props: {
      isActive: propTypes.bool.def(false),
    },
  })
</script>

<style scoped>
  .tab-item {
    @apply flex self-center px-3 py-2 rounded-t-md hover:bg-blue-100 transition-all ase-in-out
  }

  .active {
    @apply text-blue-600 border-b-2 border-blue-600 bg-gray-50 hover:bg-gray-50
  }
</style>
