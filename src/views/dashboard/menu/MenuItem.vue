<template>
  <n-popover trigger="hover" placement="left">
    <template #trigger>
      <div class="w-full h-[44px] px-[6px] flex hover:bg-blue-50 justify-center cursor-pointer"
           :class="{'bg-blue-50':active}"
           @click="onChangeWorkSpace">
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
            {{ workspace.name || '-' }}
          </span>
        </div>
      </div>
    </template>
    <span>{{ workspace.name || '-' }}</span>
  </n-popover>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { NPopover, useNotification } from 'naive-ui'
  import { propTypes } from '/@/utils/propTypes'
  import { yiuHttp } from '/@/utils/http'
  import SERVER_API from '/@/api'
  import { useMainStore } from '/@/store/modules/main'

  export default defineComponent({
    name: 'MenuItem',
    components: { NPopover },
    props: {
      active: propTypes.bool.def(false),
      showDot: propTypes.bool.def(true),
      workspace: propTypes.any,
    },
    setup(props) {
      const mainStore = useMainStore()
      const notification = useNotification()
      const getTitleAbridge = (title) => {
        if (!title) {
          return '?'
        }
        return title.slice(0, 1)
      }

      const onChangeWorkSpace = () => {
        if (!props.workspace.id) return
        if (mainStore.currentWorkspace.id === props.workspace.id) return
        mainStore.changingWorkspace = true
        yiuHttp({
          api: SERVER_API.mainApi.setCurrentWorkspace,
          tips: { anyObj: notification, error: { show: true } },
          pathData: { id: props.workspace.id },
          success: (res) => {
            mainStore.setCurrentWorkspace(res?.data?.result)
          },
          finally: () => {
            mainStore.changingWorkspace = false
          },
        })
      }
      return {
        getTitleAbridge,
        onChangeWorkSpace,
      }
    },
  })
</script>

<style scoped>
</style>
