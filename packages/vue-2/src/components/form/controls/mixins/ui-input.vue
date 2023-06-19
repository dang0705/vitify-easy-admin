<template>
  <v-input v-show="show" hide-details v-bind="useId(props)">
    <template #prepend>
      <v-icon
        style="width: 16px"
        small
        color="red"
        v-text="config.required ? mdiAsterisk : ''"
      />
    </template>
    <template #label>
      <span
        :class="[...themes.control.label, 'tw-select-none']"
        v-if="config.label"
        v-text="`${config.label}：`"
      />
    </template>
    <div class="tw-flex tw-w-full tw-flex-col tw-pt-4">
      <slot :name="`on-${config.key}`" />
      <component
        v-model="formData[config.key]"
        v-on="$listeners"
        :show="show"
        :ref="config.useRef ? `${config.key}-${config.control}` : null"
        :is="config.control"
        :config="config"
        :form-config="formConfig"
        :form-data="formData"
        :data-source="formData"
      >
        <template v-for="(_, name) in $scopedSlots" #[name]>
          <slot :name="name" />
        </template>
      </component>
      <slot :name="`under-${config.key}`" />
    </div>
  </v-input>
</template>
<script>
  import { useRefs, useModel } from 'form/controls/composables';
  import maybeFunction from 'utils/maybe-function';
  export default {
    inheritAttrs: false,
    ...useModel(),
    data() {
      return {
        isShow: this.config.show ?? true
      };
    },
    computed: {
      getRefs() {
        return this.$refs;
      },
      show: {
        get() {
          const { formView, props } = this._setupProxy;
          return maybeFunction({
            data: this.isShow,
            params: [props.formData, useRefs(props, formView).value]
          });
        },
        set(isShow) {
          this.isShow = isShow;
          !isShow && this.resetValueWhenHide();
        }
      }
    },
    watch: {
      show(isShow) {
        !isShow && this.resetValueWhenHide();
      }
    },
    methods: {
      resetValueWhenHide() {
        const { value, defaultValue } = this._setupProxy;
        value !== defaultValue && this.$emit('change', defaultValue);
      }
    }
  };
</script>

<script setup>
  import { themes } from 'definition/themes';
  import { mdiAsterisk } from '@mdi/js';
  import { useProps, useValue, useId } from 'form/controls/composables';

  const formView = inject('formView', null);
  const formConfig = inject('formConfig', null);
  const props = defineProps(useProps());
  const emit = defineEmits(['change']);
  const value = useValue({
    props,
    emit,
    formView
  });
</script>

<style lang="postcss" scoped>
  .col {
    > .v-input {
      ::v-deep {
        .v-input__prepend-outer,
        .v-input__append-outer {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          margin-top: 0;
          margin-bottom: 0;
          > * {
            flex: 1;
            margin-top: 0;
            padding-top: 0;
          }
        }
        > .v-input__control {
          & > .v-input__slot {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      }
    }
  }
</style>
