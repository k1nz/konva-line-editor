<script setup lang="ts">
import { useVModel } from '@vueuse/core'
defineOptions({
  name: 'LineEditor',
})
const props = defineProps({
  addMode: {
    default: false,
    type: Boolean,
  },
  lineConfig: {
    type: Object,
  },
})
const emit = defineEmits(['update:addMode', 'update:lineConfig'])
const addMode = useVModel(props, 'addMode', emit)
const lineConfig = useVModel(props, 'lineConfig', emit)

const handleAdd = () => {}
const handleDelete = () => {}
const handleUndo = () => {}
const handleRedo = () => {}
const handleSaveSnapshot = () => {}
const handleApplySnapshot = () => {}

const buttons = [
  {
    icon: 'edit',
    onClick: handleAdd,
    title: 'Start To Draw',
  },
  {
    icon: 'delete',
    onClick: handleDelete,
    title: 'Delete Selected Line',
  },
  {
    icon: 'rollback',
    onClick: handleUndo,
    title: 'Undo',
  },
  {
    icon: 'rollfront',
    onClick: handleRedo,
    title: 'Redo',
  },
  {
    icon: 'save',
    onClick: handleSaveSnapshot,
    title: 'Save Snapshot',
  },
  {
    icon: 'backward',
    onClick: handleApplySnapshot,
    title: 'Apply Snapshot',
  },
]
</script>

<template>
  <Teleport to=".editor-area">
    <t-collapse default-expand-all>
      <t-collapse-panel header="✏️ Action" style="width: 350px">
        <div class="button-group">
          <t-button
            v-for="(button, idx) in buttons"
            :key="button.icon"
            theme="primary"
            shape="circle"
            @click="button.onClick"
            :title="button.title"
          >
            <template #icon>
              <t-icon :name="button.icon" />
            </template>
          </t-button>
        </div>
      </t-collapse-panel>
      <t-collapse-panel header="⚙️ 线段属性" style="width: 350px">
        <t-card title="Line Color" :subtitle="`${lineConfig.line_color}`" :bordered="false">
          <t-color-picker-panel v-model="lineConfig.line_color" format="HEX" :color-modes="['monochrome']" />
        </t-card>
        <t-divider />
        <t-card title="Line Width" :subtitle="`${lineConfig.line_width}px`" :bordered="false">
          <t-slider v-model="lineConfig.line_width" :min="1" :max="10" />
        </t-card>
      </t-collapse-panel>
    </t-collapse>
  </Teleport>
</template>

<style lang="less" scoped>
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}
.t-divider {
  margin: 0;
}
:deep(.t-collapse-panel__wrapper .t-collapse-panel__content) {
  padding: 0;
}
</style>
