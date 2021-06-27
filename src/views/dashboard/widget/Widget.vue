<template>
  <div class="p-2 absolute"
       :class="{
         'select-none': moveState || resizeState,
         moving: moveState,
         resizing: resizeState,
       }"
       :style="mainStyle()">
    <div class="shell"
         :class="{'shell-top': moveState||resizeState}">
      <!--组件内容-->
      <div class="w-full h-full overflow-auto"
           :class="{'select-none': customizeMode}"
           :style="{opacity: customizeMode?'.15':'1'}">
        <template v-if="layoutTypeIsLink(layoutType)">
          <LinkWidget :layout="layout" @update="$emit('update')"></LinkWidget>
        </template>
      </div>
      <!--修改状态-->
      <div v-if="customizeMode"
           class="absolute top-0 left-0 w-full h-full cursor-move"
           @mousedown="onMoveStart"
           @click="selectId">
        <div class="customize-overlay"
             :class="{'!border-blue-400 customize-overlay-select': isSelectId}">
          <div class="absolute top-2 left-2 w-full h-full overflow-hidden">{{ layout.setting.name || layout.id }}</div>
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
            <span>链接</span>
          </div>
          <!--外层的8个点-->
          <template v-if="showResizeHandle">
            <div v-for="handle of resizeHandles"
                 :key="handle"
                 class="resize-handle"
                 :class="[handle]"
                 @mousedown.stop="onResizeStart($event, handle)"
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
    <div class="h-full w-full bg-indigo-400 opacity-60 rounded"/>
  </div>
  <!--调整大小状态-->
  <div v-if="resizeState"
       class="resize-ghost"
       :style="resizeGhostStyle()">
    <div class="h-full w-full bg-indigo-400 opacity-60"/>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { layoutTypeIsLink } from '/@/vo/enum/layout-type'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { useNotification } from 'naive-ui'
  import { useWidgetStore } from '/@/store/modules/widget'
  import { isNumber } from 'lodash'
  import LinkWidget from '/@/views/dashboard/widget/LinkWidget.vue'

  export default defineComponent({
    name: 'Widget',
    components: {
      LinkWidget,
    },
    props: {
      customizeMode: propTypes.bool.def(false),
      layout: propTypes.object.isRequired,
    },
    emits: ['delete', 'update'],
    setup(prop, { emit }) {
      const gridSize = 50
      const zoom = 0.75
      const widgetWrapperWidth: any = inject('widgetWrapperWidth')
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
            success: (_res) => emit('delete'),
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
      let resizeHandle = ''
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
        const resizeLayout = {
          ...prop.layout,
          left: isNumber(moveState.value?.x) ? moveState.value?.x : (prop.layout.left || 0),
          top: isNumber(moveState.value?.y) ? moveState.value?.y : (prop.layout.top || 0),
        }
        if (resizeLayout.left !== prop.layout.left
            || resizeLayout.top !== prop.layout.top) {
          yiuHttp({
            api: SERVER_API.layoutApi.resizePosition,
            data: resizeLayout,
            params: { maxX: widgetWrapperWidth?.value },
            success: (_res) => emit('update'),
          })
        }
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
          return {
            left: `${resizeState.value.pxX || 0}px`,
            top: `${resizeState.value.pxY || 0}px`,
            width: `${resizeState.value.pxWidth || 0}px`,
            height: `${resizeState.value.pxHeight || 0}px`,
          }
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
      const onResizeStart = (e, handle) => {
        // 初始化鼠标位置
        initMousePosition.x = e.clientX
        initMousePosition.y = e.clientY
        resizeHandle = handle
        updateResizeState(e)
        window.addEventListener('mousemove', onResizeMove)
        window.addEventListener('mouseup', onResizeEnd)
      }
      const updateResizeState = (e) => {
        // 获取此时鼠标相对于初始状态下的实际距离
        const mouseDeltaX = (e.clientX - initMousePosition.x) / zoom
        const mouseDeltaY = (e.clientY - initMousePosition.y) / zoom

        // 获取四个应该修改的数据
        let dX = 0
        let dY = 0
        let dWidth = 0
        let dHeight = 0
        // Handles
        if (resizeHandle.includes('left')) {
          dX = mouseDeltaX
          dWidth = -mouseDeltaX
        } else if (resizeHandle.includes('right')) {
          dWidth = mouseDeltaX
        }
        if (resizeHandle.includes('top')) {
          dY = mouseDeltaY
          dHeight = -mouseDeltaY
        } else if (resizeHandle.includes('bottom')) {
          dHeight = mouseDeltaY
        }

        // 倍数处理
        let gridDX = gridSize * Math.round(dX / gridSize)
        let gridDY = gridSize * Math.round(dY / gridSize)
        let gridDWidth = gridSize * Math.round(dWidth / gridSize)
        let gridDHeight = gridSize * Math.round(dHeight / gridSize)

        // 阴影的样式
        let x = (prop.layout.left || 0) + gridDX
        let y = (prop.layout.top || 0) + gridDY
        let width = (prop.layout.width || 0) + gridDWidth
        let height = (prop.layout.height || 0) + gridDHeight
        // 此时组件的样式
        let pxX = (prop.layout.left || 0) + dX
        let pxY = (prop.layout.top || 0) + dY
        let pxWidth = (prop.layout.width || 0) + dWidth
        let pxHeight = (prop.layout.height || 0) + dHeight

        // 异常位置处理
        if (x < 0) x = 0
        if (y < 0) y = 0
        if (width > 1000) width = 1000
        if (height > 750) height = 750
        if (width < 250) width = 250
        if (height < 100) height = 100
        if (pxX < 0) {
          pxX = 0
          pxWidth = (prop.layout.left || 0) + (prop.layout.width || 0)
          if (width > pxWidth) width = pxWidth
        }
        if (pxY < 0) {
          pxY = 0
          pxHeight = (prop.layout.top || 0) + (prop.layout.height || 0)
          if (height > pxHeight) height = pxHeight
        }

        resizeState.value = { x, y, width, height, pxX, pxY, pxWidth, pxHeight }
      }
      const onResizeMove = (e) => updateResizeState(e)
      const onResizeEnd = (e) => {
        updateResizeState(e)
        removeResizeListeners()
        const resizeLayout = {
          ...prop.layout,
          left: resizeState.value?.x || prop.layout.left || 0,
          top: resizeState.value?.y || prop.layout.top || 0,
          width: resizeState.value?.width || prop.layout.width || 0,
          height: resizeState.value?.height || prop.layout.height || 0,
        }
        if (resizeLayout.left !== prop.layout.left
            || resizeLayout.top !== prop.layout.top
            || resizeLayout.width !== prop.layout.width
            || resizeLayout.height !== prop.layout.height) {
          yiuHttp({
            api: SERVER_API.layoutApi.resizePosition,
            data: resizeLayout,
            params: { maxX: widgetWrapperWidth?.value },
            success: (_res) => emit('update'),
          })
        }
        resizeState.value = undefined
      }
      const removeResizeListeners = () => {
        window.removeEventListener('mousemove', onResizeMove)
        window.removeEventListener('mouseup', onResizeEnd)
      }

      const resizeGhostStyle = () => {
        let x = resizeState.value.x
        let y = resizeState.value.y
        let width = resizeState.value.width
        let height = resizeState.value.height
        if (!isNumber(x)) {
          x = prop.layout.left || 0
        }
        if (!isNumber(y)) {
          y = prop.layout.top || 0
        }
        if (!isNumber(width)) {
          width = prop.layout.width || 0
        }
        if (!isNumber(height)) {
          height = prop.layout.height || 0
        }
        return {
          left: `${x}px`,
          top: `${y}px`,
          width: `${width}px`,
          height: `${height}px`,
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
        onResizeStart,
        resizeGhostStyle,
      }
    },
  })
</script>

<style scoped>
  .customize-overlay {
    @apply w-full h-full relative grid justify-center content-center;
    @apply rounded border-2 border-transparent;
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
    @apply bg-white rounded shadow w-full h-full relative;
  }

  .move-ghost,
  .resize-ghost {
    @apply absolute p-2;
    z-index: 10000;
  }

  .shell-top {
    z-index: 10001;
    opacity: .7;
  }
</style>
