<template>
  <v-radio-group
    v-model="value"
    row
    v-bind="staticProps"
    :rules="rules"
    :disabled="disabled"
    :readonly="readonly"
  >
    <v-radio
      v-for="(option, index) in options"
      :key="`${config.key}-radio-${index}`"
      :value="option.value"
      :label="option[config.itemText || 'label']"
    />
  </v-radio-group>
</template>

<script>
  import defineControl, {
    useLifeCircles
  } from 'form/controls/mixins/define-input-control';
  export default defineControl({
    name: 'radio'
    // ...useConfigLifeCircles()
  });
</script>
