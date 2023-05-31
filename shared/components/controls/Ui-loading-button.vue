<template>
  <v-btn :loading="loading" v-bind="$attrs" v-on="$listeners"><slot /></v-btn>
</template>
<script setup>
  import { useBus } from '@bus';
  const props = defineProps({
    loadingName: {
      type: String,
      default: ''
    }
  });
  const $attrs = useAttrs();
  const loading = ref(false);

  useBus.on(props.loadingName, (isLoading) => (loading.value = isLoading));
</script>
