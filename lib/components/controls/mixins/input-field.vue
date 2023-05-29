<template>
  <div
    :class="[
      itemClass,
      config.type ? `yooc-field--${config.type}` : '',
      config.key ? `yooc-field__${config.key}` : '',
      { required: config.required },
      { 'has-helper': config.helper }
    ]"
  >
    <div>
      <label
        v-if="config.label"
        class="tw-text-sm tw-text-primary tw-font-bold tw-mr-2 tw-flex-shrink-0 tw-flex tw-items-center"
      >
        <v-icon v-if="config.required" size="12" color="red" class="tw-mr-2">
          mdi-asterisk
        </v-icon>
        {{ config.label }}
        <ui-icon
          v-if="config.labelTooltip"
          :size="18"
          :aria-describedby="config.labelTooltip.id"
        >
          help
        </ui-icon>

        {{ config.label ? '：' : '' }}
        <slot v-if="afterLabelSlotName" :name="afterLabelSlotName"></slot>
      </label>

      <slot></slot>
    </div>
    <!--    <slot v-if="config.helper" name="helper">
      <ui-textfield-helper visible>
        &lt;!&ndash; {{ config.helper }} &ndash;&gt;
        <span v-html="config.helper"></span>
      </ui-textfield-helper>
    </slot>-->

    <v-tooltip bottom v-if="config.labelTooltip" :id="config.labelTooltip.id">
      <template #activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" v-text="config.labelTooltip.text" />
      </template>
      {{ config.labelTooltip.text }}
    </v-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'UiInputField',
    props: {
      config: {
        type: Object,
        default: () => ({})
      },
      formData: {
        type: Object,
        default: () => ({})
      },
      itemClass: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      afterLabelSlotName: {
        type: String,
        default: ''
      }
    }
  };
</script>
