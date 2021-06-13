<template>
  <div class="relative" :class="{'h-full': workspaceListLoading}">
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
      <div class="flex-none">
        <div class="p-2 bg-blue-100 hover:bg-blue-50">
          <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
        </div>
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
          <div class="w-full truncate text-gray-700 font-medium">{{ item.name }}</div>
          <div class="w-full truncate text-gray-500 font-light">{{ item.url }}</div>
        </div>
        <div class="flex-none flex">
          <div class="self-center mr-4">
            <div class="p-2 bg-blue-100 hover:bg-gray-50">
              <span class="iconify block" data-icon="mdi:pencil-outline" data-inline="false"></span>
            </div>
          </div>
          <div class="self-center mr-4">
            <div class="p-2 bg-blue-100 hover:bg-gray-50">
              <span class="iconify block" data-icon="mdi:arrow-up" data-inline="false"></span>
            </div>
          </div>
          <div class="self-center mr-4">
            <div class="p-2 bg-blue-100 hover:bg-gray-50">
              <span class="iconify block" data-icon="mdi:arrow-down" data-inline="false"></span>
            </div>
          </div>
          <div class="self-center">
            <div class="p-2 bg-blue-100 hover:bg-gray-50">
              <span class="iconify block" data-icon="mdi:delete-forever-outline" data-inline="false"></span>
            </div>
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

  export default defineComponent({
    name: 'WorkspaceList',
    components: { LoadingIcon },
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
        }, 3000)
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
