<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <button type="button" @click="">Add Line</button>
    <div style="display: flex; background: aliceblue">
      <v-stage
        ref="stage"
        :config="{
          width: 600,
          height: 600,
        }"
      >
        <v-layer
          ref="layer"
          @mouseover="handleMouseover"
          @mouseout="handleDragend"
        >
          <v-line
            v-for="(linePoints, index) in lines"
            :key="index"
            :config="{
              points: linePoints,
              stroke: '#666',
              strokeWidth: 2,
            }"
            @click="handleLineClick($event, linePoints, index)"
          />
          <v-circle
            v-for="(anchor, idx) in activeAnchors"
            :key="`anchor-${idx}`"
            :config="{
              x: anchor.x,
              y: anchor.y,
              radius: 8,
              stroke: '#666',
              fill: '#ddd',
              strokeWidth: 1,
              draggable: true,
            }"
            @dragmove="handleAnchorDrag($event, anchor, idx)"
          />
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
            @click="handleMiddleDragStart($event, anchor)"
          />
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
  setup() {
    const activeIndex = ref();

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

    const activeAnchors = computed(() => {
      return anchors.value[activeIndex.value] || [];
    });

    const midAnchors = computed(() => {
      return activeAnchors.value
        .map((anchor, idx) => {
          if (idx === 0) return;

          const prevAnchor = activeAnchors.value[idx - 1];
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
      activeAnchors.value[index] = e.target.getAbsolutePosition();
    };
    const handleMiddleDragStart = (e, item) => {
      const idx = activeAnchors.value.findIndex(
        (anchor) => anchor === item.next
      );
      activeAnchors.value.splice(idx, 0, item);
    };

    const lines = computed(() => {
      return anchors.value.map((ans) =>
        ans.map((anchor) => [anchor.x, anchor.y]).flat()
      );
    });
    const handleLineClick = (e, linePoints, index) => {
      activeIndex.value === index
        ? (activeIndex.value = undefined)
        : (activeIndex.value = index);
    };

    const handleMouseover = (e) => {
      document.body.style.cursor = "pointer";
    };
    //mouseout
    const handleDragend = (e) => {
      document.body.style.cursor = "default";
    };

    return {
      midAnchors,
      anchors,
      lines,
      activeAnchors,
      handleMiddleDragStart,
      handleAnchorDrag,
      handleMouseover,
      handleDragend,
      activeIndex,
      handleLineClick,
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
