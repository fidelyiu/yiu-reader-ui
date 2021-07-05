<template>
  <div>
    <button class="yiu-blue-square-btn-1" @click="onRefresh">删除</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SERVER_API from '/@/api'
  import { NoteReadResult } from '/@/vo/enum/note-read-result'
  import { nanoid } from 'nanoid'
  import { useLogStore } from '/@/store/modules/log'

  // 笔记目录表单
  export default defineComponent({
    name: 'NoteCatalogueForm',
    setup() {
      const logStore = useLogStore()
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
        //连接关闭时触发
        ws.onclose = () => {
          // loadNote()
        }
      }
      return {
        onRefresh,
      }
    },
  })
</script>

<style scoped>

</style>
