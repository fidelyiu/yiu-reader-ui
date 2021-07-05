<template>
  <div class="w-full h-full overflow-hidden pr-1 pb-3 pt-3">
    <div class="w-full h-full overflow-auto">
      <div class="relative w-full" :class="{'h-full': treeLoading||!treeData?.length}">
        <div class="sticky top-0 pb-2 px-4 bg-white flex-none flex">
          <SearchInput v-model="searchKey" class="flex-grow mr-2"></SearchInput>
          <div class="flex-none">
            <!--根目录添加按钮-->
            <button class="yiu-blue-square-btn-3 mr-2">
              <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
            </button>
            <!--图标控制按钮-->
            <button class="yiu-blue-square-btn-3 mr-2" @click="showIcon=!showIcon">
              <div v-show="showIcon">
                <span class="iconify block" data-icon="mdi:lightbulb-off-outline" data-inline="false"></span>
              </div>
              <div v-show="!showIcon">
                <span class="iconify block" data-icon="mdi:lightbulb-outline" data-inline="false"></span>
              </div>
            </button>
            <!--数字控制按钮-->
            <button class="yiu-blue-square-btn-3 mr-2" @click="showNumber=!showNumber">
              <div v-show="showNumber">
                <span class="iconify block" data-icon="mdi:alphabetical-off" data-inline="false"></span>
              </div>
              <div v-show="!showNumber">
                <span class="iconify block" data-icon="mdi:numeric" data-inline="false"></span>
              </div>
            </button>
            <!--编辑目录按钮-->
            <button class="yiu-blue-square-btn-3" @click="onEdit">
              <span class="iconify block" data-icon="mdi:list-status" data-inline="false"></span>
            </button>
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
                       :search-str="searchKey"
                       @change="loadNote"></YiuNoteTree>
        </div>
      </div>
    </div>
  </div>
  <n-modal v-model:show="editModal" :mask-closable="false">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">编排目录</div>
      <button class="yiu-modal-close-btn-1" transparent @click="onEditCancel">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="text-base mt-6">
        <NoteCatalogueForm></NoteCatalogueForm>
        <div class="flex justify-end">
          <n-button class="focus:outline-none"
                    type="primary"
                    @click="onEditCancel">
            完成
          </n-button>
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
  import { NButton, NCard, NModal, NSpin } from 'naive-ui'
  import NoteCatalogueForm from '/@/views/dashboard/widget/main-box/NoteCatalogueForm.vue'

  export default defineComponent({
    name: 'MainBoxWidget',
    components: {
      SearchInput,
      YiuNoteTree,
      NModal,
      NCard,
      NButton,
      NSpin,
      NoteCatalogueForm,
    },
    props: {
      layout: propTypes.object.isRequired,
    },
    setup() {
      const treeData = ref([])
      const searchKey = ref('')
      const showNumber = ref(false)
      const showIcon = ref(false)
      const editModal = ref(false)
      const treeLoading = ref(false)
      const onEdit = () => {
        editModal.value = true
      }
      const onEditCancel = () => {
        editModal.value = false
      }
      const loadNote = () => {
        yiuHttp({
          api: SERVER_API.noteApi.searchTree,
          loading: { flag: treeLoading },
          data: {
            show: true,
          },
          success: (res) => {
            treeData.value = res.data.result
          },
        })
      }
      loadNote()
      return {
        searchKey,
        treeData,
        treeLoading,
        loadNote,
        showNumber,
        showIcon,
        editModal,
        onEdit,
        onEditCancel,
      }
    },
  })
</script>

<style scoped>

</style>
