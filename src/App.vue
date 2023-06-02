<template>
  <v-app>
    <app-top-bar />
    <v-main class="tw-h-full">
      <router-view class="tw-flex-grow" />
    </v-main>
    <footers app />
  </v-app>
</template>

<script setup>
  import appTopBar from 'components/layouts/App-top-bar.vue';
  import footers from 'components/layouts/Footers.vue';
</script>
