<template>
  <div class="tab-item" :class="{active: isActive}">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: '',
    props: {
      isActive: propTypes.bool.def(false),
    },
  })
</script>

<style scoped>
  .tab-item {
    @apply flex self-center px-3 py-2 rounded-t hover:bg-gray-100 transition-all ase-in-out
  }

  .active {
    @apply text-blue-400 border-b-2 border-blue-400
  }
</style>
