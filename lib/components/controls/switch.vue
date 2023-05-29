<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-form-field :class="subitemClass">
      <ui-switch
        v-model="selectedValue"
        :input-id="randomSwitchId"
        :true-value="trueValue"
        :false-value="falseValue"
        :disabled="readonly"
        @change="onChange(isTrueValue ? falseValue : trueValue)"
      ></ui-switch>
      <label :for="randomSwitchId">{{ label }}</label>
      <slot v-if="config.helper" name="helper">
        <ui-textfield-helper visible>
          {{ config.helper }}
        </ui-textfield-helper>
      </slot>
    </ui-form-field>
  </ui-input-field>
</template>

<script>
  import formItemMixin from '@admin-controls-mixins/form-item';
  import { generateRandomAlphaNum } from '@/utils';
  import 'balm-ui/components/switch/switch.css';

  export default {
    name: 'InputSwitch',
    mixins: [formItemMixin],
    data() {
      return {
        selectedValue: this.isTrueValue,
        trueValue:
          typeof this.config.trueValue === 'undefined'
            ? true
            : this.config.trueValue,
        falseValue:
          typeof this.config.trueValue === 'undefined'
            ? false
            : this.config.falseValue
      };
    },
    computed: {
      randomSwitchId() {
        return `switch-item-${generateRandomAlphaNum(8)}`;
      },
      isTrueValue() {
        return this.value === true || this.value === this.config.trueValue;
      },
      label() {
        const options = this.config.options;
        const index = this.isTrueValue ? 0 : 1;
        return options && options[index] && options[index].label;
      }
    },
    watch: {
      value() {
        this.selectedValue = this.isTrueValue;
      }
    },
    beforeMount() {
      this.selectedValue = this.isTrueValue;
    },
    methods: {
      onChange(value) {
        this.$emit('change', this.config.key, value);
      }
    }
  };
</script>
