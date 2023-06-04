<template>
  <v-select
    v-on="$listeners"
    v-bind="bind"
    :items="options"
    :item-text="config.itemText"
    :default-label="
      config.noDefaultLabel
        ? ''
        : config.defaultLabel || (formView.useGrid ? '全部' : '请选择')
    "
  />
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({ name: 'select' });
</script>
