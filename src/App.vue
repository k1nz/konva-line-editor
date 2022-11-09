<template>
  <div class="main">
    <div class="editor-area"></div>
    <div ref="stageContainer" class="stage">
      <v-stage
        v-if="isMounted"
        ref="stage"
        :config="stageConfig"
        @click="handleStageClick"
        @mousemove="handleStageMouseMove"
      >
        <LineLayer ref="lineLayer" />
      </v-stage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {useResizeObserver, useMounted, useDark} from '@vueuse/core'
import LineLayer from './components/line/LineLayer.vue'

const isDark = useDark({
  selector: 'html',
  attribute: 'theme-mode',
  valueDark: 'dark',
  valueLight: 'light',
})

const isMounted = useMounted()

const stageContainer = ref(null)
const stageConfig = reactive({
  width: 1000,
  height: 700,
  draggable: true,
})
useResizeObserver(stageContainer, () => {
  Object.assign(stageConfig, {
    width: stageContainer.value.clientWidth,
    height: stageContainer.value.clientHeight,
  })
})

const lineLayer = ref(null)
const handleStageClick = (e) => {
  lineLayer.value?.handleStageClick(e)
}
const handleStageMouseMove = (e) => {
  lineLayer.value?.handleStageMouseMove(e)
}
</script>

<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
}
.main {
  display: flex;
  flex-direction: row;
  gap: 50px;
  .editor-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
    /*height: v-bind('`${stageConfig.height}px`');*/
    height: 70vh;
  }
  .stage {
    /*min-width: v-bind('`${stageConfig.width}px`');*/
    /*min-height: v-bind('`${stageConfig.height}px`');*/
    width: 50vw;
    height: 70vh;
    display: flex;
    background: aliceblue;
    border-radius: 4px;
  }
}
</style>
