<template>
  <div class="h-full flex">
    <Menu class="border-r"
          @changeShow="getWidgetWrapperWidth"></Menu>
    <div class="w-full flex flex-col">
      <div class="flex-none h-[64px] bg-blue-100 flex justify-between px-[8px]">
        <div class="fa-center text-2xl">{{ mainStore.currentWorkspace.name || '-' }}</div>
        <div class="fa-center">
          <button class="yiu-blue-big-circular-btn fa-center mr-2">
            <span class="iconify block mr-1" data-icon="mdi:magnify" data-inline="false"></span>
            <span>全局搜索</span>
          </button>
          <button v-show="!customizeMode"
                  class="yiu-blue-big-circular-btn fa-center"
                  @click="onChangeCustomizeMode">
            <span class="iconify block mr-1" data-icon="mdi:pencil-outline" data-inline="false"></span>
            <span>自定义</span>
          </button>
          <button v-show="customizeMode"
                  class="yiu-blue-big-circular-btn fa-center"
                  @click="onChangeCustomizeMode">
            <span class="iconify block mr-1" data-icon="mdi:check" data-inline="false"></span>
            <span>完成</span>
          </button>
        </div>
      </div>
      <div class="bg-blue-50 h-full overflow-hidden flex">
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
                      @delSuccess="onWidgetDel">
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

  export default defineComponent({
    name: 'Dashboard',
    components: {
      Menu,
      CustomizeModal,
      Widget,
      NSpin,
    },
    setup() {
      let widgetWrapperWidth = ref(0)
      const mainStore = useMainStore()
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
            layoutList.value = res.data.result
            getWidgetWrapperWidth()
          },
        })
      }
      const onWidgetDel = () => {
        getLayoutList()
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
      provide('widgetWrapperWidth', widgetWrapperWidth)

      getLayoutList()
      return {
        mainStore,
        customizeMode,
        layoutList,
        layoutLoading,
        getLayoutList,
        getWidgetWrapperWidth,
        onChangeCustomizeMode,
        onWidgetDel,
      }
    },
  })
</script>

<style scoped>

</style>
