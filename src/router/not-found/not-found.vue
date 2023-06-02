<template>
  <div class="tw-flex tw-items-center tw-mt-12 tw-flex-col">
    <div class="tw-text-3xl tw-mb-4">&#128517; &nbsp;Not Found the page！</div>
    <router-link class="hover:tw-underline" :to="{ name: adminRoot }">
      Click here to return to the homepage
    </router-link>
  </div>
</template>
<script setup>
  import { adminRoot } from 'router/routes';
</script>
