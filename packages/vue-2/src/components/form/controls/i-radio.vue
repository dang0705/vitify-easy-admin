<template>
  <v-radio-group v-model="value" :row="vProps.row ?? true">
    <v-radio
      v-for="(option, index) in vProps.items"
      v-bind="!index ? { id: vProps.id } : {}"
      :key="`${config.key}-radio-${index}`"
      :value="option.value"
      :label="option[vProps.itemText || 'label']"
    />
  </v-radio-group>
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl();
</script>
