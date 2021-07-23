<template>
  <div class="w-full">
    <div class="flex hover:bg-blue-50 p-2 cursor-pointer" @click.stop="onClick">
      <div v-show="showNumber" class="flex-none fa-center text-gray-500 mr-1">
        <span class="italic font-normal"
              :class="{'text-red-400': isInvalidFile}">{{ numberTitle }}</span>
      </div>
      <div v-show="showIcon" class="flex-none fa-center text-gray-500 mr-1">
        <div v-if="!node?.data?.isDir">
          <div v-if="isInvalidFile">
              <span class="iconify block text-xl text-red-400"
                    data-icon="mdi:language-markdown-outline"
                    data-inline="false"></span>
          </div>
          <div v-else>
              <span class="iconify block text-xl"
                    data-icon="mdi:language-markdown-outline"
                    data-inline="false"></span>
          </div>
        </div>
        <div v-else>
          <transition name="yiu-fade-in">
            <div v-if="isOpen">
              <div v-if="isInvalidFile">
                  <span class="iconify block text-xl text-red-400"
                        data-icon="mdi:folder-open-outline"
                        data-inline="false"></span>
              </div>
              <div v-else>
                  <span class="iconify block text-xl"
                        data-icon="mdi:folder-open-outline"
                        data-inline="false"></span>
              </div>
            </div>
            <div v-else>
              <div v-if="isInvalidFile">
                  <span class="iconify block text-xl text-red-400"
                        data-icon="mdi:folder-outline"
                        data-inline="false"></span>
              </div>
              <div v-else>
                  <span class="iconify block text-xl"
                        data-icon="mdi:folder-outline"
                        data-inline="false"></span>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="flex-grow flex items-center w-0 truncate select-none mr-2">
        <span class="mr-2 font-semibold" :class="{'text-red-400': isInvalidFile}">
          <span v-if="itemName.indexOf(searchStr) > -1">{{
              itemName.substr(0, itemName.indexOf(searchStr))
            }}<span class="bg-yellow-200">{{
                searchStr
              }}</span>{{ itemName.substr(itemName.indexOf(searchStr) + searchStr.length) }}</span>
          <span v-else>{{ itemName }}</span>
        </span>
        <span v-if="!node.data.sortNum" class="text-gray-400">[未排序]</span>
      </div>
      <div class="flex-none">
        <slot :node="node"></slot>
      </div>
    </div>
    <transition name="yiu-fade-in">
      <div v-show="isOpen && node?.child && node?.child?.length" class="ml-[16px]">
        <YiuTreeItem v-for="(item, index) in node.child"
                     :ref="setItemRef"
                     :key="item.id"
                     :node="item"
                     :number-title="numberTitle+getNumberTitle(index)"
                     class="border-l border-blue-200"
                     @itemClick="onItemClick"
                     @searchSuccess="onSearchSuccess"
                     @errFile="onErrFile">
          <template #default="slotProps">
            <slot :node="slotProps.node"></slot>
          </template>
        </YiuTreeItem>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref, watch } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { isFunction } from 'lodash'
  import { statusIsInvalid } from '/@/vo/enum/obj-status'

  export default defineComponent({
    name: 'YiuTreeItem',
    props: {
      node: propTypes.object,
      numberTitle: propTypes.string.isRequired,
    },
    emits: ['itemClick', 'searchSuccess', 'errFile'],
    setup(prop, { emit }) {
      const itemRef = []
      const setItemRef = (e) => {
        itemRef.push(e)
      }
      const showErrFile = () => {
        if (isInvalidFile.value) {
          emit('errFile')
        }
        isOpen.value = false
        if (itemRef && itemRef.length) {
          itemRef.forEach(item => {
            if (item && isFunction(item.showErrFile)) {
              item.showErrFile()
            }
          })
        }
      }
      const onErrFile = () => {
        emit('errFile')
        isOpen.value = true
      }
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
        }
        isOpen.value = false
      })
      const onSearchSuccess = () => {
        emit('searchSuccess')
        isOpen.value = true
      }

      watch(() => prop.node, (v, c) => {
        if (v.data.id !== c.data.id) isOpen.value = false
      })

      const isOpen = ref(false)
      const onClick = () => {
        if (isInvalidFile.value) return
        {
          if (prop?.node?.data?.isDir) {
            isOpen.value = !isOpen.value
          } else {
            emit('itemClick', prop?.node?.data?.id)
          }
        }
      }
      const onItemClick = (id) => {
        emit('itemClick', id)
      }
      const getNumberTitle = (index: any) => {
        index = index as number
        return (index + 1) + '.'
      }

      const isInvalidFile = computed(() => statusIsInvalid(prop?.node?.data?.status))
      const itemName = computed<string>(() => prop?.node?.data?.alias || prop?.node?.data?.name)

      return {
        isOpen,
        searchStr,
        onClick,
        showNumber,
        showIcon,
        onSearchSuccess,
        getNumberTitle,
        isInvalidFile,
        itemName,
        setItemRef,
        showErrFile,
        onErrFile,
        onItemClick,
      }
    },
  })
</script>

<style scoped>

</style>
