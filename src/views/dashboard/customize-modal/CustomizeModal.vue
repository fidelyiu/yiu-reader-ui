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
    <div class="flex-grow h-0 overflow-y-auto mb-4 select-none">
      <!--超链接-->
      <CustomizeItem name="超链接"
                     desc-text="可添加任意超链接，都会在新的标签页中打开。"
                     :loading="linkLoading"
                     :count="linkCount"
                     max-count="不限"
                     @addLayout="onAddLink">
        <span class="iconify" data-icon="mdi:link-variant" data-inline="false"></span>
      </CustomizeItem>
      <!--主盒子-->
      <CustomizeItem name="主盒子"
                     desc-text="用于展示当前工作空间的内容。"
                     :loading="mainBoxLoading"
                     :count="mainBoxCount"
                     :max-count="1"
                     @addLayout="onAddMainBox">
        <span class="iconify" data-icon="mdi:inbox-full-outline" data-inline="false"></span>
      </CustomizeItem>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref, ref } from 'vue'
  import SearchInput from '/@/components/SearchInput.vue'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { LayoutType } from '/@/vo/enum/layout-type'
  import { LayoutEntity } from '/@/vo/layout'
  import { ObjStatus } from '/@/vo/enum/obj-status'
  import CustomizeItem from '/@/views/dashboard/customize-modal/CustomizeItem.vue'

  export default defineComponent({
    name: 'CustomizeModal',
    components: {
      SearchInput,
      CustomizeItem,
    },
    emits: ['close', 'addSuccess'],
    setup(_prop, { emit }) {
      const widgetWrapperWidth: any = inject('widgetWrapperWidth')
      const linkCount: any = inject('linkCount')
      const mainBoxCount: any = inject('mainBoxCount')
      const searchValue = ref('')
      const linkLoading = ref(false)
      const mainBoxLoading = ref(false)

      // 统一的添加布局方法
      const addLayout = (data, loading: Ref<boolean>) => {
        if (!loading.value) {
          yiuHttp({
            loading: { flag: loading },
            api: SERVER_API.layoutApi.add,
            params: {
              maxX: widgetWrapperWidth?.value || 0,
            },
            data: data,
            success: () => {
              emit('addSuccess')
            },
          })
        }
      }

      // 添加链接布局
      const onAddLink = () => {
        const defaultLayout: LayoutEntity = {
          type: LayoutType.Link,
          status: ObjStatus.Valid,
          width: 250,
          height: 100,
          setting: {
            name: 'YiuReader地址',
            url: 'https://github.com/fidelyiu/yiu-reader',
          },
        }
        addLayout(defaultLayout, linkLoading)
      }

      // 添加主盒子布局
      const onAddMainBox = () => {
        const defaultLayout: LayoutEntity = {
          type: LayoutType.MainBox,
          status: ObjStatus.Valid,
          width: 750,
          height: 500,
          setting: {
            name: '主盒子',
          },
        }
        addLayout(defaultLayout, mainBoxLoading)
      }
      return {
        searchValue,
        linkCount,
        linkLoading,
        onAddLink,
        mainBoxCount,
        mainBoxLoading,
        onAddMainBox,
      }
    },
  })
</script>

<style scoped>

</style>
