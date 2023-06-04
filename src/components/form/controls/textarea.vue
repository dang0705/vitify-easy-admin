<template>
  <v-textarea
    v-on="$listeners"
    v-bind="bind"
    :placeholder="config.placeholder || ' '"
    :counter="config.max"
    :with-counter="!!config.max"
    class="tw-w-full"
  />
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({ name: 'textarea' });
</script>
