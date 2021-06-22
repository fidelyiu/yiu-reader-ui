<template>
  <div class="flex rounded-3xl border border-blue-100 bg-blue-50 overflow-hidden transition-all ease-in-out"
       :class="{'!bg-white': active}">
    <span class="iconify self-center ml-3 mr-2 text-lg text-gray-500"
          data-icon="mdi:magnify"
          data-inline="false"></span>
    <input :value="modelValue"
           class="w-full h-[30px] outline-none text-sm bg-blue-50 transition-all ease-in-out"
           :class="{'!bg-white': active}"
           type="text"
           @input="onValueChange"
           @focus="active = true"
           @blur="active = false">
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { debounce } from 'lodash'

  export default defineComponent({
    name: 'SearchInput',
    props: {
      modelValue: propTypes.string.def(''),
    },
    emits: ['update:modelValue', 'change'],
    setup(_props, { emit }) {
      const active = ref(false)
      const onValueChange = debounce((e) => {
        emit('update:modelValue', e.target.value || '')
        emit('change', e.target.value || '')
      }, 500)
      return {
        active,
        onValueChange,
      }
    },
  })
</script>

<style scoped>

</style>
