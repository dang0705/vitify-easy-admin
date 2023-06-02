<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div v-if="config.showonly" class="readonly-field">{{ selectedValue }}</div>
    <div v-else :class="subitemClass">
      <v-radio-group v-model="value" row>
        <v-radio
          v-for="(option, index) in options"
          :key="`${config.key}-radio-${index}`"
          :value="option.value"
          :disabled="disabled || readonly"
          :label="option[config.itemText || 'label']"
        />
      </v-radio-group>
    </div>
    <slot :name="afterSlotName" v-bind="{ options }" />
  </ui-input-field>
</template>

<script>
  import 'balm-ui/components/radio/radio.css';
  import formItemMixin from '@admin-controls-mixins/form-item';
  import optionsMixin from '@admin-controls-mixins/options';

  export default {
    name: 'InputRadio',
    mixins: [formItemMixin, optionsMixin]
  };
</script>
