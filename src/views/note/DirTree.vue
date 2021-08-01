<template>
  <div class="h-full w-full overflow-auto">
    <DirTreeItem v-for="item in data"
                 :id="'yiu-dir-'+item.data.id"
                 :ref="setItemRef"
                 :key="item.data.id"
                 :node="item"></DirTreeItem>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, provide, ref } from 'vue'
  import DirTreeItem from '/@/views/note/DirTreeItem.vue'
  import { propTypes } from '/@/utils/propTypes'
  import { isFunction } from 'lodash'

  export default defineComponent({
    name: 'DirTree',
    components: {
      DirTreeItem,
    },
    props: {
      data: propTypes.object,
      showNumber: propTypes.bool.def(false),
      searchStr: propTypes.string.def(''),
      activeElId: propTypes.string.def(''),
    },
    setup(prop) {
      const itemRef = ref<Array<any>>([])
      const setItemRef = (e: any) => {
        itemRef.value.push(e)
      }
      provide('showNumber', computed(() => prop.showNumber))
      provide('searchStr', computed(() => prop.searchStr))
      provide('activeElId', computed(() => prop.activeElId))
      // 大纲滚动
      const setScrollDir = (noteId) => {
        if (!noteId) return
        const el = document.getElementById(`yiu-dir-${noteId}`)
        if (!el) return
        setTimeout(() => {
          el.scrollIntoView(true)
        })
      }
      const closeAll = () => {
        for (const refItem of itemRef.value) {
          if (refItem && isFunction(refItem.closeAll)) {
            refItem.closeAll()
          }
        }
      }
      const openAll = () => {
        for (const refItem of itemRef.value) {
          if (refItem && isFunction(refItem.openAll)) {
            refItem.openAll()
          }
        }
      }
      return {
        setItemRef,
        setScrollDir,
        closeAll,
        openAll,
      }
    },
  })
</script>

<style scoped>

</style>
