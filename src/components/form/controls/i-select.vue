<template>
  <v-select
    v-model="value"
    v-bind="staticProps"
    :rules="rules"
    :disabled="disabled"
    :readonly="readonly"
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
  import { VSelect } from 'vuetify/lib/components';
  import defineControl, {
    useLifeCircles
  } from 'form/controls/mixins/define-input-control';
  export default defineControl({
    name: 'select',
    components: { VSelect },
    ...useLifeCircles({
      mounted() {}
    })
  });
</script>
