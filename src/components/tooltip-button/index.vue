<script setup>
defineOptions({
  name: 'TooltipButton',
  inheritAttrs: false,
})
const props = defineProps({
  content: {
    type: [String, Number],
    default: '',
  },
  tooltipProps: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <TTooltip :content="props.content" v-bind="tooltipProps">
    <TButton v-bind="$attrs" />
  </TTooltip>
</template>
