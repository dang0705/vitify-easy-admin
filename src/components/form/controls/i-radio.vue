<template>
  <v-radio-group v-model="value" row :rules="bind.rules">
    <v-radio
      v-for="(option, index) in options"
      :key="`${config.key}-radio-${index}`"
      :value="option.value"
      :readonly="bind.readonly"
      :disabled="bind.disabled"
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
