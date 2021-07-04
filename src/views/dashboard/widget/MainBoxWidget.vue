<template>
  <div class="relative w-full h-full overflow-hidden py-3 pr-1">
    <!--右上角按钮组-->
    <div class="absolute top-2 right-2">
      <button class="yiu-blue-square-btn-5" @click="onRefresh">
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
  import { NoteReadResult } from '/@/vo/enum/note-read-result'
  import { useLogStore } from '/@/store/modules/log'
  import { nanoid } from 'nanoid'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'

  export default defineComponent({
    name: 'MainBoxWidget',
    props: {
      layout: propTypes.object.isRequired,
    },
    setup() {
      const logStore = useLogStore()
      const loadNote = () => {
        yiuHttp({
          api: SERVER_API.noteApi.searchTree,
          success: (res) => {
            console.log(res.data.result)
          },
        })
      }
      loadNote()
      const onRefresh = () => {
        const refreshList: any = {}
        // Prismjs.assets/c
        const ws = new WebSocket(`ws://localhost:8081${SERVER_API.noteApi.refresh.url}?path=`)
        //接收到消息时触发
        ws.onmessage = (evt) => {
          let data
          try {
            data = JSON.parse(evt.data)
          } catch (e) {
          }
          switch (data.result) {
            case NoteReadResult.Start:
              refreshList[data.path] = nanoid()
              logStore.pushLog(refreshList[data.path], 'warning', '正在检查：' + data.path || '-')
              break
            case NoteReadResult.Import:
              logStore.changeById(refreshList[data.path], 'info', '检查完成：' + data.path || '-')
              break
            case NoteReadResult.NotImport:
              logStore.changeById(refreshList[data.path], 'success', '导入完成：' + data.path || '-')
              break
            case NoteReadResult.Fail:
              logStore.changeById(refreshList[data.path], 'error', '导入失败：' + data.path || '-')
              break
          }
        }
      }
      return {
        logStore,
        onRefresh,
      }
    },
  })
</script>

<style scoped>

</style>
