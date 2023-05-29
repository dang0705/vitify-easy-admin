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
      <ui-textfield
        v-else
        v-model="value"
        input-type="number"
        :placeholder="config.placeholder || ' '"
        :min="config.min"
        :disabled="disabled"
        :attrs="{ readonly }"
      />
      <slot v-if="config.helper" name="helper">
        <ui-textfield-helper visible>
          {{ config.helper }}
        </ui-textfield-helper>
      </slot>
      <slot :name="afterSlotName" />
    </div>
  </ui-input-field>
</template>

<script>
  import formItemMixin from '@admin-controls-mixins/form-item';

  export default {
    name: 'InputNumber',
    mixins: [formItemMixin]
  };
</script>
