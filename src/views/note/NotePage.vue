<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex-none h-[64px] bg-blue-100 flex justify-between px-[8px] border-b">
      <div class="fa-center text-2xl flex-grow w-0">
        <div class="w-full truncate">
          <span>{{ noteName }}</span>
          <span v-show="noteLoading">
            <n-spin class="ml-[8px] p-[4px]"/>
          </span>
        </div>
      </div>
      <div class="fa-center flex-none">
        <button class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none">
          <span class="iconify block mr-1" data-icon="mdi:magnify" data-inline="false"></span>
          <span>全局搜索</span>
        </button>
        <button v-show="!showDir"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="onShowDir">
          <span class="iconify block mr-1" data-icon="mdi:clipboard-list-outline" data-inline="false"></span>
          <span>展示目录</span>
        </button>
        <button v-show="showDir"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="showDir = false">
          <span class="iconify block mr-1" data-icon="mdi:alphabetical-off" data-inline="false"></span>
          <span>隐藏目录</span>
        </button>
        <button v-show="!showMainPoint"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="onShowMainPoint">
          <span class="iconify block mr-1" data-icon="mdi:format-list-numbered" data-inline="false"></span>
          <span>展示大纲</span>
        </button>
        <button v-show="showMainPoint"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="showMainPoint = false">
          <span class="iconify block mr-1" data-icon="mdi:alphabetical-off" data-inline="false"></span>
          <span>隐藏大纲</span>
        </button>
        <button v-show="hideOrder"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="hideOrder = false">
          <span class="iconify block mr-1" data-icon="mdi:numeric" data-inline="false"></span>
          <span>展示序号</span>
        </button>
        <button v-show="!hideOrder"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="hideOrder = true">
          <span class="iconify block mr-1" data-icon="mdi:alphabetical-off" data-inline="false"></span>
          <span>隐藏序号</span>
        </button>
        <button class="yiu-blue-big-circular-btn fa-center focus:outline-none" @click="onShowNoteInfo">
          <span class="iconify block mr-1" data-icon="mdi:information-outline" data-inline="false"></span>
          <span>笔记信息</span>
        </button>
      </div>
    </div>
    <!--<div class="h-[16px] bg-blue-50 flex-none"></div>-->
    <div class="flex-grow h-0 flex">
      <!--左留白-->
      <div class="flex-grow bg-blue-50"></div>
      <!--目录-->
      <div v-show="showDir" class="flex-none w-[16px] bg-blue-50"></div>
      <div v-show="showDir" class="h-full overflow-auto w-[256px] flex-none bg-blue-50">
        <div style="height: calc(100% - 140px);" class="border-l border-r border-b bg-white">目录</div>
      </div>
      <!--左填充空格-->
      <div class="flex-none w-[16px] bg-blue-50"></div>
      <!--中间部门-->
      <div style="width: 960px;" class="flex-none border-l border-r note-page-white overflow-hidden">
        <div style="padding: 32px  96px 128px;width: 100%;height: 100%;" class="overflow-auto">
          <div v-if="noteLoading" class="h-full w-full fa-center">
            <div class="text-center">
              <div class="text-gray-500">文档渲染中...</div>
              <i class="h-[5px] w-[80px] bg-blue-100 inline-block relative overflow-hidden">
                <i class="absolute top-0 left-[-16px] inline-block h-[5px] w-[16px] bg-blue-200 note-loading"></i>
              </i>
            </div>
          </div>
          <div class="mx-auto" :class="{'hide-order': hideOrder}" v-html="pageContent"></div>
          <div v-if="!pageContent" class="h-full w-full fa-center text-gray-500">
            <span class="iconify text-xl mr-1" data-icon="mdi:script-outline" data-inline="false"></span>
            <span>文档为空!</span>
          </div>
          <n-back-top :right="96" :bottom="96"></n-back-top>
        </div>
      </div>
      <!--右填充空格-->
      <div class="flex-none w-[16px] bg-blue-50"></div>
      <!--大纲-->
      <div v-show="showMainPoint" class="h-full overflow-auto w-[256px] flex-none bg-blue-50">
        <div style="height: calc(100% - 140px);" class="border-l border-r border-b bg-white">大纲</div>
      </div>
      <div v-show="showMainPoint" class="flex-none w-[16px] bg-blue-50"></div>
      <!--右留白-->
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
  import { NBackTop, NButton, NCard, NForm, NFormItem, NModal, NSpin, useNotification } from 'naive-ui'
  import { useRoute } from 'vue-router'
  import { genMd } from '/@/utils/mi'
  import { isFunction } from 'lodash'
  import { timeGetStr2 } from 'yiu-js/time/time-get'
  import { MarkdownItemInfo } from '/@/vo/note/markdown-item-info'
  import { useTitle, useWindowSize } from '@vueuse/core'

  export default defineComponent({
    name: 'NotePage',
    components: {
      NBackTop,
      NModal,
      NCard,
      NForm,
      NFormItem,
      NButton,
      NSpin,
    },
    setup() {
      const pageTitle = useTitle()
      const route = useRoute()
      const notification = useNotification()
      const pageContent = ref('')
      const pageLoading = ref(false)
      const noteLoading = ref(false)
      const workspace = ref<any>({})
      const note = ref<any>({})
      const parentName = ref<Array<string>>([])
      const modTime = ref('')
      const noteSize = ref(0)

      const markdownTree = ref<Array<MarkdownItemInfo>>([])

      const md = genMd(markdownTree)
      const { width } = useWindowSize()

      const loadNote = (id) => {
        workspace.value = {}
        note.value = {}
        parentName.value = []
        modTime.value = ''
        noteSize.value = 0
        noteLoading.value = true
        yiuHttp({
          api: SERVER_API.noteApi.reade,
          loading: { flag: pageLoading },
          pathData: { id },
          tips: { anyObj: notification, error: { show: true } },
          success: (res) => {
            if (res.data.result) {
              workspace.value = res.data.result.workspace
              note.value = res.data.result.note
              pageTitle.value = 'YR - ' + (res.data.result.note.alias || res.data.result.note.name || '-')
              parentName.value = res.data.result.parentName
              modTime.value = timeGetStr2(res.data.result.modTime)
              noteSize.value = res.data.result.size
              markdownTree.value = []
              pageContent.value = md.render(res.data.result.content) as string
              console.log(markdownTree.value)
              nextTick(() => {
                if (window && window.Prism && isFunction(window.Prism.highlightAll)) {
                  window.Prism.highlightAll()
                }
              })
            }
          },
          finally: () => {
            noteLoading.value = false
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
      watch(
          () => route.path,
          () => {
            if (!route.path.startsWith('/note')) {
              pageTitle.value = import.meta.env.VITE_GLOB_APP_TITLE || 'Yiu Reader'
            }
          },
      )

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
        if (pageLoading.value) return
        infoModal.value = true
      }

      const hideOrder = ref(false)
      const showMainPoint = ref(false)
      // 展示大纲
      const onShowMainPoint = () => {
        showMainPoint.value = true
      }
      const showDir = ref(false)
      // 展示大纲
      const onShowDir = () => {
        showDir.value = true
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
        hideOrder,
        noteLoading,
        width,
        showMainPoint,
        onShowMainPoint,
        showDir,
        onShowDir,
      }
    },
  })
</script>

<style scoped>
  .note-page-white {
    @apply bg-indigo-50;
    --tw-bg-opacity: .1;
  }

  .note-loading {
    animation: am-end 1s linear infinite
  }

  @keyframes am-end {
    to {
      left: 64px;
    }
  }
</style>
