<template>
  <v-textarea v-model="value" v-bind="vProps" class="tw-w-full" />
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({});
</script>
