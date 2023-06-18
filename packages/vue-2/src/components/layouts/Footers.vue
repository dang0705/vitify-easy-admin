<template>
  <v-footer :app="app" elevation="4">
    <h3>footers</h3>
  </v-footer>
</template>
<script setup>
  const props = defineProps({
    app: {
      type: Boolean,
      default: true
    }
  });
</script>
