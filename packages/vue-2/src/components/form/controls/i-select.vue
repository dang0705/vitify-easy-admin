<template>
  <v-select v-model="value" v-bind="vProps" />
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({
    enhanceLifeCircles: {
      mounted() {}
    }
  });
</script>
