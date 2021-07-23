<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex-none border-b">{{ $route.params.id }}</div>
    <div class="flex-grow h-0 flex">
      <div class="h-full overflow-auto w-[255px] flex-none border-r">大纲</div>
      <div class="h-full overflow-auto px-[96px] pt-[32px] pb-[128px] flex-grow">
        <div class="mx-auto max-w-[960px]" v-html="pageContent"></div>
        <n-back-top :right="100"></n-back-top>
      </div>
      <div class="h-full overflow-auto w-[255px] flex-none border-l">目录</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref, watch } from 'vue'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { NBackTop, useNotification } from 'naive-ui'
  import { useRoute } from 'vue-router'
  import md from '/@/utils/mi'
  import { isFunction } from 'lodash'


  export default defineComponent({
    name: 'NotePage',
    components: {
      NBackTop,
    },
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
