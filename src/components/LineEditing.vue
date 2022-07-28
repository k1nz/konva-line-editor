<script>
export default {
  name: "LineEditing",
};
</script>
<script setup>
import { computed, ref, watch } from "vue";
import Konva from "konva";
import { DEFAULT_LINE_CONFIG } from "./constants.js";

const props = defineProps({
  line: {
    type: Object,
    default: undefined,
  },
});
const emit = defineEmits(["complete"]);

/** @type Ref<{x: number, y: number}[]> */
const anchors = ref([]);
const lineConfig = ref({ ...DEFAULT_LINE_CONFIG });

watch(
  () => props.line,
  (val) => {
    if (!val?.points) return;
    const { points, ...rest } = val;
    const res = [];
    points.forEach((XOrY, index) => {
      if (index % 2 === 0) {
        res.push({ x: XOrY });
      } else {
        res[res.length - 1].y = XOrY;
      }
    });
    anchors.value = res;
    lineConfig.value = rest;
  }
);

const line = computed(() => {
  return anchors.value.map((anchor) => [anchor.x, anchor.y]).flat();
});

const midAnchors = computed(() => {
  return anchors.value
    .map((anchor, idx) => {
      if (idx === 0) return;

      const prevAnchor = anchors.value[idx - 1];
      const x = (prevAnchor.x + anchor.x) / 2;
      const y = (prevAnchor.y + anchor.y) / 2;
      const prev = prevAnchor;
      const next = anchor;
      return { x, y, prev, next };
    })
    .slice(1);
});

const handleAnchorDrag = (e, anchor, index) => {
  // TODO 获取anchor的相对位置，防止跳动
  anchors.value[index] = e.target.getStage().getRelativePointerPosition();
};
const handleMiddleDragStart = (e, item) => {
  const idx = anchors.value.findIndex((anchor) => anchor === item.next);
  anchors.value.splice(idx, 0, item);
};

// add line
const addMode = ref(false);
const setAddMode = (val) => {
  addMode.value = val;
};
const handleLineAdd = async () => {
  setAddMode(true);
  anchors.value.push({ x: 0, y: 0 });
};
const handleStageMouseMove = (e) => {
  if (!addMode.value) return;
  const pos = e.target.getStage().getRelativePointerPosition();
  anchors.value[anchors.value.length - 1] = pos;
};
const handleStageClick = (e) => {
  if (!addMode.value) {
    if (e.target instanceof Konva.Stage) completeEdit();
    return;
  }
  if (e.target instanceof Konva.Line || e.target instanceof Konva.Circle)
    return;
  // console.log(e.target.getRelativePointerPosition())
  anchors.value.push(e.target.getStage().getRelativePointerPosition());
};

/** complete line */
const getLine = () => {
  return {
    points: line.value,
    ...lineConfig.value,
  };
};
const completeEdit = () => {
  emit("complete", getLine());
  anchors.value = [];
  lineConfig.value = { ...DEFAULT_LINE_CONFIG };
  setAddMode(false);
};
const handleAnchorClick = (e) => {
  if (!addMode.value) return;
  setAddMode(false);
  anchors.value.pop();
};
const handleLineClick = (e, index) => {
  completeEdit();
};

defineExpose({
  handleStageClick,
  handleStageMouseMove,
  completeEdit,
  handleLineAdd,
});

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
      :config="{
        points: line,
        stroke: lineConfig.line_color,
        strokeWidth: lineConfig.line_width,
        lineCap: 'round',
        lineJoin: 'round',
        listening: !addMode,
      }"
      @click="handleLineClick"
    />
    <v-circle
      v-for="(anchor, idx) in anchors"
      :key="`anchor-${idx}`"
      :config="{
        x: anchor.x,
        y: anchor.y,
        radius: 8,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 1,
        draggable: true,
        listening: !addMode || (addMode && idx !== anchors.length - 1),
      }"
      @dragmove="handleAnchorDrag($event, anchor, idx)"
      @click="handleAnchorClick"
    />
    <template v-if="!addMode">
      <v-circle
        v-for="(anchor, idx) in midAnchors"
        :key="`midAnchor-${idx}`"
        :config="{
          x: anchor.x,
          y: anchor.y,
          radius: 4,
          stroke: '#666',
          fill: '#ddd',
          strokeWidth: 1,
          draggable: false,
        }"
        @mousedown="handleMiddleDragStart($event, anchor)"
      />
    </template>
  </v-layer>
  <Teleport to="#editor">
    <t-card title="Line Color" :subtitle="`${lineConfig.line_color}`">
      <t-color-picker-panel v-model="lineConfig.line_color" format="HEX" />
    </t-card>
    <t-card title="Line Width" :subtitle="`${lineConfig.line_width}`">
      <t-slider v-model="lineConfig.line_width" :min="1" :max="10" />
    </t-card>
  </Teleport>
</template>
