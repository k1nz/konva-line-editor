<script lang="ts" setup>
import { useDark, useMounted, useResizeObserver } from '@vueuse/core'
import { reactive, ref } from 'vue'
import LineLayer from '@src/shapes/line/LineLayer.vue'
import { KonvaPointerEvent } from 'konva/lib/PointerEvents'

const stageWrapperRef = ref<TemplateRef<HTMLElement>>(null)
const lineLayerRef = ref<TemplateRef<typeof LineLayer>>(null)

const stageConfig = reactive({
  width: 1000,
  height: 700,
  draggable: true,
})
useResizeObserver(stageWrapperRef, ([entry]) => {
  const { width, height } = entry.contentRect
  Object.assign(stageConfig, { width, height })
})
const isMounted = useMounted()

const handleStageClick = (e: KonvaPointerEvent) => {
  lineLayerRef.value?.handleStageClick(e)
}
const handleStageMouseMove = (e: KonvaPointerEvent) => {
  lineLayerRef.value?.handleStageMouseMove(e)
}
</script>

<template>
  <div ref="stageWrapperRef" class="stage">
    <v-stage
      v-if="isMounted"
      ref="stage"
      :config="stageConfig"
      @click="handleStageClick"
      @mousemove="handleStageMouseMove"
    >
      <LineLayer ref="lineLayerRef" />
    </v-stage>
  </div>
</template>

<style lang="scss" scoped></style>
