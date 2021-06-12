<template>
  <div class="flex justify-center text-gray-500 select-none">
    <SystemTabItem :is-active="isActiveTab('workspace')"
                   @click="onClick('workspace')">
      <span class="iconify tab-item-icon" data-icon="mdi:view-list" data-inline="false"></span>
      <span class="tab-item-title">工作空间</span>
    </SystemTabItem>
    <SystemTabItem :is-active="isActiveTab('editSoft')"
                   @click="onClick('editSoft')">
      <span class="iconify tab-item-icon" data-icon="mdi:puzzle-edit" data-inline="false"></span>
      <span class="tab-item-title">编辑软件</span>
    </SystemTabItem>
    <SystemTabItem :is-active="isActiveTab('cacheImage')"
                   @click="onClick('cacheImage')">
      <span class="iconify tab-item-icon" data-icon="mdi:image" data-inline="false"></span>
      <span class="tab-item-title">缓存图片</span>
    </SystemTabItem>
    <SystemTabItem :is-active="isActiveTab('dbManage')"
                   @click="onClick('dbManage')">
      <span class="iconify tab-item-icon" data-icon="mdi:database-search" data-inline="false"></span>
      <span class="tab-item-title">数据管理</span>
    </SystemTabItem>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import SystemTabItem from '/@/views/system/tab/SystemTabItem.vue'
  import { systemTabKey } from '/@/views/system/tab/types'

  export default defineComponent({
    name: 'SystemTab',
    components: { SystemTabItem },
    props: {
      tabKey: propTypes.oneOf(new Array<systemTabKey>('workspace', 'editSoft', 'cacheImage', 'dbManage'))
                       .def('workspace'),
    },
    emits: ['change'],
    setup(props, { emit }) {
      const onClick = (key: string) => {
        emit('change', key)
      }
      const isActiveTab = (key: string) => {
        return key === props.tabKey
      }
      return {
        onClick,
        isActiveTab,
      }
    },
  })
</script>

<style scoped>

  .tab-item-icon {
    @apply text-2xl pr-1
  }

  .tab-item-title {
    @apply flex self-center text-base
  }
</style>
