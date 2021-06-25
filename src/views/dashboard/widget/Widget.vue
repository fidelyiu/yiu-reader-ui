<template>
  <div class="p-2">
    <div class="p-2 bg-white rounded-md shadow-md w-full h-full">
      <div class="w-full h-full overflow-auto">
        <div>{{ layoutType }}</div>
        <div>{{ layout.id }}</div>
        <div>{{ layout.top }}</div>
        <div>{{ layout.left }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'Widget',
    props: {
      layout: propTypes.object.isRequired,
    },
    setup(prop) {
      const layoutType = computed(() => prop.layout.type)
      return {
        layoutType,
      }
    },
  })
</script>

<style scoped>

</style>
