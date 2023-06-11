<template>
  <v-text-field
    v-model="value"
    v-bind="bind"
    :maxlength="config.max"
    :placeholder="config.placeholder || ' '"
    :counter="config.max"
    :full-width="config.fullwidth"
    :autofocus="config.autoFocus"
    validate-on-blur
  >
    <template v-for="(_, vuetifySlot) in vuetifySlots" #[vuetifySlot]>
      <slot
        :name="bind[transferVuetifySlot(vuetifySlot)]"
        v-bind="{ formData: config.formData, test: 'test-class' }"
      >
        <component
          :class="bind[transferVuetifySlot(vuetifySlot)]"
          :key="vuetifySlot"
          :form-data="config.formData"
          v-on="$listeners"
          v-bind="slotBind(transferVuetifySlot(vuetifySlot)).bind"
          v-text="slotBind(transferVuetifySlot(vuetifySlot)).text"
        />
      </slot>
    </template>
  </v-text-field>
</template>

<script>
  import { helpers } from 'utils/helpers';
  import defineControl, {
    useLifeCircles
  } from 'form/controls/mixins/define-input-control';
  export default defineControl({
    name: 'text',
    data() {
      return {
        helpers
      };
    },
    ...useLifeCircles({
      mounted() {
        console.log(this.value);
      }
    })
  });
</script>
