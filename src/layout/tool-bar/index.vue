<script lang="ts" setup="">
defineOptions({
  name: 'ToolBar',
})
</script>

<template>
  <div class="toolbar-wrapper narrow-scrollbar">
    <div class="toolbar-title">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar-wrapper {
  transition: all 0.3s ease-in-out;
  width: 36vh;
  height: 100%;
  overflow: auto;

  &__collapsed {
    width: 0;
  }
}
</style>
