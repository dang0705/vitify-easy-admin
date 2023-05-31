<template></template>

<script setup>
  defineOptions({
    model: ''
  });

  const props = defineProps({
    length: {
      type: [Number, String],
      default: 5
    },
    auto: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#fff'
    },
    index: {
      type: [Number, String],
      default: null
    }
  });
  const currentIndex = computed(() => props.index);
  const from = ref();
</script>
