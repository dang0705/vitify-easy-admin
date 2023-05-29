<template>
  <ui-input-field
    v-show="display"
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div :class="subitemClass">
      <ui-textfield
        v-if="readonly"
        v-model="value"
        :placeholder="config.placeholder || ' '"
        :disabled="disabled"
        :attrs="{ readonly }"
      />
      <template v-else>
        <ui-rangepicker
          @focusin.native.passive="onClick"
          v-model="value"
          :config="pickerConfig"
          :placeholder="config.placeholder || ' '"
          :disabled="disabled"
        >
          <template #separator> 到 </template>
        </ui-rangepicker>
      </template>
      <slot v-if="config.helper" name="helper">
        <ui-textfield-helper visible>
          {{ config.helper }}
        </ui-textfield-helper>
      </slot>
    </div>
  </ui-input-field>
</template>

<script>
  import formItemMixin from '@admin-controls-mixins/form-item';
  import fixAutoChange from '@admin-controls-mixins/fix-auto-change';
  // import dateRangePicker from '@admin-controls-mixins/date-range-picker';
  const datePickerBase = {
    locale: lang.zh,
    dateFormat: 'Y-m-d',
    time_24hr: true
  };
  export default {
    name: 'InputRangepicker',
    mixins: [formItemMixin, fixAutoChange],
    data() {
      const {
        config: { dateOptions = {} }
      } = this;
      return {
        pickerConfig: {
          ...datePickerBase,
          ...dateOptions
        }
      };
    }
  };
</script>
