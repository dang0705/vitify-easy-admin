<template>
  <!--  <v-chip :color="color" class="tw-text-sm tw-text-white" v-text="text" />-->
  <span v-text="text" />
</template>

<script setup>
  import { useModelStore } from '@store/current-route-model-store';

  const model = inject('model', null);

  const props = defineProps({
    statusKey: {
      type: String,
      default: 'status'
    },
    status: {
      type: [String, Number],
      default: null
    },
    mapping: {
      type: Object,
      default: () => useModelStore().options[useModelStore().currentModel]
    }
  });
  const text = ref('');
  const color = ref('');

  const isSurvey = model === 'survey';

  watch(
    () => props.status,
    (status) => {
      text.value = props.mapping[props.statusKey]?.[status];
      switch (props.status) {
        case 1:
          color.value = isSurvey ? 'green' : 'primary';
          break;
        case 2:
          color.value = isSurvey ? 'grey darken-1' : 'green';
          break;
        case 3:
          color.value = 'grey darken-1';
          break;
        default:
          color.value = 'yellow darken-2';
      }
    },
    {
      immediate: true
    }
  );
</script>
