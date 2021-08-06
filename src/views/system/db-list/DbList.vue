<template>
  <!-- :class="{'h-full': searchLoading||!resultList.length}"-->
  <div class="relative h-full flex flex-col">
    <!--sticky top-0 -->
    <div class="w-full px-4 pb-4 bg-white flex-none">
      <div class="w-full fa-center">
        <div class="text-base flex-none">表名：</div>
        <div class="px-2 mr-4 rounded-3xl bg-blue-50 border border-blue-100 flex-none">
          <select v-model="searchDb"
                  class="rounded focus:outline-none h-[30px] bg-blue-50"
                  @change="search">
            <option value="main">主表</option>
            <option value="layout">布局</option>
            <option value="workspace">工作空间</option>
            <option value="note">笔记</option>
            <option value="image_cache">图片</option>
            <option value="edit_soft_cache">编辑软件</option>
          </select>
        </div>
        <div class="text-base flex-none">Key：</div>
        <div class="mr-4 border border-blue-100 bg-blue-50 rounded-3xl px-4 flex-none"
             :class="{'!bg-white': keyActive}">
          <input v-model="searchKey"
                 class="bg-blue-50 active:bg-white focus:outline-none  h-[30px] rounded w-full"
                 :class="{'!bg-white': keyActive}"
                 type="text"
                 @focus="keyActive = true"
                 @blur="keyActive = false">
        </div>
        <div class="text-base flex-none">字符：</div>
        <div class="mr-4 border border-blue-100 bg-blue-50 rounded-3xl px-4 flex-grow"
             :class="{'!bg-white': inputActive}">
          <input v-model="searchStr"
                 class="bg-blue-50 active:bg-white focus:outline-none  h-[30px] rounded w-full"
                 :class="{'!bg-white': inputActive}"
                 type="text"
                 @focus="inputActive = true"
                 @blur="inputActive = false">
        </div>
        <button class="yiu-blue-square-btn-3 flex-none mr-4" @click="onAddSearchStr">
          <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
        </button>
        <button class="yiu-blue-square-btn-3 flex-none mr-4" @click="onReset">
          <span class="iconify block" data-icon="mdi:reload" data-inline="false"></span>
        </button>
        <button class="yiu-blue-square-btn-3 flex-none" @click="search">
          <span class="iconify block" data-icon="mdi:magnify" data-inline="false"></span>
        </button>
      </div>
      <div class="w-full mt-4">
        <span class="text-base">匹配字符：</span>
        <n-popover v-for="(item, index) of searchStrList"
                   :key="index"
                   trigger="hover"
                   placement="bottom"
                   :style="{ maxWidth: '160px' }">
          <template #trigger>
            <n-tag class="mr-2 yiu-n-tag mb-1"
                   closable
                   type="info"
                   @close="searchStrList.splice(index, 1)">
              {{ item }}
            </n-tag>
          </template>
          <div class="break-all">
            {{ item }}
          </div>
        </n-popover>
      </div>
    </div>
    <!--中间部分-->
    <div class="flex-grow w-full h-0 overflow-hidden">
      <div ref="tableBox" class="h-full">
        <!--减去头部47和2px的边框-->
        <n-data-table class="yiu-table overflow-auto"
                      :columns="columns"
                      :data="resultList"
                      :max-height="tableHeight-49"
                      :loading="searchLoading"
                      :single-line="false"/>
      </div>
    </div>
    <!--分页部分-->
    <div class="flex-none w-full pt-4 px-4 text-right">
      <n-pagination v-model:page="page"
                    v-model:page-size="pageSize"
                    style="justify-content: flex-end;"
                    :page-count="totalPage"
                    show-size-picker
                    :page-sizes="[10, 20, 30, 40]"
                    show-quick-jumper
                    :on-update:page="onPageChane"
                    :on-update:page-size="onPageSizeChane">
        <template #prefix>
          共 {{ totalRow || 0 }} 项
        </template>
      </n-pagination>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { NDataTable, NPagination, NPopover, NTag } from 'naive-ui'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { useElementSize } from '@vueuse/core'

  export default defineComponent({
    name: 'DbList',
    components: {
      NTag,
      NPopover,
      NPagination,
      NDataTable,
    },
    setup() {
      const tableBox = ref(null)
      const { height: tableHeight } = useElementSize(tableBox)
      const keyActive = ref(false)
      const inputActive = ref(false)
      const searchLoading = ref(false)
      const resultList = ref([])
      const searchStr = ref('')
      const searchKey = ref('')
      const searchDb = ref('main')
      const searchStrList = ref<Array<string>>([])
      const page = ref(1)
      const pageSize = ref(10)
      const totalPage = ref(undefined)
      const totalRow = ref(0)
      const onAddSearchStr = () => {
        if (searchStr.value) {
          searchStrList.value.push(searchStr.value)
          searchStr.value = ''
        }
      }
      const search = () => {
        if (searchLoading.value) return
        resultList.value = []
        totalRow.value = 0
        totalPage.value = undefined
        yiuHttp({
          api: SERVER_API.dbApi.search,
          loading: { flag: searchLoading },
          data: {
            key: searchKey.value,
            str: searchStrList.value,
            db: searchDb.value,
            pageSize: pageSize.value,
            page: page.value,
          },
          success: (res) => {
            resultList.value = res.data.result.data || []
            totalPage.value = res.data.result.totalPage || undefined
            totalRow.value = res.data.result.totalRow || 0
          },
        })
      }
      const onReset = () => {
        if (searchLoading.value) return
        searchKey.value = ''
        searchStr.value = ''
        searchStrList.value = []
        search()
      }
      const columns = [
        {
          title: 'Key',
          key: 'key',
          width: 170,
        },
        {
          title: '值',
          key: 'value',
        },
      ]
      const onPageChane = (changePage: number) => {
        if (changePage > 0) {
          if (totalPage.value && changePage <= (totalPage.value || 0)) {
            page.value = changePage
          }
        }
        search()
      }
      const onPageSizeChane = (changePageSize: number) => {
        console.log(1)
        if (changePageSize > 0) {
          pageSize.value = changePageSize
        }
        search()
      }
      search()
      return {
        keyActive,
        inputActive,
        searchLoading,
        resultList,
        searchDb,
        searchKey,
        searchStr,
        searchStrList,
        onAddSearchStr,
        onReset,
        search,
        page,
        pageSize,
        totalPage,
        totalRow,
        columns,
        tableBox,
        tableHeight,
        onPageChane,
        onPageSizeChane,
      }
    },
  })
</script>

<style scoped>
  .yiu-table {
    --border-color: rgb(219, 234, 254) !important;
    --th-color: rgb(239, 246, 255) !important;
    --td-color-hover: rgb(239, 246, 255) !important;
  }
</style>
