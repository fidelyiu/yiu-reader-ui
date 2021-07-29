<template>
  <div>
    <div v-show="showText">
      <n-popover trigger="hover" :style="{ maxWidth: '160px' }">
        <template #trigger>
          <button :style="{padding: paddingPx+'px'}" :class="btnClass" @click.stop="$emit('btnClick')">
            <div v-show="loading">
              <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>
            </div>
            <div v-show="!loading">
              <slot name="icon"></slot>
            </div>
          </button>
        </template>
        <div class="break-all">
          <slot name="text"></slot>
        </div>
      </n-popover>
    </div>
    <div v-show="!showText">
      <button :style="{padding: paddingPx+'px'}" :class="btnClass" @click.stop="$emit('btnClick')">
        <div v-show="loading">
          <span class="iconify block animate-spin" data-icon="mdi:loading" data-inline="false"></span>
        </div>
        <div v-show="!loading">
          <slot name="icon"></slot>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { NPopover } from 'naive-ui'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'MainBoxBtn',
    components: {
      NPopover,
    },
    props: {
      showText: propTypes.bool.def(false),
      loading: propTypes.bool.def(false),
      paddingPx: propTypes.number.def(8),
      btnClass: propTypes.string.def('yiu-blue-square-btn-1'),
    },
    emits: ['btnClick'],
  })
</script>

<style scoped>

</style>
