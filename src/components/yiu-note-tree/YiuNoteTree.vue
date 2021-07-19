<template>
  <div class="w-full h-full overflow-auto">
    <YiuTreeItem v-for="(item, index) in data"
                 :key="item.id"
                 :node="item"
                 :number-title="getNumberTitle(index)">
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
      const getNumberTitle = (index: any) => {
        index = index as number
        return (index + 1) + '.'
      }
      return {
        getNumberTitle,
      }
    },
  })
</script>

<style scoped>

</style>
