<template>
  <div class="p-2 absolute"
       :class="{
         moving: moveState,
         resizing: resizeState,
       }"
       :style="{
         'left': (layout.left||0)+'px',
         'top':(layout.top||0)+'px',
         'width':(layout.width||0)+'px',
         'height':(layout.height||0)+'px',
       }">
    <div class="shell">
      <!--组件内容-->
      <div class="w-full h-full overflow-auto"
           :class="{'select-none': customizeMode}"
           :style="{opacity: customizeMode?'.15':'1'}">
        <div>{{ layoutType }}</div>
        <div>{{ layout.id }}</div>
        <div>{{ layout.top }}</div>
        <div>{{ layout.left }}</div>
      </div>
      <!--修改状态-->
      <div v-if="customizeMode"
           class="absolute top-0 left-0 w-full h-full cursor-move"
           @click="selectId">
        <div class="customize-overlay"
             :class="{'!border-blue-400 customize-overlay-select': isSelectId}">
          <button class="yiu-modal-close-btn-2" @click="delLayout">
            <div v-show="delLoading">
              <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>
            </div>
            <div v-show="!delLoading">
              <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
            </div>
          </button>
          <!--链接-->
          <div v-show="layoutTypeIsLink(layoutType)"
               class="big-circular-btn bg-blue-400 select-none fa-center transform scale-125">
            <span class="iconify block mr-1" data-icon="mdi:link-variant" data-inline="false"></span>
            <span>链接{{ showResizeHandle }}</span>
          </div>
          <!--外层的8个点-->
          <template v-if="showResizeHandle">
            <div v-for="handle of resizeHandles"
                 :key="handle"
                 class="resize-handle"
                 :class="[handle]"
            ></div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <!--移动状态-->
  <div v-if="moveState"
       class="move-ghost"
       :style="{
         'left': (layout.left||0)+'px',
         'top':(layout.top||0)+'px',
         'width':(layout.width||0)+'px',
         'height':(layout.height||0)+'px',
       }">
    <div class="h-full w-full bg-indigo-400"/>
  </div>
  <!--调整大小状态-->
  <div v-if="resizeState"
       class="resize-ghost"
       :style="{
         'left': (layout.left||0)+'px',
         'top':(layout.top||0)+'px',
         'width':(layout.width||0)+'px',
         'height':(layout.height||0)+'px',
       }">
    <div class="h-full w-full bg-indigo-400"/>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { layoutTypeIsLink } from '/@/vo/enum/layout-type'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { useNotification } from 'naive-ui'
  import { useWidgetStore } from '/@/store/modules/widget'

  export default defineComponent({
    name: 'Widget',
    props: {
      customizeMode: propTypes.bool.def(false),
      layout: propTypes.object.isRequired,
    },
    emits: ['delSuccess'],
    setup(prop, { emit }) {
      const notification = useNotification()
      const widgetStore = useWidgetStore()
      const layoutType = computed(() => prop.layout.type)
      const delLoading = ref(false)
      const isSelectId = computed(() => widgetStore.getSelectWidgetId === prop.layout.id)
      const selectId = () => {
        widgetStore.setSelectWidgetId(prop.layout.id)
      }
      const delLayout = () => {
        if (prop.layout.id && !delLoading.value) {
          yiuHttp({
            api: SERVER_API.layoutApi.del,
            loading: { flag: delLoading },
            pathData: { id: prop.layout.id },
            tips: { anyObj: notification, error: { show: true } },
            success: (_res) => emit('delSuccess'),
          })
        }
      }
      const showResizeHandle = computed(() => {
        // 选择状态 && 非移动状态 && 可以修改大小的组件
        return isSelectId.value
      })
      const moveState = ref(false)
      const resizeState = ref(false)
      const resizeHandles = [
        'top-left',
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
      ]
      return {
        layoutType,
        layoutTypeIsLink,
        delLoading,
        delLayout,
        isSelectId,
        selectId,
        showResizeHandle,
        resizeHandles,
        moveState,
        resizeState,
      }
    },
  })
</script>

<style scoped>
  .customize-overlay {
    @apply w-full h-full relative grid justify-center content-center rounded border-2 border-transparent;
    @apply transition-all ease-in-out;
  }

  .customize-overlay:hover {
    @apply bg-blue-300 ;
    --tw-bg-opacity: .3;
  }

  .customize-overlay-select {
    @apply bg-blue-300 ;
    --tw-bg-opacity: .3;
  }

  .shell {
    @apply p-2 bg-white rounded shadow w-full h-full relative;
  }

  .move-ghost,
  .resize-ghost {
    @apply absolute p-2;
    z-index: 10000;
  }

  .moving .shell,
  .resize .shell {
    z-index: 10001;
    opacity: .7;
  }
</style>
