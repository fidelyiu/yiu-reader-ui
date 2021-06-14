<template>
  <n-config-provider class="h-full" :theme-overrides="themeOverrides">
    <div class="h-full flex flex-col overflow-hidden">
      <div class="flex-grow flex-shrink-0 flex flex-col h-0">
        <router-view></router-view>
      </div>
      <BottomBox class="flex-none"></BottomBox>
    </div>
  </n-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BottomBox from '/@/components/BottomBox.vue'
  import { NConfigProvider } from 'naive-ui'

  export default defineComponent({
    name: 'App',
    components: {
      BottomBox,
      NConfigProvider,
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
          errorColor: 'rgba(248, 113, 113, 1)',
          errorColorHover: 'rgba(248, 113, 113, 1)',
        },
      }
      return {
        themeOverrides,
      }
    },
  })
</script>
