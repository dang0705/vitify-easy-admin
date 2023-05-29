<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div :class="subitemClass">
      <div v-if="config.showonly" class="readonly-field">{{ value }}</div>
      <v-text-field
        v-else
        v-model="value"
        clearable
        :rules="rules"
        :placeholder="config.placeholder || ' '"
        :disabled="disabled"
        :counter="config.max"
        :full-width="config.fullwidth"
      />
      <slot :name="afterSlotName" />
    </div>
  </ui-input-field>
</template>

<script>
  import formItemMixin from '@admin-controls-mixins/form-item';

  export default {
    name: 'InputText',
    mixins: [formItemMixin],
    computed: {}
  };
</script>
