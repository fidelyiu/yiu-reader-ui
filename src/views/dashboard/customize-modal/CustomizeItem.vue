<template>
  <div v-if="canAdd"
       class="fa-center hover:bg-blue-50 cursor-pointer p-4"
       @click="modal=true">
    <div class="avatar-box fa-center">
      <slot></slot>
    </div>
    <div class="flex-grow w-0 mr-[16px]">
      <div class="truncate text-base">{{ name }}</div>
      <div class="truncate text-md text-gray-500">{{ descText }}</div>
    </div>
    <button class="flex-none yiu-blue-square-btn-4" @click.stop="onAddOk">
      <div v-show="loading">
        <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>
      </div>
      <div v-show="!loading">
        <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
      </div>
    </button>
  </div>
  <n-modal v-model:show="modal">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">{{ name }}</div>
      <button class="yiu-modal-close-btn-1" transparent @click="modal=false">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="fa-center mt-4">
        <div class="avatar-box fa-center">
          <slot></slot>
        </div>
        <div class="flex-grow w-0 mr-[16px]">
          <div class="text-base">{{ name }}</div>
          <div class="text-md text-gray-500">{{ descText }}</div>
        </div>
      </div>
      <div class="mt-4">最大实例数量：{{ count }} / {{ maxCount }}</div>
      <div class="text-center mt-4">
        <n-button type="primary"
                  class="text-white"
                  :loading="loading"
                  @click="onAddOk">
          <span class="iconify block text-base mr-2" data-icon="mdi:plus" data-inline="false"></span>
          <span>添加布局</span>
        </n-button>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { NButton, NCard, NModal } from 'naive-ui'
  import { isNumber } from 'lodash'

  export default defineComponent({
    name: 'CustomizeItem',
    components: {
      NCard,
      NModal,
      NButton,
    },
    props: {
      name: propTypes.string.isRequired,
      descText: propTypes.string.def('-'),
      count: propTypes.number.def(0),
      maxCount: propTypes.any.isRequired,
      loading: propTypes.bool.def(false),
    },
    emits: ['addLayout'],
    setup(prop, { emit }) {
      const modal = ref(false)
      const canAdd = computed(() => {
        if (!isNumber(prop.maxCount)) {
          return true
        }
        return prop.count < prop.maxCount
      })
      const onAddOk = () => {
        if (!prop.loading) {
          emit('addLayout')
          modal.value = false
        }
      }
      return {
        modal,
        canAdd,
        onAddOk,
      }
    },
  })
</script>

<style scoped>
  .avatar-box {
    @apply flex-none w-[42px] h-[42px] mr-[16px];
    @apply rounded-3xl text-3xl;
    @apply bg-gray-50 text-blue-500 border-1 border-gray-300;
  }
</style>
