<template>
  <n-popover trigger="hover" placement="left">
    <template #trigger>
      <div class="w-full h-[44px] px-[6px] flex hover:bg-blue-50 justify-center" :class="{'bg-blue-50':active}">
        <!--前面的点-->
        <div v-show="showDot" class="w-[6px] mr-[6px] fa-center">
          <div class="w-[6px] h-[6px] rounded" :class="{'bg-blue-400':active}"></div>
        </div>
        <!--缩写Icon图标-->
        <div class="flex-none fa-center">
          <div class="h-[24px] w-[24px] fa-center text-white rounded"
               style="background: #2c3e50"
               :class="{'!bg-blue-400':active}">
            {{ getTitleAbridge(workspace.name) }}
          </div>
        </div>
        <!--工作空间文字-->
        <div v-show="showDot" class="ml-[8px] flex-grow fa-center w-0 pr-[10px] ">
          <span class="w-full truncate"
                style="color: #2c3e50"
                :class="{'!text-blue-400':active}">
            {{ workspace.name }}
          </span>
        </div>
      </div>
    </template>
    <span>{{ workspace.name }}</span>
  </n-popover>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { NPopover } from 'naive-ui'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'MenuItem',
    components: { NPopover },
    props: {
      active: propTypes.bool.def(false),
      showDot: propTypes.bool.def(true),
      workspace: propTypes.any,
    },
    setup() {
      const getTitleAbridge = (title) => {
        if (!title) {
          return '?'
        }
        return title.slice(0, 1)
      }
      return {
        getTitleAbridge,
      }
    },
  })
</script>

<style scoped>
</style>
