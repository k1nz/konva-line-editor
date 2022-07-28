<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <button type="button" @click="handleAnchorAdd">Add Line</button>
    <div style="display: flex; background: aliceblue">
      <v-stage
        ref="stage"
        :config="{
          width: 800,
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
import { ref } from "vue";
import LineLayer from "./components/LineLayer.vue";

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
</style>
