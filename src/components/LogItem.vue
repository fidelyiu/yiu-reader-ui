<template>
  <div class="w-full fa-center">
    <div class="flex-none ml-1">
      <template v-if="log.level==='info'">
        <div class="bg-blue-400 text-white rounded px-[5px] py-[1px]">INFO</div>
      </template>
    </div>
    <div class="flex-grow ml-1 w-0 truncate">{{ log.message }}</div>
    <div class="flex-none text-gray-400 ml-1 fa-center">{{ log.time }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'LogItem',
    props: {
      log: propTypes.object.isRequired,
    },
    setup(prop) {
      console.log(prop.log)
      return {}
    },
  })
</script>

<style scoped>

</style>
