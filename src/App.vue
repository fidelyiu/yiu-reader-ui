<template>
  <img alt="Vue logo"
       src="./assets/logo.png">
  <Button type="primary">Primary</Button>
  <!--<button class="mt-2 py-2 px-4 rounded-lg shadow-md bg-green-500 hover:bg-green-700" @click="showWorkspace">获取当前工作空间-->
  <!--</button>-->
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { yiuHttp } from '/@/utils/http'
  import { MethodEnum } from 'yiu-axios/type'
  import { Button } from 'ant-design-vue'

  export default defineComponent({
    name: 'App',
    components: {
      Button,
    },
    setup() {
      const showWorkspace = () => {
        yiuHttp({
          api: {
            url: '/api/current/workspace',
            method: MethodEnum.GET,
          },
          success: (res) => {
            console.log(res)
          },
          error: (err) => {
            console.log(err)
          },
        })
      }
      return {
        showWorkspace,
      }
    },
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
