<template>
  <v-app>
    <!--    <app-top-bar />-->
    <Drawer-nav-menu app shaped static expend :menus="routes" />
    <v-main class="tw-h-full">
      <router-view class="tw-flex-grow" />
    </v-main>
    <footers app />
    <StatusCapture />
  </v-app>
</template>

<script setup>
  import appTopBar from 'components/layouts/App-top-bar.vue';
  import footers from 'components/layouts/Footers.vue';
  import StatusCapture from 'components/function/Status-capture.vue';
  import DrawerNavMenu from 'components/layouts/Drawer-nav-menu.vue';
  import { useAdminRoutes } from 'store/routes-store';

  const { routes } = storeToRefs(useAdminRoutes());
</script>
