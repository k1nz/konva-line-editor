<script>
export default {
  name: "LineLayer",
};
</script>
<script setup>
import { ref } from "vue";
import LineEditing from "./LineEditing.vue";

const lines = ref([
  {
    points: [100, 100, 200, 100, 200, 200, 100, 200],
    line_width: 8,
    line_color: "#666",
  },
  {
    points: [300, 100, 400, 100, 400, 200, 300, 200],
    line_width: 8,
    line_color: "#666",
  },
]);

const editingLineRef = ref(null);
const activeLine = ref();

const handleStageMouseMove = (e) => {
  editingLineRef.value?.handleStageMouseMove(e);
};
const handleStageClick = (e) => {
  editingLineRef.value?.handleStageClick(e);
};

const handleLineEditComplete = (line) => {
  lines.value.push(line);
  activeLine.value = undefined;
};

const handleLineClick = (e, index) => {
  if (activeLine.value) editingLineRef.value?.completeEdit();
  activeLine.value = lines.value.splice(index, 1)[0];
};

const handleAddLine = () => {
  editingLineRef.value?.handleLineAdd();
};

defineExpose({ handleAddLine, handleStageMouseMove, handleStageClick });

const handleMouseover = (e) => {
  document.body.style.cursor = "pointer";
};
const handleDragend = (e) => {
  document.body.style.cursor = "default";
};
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
      }"
      @click="handleLineClick($event, index)"
    />
  </v-layer>
  <!--编辑单独放置一个图层，减少大量图形频繁重绘带来的性能损耗-->
  <LineEditing
    ref="editingLineRef"
    :line="activeLine"
    @complete="handleLineEditComplete"
  />
</template>
