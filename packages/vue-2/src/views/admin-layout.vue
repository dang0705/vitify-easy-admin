<template>
  <v-slide-x-transition mode="out-in"> <router-view /></v-slide-x-transition>
</template>

<script setup>
  import { useModuleStore } from 'store/modules-store';
  const { options } = storeToRefs(useModuleStore());
</script>
