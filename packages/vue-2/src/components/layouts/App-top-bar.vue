<template>
  <div>
    <v-app-bar app prominent>
      <div>
        <div class="tw-flex tw-items-center tw-justify-around">
          <slot name="login" />
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script setup>
  const props = defineProps({
    logo: {
      type: String,
      default: 'logo'
    },
    navigation: {
      type: Boolean,
      default: false
    }
  });
</script>
