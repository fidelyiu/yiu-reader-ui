<template>
  <div class="h-full overflow-hidden flex flex-col">
    <!--头部-->
    <div class="px-4 pb-4 pt-2 flex-none fa-center !justify-start text-base">
      <span class="flex-none iconify mr-1" data-icon="mdi:plus-box-multiple" data-inline="false"></span>
      <span class="flex-grow">添加布局</span>
      <button class="flex-none yiu-square-btn hover:bg-blue-50 active:bg-blue-100"
              @click="$emit('close')">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
    </div>
    <!--搜索部分-->
    <div class="flex-none px-4 mb-4">
      <SearchInput v-model="searchValue"></SearchInput>
    </div>
    <!--可添加内容-->
    <div class="flex-grow h-0 overflow-y-auto mb-4 select-none" @click="linkModal=true">
      <!--超链接-->
      <div class="fa-center hover:bg-blue-50 cursor-pointer p-4">
        <div class="flex-none w-[42px] h-[42px] bg-gray-200 rounded-3xl fa-center mr-[16px]">
          <span class="iconify text-3xl text-blue-500" data-icon="mdi:link-variant" data-inline="false"></span>
        </div>
        <div class="flex-grow w-0 mr-[16px]">
          <div class="truncate text-base">超链接</div>
          <div class="truncate text-md text-gray-500">可添加任意超链接，都会在新的标签页中打开。</div>
        </div>
        <button class="flex-none yiu-blue-square-btn-4" @click.stop="onAddLink">
          <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
        </button>
      </div>
    </div>
  </div>
  <n-modal v-model:show="linkModal">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">超链接布局</div>
      <button class="yiu-modal-close-btn" transparent @click="linkModal=false">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="fa-center mt-4">
        <div class="flex-none w-[42px] h-[42px] bg-gray-200 rounded-3xl fa-center mr-[16px]">
          <span class="iconify text-3xl text-blue-500" data-icon="mdi:link-variant" data-inline="false"></span>
        </div>
        <div class="flex-grow w-0 mr-[16px]">
          <div class="text-base">超链接</div>
          <div class="text-md text-gray-500">可添加任意超链接，都会在新的标签页中打开。</div>
        </div>
      </div>
      <div class="mt-4">最大实例数量：0/1</div>
      <div class="text-center mt-4">
        <n-button type="primary" class="text-white" @click="onAddLink">
          <span class="iconify block text-base mr-2" data-icon="mdi:plus" data-inline="false"></span>
          <span>添加布局</span>
        </n-button>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import SearchInput from '/@/components/SearchInput.vue'
  import { NButton, NCard, NModal } from 'naive-ui'

  export default defineComponent({
    name: 'CustomizeModal',
    components: {
      NCard,
      NModal,
      NButton,
      SearchInput,
    },
    emits: ['close'],
    setup() {
      const searchValue = ref('')
      const linkModal = ref(false)
      const linkLoading = ref(false)
      const onAddLink = () => {
        if (!linkLoading.value) {
          console.log(1)
          linkModal.value = false
          linkLoading.value = true
        }
        linkLoading.value = false
      }
      return {
        searchValue,
        linkModal,
        onAddLink,
      }
    },
  })
</script>

<style scoped>

</style>
