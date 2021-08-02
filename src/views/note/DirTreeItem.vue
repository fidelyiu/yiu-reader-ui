<template>
  <div>
    <div class="flex p-[5px] border-t border-b border-transparent min-w-[150px]"
         :class="{'bg-blue-50': isActive, '!border-blue-200': showBlueBorder}">
      <div class="flex-none border border-transparent mr-1"
           :class="{'arrow-icon':node.data.isDir}"
           @click="onChangeOpen">
        <div v-show="!node.data.isDir" class="mt-[-4px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-200" data-icon="mdi:circle-small" data-inline="false"></span>
        </div>
        <div v-show="node.data.isDir && isOpen" class="mt-[-4px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-400" data-icon="mdi:menu-down" data-inline="false"></span>
        </div>
        <div v-show="node.data.isDir && !isOpen" class="mt-[-3px] max-h-[15px]">
          <span class="iconify text-2xl text-gray-400" data-icon="mdi:menu-right" data-inline="false"></span>
        </div>
      </div>
      <div v-show="showNumber" class="flex-none text-gray-400">
        <span class="font-extrabold text-xs">{{ getNumberTitle }}</span>
      </div>
      <a class="block break-all ml-1 hover:underline"
         :class="{'underline': isActive||showBlueBorder}"
         :href="'/note/'+node.data.id"
         @click="onClickItem">
        <span class="text-xs font-medium">
          <span v-if="noteName.indexOf(searchStr) > -1">{{
              noteName.substr(0, noteName.indexOf(searchStr))
            }}<span class="bg-yellow-200">{{
                searchStr
              }}</span>{{ noteName.substr(noteName.indexOf(searchStr) + searchStr.length) }}</span>
          <span v-else>{{ noteName || '-' }}</span>
        </span>
      </a>
    </div>
    <transition name="yiu-fade-in">
      <div v-show="isOpen && node?.child && node?.child?.length" class="ml-[18px]">
        <DirTreeItem v-for="item in node.child"
                     :id="'yiu-dir-'+item.data.id"
                     :ref="setItemRef"
                     :key="item.data.id"
                     :node="item"
                     class="border-l border-blue-200"
                     @searchSuccess="onSearchSuccess"></DirTreeItem>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref, watch } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { isFunction } from 'lodash'

  export default defineComponent({
    name: 'DirTreeItem',
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
        if (!activeElId.value || !prop?.node?.data?.id) {
          return false
        }
        return activeElId.value === prop?.node?.data?.id
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
      const getNumberTitle = computed(() => {
        if (prop.node.number && prop.node.number.length) {
          return prop.node.number.reduce((acc, t) => acc + t + '.', '')
        }
        return ''
      })
      const showBlueBorder = computed(() => {
        return hasChildActive.value && !isOpen.value && prop.node.data.isDir
      })
      const noteName = computed<string>(() => {
        return prop.node.data.alias || prop.node.data.name || ''
      })
      const isOpen = ref(true)
      const onChangeOpen = () => {
        if (prop.node.data.isDir) {
          isOpen.value = !isOpen.value
        }
      }
      const onClickItem = (e) => {
        if (!prop?.node?.data?.id) {
          e.preventDefault()
          return
        }
        if (prop.node.data.isDir) {
          e.preventDefault()
          return
        }
        if (activeElId.value === prop.node.data.id) {
          e.preventDefault()
          return
        }
      }
      watch(() => searchStr.value, (v) => {
        if (!v) {
          return
        }
        if (prop?.node?.data?.name) {
          if (prop.node.data.name.indexOf(v) != -1) {
            emit('searchSuccess')
          }
        }
        isOpen.value = false
      })
      const onSearchSuccess = () => {
        emit('searchSuccess')
        isOpen.value = true
      }
      const closeAll = () => {
        isOpen.value = false
        for (const refItem of itemRef.value) {
          if (refItem && isFunction(refItem.closeAll)) {
            refItem.closeAll()
          }
        }
      }
      const openAll = () => {
        if (prop.node.isDir) {
          isOpen.value = true
          for (const refItem of itemRef.value) {
            if (refItem && isFunction(refItem.openAll)) {
              refItem.openAll()
            }
          }
        }
      }
      return {
        setItemRef,
        isActive,
        showBlueBorder,
        isOpen,
        onChangeOpen,
        showNumber,
        getNumberTitle,
        onClickItem,
        searchStr,
        onSearchSuccess,
        noteName,
        closeAll,
        openAll,
      }
    },
  })
</script>

<style scoped>

</style>
