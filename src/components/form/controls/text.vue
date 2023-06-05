<template>
  <v-text-field
    v-on="$listeners"
    autofocus
    v-bind="bind"
    :maxlength="config.max"
    :placeholder="config.placeholder || ' '"
    :counter="config.max"
    :full-width="config.fullwidth"
    validate-on-blur
  />
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({ name: 'text' });
</script>
