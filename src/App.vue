<template>
  <div class="main">
    <div class="editor-area"></div>
    <Stage />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, VueElement } from 'vue'
import { useResizeObserver, useMounted, useDark, VueInstance } from '@vueuse/core'
import LineLayer from './shapes/line/LineLayer.vue'
import { KonvaPointerEvent } from 'konva/lib/PointerEvents'
import Stage from '@src/layout/stage/Stage.vue'

const isDark = useDark({
  selector: 'html',
  attribute: 'theme-mode',
  valueDark: 'dark',
  valueLight: 'light',
})
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
