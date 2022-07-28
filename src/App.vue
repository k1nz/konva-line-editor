<template>
  <div class="main">
    <div class="editor-area">
      <button type="button" @click="handleAnchorAdd">
        Start to draw a line
      </button>
      <div id="editor"></div>
    </div>
    <div class="stage">
      <v-stage
        v-if="mounted"
        ref="stage"
        :config="{
          width: 1000,
          height: 700,
        }"
        @click="handleStageClick"
        @mousemove="handleStageMouseMove"
      >
        <LineLayer ref="lineLayer" />
      </v-stage>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LineLayer from "./components/LineLayer.vue";

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const lineLayer = ref(null);
const handleAnchorAdd = async () => {
  lineLayer.value?.handleAddLine();
};
const handleStageClick = (e) => {
  lineLayer.value?.handleStageClick(e);
};
const handleStageMouseMove = (e) => {
  lineLayer.value?.handleStageMouseMove(e);
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.main {
  display: flex;
  flex-direction: row;
  gap: 50px;
}
.editor-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.stage {
  display: flex;
  background: aliceblue;
  border-radius: 4px;
}
</style>
