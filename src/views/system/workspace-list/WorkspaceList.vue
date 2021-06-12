<template>
  <div class="w-full flex">
    <div class="flex-grow mr-4">
      <div class="flex rounded-3xl border-1 border-blue-100 bg-blue-50 overflow-hidden transition-all ease-in-out"
           :class="{'bg-white': searchActive}">
        <span class="iconify self-center ml-3 mr-2 text-lg text-gray-500"
              data-icon="mdi:magnify"
              data-inline="false"></span>
        <input class="w-full h-[30px] outline-none text-sm bg-blue-50 transition-all ease-in-out"
               :class="{'bg-white': searchActive}"
               type="text"
               @focus="searchActive = true"
               @blur="searchActive = false">
      </div>
    </div>
    <div class="flex-none">
      <div class="p-2 bg-blue-100 hover:bg-blue-50">
        <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
      </div>
    </div>
  </div>
  <div class="mt-2">
    <div v-for="(item, index) in workspaceList" :key="index">{{ item.name }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'

  export default defineComponent({
    name: 'WorkspaceList',
    setup() {
      const workspaceList = reactive([
        {
          name: 'Item1',
        },
        {
          name: 'Item2',
        },
      ])
      setTimeout(() => {
        workspaceList.push({
          name: 'Item3',
        })
      }, 1000)
      const searchActive = ref(false)
      return {
        workspaceList,
        searchActive,
      }
    },
  })
</script>

<style scoped>

</style>
