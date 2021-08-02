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
        <button v-show="!showDir && width>1270"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="onShowDir">
          <span class="iconify block mr-1" data-icon="mdi:clipboard-list-outline" data-inline="false"></span>
          <span>展示目录</span>
        </button>
        <button v-show="showDir && width>1270"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="showDir = false">
          <span class="iconify block mr-1" data-icon="mdi:alphabetical-off" data-inline="false"></span>
          <span>隐藏目录</span>
        </button>
        <button v-show="!showMainPoint && width>1270"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="onShowMainPoint">
          <span class="iconify block mr-1" data-icon="mdi:format-list-numbered" data-inline="false"></span>
          <span>展示大纲</span>
        </button>
        <button v-show="showMainPoint && width>1270"
                class="yiu-blue-big-circular-btn fa-center mr-2 focus:outline-none"
                @click="showMainPoint = false">
          <span class="iconify block mr-1" data-icon="mdi:alphabetical-off" data-inline="false"></span>
          <span>隐藏大纲</span>
        </button>
      </div>
    </div>
    <!--<div class="h-[16px] bg-blue-50 flex-none"></div>-->
    <div class="flex-grow h-0 flex">
      <!--左留白-->
      <div v-show="width>990" class="flex-grow bg-blue-50"></div>
      <!--目录-->
      <div v-show="width>1270 && showDir" class="flex-none w-[16px] bg-blue-50"></div>
      <div v-show="width>1270 && showDir"
           style="width: 256px"
           class="h-full overflow-auto flex-none bg-blue-50">
        <div style="height: calc(100% - 140px);" class="w-full bg-white flex flex-col">
          <div class="h-[8px] bg-blue-50 flex-none"></div>
          <ToolBox title="文档工具栏">
            <div class="flex justify-between">
              <yiu-square-btn show-text
                              :padding-px="6"
                              @btnClick="changeDocumentTxt">
                <template #icon>
                  <div v-show="!mainStore.showDocumentTxt">
                    <span class="iconify block" data-icon="mdi:comment-eye-outline" data-inline="false"></span>
                  </div>
                  <div v-show="mainStore.showDocumentTxt">
                    <span class="iconify block" data-icon="mdi:comment-off-outline" data-inline="false"></span>
                  </div>
                </template>
                <template #text>
                  <span v-show="!mainStore.showDocumentTxt">显示文档按钮提示</span>
                  <span v-show="mainStore.showDocumentTxt">隐藏文档按钮提示</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :padding-px="6"
                              :show-text="mainStore.showDocumentTxt"
                              @btnClick="changeShowDocumentNum">
                <template #icon>
                  <div v-show="showDocumentNum">
                    <span class="iconify block mr-1" data-icon="mdi:alphabetical-off" data-inline="false"></span>
                  </div>
                  <div v-show="!showDocumentNum">
                    <span class="iconify block mr-1" data-icon="mdi:numeric" data-inline="false"></span>
                  </div>
                </template>
                <template #text>
                  <span v-show="showDocumentNum">隐藏文档序号</span>
                  <span v-show="!showDocumentNum">展示文档序号</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :padding-px="6"
                              :show-text="mainStore.showDocumentTxt"
                              @btnClick="positionDocument(false, false)">
                <template #icon>
                  <span class="iconify block" data-icon="mdi:map-marker-outline" data-inline="false"></span>
                </template>
                <template #text>
                  <span>定位当前文档</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :padding-px="6"
                              :show-text="mainStore.showDocumentTxt"
                              @btnClick="onShowNoteInfo">
                <template #icon>
                  <span class="iconify block" data-icon="mdi:file-document-outline" data-inline="false"></span>
                </template>
                <template #text>
                  <span>文档信息</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :padding-px="6"
                              :show-text="mainStore.showDocumentTxt"
                              @btnClick="onPosition">
                <template #icon>
                  <div>
                    <span class="iconify block" data-icon="mdi:folder-marker-outline" data-inline="false"></span>
                  </div>
                </template>
                <template #text>
                  <span>在文件管理器中打开</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :padding-px="6"
                              :show-text="mainStore.showDocumentTxt"
                              @btnClick="onEditMarkDown">
                <template #icon>
                  <div>
                    <span class="iconify block" data-icon="mdi:file-code-outline" data-inline="false"></span>
                  </div>
                </template>
                <template #text>
                  <span>在编辑器中打开</span>
                </template>
              </yiu-square-btn>
            </div>
          </ToolBox>
          <div class="h-[8px] bg-blue-50 flex-none"></div>
          <ToolBox title="目录工具栏">
            <div class="flex justify-between">
              <yiu-square-btn show-text
                              :padding-px="6"
                              @btnClick="changeDirTxt">
                <template #icon>
                  <div v-show="!mainStore.showDirTxt">
                    <span class="iconify block" data-icon="mdi:comment-eye-outline" data-inline="false"></span>
                  </div>
                  <div v-show="mainStore.showDirTxt">
                    <span class="iconify block" data-icon="mdi:comment-off-outline" data-inline="false"></span>
                  </div>
                </template>
                <template #text>
                  <span v-show="!mainStore.showDirTxt">显示目录按钮提示</span>
                  <span v-show="mainStore.showDirTxt">隐藏目录按钮提示</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :padding-px="6"
                              :show-text="mainStore.showDirTxt"
                              @btnClick="changeShowDirNum">
                <template #icon>
                  <div v-show="showDirNum">
                    <span class="iconify block mr-1" data-icon="mdi:alphabetical-off" data-inline="false"></span>
                  </div>
                  <div v-show="!showDirNum">
                    <span class="iconify block mr-1" data-icon="mdi:numeric" data-inline="false"></span>
                  </div>
                </template>
                <template #text>
                  <span v-show="showDirNum">隐藏目录序号</span>
                  <span v-show="!showDirNum">展示目录序号</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :show-text="mainStore.showDirTxt"
                              :padding-px="6"
                              @btnClick="positionMainPointTree">
                <template #icon>
                  <span class="iconify block" data-icon="mdi:map-marker-outline" data-inline="false"></span>
                </template>
                <template #text>
                  <span>定位当前目录</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :show-text="mainStore.showDirTxt"
                              :padding-px="6"
                              @btnClick="closeAllDirTreeItem">
                <template #icon>
                  <span class="iconify block" data-icon="mdi:arrow-collapse-vertical" data-inline="false"></span>
                </template>
                <template #text>
                  <span>关闭所有目录</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :show-text="mainStore.showDirTxt"
                              :padding-px="6"
                              @btnClick="openAllDirTreeItem">
                <template #icon>
                  <span class="iconify block" data-icon="mdi:arrow-expand-vertical" data-inline="false"></span>
                </template>
                <template #text>
                  <span>展开所有目录</span>
                </template>
              </yiu-square-btn>
              <div class="w-[28px] h-[28px] flex-none"></div>
            </div>
          </ToolBox>
          <div class="h-[8px] bg-blue-50 flex-none"></div>
          <div class="flex-grow h-0 w-full flex flex-col border">
            <div class="flex-none p-[8px]">
              <SearchInput v-model="searchDirKey" :size="25"></SearchInput>
            </div>
            <div class="flex-grow h-0 w-full">
              <DirTree v-show="dirTree.length"
                       ref="dirTreeRef"
                       :data="dirTree"
                       :search-str="searchDirKey"
                       :show-number="showDirNum"
                       :active-el-id="noteId"></DirTree>
              <div v-show="!dirTree.length"
                   class="h-full grid place-items-center">
                <div class="fa-center text-gray-500">
                  <span class="iconify mr-1" data-icon="mdi:inbox-outline" data-inline="false"></span>
                  <span class="text-xs">没有目录</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-[8px] bg-blue-50 flex-none"></div>
        <div v-if="previousNote"
             class="h-[86px] bg-white border p-2">
          <div class="text-gray-400 font-semibold mb-2">上一篇</div>
          <a class="inline-block break-all hover:underline"
             :href="'/note/'+previousNote.data.id">
            {{ previousNote.data.name || '-' }}
          </a>
        </div>
      </div>
      <!--左填充空格-->
      <div class="flex-none w-[16px] bg-blue-50"></div>
      <!--中间部门-->
      <div class="flex-none note-page-white overflow-hidden h-full flex flex-col"
           :class="{'flex-none': width>990,'flex-grow': width<=990}"
           :style="{'width': width>990?'960px':'0'}">
        <div class="h-[8px] bg-blue-50 flex-none"></div>
        <div id="yiu-note-container"
             style="width: 100%;"
             :style="{'padding': width>900?'32px  96px 128px':'16px'}"
             class="border overflow-auto flex-grow h-0">
          <div v-if="noteLoading" class="h-full w-full fa-center">
            <div class="text-center">
              <div class="text-gray-500">文档渲染中...</div>
              <i class="h-[5px] w-[80px] bg-blue-100 inline-block relative overflow-hidden">
                <i class="absolute top-0 left-[-16px] inline-block h-[5px] w-[16px] bg-blue-200 note-loading"></i>
              </i>
            </div>
          </div>
          <div class="mx-auto" :class="{'hide-order': !showDocumentNum}" v-html="pageContent"></div>
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
      <div v-show="width>1270 && showMainPoint"
           style="width: 256px"
           class="h-full overflow-auto flex-none bg-blue-50">
        <div style="height: calc(100% - 140px);"
             class="w-full bg-white flex flex-col">
          <div class="h-[8px] bg-blue-50 flex-none"></div>
          <!--grid grid-cols-5 gap-2-->
          <!--工具栏-->
          <ToolBox title="大纲工具栏">
            <div class="flex justify-between">
              <yiu-square-btn show-text
                              :padding-px="6"
                              @btnClick="changeMainPointTxt">
                <template #icon>
                  <div v-show="!mainStore.showMainPointTxt">
                    <span class="iconify block" data-icon="mdi:comment-eye-outline" data-inline="false"></span>
                  </div>
                  <div v-show="mainStore.showMainPointTxt">
                    <span class="iconify block" data-icon="mdi:comment-off-outline" data-inline="false"></span>
                  </div>
                </template>
                <template #text>
                  <span v-show="!mainStore.showMainPointTxt">显示大纲按钮提示</span>
                  <span v-show="mainStore.showMainPointTxt">隐藏大纲按钮提示</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :padding-px="6"
                              :show-text="mainStore.showMainPointTxt"
                              @btnClick="changeMainPointNum">
                <template #icon>
                  <div v-show="showMainPointNum">
                    <span class="iconify block mr-1" data-icon="mdi:alphabetical-off" data-inline="false"></span>
                  </div>
                  <div v-show="!showMainPointNum">
                    <span class="iconify block mr-1" data-icon="mdi:numeric" data-inline="false"></span>
                  </div>
                </template>
                <template #text>
                  <span v-show="showMainPointNum">隐藏大纲序号</span>
                  <span v-show="!showMainPointNum">展示大纲序号</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :show-text="mainStore.showMainPointTxt"
                              :padding-px="6"
                              @btnClick="positionMainPointTree">
                <template #icon>
                  <span class="iconify block" data-icon="mdi:map-marker-outline" data-inline="false"></span>
                </template>
                <template #text>
                  <span>定位当前大纲</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :show-text="mainStore.showMainPointTxt"
                              :padding-px="6"
                              @btnClick="closeAllMainPointTreeItem">
                <template #icon>
                  <span class="iconify block" data-icon="mdi:arrow-collapse-vertical" data-inline="false"></span>
                </template>
                <template #text>
                  <span>关闭所有大纲</span>
                </template>
              </yiu-square-btn>
              <yiu-square-btn :show-text="mainStore.showMainPointTxt"
                              :padding-px="6"
                              @btnClick="openAllMainPointTreeItem">
                <template #icon>
                  <span class="iconify block" data-icon="mdi:arrow-expand-vertical" data-inline="false"></span>
                </template>
                <template #text>
                  <span>展开所有大纲</span>
                </template>
              </yiu-square-btn>
              <div class="w-[28px] h-[28px] flex-none"></div>
            </div>
          </ToolBox>
          <div class="h-[8px] bg-blue-50 flex-none"></div>
          <div class="flex-grow h-0 w-full flex flex-col border">
            <div class="flex-none p-[8px]">
              <SearchInput v-model="searchMainPointKey" :size="25"></SearchInput>
            </div>
            <div class="flex-grow h-0 w-full">
              <MainPointTree v-show="markdownTree.length"
                             ref="mainPointTreeRef"
                             :data="markdownTree"
                             :search-str="searchMainPointKey"
                             :show-number="showMainPointNum"
                             :active-el-id="activeElId"></MainPointTree>
              <div v-show="!markdownTree.length"
                   class="h-full grid place-items-center">
                <div class="fa-center text-gray-500">
                  <span class="iconify mr-1" data-icon="mdi:format-line-style" data-inline="false"></span>
                  <span class="text-xs">没有大纲</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-[8px] bg-blue-50 flex-none"></div>
        <div v-if="nextNote"
             class="h-[86px] bg-white border p-2 text-right">
          <div class="text-gray-400 font-semibold mb-2">下一篇</div>
          <a class="inline-block break-all hover:underline"
             :href="'/note/'+nextNote.data.id">
            {{ nextNote.data.name || '-' }}
          </a>
        </div>
      </div>
      <div v-show="width>1270 && showMainPoint" class="flex-none w-[16px] bg-blue-50"></div>
      <!--右留白-->
      <div v-show="width>990" class="flex-grow bg-blue-50"></div>
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
  import MainPointTree from '/@/views/note/MainPointTree.vue'
  import ToolBox from '/@/views/note/ToolBox.vue'
  import SearchInput from '/@/components/SearchInput.vue'
  import YiuSquareBtn from '/@/components/yiu-btn/YiuSquareBtn.vue'
  import DirTree from '/@/views/note/DirTree.vue'
  import { useMainStore } from '/@/store/modules/main'
  import { useLogStore } from '/@/store/modules/log'

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
      MainPointTree,
      SearchInput,
      YiuSquareBtn,
      ToolBox,
      DirTree,
    },
    setup() {
      const logStore = useLogStore()
      const mainStore = useMainStore()
      const noteId = ref('')
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
      const activeElId = ref('')
      const mainPointTreeRef = ref()
      const searchMainPointKey = ref('')

      const markdownTree = ref<Array<MarkdownItemInfo>>([])

      const md = genMd(markdownTree)
      const { width } = useWindowSize()

      const positionDocument = (pM: boolean, pD: boolean) => {
        if (activeElId.value) {
          const titleDom = document.getElementById(activeElId.value)
          if (titleDom) {
            titleDom.scrollIntoView(true)
          }
          if (pM) {
            positionMainPointTree()
          }
          if (pD) {
            positionDirTree()
          }
        }
      }

      const positionMainPointTree = () => {
        openAllMainPointTreeItem()
        if (mainPointTreeRef.value && isFunction(mainPointTreeRef.value.setScrollMainPoint)) {
          mainPointTreeRef.value.setScrollMainPoint(activeElId.value)
        }
      }

      const positionDirTree = () => {
        openAllDirTreeItem()
        if (dirTreeRef.value && isFunction(dirTreeRef.value.setScrollMainPoint)) {
          dirTreeRef.value.setScrollDir(noteId.value)
        }
      }

      const loadNote = (id) => {
        if (!id) return
        noteId.value = id as string
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
              pageTitle.value = (res.data.result.workspace.alias || res.data.result.workspace.name || 'YR')
                  + ' - '
                  + (res.data.result.note.alias || res.data.result.note.name || '-')
              parentName.value = res.data.result.parentName
              modTime.value = timeGetStr2(res.data.result.modTime)
              noteSize.value = res.data.result.size
              markdownTree.value = []
              pageContent.value = md.render(res.data.result.content) as string
              nextTick(() => {
                if (window && window.Prism && isFunction(window.Prism.highlightAll)) {
                  window.Prism.highlightAll()
                  positionDocument(true, true)
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

      const showDocumentNum = ref(true)
      const getShowDocumentNum = (id) => {
        if (!id) return
        yiuHttp({
          api: SERVER_API.noteApi.getNumDocument,
          pathData: { id },
          success: (res) => {
            showDocumentNum.value = !!res.data.result
          },
        })
      }
      getShowDocumentNum(route.params.id)
      const changeShowDocumentNum = () => {
        showDocumentNum.value = !showDocumentNum.value
        if (!noteId.value) return
        yiuHttp({
          api: SERVER_API.noteApi.setNumDocument,
          data: {
            id: noteId.value,
            numDocument: showDocumentNum.value,
          },
        })
      }


      const showDirNum = ref(true)
      const getShowDirNum = (id) => {
        if (!id) return
        yiuHttp({
          api: SERVER_API.noteApi.getNumDir,
          pathData: { id },
          success: (res) => {
            showDirNum.value = !!res.data.result
          },
        })
      }
      getShowDirNum(route.params.id)
      const changeShowDirNum = () => {
        showDirNum.value = !showDirNum.value
        if (!noteId.value) return
        yiuHttp({
          api: SERVER_API.noteApi.setNumDir,
          data: {
            id: noteId.value,
            numDir: showDirNum.value,
          },
        })
      }

      const showMainPointNum = ref(true)
      const getMainPointNum = (id) => {
        if (!id) return
        yiuHttp({
          api: SERVER_API.noteApi.getNumMainPoint,
          pathData: { id },
          success: (res) => {
            showMainPointNum.value = !!res.data.result
          },
        })
      }
      getMainPointNum(route.params.id)
      const changeMainPointNum = () => {
        showMainPointNum.value = !showMainPointNum.value
        if (!noteId.value) return
        yiuHttp({
          api: SERVER_API.noteApi.setNumMainPoint,
          data: {
            id: noteId.value,
            numMainPoint: showMainPointNum.value,
          },
        })
      }

      mainStore.initNotePageBoolValue()
      const changeDocumentTxt = () => {
        mainStore.setShowDocumentTxt(!mainStore.showDocumentTxt)
      }
      const changeDirTxt = () => {
        mainStore.setShowDirTxt(!mainStore.showDirTxt)
      }
      const changeMainPointTxt = () => {
        mainStore.setShowMainPointTxt(!mainStore.showMainPointTxt)
      }

      const dirTree = ref<Array<any>>([])
      const dirLoading = ref(false)
      const setDirNumber = (arr) => {
        const _setDirNumber = (arr, numArr) => {
          if (arr && arr.length) {
            arr.forEach((item, index) => {
              let tempNumArr = [...numArr]
              if (tempNumArr) {
                tempNumArr.push(index + 1)
              } else {
                tempNumArr = [index + 1]
              }
              item.number = tempNumArr
              if (item.child && item.child.length) {
                item.child = _setDirNumber(item.child, tempNumArr)
              }
            })
          }
          return arr
        }
        return _setDirNumber(arr, [])
      }
      const dirTreeRef = ref()
      const dirLoadEnd = ref(false)
      const loadDir = (id) => {
        yiuHttp({
          api: SERVER_API.noteApi.dirTree,
          loading: { flag: dirLoading },
          pathData: { id },
          tips: { anyObj: notification, error: { show: true } },
          success: (res) => {
            if (res.data.result) {
              dirLoadEnd.value = true
              dirTree.value = setDirNumber(res.data.result)
            }
          },
        })
      }
      loadDir(route.params.id)
      const searchDirKey = ref('')

      const previousNote = ref<any>()
      const nextNote = ref<any>()
      const getPreAndNextNote = () => {
        if (!noteId.value) return
        previousNote.value = undefined
        nextNote.value = undefined
        const getNoteArr = (arr) => {
          const result: Array<any> = []
          if (arr && arr.length) {
            for (let arrEl of arr) {
              if (arrEl) {
                if (arrEl.data.isDir) {
                  if (arrEl.child && arrEl.child.length) {
                    result.push(...getNoteArr(arrEl.child))
                  }
                } else {
                  result.push(arrEl)
                }
              }
            }
          }
          return result
        }
        const noteArr = getNoteArr(dirTree.value)
        if (noteArr && noteArr.length) {
          const noteIndex = noteArr.findIndex(item => item.data.id === noteId.value)
          const preIndex = noteIndex - 1
          const nextIndex = noteIndex + 1
          if (preIndex >= 0 && preIndex < noteArr.length) {
            previousNote.value = noteArr[preIndex]
          }
          if (nextIndex >= 1 && preIndex < noteArr.length) {
            nextNote.value = noteArr[nextIndex]
          }
        }
      }

      watch([noteId, dirTree], () => {
        if (noteId.value && dirLoadEnd.value) {
          getPreAndNextNote()
        }
      })

      watch(() => route.params, (toParams, previousParams) => {
        if (toParams.id !== previousParams.id) {
          if (toParams.id) {
            loadNote(toParams.id)
            getShowDocumentNum(toParams.id)
            getShowDirNum(route.params.id)
            getMainPointNum(route.params.id)
          }
        }
      })
      watch(
          () => route.path,
          () => {
            if (!route.path.startsWith('/note')) {
              pageTitle.value = (import.meta.env.VITE_GLOB_APP_TITLE || 'Yiu Reader') as string
            }
          },
      )
      watch(
          () => route.fullPath,
          (v) => {
            let symbolIndex = v.lastIndexOf('#')
            if (symbolIndex !== -1) {
              activeElId.value = v.slice(symbolIndex + 1)
            }
            if (!noteLoading.value) {
              positionDocument(false, false)
            }
          },
          {
            immediate: true,
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

      const showMainPoint = ref(false)
      // 展示大纲
      const onShowMainPoint = () => {
        if (1540 <= width.value) {
          showMainPoint.value = true
        } else if (1270 <= width.value) {
          showDir.value = false
          showMainPoint.value = true
        } else {
          showMainPoint.value = false
        }
      }
      const showDir = ref(false)
      // 展示大纲
      const onShowDir = () => {
        if (1540 <= width.value) {
          showDir.value = true
        } else if (1270 <= width.value) {
          showMainPoint.value = false
          showDir.value = true
        } else {
          showDir.value = false
        }
      }

      const initShowDirAndMainPoint = () => {
        if (1540 <= width.value) {
          showMainPoint.value = true
          showDir.value = true
        } else if (1270 <= width.value) {
          showMainPoint.value = true
          showDir.value = false
        } else {
          showMainPoint.value = false
          showDir.value = false
        }
      }
      initShowDirAndMainPoint()

      watch(
          () => width.value,
          (v) => {
            if (1270 <= v && showDir.value && showMainPoint.value) {
              showDir.value = false
            }
          },
      )

      const openAllMainPointTreeItem = () => {
        if (mainPointTreeRef.value && isFunction(mainPointTreeRef.value.openAll)) {
          mainPointTreeRef.value.openAll()
        }
      }

      const closeAllMainPointTreeItem = () => {
        if (mainPointTreeRef.value && isFunction(mainPointTreeRef.value.closeAll)) {
          mainPointTreeRef.value.closeAll()
        }
      }

      const openAllDirTreeItem = () => {
        if (dirTreeRef.value && isFunction(dirTreeRef.value.openAll)) {
          dirTreeRef.value.openAll()
        }
      }

      const closeAllDirTreeItem = () => {
        if (dirTreeRef.value && isFunction(dirTreeRef.value.closeAll)) {
          dirTreeRef.value.closeAll()
        }
      }

      const onPosition = () => {
        if (!noteId.value) return
        yiuHttp({
          api: SERVER_API.noteApi.positionFile,
          pathData: { id: noteId.value },
          tips: { anyObj: notification, error: { show: true } },
        })
      }

      const onEditMarkDown = () => {
        if (!noteId.value) return
        logStore.pushLog(String(Date.now()), 'info', '执行命令行：' + mainStore.currentEditSoft.path + ' ' + note.value.absPath)
        yiuHttp({
          api: SERVER_API.noteApi.editMarkdown,
          pathData: { id: noteId.value },
          tips: { anyObj: notification, error: { show: true } },
        })
      }

      return {
        mainStore,
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
        noteLoading,
        width,
        showMainPoint,
        onShowMainPoint,
        showDir,
        onShowDir,
        markdownTree,
        activeElId,
        mainPointTreeRef,
        searchMainPointKey,
        positionDocument,
        positionMainPointTree,
        openAllMainPointTreeItem,
        closeAllMainPointTreeItem,
        dirTree,
        dirTreeRef,
        searchDirKey,
        noteId,
        openAllDirTreeItem,
        closeAllDirTreeItem,
        positionDirTree,
        showDocumentNum,
        showDirNum,
        showMainPointNum,
        changeShowDocumentNum,
        changeShowDirNum,
        changeMainPointNum,
        changeDocumentTxt,
        changeDirTxt,
        changeMainPointTxt,
        onPosition,
        onEditMarkDown,
        previousNote,
        nextNote,
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
