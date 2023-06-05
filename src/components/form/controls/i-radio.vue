<template>
  <v-radio-group v-model="value" row>
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
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({
    name: 'radio'
  });
</script>
