<template>
  <v-text-field
    v-on="$listeners"
    v-bind="bind"
    :maxlength="config.max"
    :placeholder="config.placeholder || ' '"
    :counter="config.max"
    :full-width="config.fullwidth"
    :autofocus="config.autoFocus"
    validate-on-blur
  >
    <template #prepend>
      <slot :name="bind.left">
        <template v-if="config.left">
          <component
            :is="helpers.isObject(config.left ? config.left.control : 'span')"
            v-text="config.left"
          />
        </template>
      </slot>
    </template>
    <template #prepend-inner>
      <slot :name="bind.leftInner">
        <span v-if="config.leftInner" v-text="config.leftInner" />
      </slot>
    </template>
    <template #append>
      <slot :name="bind.rightInner">
        <span v-if="config.rightInner" v-text="config.rightInner" />
      </slot>
    </template>
    <template #append-outer>
      <slot :name="bind.right">
        <span v-if="config.right" v-text="config.right" />
      </slot>
    </template>
  </v-text-field>
</template>

<script>
  import { helpers } from 'utils/helpers';
  import defineControl from 'form/controls/mixins/define-input-control';
  export default defineControl({
    name: 'text',
    data() {
      return {
        helpers
      };
    }
  });
</script>
