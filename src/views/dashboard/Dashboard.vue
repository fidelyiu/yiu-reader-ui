<template>
  <div class="h-full flex">
    <Menu class="border-r"></Menu>
    <div class="w-full bg-green-50">
      Hello
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Menu from '/@/views/dashboard/Menu.vue'

  export default defineComponent({
    name: 'Dashboard',
    components: {
      Menu,
    },
  })
</script>

<style scoped>

</style>
