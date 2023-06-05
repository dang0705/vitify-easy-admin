<template>
  <div :class="['tw-flex', { 'tw-flex-col': config.vertical }]">
    <v-checkbox
      v-if="showAllCheck"
      v-model="isAllChecked"
      label="全选"
      :indeterminate="isChecked && !isAllChecked"
      class="tw-mr-6 tw-w-auto tw-flex-shrink-0"
    />
    <v-checkbox
      v-for="(option, index) in options"
      v-model="value"
      :readonly="bind.readonly"
      :disabled="bind.disabled"
      :key="`${config.key}-checkbox-${index}`"
      :value="option.value"
      :label="option.label"
      :class="{ 'tw-mr-6': index < options.length - 1 }"
    />
  </div>
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({
    name: 'checkbox',
    setup({ config }, { emit }, { value, options }) {
      const isChecked = computed(() => !!value?.value.length);
      const isAllChecked = computed({
        get: () => value.value.length === options.value.length,
        set: (isAllChecked) =>
          emit(
            'change',
            isAllChecked ? options.value.map((option) => option.value) : []
          )
      });
      const showAllCheck = computed(() => config.hasOwnProperty('allChecked'));
      emit('update-config', { key: config.key, noRules: true });
      return {
        isChecked,
        isAllChecked,
        showAllCheck
      };
    }
  });
</script>
