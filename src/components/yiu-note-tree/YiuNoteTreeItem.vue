<template>
  <div class="w-full">
    <div class="flex hover:bg-blue-50 p-2 cursor-pointer" @click="onClick">
      <div class="flex-none mr-2">
        <div v-if="!data?.data?.isDir" class="fa-center">
          <span class="iconify text-xl" data-icon="mdi:language-markdown-outline" data-inline="false"></span>
        </div>
        <div v-else>
          <transition name="yiu-fade-in">
            <div v-if="isOpen" class="fa-center">
              <span class="iconify text-xl" data-icon="mdi:folder-open-outline" data-inline="false"></span>
            </div>
            <div v-else class="fa-center">
              <span class="iconify text-xl" data-icon="mdi:folder-outline" data-inline="false"></span>
            </div>
          </transition>
        </div>
      </div>
      <div class="flex-grow flex items-center w-0 truncate select-none">{{ data.data.name }}</div>
    </div>
    <div v-if="isOpen && data?.child && data?.child?.length" class="ml-[16px]">
      <YiuTreeItem v-for="(item, index) in data.child"
                   :key="index"
                   :data="item"
                   class="border-l border-blue-200"
                   @click="onClick"></YiuTreeItem>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { isString } from 'lodash'

  export default defineComponent({
    name: 'YiuTreeItem',
    props: {
      data: propTypes.object,
    },
    emits: ['click'],
    setup(prop, { emit }) {
      const isOpen = ref(false)
      const onClick = (id: any) => {
        if (isString(id)) {
          emit('click', id)
        } else {
          if (prop?.data?.data?.isDir) {
            isOpen.value = !isOpen.value
          } else {
            emit('click', prop?.data?.id)
          }
        }
      }
      return {
        isOpen,
        onClick,
      }
    },
  })
</script>

<style scoped>

</style>
