<template>
  <div class="h-full overflow-auto">
    <MainPointTreeItem v-for="item in data"
                       :key="item.id"
                       :node="item">
    </MainPointTreeItem>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, provide } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import MainPointTreeItem from '/@/views/note/MainPointTreeItem.vue'

  export default defineComponent({
    name: 'MainPointTree',
    components: {
      MainPointTreeItem,
    },
    props: {
      data: propTypes.object,
      showNumber: propTypes.bool.def(false),
      searchStr: propTypes.string.def(''),
    },
    setup(prop) {
      provide('showNumber', computed(() => prop.showNumber))
      provide('searchStr', computed(() => prop.searchStr))
      return {}
    },
  })
</script>

<style scoped>

</style>
