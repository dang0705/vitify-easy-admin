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
        <component v-bind="slotBind('left')" />
      </slot>
    </template>
    <template #prepend-inner>
      <slot :name="bind.leftInner">
        <component v-bind="slotBind('leftInner')" />
      </slot>
    </template>
    <template #append>
      <slot :name="bind.rightInner">
        <component v-bind="slotBind('rightInner')" />
      </slot>
    </template>
    <template #append-outer>
      <slot :name="bind.right">
        <component v-bind="slotBind('right')" />
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
