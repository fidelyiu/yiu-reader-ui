<template>
  <div>Dashboard</div>
  <button type="primary" @click="sendApi">发送请求</button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { yiuHttp } from '/@/utils/http'
  import { MethodEnum } from 'yiu-axios/type'

  export default defineComponent({
    name: 'Dashboard',
    setup() {
      const sendApi = () => {
        yiuHttp({
          api: {
            method: MethodEnum.GET,
            url: 'yiu',
          },
        })
      }
      return { sendApi }
    },
  })
</script>

<style scoped>

</style>
