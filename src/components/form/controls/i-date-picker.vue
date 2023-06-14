<template>
  <v-input
    v-bind="staticProps"
    :rules="rules"
    :disabled="disabled"
    :readonly="readonly"
    :value="value"
    validate-on-blur
  >
    <v-menu
      ref="datePickerRef"
      v-model="datePicker"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="value"
          hint="点击选择日期"
          persistent-hint
          prepend-icon="mdi-calendar"
          v-bind="{ ...attrs }"
          v-on="on"
          @blur="date = parseDate(dateFormatted)"
        />
      </template>
      <v-date-picker v-model="value" no-title @input="datePicker = false" />
    </v-menu>
  </v-input>
</template>
<script>
  import defineInputControl from 'form/controls/mixins/define-input-control';

  export default defineInputControl({
    name: 'date-picker',
    setup() {
      const datePickerRef = ref('');
      const datePicker = ref(false);
      const dateFormatted = ref('');
      const formatDate = (date) => {
        if (!date) return null;
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`;
      };
      const parseDate = (date) => {
        if (!date) return null;

        const [month, day, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };
      return {
        datePickerRef,
        datePicker,
        dateFormatted,
        formatDate,
        parseDate
      };
    }
  });
</script>
