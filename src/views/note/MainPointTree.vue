<template>
  <div class="h-full w-full overflow-auto">
    <MainPointTreeItem v-for="item in data"
                       :id="'yiu-main-point-'+item.href"
                       :ref="setItemRef"
                       :key="item.id"
                       :node="item">
    </MainPointTreeItem>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, provide, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import MainPointTreeItem from '/@/views/note/MainPointTreeItem.vue'
  import { isFunction } from 'lodash'

  export default defineComponent({
    name: 'MainPointTree',
    components: {
      MainPointTreeItem,
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
      const setScrollMainPoint = (mainPoint) => {
        if (!mainPoint) return
        const el = document.getElementById(`yiu-main-point-${mainPoint}`)
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
        setScrollMainPoint,
        setItemRef,
        closeAll,
        openAll,
      }
    },
  })
</script>

<style scoped>

</style>
