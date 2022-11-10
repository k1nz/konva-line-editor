<script setup lang="ts">
import { ref } from 'vue'
import { DEFAULT_LINE } from './constants'
import { handleMouseover, handleDragend } from './cursor-style'
import LineEditing from './LineEditing.vue'
import type { Line } from './types'
import type { KonvaPointerEvent } from 'konva/lib/PointerEvents'

const lines = ref<Line[]>(DEFAULT_LINE)

const editingLineRef = ref<TemplateRef<typeof LineEditing>>(null)
const activeLine = ref<Line>()

const handleStageMouseMove = (e: KonvaPointerEvent) => {
  editingLineRef.value?.handleStageMouseMove(e)
}
const handleStageClick = (e: KonvaPointerEvent) => {
  editingLineRef.value?.handleStageClick(e)
}

const handleLineEditComplete = (line: Line) => {
  lines.value.push(line)
  activeLine.value = undefined
}

const handleLineClick = (e: KonvaPointerEvent, index: number) => {
  if (activeLine.value) editingLineRef.value?.completeEdit()
  activeLine.value = lines.value.splice(index, 1)[0]
}

defineExpose({ handleStageMouseMove, handleStageClick })
</script>

<template>
  <VLayer ref="layer" @mouseover="handleMouseover" @mouseout="handleDragend">
    <VLine
      v-for="(line, index) in lines"
      :key="`line-${index}`"
      :config="{
        points: line.points,
        stroke: line.line_color,
        strokeWidth: line.line_width,
        lineCap: 'round',
        lineJoin: 'round',
        hitStrokeWidth: line.line_width < 8 ? 8 : line.line_width,
      }"
      @click="handleLineClick($event, index)"
    />
  </VLayer>
  <!--编辑单独放置一个图层，减少大量图形频繁重绘带来的性能损耗-->
  <LineEditing ref="editingLineRef" v-model:line="activeLine" @complete="handleLineEditComplete" />
</template>
