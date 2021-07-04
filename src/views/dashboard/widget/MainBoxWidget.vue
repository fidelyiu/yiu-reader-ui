<template>
  <div class="relative w-full h-full overflow-hidden py-3 pr-1">
    <!--右上角按钮组-->
    <div class="absolute top-2 right-2">
      <button class="yiu-blue-square-btn-5" @click="onTest">
        <span class="iconify block" data-icon="mdi:cog" data-inline="false"></span>
      </button>
    </div>
    <!--内容部分-->
    <div class="w-full h-full overflow-auto pl-3 pr-2">
      <div>Hello</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'MainBoxWidget',
    props: {
      layout: propTypes.object.isRequired,
    },
    setup() {
      const onTest = () => {
        const ws = new WebSocket('ws://localhost:8081/workspace/refresh')
        //连接打开时触发
        ws.onopen = () => {
          console.log('Connection open ...')
          ws.send('Hello WebSockets!')
        }
        //接收到消息时触发
        ws.onmessage = (evt) => {
          console.log('Received Message: ' + evt.data)
        }
        //连接关闭时触发
        ws.onclose = () => {
          console.log('Connection closed.')
        }
      }
      return {
        onTest,
      }
    },
  })
</script>

<style scoped>

</style>
