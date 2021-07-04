<template>
  <div class="w-full fa-center">
    <div class="flex-none ml-1">
      <template v-if="log.level==='info'">
        <div class="bg-blue-400 text-white rounded px-[5px] py-[1px]">INFO</div>
      </template>
      <template v-if="log.level==='warning'">
        <div class="bg-yellow-400 text-white rounded px-[5px] py-[1px]">WARNING</div>
      </template>
      <template v-if="log.level==='success'">
        <div class="bg-green-400 text-white rounded px-[5px] py-[1px]">SUCCESS</div>
      </template>
      <template v-if="log.level==='error'">
        <div class="bg-red-400 text-white rounded px-[5px] py-[1px]">ERROR</div>
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
  })
</script>

<style scoped>

</style>
