<template>
  <div class="p-2 absolute"
       :class="{
         'select-none': moveState || resizeState,
         moving: moveState,
         resizing: resizeState,
       }"
       :style="mainStyle()">
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
           @mousedown="onMoveStart"
           @click="selectId">
        <div class="customize-overlay"
             :class="{'!border-blue-400 customize-overlay-select': isSelectId}">
          <button class="yiu-modal-close-btn-2"
                  @click.stop="delLayout">
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
       :style="moveGhostStyle()">
    <div class="h-full w-full bg-indigo-400 opacity-60"/>
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
    <div class="h-full w-full bg-indigo-400 opacity-60"/>
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
  import { isNumber } from 'lodash'

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
        return isSelectId.value && !moveState.value
      })
      const moveState = ref<any>()
      const resizeState = ref<any>()
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
      const initMousePosition = {
        x: 0,
        y: 0,
      }
      const onMoveStart = (e) => {
        // 初始化鼠标位置
        initMousePosition.x = e.clientX
        initMousePosition.y = e.clientY
        // 修改移动状态
        updateMoveState(e)
        window.addEventListener('mousemove', onMoveUpdate)
        window.addEventListener('mouseup', onMoveEnd)
      }
      const updateMoveState = (e) => {
        const gridSize = 50
        const zoom = 0.75
        // 获取此时鼠标相对于初始状态下的距离
        const mouseDeltaX = e.clientX - initMousePosition.x
        const mouseDeltaY = e.clientY - initMousePosition.y

        // 修改组件的left和top
        const pxX = prop.layout.left + mouseDeltaX / zoom
        const pxY = prop.layout.top + mouseDeltaY / zoom

        // 计算移动阴影的left和top
        let x = gridSize * Math.round(pxX / gridSize)
        let y = gridSize * Math.round(pxY / gridSize)
        if (x < 0) x = 0
        if (y < 0) y = 0
        moveState.value = { pxX, pxY, x, y }
      }
      const onMoveUpdate = (e) => {
        updateMoveState(e)
      }
      const onMoveEnd = (e) => {
        updateMoveState(e)
        removeMoveListeners()
        moveState.value = undefined
      }
      const removeMoveListeners = () => {
        window.removeEventListener('mousemove', onMoveUpdate)
        window.removeEventListener('mouseup', onMoveEnd)
      }
      const mainStyle = () => {
        if (moveState.value) {
          return {
            left: `${moveState.value.pxX || 0}px`,
            top: `${moveState.value.pxY || 0}px`,
            width: `${prop.layout.width || 0}px`,
            height: `${prop.layout.height || 0}px`,
          }
        }
        if (resizeState.value) {
          return {}
        }
        return {
          left: `${prop.layout.left || 0}px`,
          top: `${prop.layout.top || 0}px`,
          width: `${prop.layout.width || 0}px`,
          height: `${prop.layout.height || 0}px`,
        }
      }
      const moveGhostStyle = () => {
        let x = moveState.value.x
        let y = moveState.value.y
        if (!isNumber(x)) {
          x = prop.layout.left || 0
        }
        if (!isNumber(y)) {
          y = prop.layout.top || 0
        }
        return {
          left: `${x}px`,
          top: `${y}px`,
          width: `${prop.layout.width || 0}px`,
          height: `${prop.layout.height || 0}px`,
        }
      }
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
        onMoveStart,
        mainStyle,
        moveGhostStyle,
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
