<template>
  <v-sheet class="tw-flex tw-h-full">
    <Drawer-nav-menu shaped static expend :menus="routes" />
    <div class="tw-flex-grow tw-pl-6">
      <h1 v-text="currentMenuName" class="tw-py-4 tw-text-2xl tw-font-bold" />
      <router-view />
    </div>
  </v-sheet>
</template>

<script setup>
  import { useAdminRoutes } from 'store/routes-store';
  import { useModuleStore } from 'store/modules-store';
  import DrawerNavMenu from 'components/layouts/Drawer-nav-menu.vue';

  const { currentMenuName, options } = storeToRefs(useModuleStore());
  const { routes } = storeToRefs(useAdminRoutes());
</script>
