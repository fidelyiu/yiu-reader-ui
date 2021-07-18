<template>
  <div class="w-full h-full overflow-hidden pr-1 pb-3 pt-3">
    <div class="w-full h-full overflow-auto">
      <div class="relative w-full" :class="{'h-full': treeLoading||!treeData?.length}">
        <div class="sticky top-0 pb-2 px-4 bg-white flex-none flex">
          <SearchInput v-model="searchKey" class="flex-grow mr-2"></SearchInput>
          <div class="flex-none flex">
            <!--是否展示提示-->
            <main-box-btn class="mr-2"
                          btn-class="yiu-blue-square-btn-3"
                          show-text
                          @btnClick="showBtnText=!showBtnText">
              <template #icon>
                <div v-show="!showBtnText">
                  <span class="iconify block" data-icon="mdi:comment-eye-outline" data-inline="false"></span>
                </div>
                <div v-show="showBtnText">
                  <span class="iconify block" data-icon="mdi:comment-off-outline" data-inline="false"></span>
                </div>
              </template>
              <template #text>
                <span v-show="showBtnText">隐藏按钮提示</span>
                <span v-show="!showBtnText">查看按钮提示</span>
              </template>
            </main-box-btn>
            <!--根目录添加按钮-->
            <button v-show="!layoutDir" class="yiu-blue-square-btn-3 mr-2">
              <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
            </button>
            <!--定位所有无效note-->
            <button v-show="layoutDir" class="yiu-blue-square-btn-3 mr-2">
              <span class="iconify block" data-icon="mdi:map-marker-alert-outline" data-inline="false"></span>
            </button>
            <!--清除所有无效note-->
            <button v-show="layoutDir" class="yiu-blue-square-btn-3 mr-2">
              <span class="iconify block" data-icon="mdi:delete-alert-outline" data-inline="false"></span>
            </button>
            <!--刷新目录按钮-->
            <main-box-btn v-show="layoutDir"
                          class="mr-2"
                          btn-class="yiu-blue-square-btn-3"
                          :show-text="showBtnText"
                          :loading="refreshLoading"
                          @btnClick="onRefresh">
              <template #icon>
                <span class="iconify block" data-icon="mdi:autorenew" data-inline="false"></span>
              </template>
              <template #text>
                <span>从本地刷新目录，可在日志中查看刷新。</span>
              </template>
            </main-box-btn>
            <!--查看隐藏文件-->
            <main-box-btn v-show="layoutDir && !showHideFile"
                          class="mr-2"
                          btn-class="yiu-blue-square-btn-3"
                          :show-text="showBtnText"
                          @btnClick="onShowHideFile">
              <template #icon>
                <span class="iconify block" data-icon="mdi:eye-outline" data-inline="false"></span>
              </template>
              <template #text>
                <span>查看隐藏文件</span>
              </template>
            </main-box-btn>
            <!--不查看隐藏文件-->
            <main-box-btn v-show="layoutDir && showHideFile"
                          class="mr-2"
                          btn-class="yiu-blue-square-btn-3"
                          :show-text="showBtnText"
                          @btnClick="onNotShowHideFile">
              <template #icon>
                <span class="iconify block" data-icon="mdi:eye-remove-outline" data-inline="false"></span>
              </template>
              <template #text>
                <span>不查看隐藏文件</span>
              </template>
            </main-box-btn>
            <!--图标控制按钮-->
            <main-box-btn class="mr-2"
                          btn-class="yiu-blue-square-btn-3"
                          :show-text="showBtnText"
                          @btnClick="showIcon=!showIcon">
              <template #icon>
                <div v-show="showIcon">
                  <span class="iconify block" data-icon="mdi:lightbulb-off-outline" data-inline="false"></span>
                </div>
                <div v-show="!showIcon">
                  <span class="iconify block" data-icon="mdi:lightbulb-outline" data-inline="false"></span>
                </div>
              </template>
              <template #text>
                <span v-show="showIcon">隐藏图标</span>
                <span v-show="!showIcon">查看图标</span>
              </template>
            </main-box-btn>
            <!--数字控制按钮-->
            <main-box-btn class="mr-2"
                          btn-class="yiu-blue-square-btn-3"
                          :show-text="showBtnText"
                          @btnClick="showNumber=!showNumber">
              <template #icon>
                <div v-show="showNumber">
                  <span class="iconify block" data-icon="mdi:alphabetical-off" data-inline="false"></span>
                </div>
                <div v-show="!showNumber">
                  <span class="iconify block" data-icon="mdi:numeric" data-inline="false"></span>
                </div>
              </template>
              <template #text>
                <span v-show="showIcon">隐藏序号</span>
                <span v-show="!showIcon">查看序号</span>
              </template>
            </main-box-btn>
            <!--编辑目录按钮-->
            <main-box-btn v-show="!layoutDir"
                          btn-class="yiu-blue-square-btn-3"
                          :show-text="showBtnText"
                          @btnClick="onLayOutDir">
              <template #icon>
                <div>
                  <span class="iconify block" data-icon="mdi:list-status" data-inline="false"></span>
                </div>
              </template>
              <template #text>
                <span>编辑目录</span>
              </template>
            </main-box-btn>
            <!--取消编辑目录按钮-->
            <main-box-btn v-show="layoutDir"
                          btn-class="yiu-blue-square-btn-3"
                          :show-text="showBtnText"
                          @btnClick="onLayOutDirCancel">
              <template #icon>
                <div>
                  <span class="iconify block" data-icon="mdi:playlist-remove" data-inline="false"></span>
                </div>
              </template>
              <template #text>
                <span>编辑完成</span>
              </template>
            </main-box-btn>
          </div>
        </div>
        <!--空数据栏-->
        <div v-if="!treeLoading && !treeData?.length"
             class="absolute inset-0 mt-[32px] grid place-items-center">
          <div class="flex items-center text-gray-500">
            <span class="iconify text-2xl" data-icon="mdi:inbox" data-inline="false"></span>
            <span class="leading-10 text-base">暂无数据</span>
          </div>
        </div>
        <!--加载栏-->
        <div v-if="treeLoading" class="absolute inset-0 mt-[32px] grid justify-center content-center">
          <n-spin></n-spin>
        </div>
        <!--内容部分-->
        <div class="w-full overflow-auto px-2">
          <YiuNoteTree :data="treeData"
                       :show-number="showNumber"
                       :show-icon="showIcon"
                       :search-str="searchKey">
            <template #default="slotProps">
              <div class="flex">
                <!--隐藏按钮-->
                <main-box-btn v-if="layoutDir"
                              class="mr-2"
                              :show-text="showBtnText"
                              :loading="changeFileShowLoading"
                              @btnClick="changeFileShow(slotProps.node.data.id)">
                  <template #icon>
                    <div v-show="slotProps.node.data.show">
                      <span class="iconify block" data-icon="mdi:eye-off-outline" data-inline="false"></span>
                    </div>
                    <div v-show="!slotProps.node.data.show">
                      <span class="iconify block" data-icon="mdi:eye-outline" data-inline="false"></span>
                    </div>
                  </template>
                  <template #text>
                    <span v-show="slotProps.node.data.show">隐藏文件</span>
                    <span v-show="!slotProps.node.data.show">展示文件</span>
                  </template>
                </main-box-btn>
                <!--增加按钮-->
                <div v-if="slotProps.node.data.isDir" class="mr-2">
                  <button class="yiu-blue-square-btn-1">
                    <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
                  </button>
                </div>
                <!--在编辑器中打开-->
                <div v-if="!slotProps.node.data.isDir" class="mr-2">
                  <button class="yiu-blue-square-btn-1">
                    <span class="iconify block" data-icon="mdi:file-code-outline" data-inline="false"></span>
                  </button>
                </div>
                <!--修改按钮-->
                <div class="mr-2">
                  <button class="yiu-blue-square-btn-1">
                    <span class="iconify block" data-icon="mdi:square-edit-outline" data-inline="false"></span>
                  </button>
                </div>
                <!--定位按钮-->
                <main-box-btn class="mr-2"
                              :show-text="showBtnText"
                              @btnClick="onPosition(slotProps.node.data.id)">
                  <template #icon>
                    <div>
                      <span class="iconify block" data-icon="mdi:folder-marker-outline" data-inline="false"></span>
                    </div>
                  </template>
                  <template #text>
                    <span>在文件管理器中打开</span>
                  </template>
                </main-box-btn>
                <!--删除按钮-->
                <main-box-btn :show-text="showBtnText"
                              @btnClick="onDelete(slotProps.node.data)">
                  <template #icon>
                    <div>
                      <span class="iconify block" data-icon="mdi:delete-forever-outline" data-inline="false"></span>
                    </div>
                  </template>
                  <template #text>
                    <span>删除</span>
                  </template>
                </main-box-btn>
              </div>
            </template>
          </YiuNoteTree>
        </div>
      </div>
    </div>
  </div>
  <n-modal v-model:show="deleteModal">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">删除提示</div>
      <button class="yiu-modal-close-btn-1" transparent @click="onDeleteCancel">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="text-base mt-6">
        <div class="mb-6">
          <div class="mb-3">
            <span>将删除</span>
            <span class="font-semibold mr-1">{{ tempNodeData.name }}</span>
            <span v-if="tempNodeData.isDir" class="font-semibold">目录</span>
            <span v-else class="font-semibold">文件</span>
            <span>，请确定你的删除方式。</span>
          </div>
          <div class="border-1 border-yellow-500 bg-yellow-50 px-4 py-2 mb-3">
            删除YR数据可在编排目录中刷新再次得到。
          </div>
          <div class="border-1 border-red-500 bg-red-50 px-4 py-2 mb-5">
            <div class="mb-2">删除本地文件将无法恢复。</div>
            <div class="mb-2">为防止意外，确认继续操作请输入以下内容：</div>
            <span class="font-semibold mr-1 border-dashed border-b-3 border-red-500">{{ tempNodeData.name }}</span>
          </div>
          <input
              v-model="delStr"
              class="w-full border-1 border-gray-300 rounded px-4 py-1 focus:outline-none focus:border-yellow-400"
              type="text">
        </div>
        <div class="flex justify-end">
          <n-button class="focus:outline-none"
                    type="error"
                    :disabled="delStr!==tempNodeData.name"
                    :loading="deleteLoading"
                    @click="onDeleteOk(true)">
            删除 YR数据 & 本地文件
          </n-button>
          <div class="flex-grow"></div>
          <n-button class="focus:outline-none mr-4"
                    type="primary"
                    :loading="deleteLoading"
                    @click="onDeleteOk(false)">
            删除 YR数据
          </n-button>
          <n-button class="focus:outline-none" @click="onDeleteCancel">取消</n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import YiuNoteTree from '/@/components/yiu-note-tree'
  import SearchInput from '/@/components/SearchInput.vue'
  import { NButton, NCard, NModal, NSpin, useNotification } from 'naive-ui'
  import { useLogStore } from '/@/store/modules/log'
  import { NoteReadResult } from '/@/vo/enum/note-read-result'
  import { nanoid } from 'nanoid'
  import MainBoxBtn from '/@/views/dashboard/widget/main-box/MainBoxBtn.vue'

  export default defineComponent({
    name: 'MainBoxWidget',
    components: {
      SearchInput,
      YiuNoteTree,
      NModal,
      NCard,
      NButton,
      NSpin,
      MainBoxBtn,
    },
    props: {
      layout: propTypes.object.isRequired,
    },
    setup() {
      const logStore = useLogStore()
      const notification = useNotification()
      const treeData = ref([])
      const searchKey = ref('')
      const showNumber = ref(false)
      const showIcon = ref(false)
      const treeLoading = ref(false)
      const loadNote = () => {
        if (treeLoading.value) return
        yiuHttp({
          api: SERVER_API.noteApi.searchTree,
          loading: { flag: treeLoading },
          data: {
            show: !showHideFile.value,
            badFileEnd: true,
          },
          success: (res) => {
            treeData.value = res.data.result
            refreshLoading.value = false
          },
        })
      }

      const tempNodeData = ref<any>()
      const delStr = ref('')
      const deleteModal = ref(false)
      const onDelete = (nodeData: any) => {
        tempNodeData.value = nodeData
        deleteModal.value = true
      }
      const onDeleteCancel = () => {
        deleteModal.value = false
        delStr.value = ''
      }
      const deleteLoading = ref(false)
      const onDeleteOk = (isFile: boolean) => {
        yiuHttp({
          api: isFile ? SERVER_API.noteApi.delFile : SERVER_API.noteApi.del,
          loading: { flag: deleteLoading },
          tips: { anyObj: notification, error: { show: true } },
          pathData: { id: tempNodeData.value.id || '-' },
          success: () => {
            deleteModal.value = false
            loadNote()
          },
        })
      }

      // 是否正在编排目录
      const layoutDir = ref(false)
      const showHideFile = ref(false)
      const onShowHideFile = () => {
        if (showHideFile.value) return
        showHideFile.value = true
        loadNote()
      }
      const onNotShowHideFile = () => {
        if (!showHideFile.value) return
        showHideFile.value = false
        loadNote()
      }
      // 开始编排目录
      const onLayOutDir = () => {
        layoutDir.value = true
      }
      // 取消编排目录
      const onLayOutDirCancel = () => {
        layoutDir.value = false
        showHideFile.value = false
        loadNote()
      }

      const onPosition = (id) => {
        yiuHttp({
          api: SERVER_API.noteApi.positionFile,
          pathData: { id },
          tips: { anyObj: notification, error: { show: true } },
        })
      }

      const refreshLoading = ref(false)
      const onRefresh = () => {
        const refreshList: any = {}
        const ws = new WebSocket(`ws://localhost:8080${SERVER_API.noteApi.refresh.url}?path=`)
        if (!ws) return
        refreshLoading.value = true
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
          loadNote()
        }
      }

      const changeFileShowLoading = ref(false)
      const changeFileShow = (id) => {
        if (changeFileShowLoading.value) return
        console.log(id)
        // 先修改远程数据
        yiuHttp({
          api: SERVER_API.noteApi.changeShow,
          loading: { flag: changeFileShowLoading },
          pathData: { id },
          tips: { anyObj: notification, error: { show: true } },
          success: () => {
            treeData.value = changeTreeItemShow(id, treeData.value)
          },
        })
      }
      const changeTreeItemShow = (id, noteTree) => {
        let hasFind = false
        const _changeTreeItemShow = (_noteTree) => {
          if (!_noteTree.length) {
            return []
          }
          for (let i = 0; i < _noteTree.length; i++) {
            if (hasFind) {
              break
            }
            if (_noteTree[i].data.id === id) {
              hasFind = true
              _noteTree[i].data.show = !_noteTree[i].data.show
              break
            }
            if (_noteTree[i].child && _noteTree[i].child.length) {
              _noteTree[i].child = _changeTreeItemShow(_noteTree[i].child)
            }
          }
          return _noteTree
        }
        return _changeTreeItemShow(noteTree)
      }

      const showBtnText = ref(true)

      loadNote()
      return {
        searchKey,
        treeData,
        treeLoading,
        loadNote,
        showNumber,
        showIcon,
        tempNodeData,
        delStr,
        deleteModal,
        deleteLoading,
        onDelete,
        onDeleteCancel,
        onDeleteOk,
        showHideFile,
        onShowHideFile,
        onNotShowHideFile,
        layoutDir,
        onLayOutDir,
        onLayOutDirCancel,
        refreshLoading,
        onRefresh,
        onPosition,
        changeFileShow,
        changeFileShowLoading,
        showBtnText,
      }
    },
  })
</script>

<style scoped>

</style>
