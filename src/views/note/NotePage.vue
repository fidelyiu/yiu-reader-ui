<template>
  <div class="h-full w-full overflow-auto">
    <div>{{ $route.params.id }}</div>
    <div v-html="pageContent"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref, watch } from 'vue'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { useNotification } from 'naive-ui'
  import { useRoute } from 'vue-router'
  import md from '/@/utils/mi'
  import { isFunction } from 'lodash'


  export default defineComponent({
    name: 'NotePage',
    setup() {
      const route = useRoute()
      const notification = useNotification()
      const pageContent = ref('')
      const pageLoading = ref(false)
      const loadNote = (id) => {
        yiuHttp({
          api: SERVER_API.noteApi.reade,
          loading: { flag: pageLoading },
          pathData: { id },
          tips: { anyObj: notification, error: { show: true } },
          success: (res) => {
            if (res.data.result) {
              pageContent.value = md.render(res.data.result) as string
              nextTick(() => {
                if (window && window.Prism && isFunction(window.Prism.highlightAll)) {
                  window.Prism.highlightAll()
                }
              })
            }
          },
        })
      }
      loadNote(route.params.id)

      watch(() => route.params, (toParams, previousParams) => {
        if (toParams.id !== previousParams.id) {
          if (toParams.id) {
            loadNote(toParams.id)
          }
        }
      })
      return {
        loadNote,
        pageContent,
      }
    },
  })
</script>

<style scoped>

</style>
