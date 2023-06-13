<template>
  <v-sheet class="tw-h-full tw-px-4">
    <router-view />
    <div id="marx-container"></div>
  </v-sheet>
</template>

<script setup>
  import { useModuleStore } from 'store/modules-store';
  const { options } = storeToRefs(useModuleStore());
</script>
