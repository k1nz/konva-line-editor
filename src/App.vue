<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <button type="button" @click="handleAnchorAdd">Add Line</button>
    <div style="display: flex; background: aliceblue">
      <v-stage
        ref="stage"
        :config="{
          width: 1200,
          height: 700,
        }"
        @click="handleStageClick"
        @mousemove="handleStageMouseMove"
      >
        <v-layer
          ref="layer"
          @mouseover="handleMouseover"
          @mouseout="handleDragend"
        >
          <v-line
            v-for="(linePoints, index) in lines"
            :key="`line-${index}`"
            :config="{
              points: linePoints,
              stroke: linesConfig[index].color,
              strokeWidth: linesConfig[index].width,
              lineCap: 'round',
              lineJoin: 'round',
              listening: !addMode,
            }"
            @click="handleLineClick($event, index)"
          />
          <v-circle
            v-for="(anchor, idx) in activeAnchorsGroup"
            :key="`anchor-${idx}`"
            :config="{
              x: anchor.x,
              y: anchor.y,
              radius: 8,
              stroke: '#666',
              fill: '#ddd',
              strokeWidth: 1,
              draggable: true,
              listening:
                !addMode || (!addMode && idx !== activeAnchorsGroup.length - 1),
            }"
            @dragmove="handleAnchorDrag($event, anchor, idx)"
            @click="handleAnchorClick"
          />
          <v-circle
            v-if="!addMode"
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
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, nextTick } from "vue";
import Konva from "konva";

export default {
  setup() {
    const activeIndex = ref(-1);

    /** @type Ref<Array<Array<{x: number, y: number}>> */
    const anchors = ref([
      [
        { x: 100, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 200 },
        { x: 100, y: 200 },
      ],
      [
        { x: 300, y: 100 },
        { x: 400, y: 100 },
        { x: 400, y: 200 },
        { x: 300, y: 200 },
      ],
      [
        { x: 500, y: 100 },
        { x: 600, y: 100 },
        { x: 600, y: 200 },
        { x: 500, y: 200 },
      ],
    ]);

    const activeAnchorsGroup = computed(() => {
      return anchors.value[activeIndex.value] || [];
    });

    const midAnchors = computed(() => {
      return activeAnchorsGroup.value
        .map((anchor, idx) => {
          if (idx === 0) return;

          const prevAnchor = activeAnchorsGroup.value[idx - 1];
          const x = (prevAnchor.x + anchor.x) / 2;
          const y = (prevAnchor.y + anchor.y) / 2;
          const prev = prevAnchor;
          const next = anchor;
          return {
            x,
            y,
            prev,
            next,
          };
        })
        .slice(1);
    });

    const handleAnchorDrag = (e, anchor, index) => {
      activeAnchorsGroup.value[index] = e.target.getAbsolutePosition();
    };
    const handleMiddleDragStart = (e, item) => {
      const idx = activeAnchorsGroup.value.findIndex(
        (anchor) => anchor === item.next
      );
      activeAnchorsGroup.value.splice(idx, 0, item);
    };

    // add line
    const addMode = ref(false);
    const handleAnchorAdd = async () => {
      addMode.value = true;
      anchors.value.push([{ x: 0, y: 0 }]);
      linesConfig.value.push(DEFAULT_LINE_CONFIG);
      await nextTick();
      activeIndex.value = anchors.value.length - 1;
    };
    const updateAnchor = (anchor, pos) => {
      anchor.x = pos.x;
      anchor.y = pos.y;
    };
    const handleStageMouseMove = (e) => {
      if (!addMode.value || e.target.tagName === "CANVAS") return;
      const pos = e.target.getStage().getPointerPosition();
      activeAnchorsGroup.value[activeAnchorsGroup.value.length - 1] = pos;
      // updateAnchor(activeAnchorsGroup.value[activeAnchorsGroup.value.length - 1], pos)
    };
    const handleStageClick = (e) => {
      if (!addMode.value) return;
      if (e.target instanceof Konva.Line || e.target instanceof Konva.Circle)
        return;
      // console.log(e.target.getRelativePointerPosition())
      activeAnchorsGroup.value.push(e.target.getStage().getPointerPosition());
    };
    // complete line
    const handleAnchorClick = (e) => {
      if (!addMode.value) return;
      addMode.value = false;
    };

    const lines = computed(() => {
      return anchors.value.map((ans) =>
        ans.map((anchor) => [anchor.x, anchor.y]).flat()
      );
    });
    const handleLineClick = (e, index) => {
      if (activeIndex.value === index) {
        activeIndex.value = -1;
      } else {
        activeIndex.value = index;
      }
    };
    // 存放线与锚点不相关的数据
    const DEFAULT_LINE_CONFIG = {
      color: "#000",
      width: 2,
    };
    const linesConfig = ref([
      {
        color: "#666",
        width: 2,
      },
      {
        color: "#666",
        width: 2,
      },
      {
        color: "#666",
        width: 2,
      },
    ]);

    const getLines = () => {
      return lines.value.map((line, index) => ({
        points: line,
        color: linesConfig.value[index].color,
        width: linesConfig.value[index].width,
      }));
    };

    const handleMouseover = (e) => {
      document.body.style.cursor = "pointer";
    };
    const handleDragend = (e) => {
      document.body.style.cursor = "default";
    };

    return {
      activeIndex,
      midAnchors,
      anchors,
      lines,
      activeAnchorsGroup,
      linesConfig,
      addMode,
      handleMiddleDragStart,
      handleAnchorDrag,
      handleMouseover,
      handleDragend,
      handleLineClick,
      handleStageClick,
      handleStageMouseMove,
      handleAnchorAdd,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
