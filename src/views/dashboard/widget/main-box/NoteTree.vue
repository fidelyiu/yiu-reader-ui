<template>
  <div class="w-full overflow-auto">
    <div :style="boxStyle">
      <div v-for="item in renderingList"
           :key="item.id"
           class="flex"
           @click.stop="onClick(item)">
        <div v-for="i in (item.level-1)"
             :key="i"
             class="flex-none w-[16px] border-r border-blue-200 inline-block"
             :style="{'height': itemHeight + 'px'}"></div>
        <div :style="itemStyle"
             class="flex-grow flex hover:bg-blue-50 p-2"
             :class="{'cursor-pointer': item.isDir}">
          <div v-show="showNumber" class="flex-none fa-center text-gray-500 mr-1">
          <span class="italic font-normal"
                :class="{'text-red-400': statusIsInvalid(item.data.status)}">{{ getNumberTitle(item.number) }}</span>
          </div>
          <div v-show="showIcon" class="flex-none fa-center text-gray-500 mr-1">
            <div v-if="!item.isDir">
              <div v-if="statusIsInvalid(item.data.status)">
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
                <div v-if="item.isOpen">
                  <div v-if="statusIsInvalid(item.data.status)">
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
                  <div v-if="statusIsInvalid(item.data.status)">
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
          <div class="flex-grow flex items-center w-0 select-none mr-2">
            <div class="truncate">
              <span class="mr-2 font-semibold" :class="{'text-red-400': statusIsInvalid(item.data.status)}">
                <span v-if="item.name.indexOf(searchStr) > -1">{{
                    item.name.substr(0, item.name.indexOf(searchStr))
                  }}<span class="bg-yellow-200">{{
                      searchStr
                    }}</span>{{ item.name.substr(item.name.indexOf(searchStr) + searchStr.length) }}</span>
                <span v-else>{{ item.name }}</span>
              </span>
            </div>
            <div v-if="!item.data.sortNum" class="text-gray-400 flex-none">[未排序]</div>
          </div>
          <div class="flex-none">
            <slot :node="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, ref, watch } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { throttle } from 'lodash'
  import { statusIsInvalid } from '/@/vo/enum/obj-status'

  type DataItem = Partial<{
    id: string,
    name: string,
    data: any,
    number: Array<number>,
    level: number,
    hasChild: boolean,
    isDir: boolean,
    isOpen: boolean,
    parentIndex: Array<number>,
  }>

  export default defineComponent({
    name: 'NoteTree',
    props: {
      data: propTypes.object,
      showNumber: propTypes.bool.def(false),
      showIcon: propTypes.bool.def(false),
      searchStr: propTypes.string.def(''),
      itemHeight: propTypes.number.isRequired,
      itemPadding: propTypes.number.def(0),
      showNum: propTypes.number.def(30),
    },
    setup(prop) {
      const showNumValue = ref(prop.showNum)
      // 元素部分
      let el: HTMLElement | null
      // 滚动元素的高度
      let elHeight = -1
      // 滚动超过多少时更新的高度
      let updateHeight = -1
      let paddingTopHeight = ref(0)
      nextTick(() => {
        el = document.getElementById('yiu-note-tree-box')
        if (el) {
          el.addEventListener('scroll', onScroll)
          if (el.offsetHeight > 0) {
            elHeight = el.offsetHeight
          }
          if (elHeight > 0) {
            while (elHeight > prop.itemHeight * showNumValue.value) {
              showNumValue.value += 30
            }
            updateHeight = prop.itemHeight * showNumValue.value / 2
          }
        }
      })
      // 上一次更新视图元素时，滚动高度
      const lastScrollTop = ref(0)
      const onScroll = throttle((e) => {
        if (e.target.scrollTop) {
          let scrollHeight = e.target.scrollTop - lastScrollTop.value
          if (scrollHeight < 0) scrollHeight = -scrollHeight
          if (scrollHeight > updateHeight) {
            lastScrollTop.value = e.target.scrollTop
            getRenderingList()
          }
        }
      }, 500)


      const dataList = ref<Array<DataItem>>([])
      // const preList = ref<Array<DataItem>>([])
      const renderingList = ref<Array<DataItem>>([])
      // const nextList = ref<Array<DataItem>>([])
      const boxHeight = ref(0)
      const boxStyle = computed(() => ({
        'height': boxHeight.value + 'px',
        'padding-top': paddingTopHeight.value + 'px',
      }))
      const itemStyle = computed(() => ({
        'height': prop.itemHeight + 'px',
        'padding': prop.itemPadding + 'px',
      }))

      const getArrData = (list) => {
        const _getArrData = (list, level, number) => {
          const result: Array<DataItem> = []
          if (list && list.length) {
            let i = 0
            for (let item of list) {
              i++
              const tempData: DataItem = {
                id: item.data.id,
                name: item.data.alias || item.data.name || '-',
                data: item.data,
                number: [...number, i],
                isDir: !!item.data.isDir,
                isOpen: false,
                level,
                parentIndex: [],
              }
              tempData.hasChild = !!(item.child && item.child.length)
              result.push(tempData)
              if (tempData.hasChild) {
                result.push(..._getArrData(item.child, level + 1, tempData.number))
              }
            }
          }
          return result
        }
        const result = _getArrData(list, 1, [])
        result.forEach(item => {
          if (item.data.parentId) {
            const parentIndex = result.findIndex(el => el.id === item.data.parentId)
            if (parentIndex !== -1) {
              item.parentIndex = []
              result[parentIndex].parentIndex?.forEach(el => {
                item.parentIndex?.push(el)
              })
              item.parentIndex.push(parentIndex)
            }
          }
        })
        return result
      }

      watch(
          () => prop.data,
          () => {
            dataList.value = getArrData(prop.data)
            getRenderingList()
            // boxHeight.value = prop.itemHeight * dataList.value.length
            // renderingList.value = dataList.value.slice(0, showNumValue.value)
          },
      )

      const getItemName = (item: DataItem) => {
        if (item.data) {
          return item.data.alias || item.data.name || '-'
        }
        return '-'
      }

      // 判断元素是否充当总高度的一部分
      const itemIsInAllList = (item: DataItem) => {
        if (item.parentIndex && item.parentIndex.length) {
          for (const pIndex of item.parentIndex) {
            if (pIndex >= 0 && pIndex < dataList.value.length) {
              if (!dataList.value[pIndex].isOpen) {
                return false
              }
            } else {
              return false
            }
          }
        }
        return true
      }
      const getRenderingList = () => {
        if (updateHeight <= 0) return
        const offsetPx = updateHeight * 2
        const startPx = lastScrollTop.value - offsetPx
        const endPx = lastScrollTop.value + elHeight + offsetPx
        let tempPaddingTop = 0
        let tempBoxHeight = 0
        const tempRenderingList: Array<DataItem> = []
        let i = 0
        // let ri = 0
        for (let dEl of dataList.value) {
          if (!itemIsInAllList(dEl)) continue
          i++
          if (i * prop.itemHeight <= startPx) {
            tempPaddingTop += prop.itemHeight
          }
          if (startPx < i * prop.itemHeight && i * prop.itemHeight < endPx) {
            tempRenderingList.push(dEl)
          }
          tempBoxHeight += prop.itemHeight
        }
        boxHeight.value = tempBoxHeight
        paddingTopHeight.value = tempPaddingTop
        renderingList.value = tempRenderingList
      }

      const getNumberTitle = (numberArr) => {
        if (numberArr && numberArr.length) {
          return numberArr.reduce((acc, t) => acc + t + '.', '')
        }
        return '-'
      }

      const onClick = (item: DataItem) => {
        if (statusIsInvalid(item.data.status)) return
        if (item.isDir) {
          item.isOpen = !item.isOpen
        }
        getRenderingList()
      }

      return {
        renderingList,
        boxHeight,
        boxStyle,
        itemStyle,
        getItemName,
        statusIsInvalid,
        getNumberTitle,
        onClick,
      }
    },
  })
</script>

<style scoped>

</style>
