<template>
  <v-app>
    <v-main>
      <router-view class="tw-flex-grow" />
    </v-main>
  </v-app>
</template>

<script setup>
  const {
    $vuetify: {
      breakpoint: { mobile, name }
    }
  } = getCurrentInstance().proxy;
</script>
