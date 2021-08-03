<template>
  <div class="h-full flex">
    <Menu class="border-r"
          :show="mainStore.getSidebarStatus"
          @changeShow="changeMenu"></Menu>
    <div class="w-full flex flex-col">
      <div class="flex-none h-[64px] bg-blue-200 flex justify-between px-[8px]">
        <div class="flex items-center text-2xl flex-grow w-0">
          <span class="truncate flex-none">{{ mainStore.currentWorkspace.name || '-' }}</span>
          <span class="flex-none" v-show="mainStore.changingWorkspace">
            <n-spin class="ml-[8px] p-[4px]"/>
          </span>
        </div>
        <div class="fa-center flex-none">
          <button class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none">
            <span class="iconify block mr-1" data-icon="mdi:magnify" data-inline="false"></span>
            <span>全局搜索</span>
          </button>
          <button v-show="!showSetting && width > 480"
                  class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                  @click="showSetting=!showSetting">
            <span class="iconify block mr-1" data-icon="mdi:cog" data-inline="false"></span>
            <span>开启设置</span>
          </button>
          <button v-show="showSetting && width > 480"
                  class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                  @click="showSetting=!showSetting">
            <span class="iconify block mr-1" data-icon="mdi:cog-off" data-inline="false"></span>
            <span>关闭设置</span>
          </button>
          <button v-show="!customizeMode && width > 480"
                  class="yiu-blue-big-circular-btn fa-center focus:outline-none"
                  @click="onChangeCustomizeMode">
            <span class="iconify block mr-1" data-icon="mdi:pencil-outline" data-inline="false"></span>
            <span>自定义</span>
          </button>
          <button v-show="customizeMode && width > 480"
                  class="yiu-blue-big-circular-btn fa-center focus:outline-none"
                  @click="onChangeCustomizeMode">
            <span class="iconify block mr-1" data-icon="mdi:check" data-inline="false"></span>
            <span>完成</span>
          </button>
        </div>
      </div>
      <div class="bg-blue-100 h-full overflow-hidden flex">
        <div class="w-0 h-full flex-grow relative p-2">
          <div v-if="layoutLoading"
               class="absolute inset-0 grid justify-center content-center z-50 bg-white"
               style="--tw-bg-opacity: .6">
            <n-spin></n-spin>
          </div>
          <div id="widget-box" class="h-full overflow-auto">
            <div id="widget-wrapper"
                 class="relative w-full transform origin-top-left transition-all"
                 :class="{'scale-75': customizeMode}">
              <Widget v-for="item in layoutList"
                      :key="item.id"
                      :layout="item"
                      :customize-mode="customizeMode"
                      @delete="getLayoutList"
                      @update="getLayoutList">
              </Widget>
            </div>
          </div>
        </div>
        <transition name="yiu-x-right">
          <div v-show="customizeMode" class="flex-none w-[360px] bg-white shadow-xl">
            <CustomizeModal @close="customizeMode=!customizeMode"
                            @addSuccess="getLayoutList"></CustomizeModal>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, provide, ref } from 'vue'
  import Menu from '/@/views/dashboard/menu/Menu.vue'
  import { useMainStore } from '/@/store/modules/main'
  import CustomizeModal from '/@/views/dashboard/customize-modal/CustomizeModal.vue'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { LayoutEntity } from '/@/vo/layout'
  import Widget from '/@/views/dashboard/widget/Widget.vue'
  import { NSpin } from 'naive-ui'
  import { useWidgetStore } from '/@/store/modules/widget'
  import { layoutTypeIsLink, layoutTypeIsMainBox } from '/@/vo/enum/layout-type'
  import { useWindowSize } from '@vueuse/core'

  export default defineComponent({
    name: 'Dashboard',
    components: {
      Menu,
      CustomizeModal,
      Widget,
      NSpin,
    },
    setup() {
      const { width } = useWindowSize()
      const widgetWrapperWidth = ref(0)
      provide('widgetWrapperWidth', widgetWrapperWidth)
      const linkCount = ref(0)
      provide('linkCount', linkCount)
      const mainBoxCount = ref(0)
      provide('mainBoxCount', mainBoxCount)
      const showSetting = ref(false)
      provide('showSetting', showSetting)
      const mainStore = useMainStore()
      mainStore.initBoolValue()
      const changeMenu = () => {
        mainStore.setSidebarStatus(!mainStore.getSidebarStatus)
        getWidgetWrapperWidth()
      }

      const widgetStore = useWidgetStore()
      const customizeMode = ref(false)
      const layoutLoading = ref(false)
      const layoutList = ref<Array<LayoutEntity>>()
      const getLayoutList = () => {
        if (layoutLoading.value) {
          return
        }
        yiuHttp({
          api: SERVER_API.layoutApi.search,
          loading: { flag: layoutLoading },
          success: (res) => {
            linkCount.value = 0
            mainBoxCount.value = 0
            res.data.result.forEach((item: LayoutEntity) => {
              if (layoutTypeIsLink(item.type)) {
                linkCount.value++
              }
              if (layoutTypeIsMainBox(item.type)) {
                mainBoxCount.value++
              }
            })
            layoutList.value = res.data.result
            getWidgetWrapperWidth()
          },
        })
      }
      onMounted(() => {
        getWidgetWrapperWidth()
      })
      const onChangeCustomizeMode = () => {
        widgetStore.$reset()
        customizeMode.value = !customizeMode.value
        getWidgetWrapperWidth()
      }
      const getWidgetWrapperWidth = () => {
        // 考虑到菜单收起的动画过程
        setTimeout(() => {
          let wrapperWidth = document.getElementById('widget-wrapper')?.scrollWidth || 0
          let boxWidth = document.getElementById('widget-box')?.scrollWidth || 0
          if (customizeMode.value) {
            // 在修改情况下
            if (boxWidth + 360 > wrapperWidth) {
              widgetWrapperWidth.value = boxWidth + 360
            } else {
              widgetWrapperWidth.value = wrapperWidth
            }
          } else {
            if (boxWidth > wrapperWidth) {
              widgetWrapperWidth.value = boxWidth
            } else {
              widgetWrapperWidth.value = wrapperWidth
            }
          }
        }, 160)
      }

      getLayoutList()
      return {
        width,
        showSetting,
        mainStore,
        changeMenu,
        customizeMode,
        layoutList,
        layoutLoading,
        getLayoutList,
        onChangeCustomizeMode,
      }
    },
  })
</script>

<style scoped>

</style>
