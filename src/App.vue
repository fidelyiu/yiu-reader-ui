<template>
  <img alt="Vue logo"
       src="./assets/logo.png">
  <HelloWorld msg="Hello Vue 31 + TypeScript + Vite"/>
  {{ name }}
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import HelloWorld from './components/HelloWorld.vue'
  import { yiuHttp } from '/@/utils/http'

  export default defineComponent({
    name: 'App',
    components: {
      HelloWorld,
    },
    setup() {
      const name = ref('Fidel')
      let cancel = yiuHttp({
        api: {
          method: 'GET',
          url: '/hello',
        },
        cancel: true,
        finally: () => {
          name.value = 'Yiu'
        },
      })
      setTimeout(() => {
        if (cancel) {
          cancel()
        }
      }, 500)
      return {
        name,
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
