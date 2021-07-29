<template>
  <div>
    <div class="flex p-[5px] border-t border-b border-transparent"
         :class="{'bg-blue-50': isActive, '!border-blue-200': showBlueBorder}">
      <div class="flex-none border border-transparent mr-1"
           :class="{'arrow-icon':node.child.length}"
           @click="onChangeOpen">
        <div v-show="!node.child.length" class="mt-[-4px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-200" data-icon="mdi:circle-small" data-inline="false"></span>
        </div>
        <div v-show="node.child.length && isOpen" class="mt-[-4px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-400" data-icon="mdi:menu-down" data-inline="false"></span>
        </div>
        <div v-show="node.child.length && !isOpen" class="mt-[-3px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-400" data-icon="mdi:menu-right" data-inline="false"></span>
        </div>
      </div>
      <div v-show="showNumber" class="flex-none text-gray-400">
        <span class="font-extrabold text-xs">{{ getNumberTitle }}</span>
      </div>
      <a class="block break-all ml-1 hover:underline min-w-[120px]"
         :class="{'underline': isActive||showBlueBorder}"
         :href="'#'+node.href"
         @click="onClickItem">
        <!--text-blue-400-->
        <span class="text-xs font-medium">
          <span v-if="node.title.indexOf(searchStr) > -1">{{
              node.title.substr(0, node.title.indexOf(searchStr))
            }}<span class="bg-yellow-200">{{
                searchStr
              }}</span>{{ node.title.substr(node.title.indexOf(searchStr) + searchStr.length) }}</span>
          <span v-else>{{ node.title || '-' }}</span>
        </span>
      </a>
    </div>
    <transition name="yiu-fade-in">
      <div v-show="isOpen && node?.child && node?.child?.length" class="ml-[18px]">
        <MainPointTreeItem v-for="item in node.child"
                           :id="'yiu-main-point-'+item.href"
                           :ref="setItemRef"
                           :key="item.id"
                           :node="item"
                           class="border-l border-blue-200"
                           @searchSuccess="onSearchSuccess"></MainPointTreeItem>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref, watch } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'MainPointTreeItem',
    props: {
      node: propTypes.object,
    },
    emits: ['searchSuccess'],
    setup(prop, { emit }) {
      const itemRef = ref<Array<any>>([])
      const setItemRef = (e: any) => {
        itemRef.value.push(e)
      }
      const showNumber: any = inject('showNumber')
      const searchStr: any = inject('searchStr')
      const activeElId: any = inject('activeElId')
      const isActive = computed(() => {
        if (!activeElId.value || !prop?.node?.href) {
          return false
        }
        return activeElId.value === prop.node.href
      })
      const hasChildActive = computed(() => {
        if (!itemRef.value.length) return false
        for (const refEl of itemRef.value) {
          if (refEl.isActive) {
            return true
          }
          if (refEl.hasChildActive) {
            return true
          }
        }
        return false
      })
      const showBlueBorder = computed(() => {
        return hasChildActive.value && !isOpen.value && prop.node.isNode
      })
      const isOpen = ref(true)
      const getNumberTitle = computed(() => prop.node.orderNum.reduce((acc, t) => acc + t + '.', ''))
      const onClickItem = (e) => {
        if (!activeElId.value) return
        if (!prop?.node?.href) return
        if (activeElId.value === prop.node.href) {
          e.preventDefault()
        }
        //   if (!activeElId.value) return
        //   if (!prop?.node?.href) return
        //   let activeEl = document.getElementById(activeElId.value)
        //   if (!activeEl) return
        //   let element = document.getElementById(prop.node.href)
        //   if (!element) return
        //   let scrollPx = activeEl.offsetTop - element.offsetTop
        //   if (scrollPx < 0) {
        //     scrollPx = -scrollPx
        //   }
        //   if (scrollPx > 1000) {
        //     return
        //   }
        //   // 小于1000的滚动
        //   e.preventDefault()
        //   element.scrollIntoView(true)
      }
      const onChangeOpen = () => {
        if (prop.node.child.length) {
          isOpen.value = !isOpen.value
        }
      }
      watch(() => searchStr.value, (v) => {
        if (!v) {
          return
        }
        if (prop?.node?.title) {
          if (prop.node.title.indexOf(v) != -1) {
            emit('searchSuccess')
          }
        }
        isOpen.value = false
      })
      const onSearchSuccess = () => {
        emit('searchSuccess')
        isOpen.value = true
      }
      return {
        showNumber,
        searchStr,
        isOpen,
        getNumberTitle,
        onClickItem,
        isActive,
        hasChildActive,
        showBlueBorder,
        onChangeOpen,
        setItemRef,
        onSearchSuccess,
      }
    },
  })
</script>

<style scoped>
  .arrow-icon:hover {
    @apply border border-blue-200 bg-blue-100;
    /*--tw-bg-opacity: 1;*/
  }

  .arrow-icon:active {
    @apply select-none;
  }
</style>
