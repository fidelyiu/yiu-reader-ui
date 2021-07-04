<template>
  <div class="w-full h-full overflow-auto pr-2">
    <YiuTreeItem v-for="(item, index) in data" :key="index" :data="item"></YiuTreeItem>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import YiuTreeItem from '/@/components/yiu-note-tree/YiuNoteTreeItem.vue'

  export default defineComponent({
    name: 'YiuTree',
    components: {YiuTreeItem},
    props: {
      data: propTypes.object,
    },
  })
</script>

<style scoped>

</style>
