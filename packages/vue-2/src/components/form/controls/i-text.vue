<template>
  <v-text-field v-model="value" v-bind="vProps">
    <template v-for="(_, vuetifySlot) in vuetifySlots" #[vuetifySlot]>
      <slot
        :name="`${defineSlot(transferredSlots[vuetifySlot])}`"
        v-bind="{ formData: config.formData }"
      >
      </slot>
    </template>
  </v-text-field>
</template>

<script>
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({
    enhanceLifeCircles: {
      mounted() {
        console.log('mounted in enhanceLifeCircles');
      }
    }
  });
</script>
