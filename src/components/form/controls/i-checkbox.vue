<template>
  <v-input
    :value="value"
    :rules="bind.rules"
    :class="['tw-flex', { 'tw-flex-col': config.vertical }]"
  >
    <v-checkbox
      v-if="showAllCheck"
      v-model="isAllChecked"
      hide-details
      label="全选"
      :indeterminate="isChecked && !isAllChecked"
      class="tw-mr-6 tw-w-auto tw-flex-shrink-0"
    />
    <v-checkbox
      v-for="(option, index) in options"
      v-model="value"
      hide-details
      :readonly="bind.readonly"
      :disabled="bind.disabled"
      :key="`${config.key}-checkbox-${index}`"
      :value="option.value"
      :label="option.label"
      :class="{ 'tw-mr-6': index < options.length - 1 }"
    />
  </v-input>
</template>

<script>
  import defineControl, {
    useLifeCircles
  } from 'form/controls/mixins/define-input-control';
  export default defineControl({
    name: 'checkbox',
    // ...useConfigLifeCircles(),
    setup({ config }, { emit }, { value, options }) {
      const isChecked = computed(() => !!value.value.length);
      const isAllChecked = computed({
        get: () => value.value.length === options.value.length,
        set: (isAllChecked) =>
          emit(
            'change',
            isAllChecked ? options.value.map((option) => option.value) : []
          )
      });
      const showAllCheck = computed(() => config.hasOwnProperty('allChecked'));
      emit('no-rules');
      return {
        isChecked,
        isAllChecked,
        showAllCheck
      };
    }
  });
</script>
