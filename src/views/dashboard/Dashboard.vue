<template>
  <div>Dashboard</div>
  <Button @click="sendApi" type="primary">发送请求</Button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Button } from 'ant-design-vue'
  import { yiuHttp } from '/@/utils/http'
  import { MethodEnum } from 'yiu-axios/type'

  export default defineComponent({
    name: 'Dashboard',
    components: { Button },
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
