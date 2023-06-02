<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :subitem-class="subitemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <v-textarea
      v-model="value"
      class="tw-w-full"
      inputType="textarea"
      :placeholder="config.placeholder || ' '"
      :rules="rules"
      :disabled="disabled"
      :counter="config.max"
      :with-counter="!!config.max"
    />
  </ui-input-field>
</template>

<script>
  import 'balm-ui/components/textfield/textfield.css';
  import formItemMixin from '@admin-controls-mixins/form-item';

  export default {
    name: 'InputTextarea',
    mixins: [formItemMixin]
  };
</script>
