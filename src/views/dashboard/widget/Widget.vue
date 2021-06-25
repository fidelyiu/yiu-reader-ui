<template>
  <div class="p-2 absolute"
       :style="{
                'left': (layout.left||0)+'px',
                'top':(layout.top||0)+'px',
                'width':(layout.width||0)+'px',
                'height':(layout.height||0)+'px',
              }">
    <div class="p-2 bg-white rounded-md shadow w-full h-full relative">
      <!--组件内容-->
      <div class="w-full h-full overflow-auto"
           :style="{opacity: customizeMode?'.15':'1'}">
        <div>{{ layoutType }}</div>
        <div>{{ layout.id }}</div>
        <div>{{ layout.top }}</div>
        <div>{{ layout.left }}</div>
      </div>
      <!--修改状态-->
      <div v-if="customizeMode"
           class="absolute top-0 left-0 w-full h-full">
        <div class="customize-overlay w-full h-full relative grid justify-center content-center">
          <button class="yiu-modal-close-btn-2" @click="delLayout">
            <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
          </button>
          <!--链接-->
          <div v-show="layoutTypeIsLink(layoutType)"
               class="big-circular-btn bg-blue-400 select-none fa-center transform scale-125">
            <span class="iconify block mr-1" data-icon="mdi:link-variant" data-inline="false"></span>
            <span>链接</span>
          </div>
        </div>
      </div>
    </div>
    <!--移动状态-->
    <div></div>
    <!--调整大小状态-->
    <div></div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { layoutTypeIsLink } from '/@/vo/enum/layout-type'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { useNotification } from 'naive-ui'

  export default defineComponent({
    name: 'Widget',
    props: {
      customizeMode: propTypes.bool.def(false),
      layout: propTypes.object.isRequired,
    },
    emits: ['delSuccess'],
    setup(prop, { emit }) {
      const notification = useNotification()
      const layoutType = computed(() => prop.layout.type)
      const delLayout = () => {
        if (prop.layout.id) {
          yiuHttp({
            api: SERVER_API.layoutApi.del,
            pathData: { id: prop.layout.id },
            tips: { anyObj: notification, error: { show: true } },
            success: (_res) => emit('delSuccess'),
          })
        }
      }
      return {
        layoutType,
        layoutTypeIsLink,
        delLayout,
      }
    },
  })
</script>

<style scoped>
  .customize-overlay:hover {
    @apply bg-blue-300 ;
    --tw-bg-opacity: .3;
  }
</style>
