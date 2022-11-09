<script lang="ts" setup>
import useLineStore from '@src/store/useLineStore'
import useHistoryStore from '@src/store/useHistoryStore'

defineOptions({
  name: 'TopBar',
})

const LineStore = useLineStore()
const { drawLine, deleteLine } = LineStore

const HistoryStore = useHistoryStore()
const { undo, redo, saveSnapshot, applySnapshot } = HistoryStore
</script>

<template>
  <div class="top-bar-wrapper">
    <TSpace>
      <t-dropdown :options="options" @click="clickHandler">
        <t-button theme="default" variant="outline" shape="square"> <t-icon name="ellipsis" size="16" /></t-button>
      </t-dropdown>
      <TooltipButton icon="edit" content="Start To Draw" @click="drawLine" />
      <TooltipButton icon="delete" content="Delete Selected Line" @click="deleteLine" />
      <TDivider layout="vertical" />
      <TooltipButton icon="rollback" content="Undo" @click="undo" />
      <TooltipButton icon="rollfront" content="Redo" @click="redo" />
      <TDivider layout="vertical" />
      <TooltipButton icon="save" content="Save Snapshot" @click="saveSnapshot" />
      <TooltipButton icon="backward" content="Apply Snapshot" @click="applySnapshot" />
    </TSpace>
  </div>
</template>

<style lang="scss" scoped>
.top-bar-wrapper {
  height: 50px;
  width: 100vw;
  background-color: var(--td-bg-color-page);
  border-bottom: 1px solid var(--td-component-border);
  box-shadow: 0 0 5px 0 var(--td-gray-color-10);
}
</style>
