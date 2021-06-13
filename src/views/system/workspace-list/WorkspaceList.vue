<template>
  <div class="relative" :class="{'h-full': workspaceListLoading||!workspaceList.length}">
    <!--搜索框-->
    <div class="w-full flex px-4 pb-4 sticky top-0 bg-white">
      <div class="flex-grow mr-4">
        <div class="flex rounded-3xl border-1 border-blue-100 bg-blue-50 overflow-hidden transition-all ease-in-out"
             :class="{'!bg-white': searchActive}">
        <span class="iconify self-center ml-3 mr-2 text-lg text-gray-500"
              data-icon="mdi:magnify"
              data-inline="false"></span>
          <input class="w-full h-[30px] outline-none text-sm bg-blue-50 transition-all ease-in-out"
                 :class="{'!bg-white': searchActive}"
                 type="text"
                 @focus="searchActive = true"
                 @blur="searchActive = false">
        </div>
      </div>
      <!--添加按钮-->
      <div class="flex-none">
        <SquareButton>
          <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
        </SquareButton>
      </div>
    </div>
    <!--空数据栏-->
    <div v-if="!workspaceListLoading && !workspaceList.length"
         class="absolute inset-0 mt-[32px] grid place-items-center">
      <div class="flex items-center text-gray-500">
        <span class="iconify text-2xl" data-icon="mdi:inbox" data-inline="false"></span>
        <span class="leading-10 text-base">暂无数据</span>
      </div>
    </div>
    <!--加载栏-->
    <div v-if="workspaceListLoading" class="absolute inset-0 mt-[32px] grid justify-center content-center">
      <LoadingIcon class="text-2xl object-center"></LoadingIcon>
    </div>
    <!--列表-->
    <template v-else>
      <div v-for="(item, index) in workspaceList"
           :key="index"
           class="py-3 px-4 hover:bg-blue-50 flex">
        <template v-if="item.isEffective">
          <span class="iconify block flex-none text-4xl self-center mr-4 text-blue-400"
                data-icon="mdi:book"
                data-inline="false"></span>
        </template>
        <template v-else>
          <span class="iconify block flex-none text-4xl self-center mr-4 text-red-400"
                data-icon="mdi:book-remove"
                data-inline="false"></span>
        </template>
        <div class="flex-grow w-0 mr-4">
          <div class="w-full truncate text-gray-700 font-medium" :class="{'!text-red-400': !item.isEffective}">
            {{ item.name }}
          </div>
          <div class="w-full truncate text-gray-500 font-light" :class="{'!text-red-300': !item.isEffective}">
            {{ item.url }}
          </div>
        </div>
        <div class="flex-none flex">
          <div v-if="!item.isEffective" class="self-center mr-4">
            <NTooltip :style="{ maxWidth: '300px' }" placement="top">
              <template #trigger>
                <div>
                  <SquareButton disable>
                    <span class="iconify block" data-icon="mdi:help-circle" data-inline="false"></span>
                  </SquareButton>
                </div>
              </template>
              <span>该工作空间路径已失效，请将丢失的文件夹还原，或者删除该工作空间!</span>
            </NTooltip>
          </div>
          <div class="self-center mr-4">
            <SquareButton :disable="!item.isEffective">
              <span class="iconify block" data-icon="mdi:pencil-outline" data-inline="false"></span>
            </SquareButton>
          </div>
          <div class="self-center mr-4">
            <SquareButton>
              <span class="iconify block" data-icon="mdi:arrow-up" data-inline="false"></span>
            </SquareButton>
          </div>
          <div class="self-center mr-4">
            <SquareButton>
              <span class="iconify block" data-icon="mdi:arrow-down" data-inline="false"></span>
            </SquareButton>
          </div>
          <div class="self-center">
            <SquareButton>
              <span class="iconify block" data-icon="mdi:delete-forever-outline" data-inline="false"></span>
            </SquareButton>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { boolGetRandom } from 'yiu-js/bool/bool-get'
  import LoadingIcon from '/@/components/LoadingIcon.vue'
  import SquareButton from '/@/components/SquareButton.vue'
  import { NTooltip } from 'naive-ui'

  export default defineComponent({
    name: 'WorkspaceList',
    components: { LoadingIcon, SquareButton, NTooltip },
    setup() {
      onMounted(() => {
        getWorkspaceList()
      })

      // 工作空间加载状态
      const workspaceListLoading = ref(false)
      // 工作空间列表
      const workspaceList = reactive<Array<{
        name: string,
        url: string,
        isEffective: boolean
      }>>([])
      // 获取工作空间的方法
      const getWorkspaceList = () => {
        workspaceListLoading.value = true
        setTimeout(() => {
          for (let i = 0; i < 50; i++) {
            workspaceList.push({
              name: 'Item' + (i + 1),
              url: 'F:\\CodeLearn\\vue3\\ant-vue1\\' + (i + 1),
              isEffective: boolGetRandom(),
            })
          }
          workspaceListLoading.value = false
        }, 1000)
      }
      // 搜索栏是否激活状态
      const searchActive = ref(false)
      return {
        workspaceListLoading,
        workspaceList,
        getWorkspaceList,
        searchActive,
      }
    },
  })
</script>

<style scoped>

</style>
