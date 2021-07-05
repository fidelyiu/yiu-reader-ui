<template>
  <div class="w-full">
    <div class="flex hover:bg-blue-50 p-2 cursor-pointer" @click="onClick">
      <div class="flex-none fa-center text-gray-500">
        <span v-show="showNumber" class="italic font-normal mr-1">{{ numberTitle }}</span>
        <span v-show="showIcon" class="mr-1">
          <div v-if="!node?.data?.isDir">
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
        </span>
      </div>
      <div class="flex-grow flex items-center w-0 truncate select-none mr-2">
        <span class="mr-2 font-semibold">
          <span v-if="node.data.name.indexOf(searchStr) > -1">{{
              node.data.name.substr(0, node.data.name.indexOf(searchStr))
            }}<span class="bg-yellow-200">{{
                searchStr
              }}</span>{{ node.data.name.substr(node.data.name.indexOf(searchStr) + searchStr.length) }}</span>
        <span v-else>{{ node.data.name }}</span>
        </span>
        <span v-if="!node.data.defStatus" class="text-gray-400">[未排序]</span>
      </div>
      <div class="flex-none flex">
        <!--增加按钮-->
        <div v-if="node.data.isDir" class="mr-2">
          <button class="yiu-blue-square-btn-1">
            <span class="iconify block" data-icon="mdi:plus" data-inline="false"></span>
          </button>
        </div>
        <!--在编辑器中打开-->
        <div v-if="!node.data.isDir" class="mr-2">
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
          <button class="yiu-blue-square-btn-1" @click.stop="onDelete">
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
    <transition name="yiu-fade-in">
      <div v-show="isOpen && node?.child && node?.child?.length" class="ml-[16px]">
        <YiuTreeItem v-for="(item, index) in node.child"
                     :key="index"
                     :node="item"
                     :number-title="numberTitle+(index+1)+'.'"
                     class="border-l border-blue-200"
                     @click="onClick"
                     @searchSuccess="onSearchSuccess"></YiuTreeItem>
      </div>
    </transition>
  </div>
  <n-modal v-model:show="deleteModal">
    <n-card style="width: 600px;"
            content-style="padding: 0;"
            class="p-5 relative"
            size="medium"
            :bordered="false">
      <div class="text-base">删除提示</div>
      <button class="yiu-modal-close-btn-1" transparent @click="onDeleteCancel">
        <span class="iconify block" data-icon="mdi:close" data-inline="false"></span>
      </button>
      <div class="text-base mt-6">
        <div class="mb-6">
          <p>
            <span>将删除</span>
            <span class="font-semibold mr-1">{{ node.data.name }}</span>
            <span v-if="node.data.isDir" class="font-semibold">目录</span>
            <span v-else class="font-semibold">文件</span>
            <span>，请确定你的删除方式。</span>
          </p>
          <p>
            删除的YR数据可在编排目录中刷新再次得到，而本地数据一旦删除将无法恢复。
          </p>
        </div>
        <div class="flex justify-end">
          <n-button class="focus:outline-none"
                    type="error"
                    @click="onDeleteCancel">
            删除 YR数据 & 本地文件
          </n-button>
          <div class="flex-grow"></div>
          <n-button class="focus:outline-none mr-4"
                    type="primary"
                    @click="onDeleteCancel">
            删除 YR数据
          </n-button>
          <n-button class="focus:outline-none" @click="onDeleteCancel">取消</n-button>
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, watch } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { isString } from 'lodash'
  import { NButton, NCard, NModal } from 'naive-ui'

  export default defineComponent({
    name: 'YiuTreeItem',
    components: {
      NModal,
      NCard,
      NButton,
    },
    props: {
      node: propTypes.object,
      numberTitle: propTypes.string.isRequired,
    },
    emits: ['click', 'searchSuccess'],
    setup(prop, { emit }) {
      const showNumber: any = inject('showNumber')
      const showIcon: any = inject('showIcon')
      const searchStr: any = inject('searchStr')
      watch(() => searchStr.value, (v) => {
        if (!v) {
          return
        }
        if (prop?.node?.data?.name) {
          if (prop.node.data.name.indexOf(v) != -1) {
            emit('searchSuccess')
          }
        } else {
          isOpen.value = false
        }
      })
      const onSearchSuccess = () => {
        emit('searchSuccess')
        isOpen.value = true
      }
      const isOpen = ref(false)
      const onClick = (id: any) => {
        if (isString(id)) {
          emit('click', id)
        } else {
          if (prop?.node?.data?.isDir) {
            isOpen.value = !isOpen.value
          } else {
            emit('click', prop?.node?.id)
          }
        }
      }
      const deleteModal = ref(false)
      const onDelete = () => {
        deleteModal.value = true
      }
      const onDeleteCancel = () => {
        deleteModal.value = false
      }
      return {
        isOpen,
        searchStr,
        onClick,
        showNumber,
        showIcon,
        onSearchSuccess,
        deleteModal,
        onDelete,
        onDeleteCancel,
      }
    },
  })
</script>

<style scoped>

</style>
