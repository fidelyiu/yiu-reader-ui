<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex-none h-[64px] bg-blue-100 border-b">{{ $route.params.id }}</div>
    <div class="flex-grow h-0 flex">
      <div class="flex-grow bg-blue-50"></div>
      <div class="h-full overflow-auto w-[256px] flex-none bg-blue-50">
        <div class="mt-[32px]">大纲</div>
      </div>
      <div class="flex-none w-[32px] bg-blue-50"></div>
      <div class="note-page-white main-content">
        <div class="mx-auto" v-html="pageContent"></div>
        <n-back-top :right="96" :bottom="96"></n-back-top>
      </div>
      <div class="flex-none w-[32px] bg-blue-50"></div>
      <div class="h-full overflow-auto w-[256px] flex-none bg-blue-50">
        <div class="mt-[32px]">目录</div>
      </div>
      <div class="flex-grow bg-blue-50"></div>
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
  .main-content {
    @apply h-full w-[960px] overflow-auto;
    @apply border-l border-r;
    @apply px-[96px] pt-[32px] pb-[128px];
    @apply flex-none;
  }

  .note-page-white {
    @apply bg-indigo-50;
    --tw-bg-opacity: .1;
  }
</style>
