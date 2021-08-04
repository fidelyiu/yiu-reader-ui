<template>
  <div class="relative" :class="{'h-full': searchLoading||!resultList.length}">
    <div class="w-full px-4 pb-4 sticky top-0 bg-white">
      <div class="w-full fa-center">
        <div class="text-base flex-none">表名：</div>
        <div class="px-2 mr-4 rounded-3xl bg-blue-50 border border-blue-100 flex-none">
          <select class="rounded focus:outline-none h-[30px] bg-blue-50">
            <option value="main">主表</option>
            <option value="layout">布局</option>
            <option value="workspace">工作空间</option>
            <option value="note">笔记</option>
            <option value="image_cache">图片</option>
            <option value="edit_soft_cache">编辑软件</option>
          </select>
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
        <button class="yiu-blue-square-btn-3">
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
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { NPopover, NTag } from 'naive-ui'

  export default defineComponent({
    name: 'DbList',
    components: {
      NTag,
      NPopover,
    },
    setup() {
      const inputActive = ref(false)
      const searchLoading = ref(false)
      const resultList = ref([])
      const searchStr = ref('')
      const searchStrList = ref<Array<string>>([])
      const onAddSearchStr = () => {
        if (searchStr.value) {
          searchStrList.value.push(searchStr.value)
          searchStr.value = ''
        }
      }
      return {
        inputActive,
        searchLoading,
        resultList,
        searchStr,
        searchStrList,
        onAddSearchStr,
      }
    },
  })
</script>

<style scoped>

</style>
