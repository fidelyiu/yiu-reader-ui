<template>
  <div class="transition-all ease-in-out h-full flex flex-col" :class="{'w-67':show, 'w-12':!show}">
    <!--头部按钮-->
    <div class="h-[64px] px-[16px] flex-none flex items-center">
      <div class="w-full fa-center">
        <n-popover trigger="click"
                   :show-arrow="false"
                   placement="bottom-start">
          <template #trigger>
            <button class="header-btn" :class="{'px-4': show}">
              <span v-show="show" class="w-full fa-center block">
                <span class="truncate">工作空间</span>
                <span class="iconify flex-none text-lg" data-icon="mdi:menu-down" data-inline="false"></span>
              </span>
              <div v-show="!show" class="fa-center">
                <span class="iconify text-sm" data-icon="mdi:cog-outline" data-inline="false"></span>
              </div>
            </button>
          </template>
          <div>
            <div>倒序{{ show }}</div>
            <div>设置</div>
            <div>关于</div>
          </div>
        </n-popover>
      </div>
    </div>
    <!--中间菜单-->
    <div class="flex-grow h-0 overflow-y-auto">
      <n-spin :show="searchLoading" size="small">
        <template v-for="item in workspaceList" :key="item.id">
          <MenuItem :active="isActiveItem(item)" :show-dot="show" :workspace="item"></MenuItem>
        </template>
      </n-spin>
    </div>
    <!--底部的折叠按钮-->
    <button class="h-[44px] flex-none hover:bg-blue-50 active:bg-blue-100 focus:outline-none" @click="changeShowMenu">
      <span class="fa-center transition-all transform ease-in-out"
            :class="{'rotate-180': show}">
        <span class="iconify text-xl"
              data-icon="mdi:chevron-right"
              data-inline="false"></span>
      </span>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { NPopover, NSpin } from 'naive-ui'
  import MenuItem from '/@/views/dashboard/menu/MenuItem.vue'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { WorkspaceEntity } from '/@/vo/workspace'
  import { SortType } from '/@/vo/enum/sort-type'
  import { useMainStore } from '/@/store/modules/main'
  import { ObjStatus } from '/@/vo/enum/obj-status'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'Menu',
    components: {
      NPopover,
      NSpin,
      MenuItem,
    },
    props: {
      show: propTypes.bool.def(true),
    },
    emits: ['changeShow'],
    setup(_prop, { emit }) {
      const mainStore = useMainStore()
      const changeShowMenu = () => {
        emit('changeShow')
      }
      const workspaceList = ref<Array<WorkspaceEntity>>([])
      const searchLoading = ref(false)
      const searchSort = ref<SortType>(SortType.ASE)
      const onSearch = () => {
        workspaceList.value = []
        yiuHttp({
          loading: { flag: searchLoading },
          api: SERVER_API.workspaceApi.search,
          params: {
            sortType: searchSort.value,
            objStatus: ObjStatus.Valid,
          },
          success: (res) => {
            if (res.data.result) {
              workspaceList.value = res.data.result
            }
          },
        })
      }
      const isActiveItem = (item) => {
        return mainStore.currentWorkspace.id === item?.id
      }
      onSearch()
      return {
        workspaceList,
        searchLoading,
        searchSort,
        changeShowMenu,
        isActiveItem,
      }
    },
  })
</script>

<style scoped>
  .header-btn {
    @apply bg-blue-100 focus:outline-none;
    @apply h-[32px] w-full min-w-[32px] rounded-2xl fa-center;
  }

  .header-btn:hover {
    background: rgba(219, 234, 254, .7)
  }

  .header-btn:active {
    background: rgba(219, 234, 254, .8)
  }
</style>
