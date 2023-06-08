<template>
  <div>
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
      <template v-for="(value, key) in positionalSlots" #[key]>
        <slot :name="bind[value]">
          <component
            :class="value + '-' + key"
            :key="key"
            v-bind="slotBind(value).bind"
            v-text="slotBind(value).text"
          />
        </slot>
      </template>
      <!--    <template #prepend v-if="$scopedSlots[bind.left] || config.slot?.left">
        <slot :name="bind.left">
          <component
            v-bind="slotBind('left').bind"
            v-text="slotBind('left').text"
          />
        </slot>
      </template>

      <template
        #prepend-inner
        v-if="$scopedSlots[bind.leftInner] || config.slot?.leftInner"
      >
        <slot :name="bind.leftInner">
          <component
            v-bind="slotBind('leftInner').bind"
            v-text="slotBind('leftInner').text"
          />
        </slot>
      </template>

      <template
        #append
        v-if="$scopedSlots[bind.rightInner] || config.slot?.rightInner"
      >
        <slot :name="bind.rightInner">
          <component
            v-bind="slotBind('rightInner').bind"
            v-text="slotBind('rightInner').text"
          />
        </slot>
      </template>

      <template
        #append-outer
        v-if="$scopedSlots[bind.right] || config.slot?.right"
      >
        <slot :name="bind.right">
          <component
            v-bind="slotBind('right').bind"
            v-text="slotBind('right').text"
          />
        </slot>
      </template>-->
    </v-text-field>
  </div>
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
    },
    mounted() {
      console.log(this.$scopedSlots);
    }
  });
</script>
