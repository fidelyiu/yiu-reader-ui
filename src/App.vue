<template>
  <n-config-provider class="h-full"
                     :locale="locale"
                     :theme-overrides="themeOverrides">
    <n-notification-provider :scrollable="false">
      <div class="h-full flex flex-col overflow-hidden">
        <div class="flex-grow flex-shrink-0 flex flex-col h-0">
          <router-view></router-view>
        </div>
        <BottomBox></BottomBox>
      </div>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import BottomBox from '/@/components/BottomBox.vue'
  import { NConfigProvider, NNotificationProvider } from 'naive-ui'
  import { zhCN, dateZhCN } from 'naive-ui'

  export default defineComponent({
    name: 'App',
    components: {
      BottomBox,
      NConfigProvider,
      NNotificationProvider,
    },
    setup() {
      const themeOverrides = {
        common: {
          // 参考：https://ant.design/docs/spec/colors
          // 比如主按钮的背景颜色
          primaryColor: '#40a9ff',
          // 比如按钮字体颜色
          primaryColorHover: '#1890ff',
          // 比如按钮点击下去的颜色颜色
          primaryColorPressed: '#096dd9',
          primaryColorSuppl: 'red',
          errorColor: '#ff4d4f',
          errorColorHover: '#f5222d',
        },
        Notification: {
          fontSize: '16px',
          descriptionTextColor: 'rgba(0,0,0,.85)',
        },
      }
      return {
        locale: ref(zhCN),
        dateLocale: ref(dateZhCN),
        themeOverrides,
      }
    },
  })
</script>
