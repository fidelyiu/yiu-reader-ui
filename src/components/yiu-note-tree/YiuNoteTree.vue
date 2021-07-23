<template>
  <div class="w-full h-full overflow-auto">
    <YiuTreeItem v-for="(item, index) in data"
                 :ref="setItemRef"
                 :key="item.id"
                 :node="item"
                 :number-title="getNumberTitle(index)"
                 @itemClick="onItemClick">
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
  import { isFunction } from 'lodash'

  export default defineComponent({
    name: 'YiuTree',
    components: { YiuTreeItem },
    props: {
      data: propTypes.object,
      showNumber: propTypes.bool.def(false),
      showIcon: propTypes.bool.def(false),
      searchStr: propTypes.string.def(''),
    },
    emits: ['itemClick'],
    setup(prop, { emit }) {
      const itemRef: Array<any> = []
      const setItemRef = (e: any) => {
        itemRef.push(e)
      }
      const showErrFile = () => {
        if (itemRef && itemRef.length) {
          itemRef.forEach((item: any) => {
            if (item && isFunction(item.showErrFile)) {
              item.showErrFile()
            }
          })
        }
      }
      provide('showNumber', computed(() => prop.showNumber))
      provide('showIcon', computed(() => prop.showIcon))
      provide('searchStr', computed(() => prop.searchStr))
      const getNumberTitle = (index: any) => {
        index = index as number
        return (index + 1) + '.'
      }
      const onItemClick = (id) => {
        emit('itemClick', id)
      }
      return {
        showErrFile,
        setItemRef,
        getNumberTitle,
        onItemClick,
      }
    },
  })
</script>

<style scoped>

</style>
