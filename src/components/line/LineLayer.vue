<script lang="ts">
export default {
  name: 'LineLayer',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { Line } from './types'
import { DEFAULT_LINE } from './constants'

import LineEditing from './LineEditing.vue'

const lines = ref<Line[]>(DEFAULT_LINE)

const editingLineRef = ref(null)
const activeLine = ref<Line>()

const handleStageMouseMove = (e) => {
  editingLineRef.value?.handleStageMouseMove(e)
}
const handleStageClick = (e) => {
  editingLineRef.value?.handleStageClick(e)
}

const handleLineEditComplete = (line) => {
  lines.value.push(line)
  activeLine.value = undefined
}

const handleLineClick = (e, index) => {
  if (activeLine.value) editingLineRef.value?.completeEdit()
  activeLine.value = lines.value.splice(index, 1)[0]
}

defineExpose({ handleStageMouseMove, handleStageClick })
</script>

<template>
  <v-layer ref="layer" @mouseover="handleMouseover" @mouseout="handleDragend">
    <v-line
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
  </v-layer>
  <!--编辑单独放置一个图层，减少大量图形频繁重绘带来的性能损耗-->
  <LineEditing ref="editingLineRef" v-model:line="activeLine" @complete="handleLineEditComplete" />
</template>
