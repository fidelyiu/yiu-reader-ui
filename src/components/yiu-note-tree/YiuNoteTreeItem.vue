<template>
  <div class="w-full">
    <div class="flex hover:bg-blue-50 p-2 cursor-pointer" @click="onClick">
      <div class="flex-none fa-center text-gray-500">
        <span v-show="showNumber" class="italic font-normal mr-1">{{ numberTitle }}</span>
        <span v-show="showIcon" class="mr-1">
          <div v-if="!node?.data?.isDir">
            <span class="iconify block text-xl" data-icon="mdi:language-markdown-outline" data-inline="false"></span>
          </div>
          <div v-else>
            <transition name="yiu-fade-in">
              <div v-if="isOpen">
                <span class="iconify block text-xl" data-icon="mdi:folder-open-outline" data-inline="false"></span>
              </div>
              <div v-else>
                <span class="iconify block text-xl" data-icon="mdi:folder-outline" data-inline="false"></span>
              </div>
            </transition>
          </div>
        </span>
      </div>
      <div class="flex-grow flex items-center w-0 truncate select-none mr-2">
        <span class="mr-2 font-semibold">
          <span v-if="node.data.name.indexOf(searchStr) > -1">{{
              node.data.name.substr(0, node.data.name.indexOf(searchStr))
            }}<span class="bg-yellow-200">{{
                searchStr
              }}</span>{{ node.data.name.substr(node.data.name.indexOf(searchStr) + searchStr.length) }}</span>
        <span v-else>{{ node.data.name }}</span>
        </span>
        <span v-if="!node.data.defStatus" class="text-gray-400">[未排序]</span>
      </div>
      <div class="flex-none">
        <slot :node="node"></slot>
      </div>
    </div>
    <transition name="yiu-fade-in">
      <div v-show="isOpen && node?.child && node?.child?.length" class="ml-[16px]">
        <YiuTreeItem v-for="(item, index) in node.child"
                     :key="index"
                     :node="item"
                     :number-title="numberTitle+getNumberTitle(index)"
                     class="border-l border-blue-200"
                     @click="onClick"
                     @searchSuccess="onSearchSuccess">
          <template #default="slotProps">
            <slot :node="slotProps.node"></slot>
          </template>
        </YiuTreeItem>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, watch } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { isString } from 'lodash'

  export default defineComponent({
    name: 'YiuTreeItem',
    props: {
      node: propTypes.object,
      numberTitle: propTypes.string.isRequired,
    },
    emits: ['click', 'searchSuccess'],
    setup(prop, { emit }) {
      const showNumber: any = inject('showNumber')
      const showIcon: any = inject('showIcon')
      const searchStr: any = inject('searchStr')
      watch(() => searchStr.value, (v) => {
        if (!v) {
          return
        }
        if (prop?.node?.data?.name) {
          if (prop.node.data.name.indexOf(v) != -1) {
            emit('searchSuccess')
          }
        } else {
          isOpen.value = false
        }
      })
      const onSearchSuccess = () => {
        emit('searchSuccess')
        isOpen.value = true
      }

      const isOpen = ref(false)
      const onClick = (id: any) => {
        if (isString(id)) {
          emit('click', id)
        } else {
          if (prop?.node?.data?.isDir) {
            isOpen.value = !isOpen.value
          } else {
            emit('click', prop?.node?.id)
          }
        }
      }
      const getNumberTitle = (index: any) => {
        index = index as number
        return (index + 1) + '.'
      }

      return {
        isOpen,
        searchStr,
        onClick,
        showNumber,
        showIcon,
        onSearchSuccess,
        getNumberTitle,
      }
    },
  })
</script>

<style scoped>

</style>
