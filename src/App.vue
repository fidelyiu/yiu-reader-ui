<template>
  <img alt="Vue logo"
       src="./assets/logo.png">
  <HelloWorld msg="Hello Vue 31 + TypeScript + Vite"/>
  <button @click="showWorkspace">获取当前工作空间</button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import HelloWorld from './components/HelloWorld.vue'
  import { yiuHttp } from '/@/utils/http'
  import { MethodEnum } from 'yiu-axios/type'

  export default defineComponent({
    name: 'App',
    components: {
      HelloWorld,
    },
    setup() {
      const showWorkspace = () => {
        yiuHttp({
          api: {
            url: '/current/workspace',
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
