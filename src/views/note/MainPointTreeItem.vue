<template>
  <div>
    <div class="flex p-[5px]">
      <div class="flex-none border border-transparent"
           :class="{'arrow-icon':node.child.length}">
        <div v-show="!node.child.length" class="mt-[-4px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-200" data-icon="mdi:circle-small" data-inline="false"></span>
        </div>
        <div v-show="node.child.length && isOpen" class="mt-[-4px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-400" data-icon="mdi:menu-down" data-inline="false"></span>
        </div>
        <div v-show="node.child.length && !isOpen" class="mt-[-4px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-400" data-icon="mdi:menu-right" data-inline="false"></span>
        </div>
      </div>
      <div v-show="showNumber" class="flex-none text-gray-400">
        <span class="font-extrabold text-xs">{{ getNumberTitle }}</span>
      </div>
      <a class="block break-all ml-1 hover:underline min-w-[120px]" :href="'#'+node.href">
        <span class="text-xs font-medium ">{{ node.title || '-' }}</span>
      </a>
    </div>
    <transition name="yiu-fade-in">
      <div v-show="isOpen && node?.child && node?.child?.length" class="ml-[18px]">
        <MainPointTreeItem v-for="item in node.child"
                           :key="item.id"
                           :node="item"
                           class="border-l border-blue-200"></MainPointTreeItem>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'MainPointTreeItem',
    props: {
      node: propTypes.object,
    },
    setup(prop) {
      const showNumber: any = inject('showNumber')
      const searchStr: any = inject('searchStr')
      const isOpen = ref(true)
      const getNumberTitle = computed(() => prop.node.orderNum.reduce((acc, t) => acc + t + '.', ''))
      return {
        showNumber,
        searchStr,
        isOpen,
        getNumberTitle,
      }
    },
  })
</script>

<style scoped>
  .arrow-icon:hover {
    @apply border border-blue-100 bg-blue-50;
    /*--tw-bg-opacity: 1;*/
  }

  .arrow-icon:active {
    @apply select-none;
  }
</style>
