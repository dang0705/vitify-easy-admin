<template>
  <v-sheet
    class="tw-w-full tw-pb-2 md:tw-pb-0 tw-flex md:tw-overflow-hidden tw-text-secondary"
  >
    <div>
      <h1 v-text="currentMenuName" class="tw-text-2xl tw-py-4 tw-font-bold" />
      <router-view />
    </div>
  </v-sheet>
</template>

<script setup>
  import { useAdminRoutes } from '@store/dynamic-routes-store';
  import { useModelStore } from '@store/current-route-model-store';

  const { currentMenuName, options } = storeToRefs(useModelStore());
  const { routes } = storeToRefs(useAdminRoutes());
</script>
