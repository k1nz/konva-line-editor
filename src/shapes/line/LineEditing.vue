<script lang="ts">
export default {
  name: 'LineEditing',
}
</script>
<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue'
import { useVModels } from '@vueuse/core'
import { DEFAULT_LINE_CONFIG } from './constants'
import { handleMouseover, handleDragend } from './cursor-style'
import type { InflectionPoint, Line } from './types'
import LineEditor from './LineEditor.vue'
import { KonvaPointerEvent } from 'konva/lib/PointerEvents'
import useStageStore from '@src/store/useStageStore'
import { Flat2Coor } from '@src/shapes/utils'
import { MiddleInflectionPoint } from './types'
import useLineStore from '@src/store/useLineStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  activeLine: {
    type: Object as PropType<Line>,
    default: undefined,
  },
})
const emit = defineEmits(['update:line', 'complete'])

const { activeLine } = useVModels(props, emit)

const stageStore = useStageStore()
const lineStore = useLineStore()
const { infPoints, midInfPoints, props: lineConfig, selectedLine: line } = storeToRefs(lineStore)

// const infPoints = ref<InflectionPoint[]>([])
// const lineConfig = ref<Partial<Line>>({ ...DEFAULT_LINE_CONFIG })

watch(
  () => stageStore.selectedShape,
  (val) => {
    if (val.type !== 'line' || !val.data?.points) return stageStore.unselect()
    const { points, ...rest } = val.data
    lineStore.$patch({
      infPoints: Flat2Coor(points),
      props: rest,
    })
  },
)

// const line = computed(() => infPoints.value.map((infPoint) => [infPoint.x, infPoint.y]).flat())

const handleInfPointDrag = (e: KonvaPointerEvent, index: number) => {
  // TODO 获取infPoint的相对位置，防止跳动
  infPoints.value[index] = e.target.getStage()!.getRelativePointerPosition()
}
const handleMiddleDragStart = (e: KonvaPointerEvent, item: MiddleInflectionPoint) => {
  const idx = infPoints.value.findIndex((infPoint) => infPoint === item.next)
  infPoints.value.splice(idx, 0, item)
}

// draw line
const isDrawing = ref(false)
const setAddMode = (val: boolean) => {
  isDrawing.value = val
}
const drawLine = async () => {
  if (isDrawing.value) return
  isDrawing.value = true
  infPoints.value.push({ x: 0, y: 0 })
}
const handleStageMouseMove = (e: KonvaPointerEvent) => {
  if (!isDrawing.value || !e.evt) return
  infPoints.value[infPoints.value.length - 1] = e.target.getStage()!.getRelativePointerPosition()
}
const handleStageClick = (e: KonvaPointerEvent) => {
  const targetNode = e.currentTarget.nodeType
  if (!isDrawing.value || !e.evt) {
    if (targetNode === 'Stage') completeEdit()
    return
  }
  if (['Line', 'Circle'].includes(targetNode)) return
  infPoints.value[infPoints.value.length - 1] = e.target.getStage()!.getRelativePointerPosition()
  infPoints.value.push(e.target.getStage()!.getRelativePointerPosition())
}

/** complete line */
const getLine = () => {
  return {
    ...lineConfig.value,
    points: line.value,
  }
}
const completeEdit = () => {
  emit('complete', getLine())
  infPoints.value = []
  lineConfig.value = { ...DEFAULT_LINE_CONFIG }
  isDrawing.value = false
}
const handleInfPointClick = (e: KonvaPointerEvent) => {
  if (!isDrawing.value) return
  isDrawing.value = false
  infPoints.value.pop()
}
const handleLineClick = (e: KonvaPointerEvent, index: number) => {
  completeEdit()
}

defineExpose({
  handleStageClick,
  handleStageMouseMove,
  completeEdit,
})
</script>

<template>
  <v-layer ref="layerRef" @mouseover="handleMouseover" @mouseout="handleDragend">
    <v-line
      :config="{
        points: line,
        stroke: lineConfig.line_color,
        strokeWidth: lineConfig.line_width,
        lineCap: 'round',
        lineJoin: 'round',
        listening: !isDrawing,
        hitStrokeWidth: lineConfig.line_width < 8 ? 8 : lineConfig.line_width,
      }"
      @click="handleLineClick"
    />
    <v-circle
      v-for="(infPoint, idx) in infPoints"
      :key="`infPoint-${infPoint.x * infPoint.y}`"
      :config="{
        x: infPoint.x,
        y: infPoint.y,
        radius: 8,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 1,
        draggable: true,
        listening: !isDrawing || (isDrawing && idx !== infPoints.length - 1),
      }"
      @dragmove="handleInfPointDrag($event, idx)"
      @click="handleInfPointClick"
    />
    <template v-if="!isDrawing">
      <v-circle
        v-for="(midInfPoint, idx) in midInfPoints"
        :key="`midInfPoint-${midInfPoint.x * midInfPoint.y}`"
        :config="{
          x: midInfPoint.x,
          y: midInfPoint.y,
          radius: 4,
          stroke: '#666',
          fill: '#ddd',
          strokeWidth: 1,
          draggable: false,
        }"
        @mousedown="handleMiddleDragStart($event, midInfPoint)"
      />
    </template>
  </v-layer>
  <LineEditor v-model:addMode="isDrawing" v-model:lineConfig="lineConfig" />
</template>

<style lang="less" scoped></style>
