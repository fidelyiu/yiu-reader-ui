<template>
  <div class="w-full h-full overflow-auto">
    <YiuTreeItem v-for="(item, index) in data"
                 :key="index"
                 :node="item"
                 :number-title="index+1+'.'">
      <template #default="slotProps">
        <slot :node="slotProps.node"></slot>
      </template>
    </YiuTreeItem>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, provide } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import YiuTreeItem from '/@/components/yiu-note-tree/YiuNoteTreeItem.vue'

  export default defineComponent({
    name: 'YiuTree',
    components: { YiuTreeItem },
    props: {
      data: propTypes.object,
      showNumber: propTypes.bool.def(false),
      showIcon: propTypes.bool.def(false),
      searchStr: propTypes.string.def(''),
    },
    setup(prop) {
      provide('showNumber', computed(() => prop.showNumber))
      provide('showIcon', computed(() => prop.showIcon))
      provide('searchStr', computed(() => prop.searchStr))
      return {
      }
    },
  })
</script>

<style scoped>

</style>
