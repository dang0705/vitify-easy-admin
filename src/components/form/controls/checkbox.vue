<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
    v-show="display"
  >
    <div :class="[subitemClass, 'tw-flex', 'tw-items-center']">
      <v-checkbox
        v-if="showAllCheck"
        v-model="isAllChecked"
        label="全选"
        :indeterminate="isChecked && !isAllChecked"
        :disabled="disabled || readonly"
        class="tw-mr-6"
      />
      <v-checkbox
        v-for="(option, index) in options"
        v-model="value"
        :key="`${config.key}-checkbox-${index}`"
        :value="option.value"
        :disabled="disabled || readonly"
        :label="option.label"
        :class="{ 'tw-mr-6': index < options.length - 1 }"
      />
    </div>
  </ui-input-field>
</template>

<script>
  import formItemMixin from '@admin-controls-mixins/form-item';
  import optionsMixin from '@admin-controls-mixins/options';

  export default {
    name: 'InputCheckbox',
    mixins: [formItemMixin, optionsMixin],
    computed: {
      isChecked() {
        return !!this.value?.length;
      },
      isAllChecked: {
        get() {
          return this.value?.length === this.options?.length;
        },
        set(status) {
          this.value = status ? this.options.map((option) => option.value) : [];
          this.$emit('change', this.config.key, this.value);
        }
      },
      showAllCheck() {
        return this.config.hasOwnProperty('allChecked');
      }
    }
  };
</script>
