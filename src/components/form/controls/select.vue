<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div :class="subitemClass">
      <div v-if="config.showonly" class="readonly-field">
        {{ selectedValue }}
      </div>
      <v-select
        v-else
        v-model="value"
        :items="options"
        :rules="rules"
        :item-text="config.itemText"
        :default-label="
          config.noDefaultLabel
            ? ''
            : config.defaultLabel || (formView.useGrid ? '全部' : '请选择')
        "
        :disabled="disabled || readonly"
        v-bind="useGridAttrs"
        style="width: 100%"
      />
    </div>
  </ui-input-field>
</template>

<script>
  import formItemMixin from '@admin-controls-mixins/form-item';
  import optionsMixin from '@admin-controls-mixins/options';
  import fixAutoChange from '@admin-controls-mixins/fix-auto-change';
  export default {
    name: 'InputSelect',
    mixins: [formItemMixin, optionsMixin, fixAutoChange]
  };
</script>
