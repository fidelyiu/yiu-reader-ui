<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex-none h-[64px] bg-blue-100 flex justify-between px-[8px] border-b">
      <div class="fa-center text-2xl">{{ noteName }}</div>
      <div class="fa-center">
        <button class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none">
          <span class="iconify block mr-1" data-icon="mdi:magnify" data-inline="false"></span>
          <span>全局搜索</span>
        </button>
        <button class="yiu-blue-big-circular-btn fa-center focus:outline-none" @click="onShowNoteInfo">
          <span class="iconify block mr-1" data-icon="mdi:information-outline" data-inline="false"></span>
          <span>笔记信息</span>
        </button>
      </div>
    </div>
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
  <n-modal v-model:show="infoModal">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">笔记信息</div>
      <button class="yiu-modal-close-btn-1" transparent @click="onInfoCancel">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="text-base mt-6">
        <n-form label-placement="left"
                label-align="right"
                :label-width="120"
                size="small">
          <n-formItem style="--label-text-color: #6B7280;--feedback-height: 8px;" label="笔记名称：">
            <span class="text-sm">{{ note.name || '-' }}</span>
          </n-formItem>
          <n-formItem style="--label-text-color: #6B7280;--feedback-height: 8px;" label="笔记别名：">
            <span class="text-sm">{{ note.alias || '-' }}</span>
          </n-formItem>
          <n-formItem style="--label-text-color: #6B7280;--feedback-height: 8px;" label="工作空间名称：">
            <span class="text-sm">{{ workspace.name || '-' }}</span>
          </n-formItem>
          <n-formItem style="--label-text-color: #6B7280;--feedback-height: 8px;" label="工作空间别名：">
            <span class="text-sm">{{ workspace.alias || '-' }}</span>
          </n-formItem>
          <n-formItem style="--label-text-color: #6B7280;--feedback-height: 8px;" label="笔记路径：">
            <span class="text-sm">{{ notePath || '-' }}</span>
          </n-formItem>
          <n-formItem style="--label-text-color: #6B7280;--feedback-height: 8px;" label="绝对路径：">
            <span class="text-sm">{{ note.absPath || '-' }}</span>
          </n-formItem>
          <n-formItem style="--label-text-color: #6B7280;--feedback-height: 8px;" label="修改日期：">
            <span class="text-sm">{{ modTime || '-' }}</span>
          </n-formItem>
          <n-formItem style="--label-text-color: #6B7280;--feedback-height: 8px;" label="大小：">
            <span class="text-sm">{{ noteSizeWithUnit }}</span>
          </n-formItem>
        </n-form>
        <div class="flex justify-end">
          <n-button class="focus:outline-none mr-4" @click="onInfoCancel">取消</n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, ref, watch } from 'vue'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { NBackTop, NButton, NCard, NForm, NFormItem, NModal, useNotification } from 'naive-ui'
  import { useRoute } from 'vue-router'
  import md from '/@/utils/mi'
  import { isFunction } from 'lodash'
  import { timeGetStr2 } from 'yiu-js/time/time-get'

  export default defineComponent({
    name: 'NotePage',
    components: {
      NBackTop,
      NModal,
      NCard,
      NForm,
      NFormItem,
      NButton,
    },
    setup() {
      const route = useRoute()
      const notification = useNotification()
      const pageContent = ref('')
      const pageLoading = ref(false)
      const workspace = ref<any>({})
      const note = ref<any>({})
      const parentName = ref<Array<string>>([])
      const modTime = ref('')
      const noteSize = ref(0)

      const loadNote = (id) => {
        workspace.value = {}
        note.value = {}
        parentName.value = []
        modTime.value = ''
        noteSize.value = 0
        yiuHttp({
          api: SERVER_API.noteApi.reade,
          loading: { flag: pageLoading },
          pathData: { id },
          tips: { anyObj: notification, error: { show: true } },
          success: (res) => {
            if (res.data.result) {
              workspace.value = res.data.result.workspace
              note.value = res.data.result.note
              parentName.value = res.data.result.parentName
              modTime.value = timeGetStr2(res.data.result.modTime)
              noteSize.value = res.data.result.size
              pageContent.value = md.render(res.data.result.content) as string
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

      const noteName = computed(() => note.value.alias || note.value.name || '-')
      const notePath = computed(() => {
        if (!parentName.value.length) {
          return '-'
        } else {
          let result = ''
          parentName.value.forEach((item, index) => {
            if (index === 0) {
              result += item
            } else {
              result += ' > ' + item
            }
          })
          return result
        }
      })

      const noteSizeWithUnit = computed(() => {
        if (noteSize.value <= 0) {
          return '0 B'
        } else if (noteSize.value < 1000) {
          return noteSize.value + ' B'
        } else if (noteSize.value < 1000000) {
          let size = noteSize.value / 1000
          return Math.round(size) + ' KB'
        } else if (noteSize.value < 1000000000) {
          let size = noteSize.value / 1000000
          return Math.round(size) + ' MB'
        } else {
          let size = noteSize.value / 1000000000
          return Math.round(size) + ' GB'
        }
      })

      const infoModal = ref(false)
      const onInfoCancel = () => {
        infoModal.value = false
      }
      const onShowNoteInfo = () => {
        infoModal.value = true
      }

      return {
        loadNote,
        pageContent,
        workspace,
        note,
        noteName,
        notePath,
        onShowNoteInfo,
        infoModal,
        onInfoCancel,
        modTime,
        noteSizeWithUnit,
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
