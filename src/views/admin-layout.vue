<template>
  <v-sheet class="tw-h-full tw-px-4">
    <router-view />
  </v-sheet>
</template>

<script setup>
  import { useModuleStore } from 'store/modules-store';
  const { options } = storeToRefs(useModuleStore());
</script>
