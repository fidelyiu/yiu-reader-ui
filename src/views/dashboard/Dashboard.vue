<template>
  <div class="h-full flex">
    <Menu class="border-r"></Menu>
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
                  @click="customizeMode=!customizeMode">
            <span class="iconify block mr-1" data-icon="mdi:pencil-outline" data-inline="false"></span>
            <span>自定义</span>
          </button>
          <button v-show="customizeMode"
                  class="yiu-blue-big-circular-btn fa-center"
                  @click="customizeMode=!customizeMode">
            <span class="iconify block mr-1" data-icon="mdi:check" data-inline="false"></span>
            <span>完成</span>
          </button>
        </div>
      </div>
      <div class="bg-blue-50 h-full overflow-hidden flex">
        <div class="m-2 flex-grow overflow-auto">
          <div class="relative w-full transform origin-top-left transition-all"
               :class="{'scale-75': customizeMode}">
            <Widget v-for="item in layoutList"
                    :key="item.id"
                    :layout="item"
                    class="absolute"
                    :style="{
                    'left': (item.left||0)+'px',
                    'top':(item.top||0)+'px',
                    'width':(item.width||0)+'px',
                    'height':(item.height||0)+'px',
                  }">
            </Widget>
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
  import { defineComponent, ref } from 'vue'
  import Menu from '/@/views/dashboard/menu/Menu.vue'
  import { useMainStore } from '/@/store/modules/main'
  import CustomizeModal from '/@/views/dashboard/customize-modal/CustomizeModal.vue'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { LayoutEntity } from '/@/vo/layout'
  import Widget from '/@/views/dashboard/widget/Widget.vue'

  export default defineComponent({
    name: 'Dashboard',
    components: {
      Menu,
      CustomizeModal,
      Widget,
    },
    setup() {
      const mainStore = useMainStore()
      const customizeMode = ref(false)
      const layoutList = ref<Array<LayoutEntity>>()
      const getLayoutList = () => {
        yiuHttp({
          api: SERVER_API.layoutApi.search,
          success: (res) => {
            layoutList.value = res.data.result
          },
        })
      }
      getLayoutList()
      return {
        mainStore,
        customizeMode,
        layoutList,
        getLayoutList,
      }
    },
  })
</script>

<style scoped>

</style>
