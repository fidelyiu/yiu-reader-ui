<template>
  <div class="w-full">
    <div class="flex hover:bg-blue-50 p-2 cursor-pointer" @click="onClick">
      <div class="flex-none mr-2 fa-center text-gray-500">
        <span v-show="showNumber" class="italic font-normal">{{ numberTitle }}&nbsp;</span>
        <div v-if="!data?.data?.isDir">
          <span class="iconify block text-xl" data-icon="mdi:language-markdown-outline" data-inline="false"></span>
        </div>
        <div v-else>
          <transition name="yiu-fade-in">
            <div v-if="isOpen">
              <span class="iconify block text-xl" data-icon="mdi:folder-open-outline" data-inline="false"></span>
            </div>
            <div v-else>
              <span class="iconify block text-xl" data-icon="mdi:folder-outline" data-inline="false"></span>
            </div>
          </transition>
        </div>
      </div>
      <div class="flex-grow flex items-center w-0 truncate select-none mr-2">
        <span class="mr-2 font-semibold">{{ data.data.name }}</span>
        <span v-if="!data.data.defStatus" class="text-gray-400">[未排序]</span>
      </div>
      <div class="flex-none flex">
        <!--增加按钮-->
        <div v-if="data.data.isDir" class="mr-2">
          <button class="yiu-blue-square-btn-1">
            <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
          </button>
        </div>
        <!--在编辑器中打开-->
        <div v-if="!data.data.isDir" class="mr-2">
          <button class="yiu-blue-square-btn-1">
            <span class="iconify block" data-icon="mdi:file-code-outline" data-inline="false"></span>
          </button>
        </div>
        <!--修改按钮-->
        <div class="mr-2">
          <button class="yiu-blue-square-btn-1">
            <span class="iconify block" data-icon="mdi:square-edit-outline" data-inline="false"></span>
          </button>
        </div>
        <!--定位按钮-->
        <div class="mr-2">
          <button class="yiu-blue-square-btn-1">
            <span class="iconify block" data-icon="mdi:folder-marker-outline" data-inline="false"></span>
          </button>
        </div>
        <!--删除按钮-->
        <div>
          <button class="yiu-blue-square-btn-1">
            <span class="iconify block" data-icon="mdi:delete-forever-outline" data-inline="false"></span>
          </button>
        </div>
        <!--<div class="mr-2">-->
        <!--  <button class="yiu-blue-square-btn-1">-->
        <!--    <span class="iconify block" data-icon="mdi:autorenew" data-inline="false"></span>-->
        <!--  </button>-->
        <!--</div>-->
        <!--&lt;!&ndash;上移按钮&ndash;&gt;-->
        <!--<div class="mr-2">-->
        <!--  <button class="yiu-blue-square-btn-1">-->
        <!--    <div v-show="moveLoading">-->
        <!--      <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>-->
        <!--    </div>-->
        <!--    <div v-show="!moveLoading">-->
        <!--      <span class="iconify block" data-icon="mdi:arrow-up" data-inline="false"></span>-->
        <!--    </div>-->
        <!--  </button>-->
        <!--</div>-->
        <!--&lt;!&ndash;下移按钮&ndash;&gt;-->
        <!--<div>-->
        <!--  <button class="yiu-blue-square-btn-1">-->
        <!--    <div v-show="moveLoading">-->
        <!--      <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>-->
        <!--    </div>-->
        <!--    <div v-show="!moveLoading">-->
        <!--      <span class="iconify block" data-icon="mdi:arrow-down" data-inline="false"></span>-->
        <!--    </div>-->
        <!--  </button>-->
        <!--</div>-->
      </div>
    </div>
    <div v-show="isOpen && data?.child && data?.child?.length" class="ml-[16px]">
      <YiuTreeItem v-for="(item, index) in data.child"
                   :key="index"
                   :data="item"
                   :number-title="numberTitle+(index+1)+'.'"
                   class="border-l border-blue-200"
                   @click="onClick"></YiuTreeItem>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { isString } from 'lodash'

  export default defineComponent({
    name: 'YiuTreeItem',
    props: {
      data: propTypes.object,
      numberTitle: propTypes.string.isRequired,
    },
    emits: ['click'],
    setup(prop, { emit }) {
      const showNumber: any = inject('showNumber')
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
        showNumber,
      }
    },
  })
</script>

<style scoped>

</style>
