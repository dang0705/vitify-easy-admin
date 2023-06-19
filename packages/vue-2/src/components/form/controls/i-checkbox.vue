<template>
  <v-input
    v-bind="vProps"
    :value="value"
    :class="['tw-flex', 'tw-items-center', { 'tw-flex-col': config.vertical }]"
  >
    <v-checkbox
      v-if="showAllCheck"
      v-model="isAllChecked"
      :id="vProps.id"
      hide-details
      label="全选"
      :indeterminate="isChecked && !isAllChecked"
      class="tw-mr-6 tw-w-auto tw-flex-shrink-0"
    />
    <v-checkbox
      v-for="(option, index) in vProps.items"
      v-model="value"
      hide-details
      v-bind="showAllCheck || !index ? {} : { id: vProps.id }"
      :key="`${config.key}-checkbox-${index}`"
      :value="option.value"
      :label="option.label"
      :class="{ 'tw-mr-6': index < vProps.items.length - 1 }"
    />
  </v-input>
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({
    setup({ config }, { emit }, { value, vProps }) {
      const isChecked = computed(() => !!value.value.length);
      const isAllChecked = computed({
        get: () => value.value.length === vProps.value.items.length,
        set: (isAllChecked) =>
          emit(
            'change',
            isAllChecked ? vProps.value.items.map((option) => option.value) : []
          )
      });
      const showAllCheck = computed(() => config.hasOwnProperty('allChecked'));
      return {
        isChecked,
        isAllChecked,
        showAllCheck
      };
    }
  });
</script>
