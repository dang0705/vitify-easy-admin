<template>
  <v-input
    :readonly="config.readonly"
    :id="id"
    :value="value"
    :rules="noRules ? rules : []"
    validate-on-blur
    v-show="display"
  >
    <template #prepend>
      <v-icon
        style="width: 16px"
        small
        color="red"
        v-text="config.required ? 'mdi-asterisk' : ''"
      />
    </template>
    <template #label>
      <span
        :class="[...themes.control.label, 'tw-select-none']"
        v-if="config.label"
        v-text="`${config.label}：`"
      />
    </template>
    <component
      v-model="formData[config.key]"
      v-on="$listeners"
      :ref="getRef(config)"
      :is="getComponent(config.control)"
      :config="config"
      :form-configs="formConfigs"
      :form-data="formData"
      :data-source="formData"
      @no-rules="noRules = true"
    >
      <template v-for="(_, name) in $scopedSlots" v-slot:[name]="{ options }">
        <slot
          :name="name"
          :field="config.key"
          :value="
            value[config.key] !== undefined ? value[config.key] : config.value
          "
          :options="options"
        />
      </template>
    </component>
  </v-input>
</template>

<script setup>
  import { ref } from 'vue';
  import { themes } from 'definition/themes';
  import { helpers } from 'utils/helpers';
  import {
    useProps,
    useValue,
    useDefaultValue,
    useRules,
    useId
  } from 'form/controls/composables';
  import unitNumberString from 'utils/union-number-string';
  import camel2Kebab from 'utils/camel-2-kebab';
  defineOptions({
    inheritAttrs: false
  });
  const noRules = ref(false);
  const props = defineProps(useProps());
  const emit = defineEmits(['change']);
  const defaultValue = useDefaultValue(
    props.config.value,
    props.config.formData
  );
  const value = useValue(props, defaultValue.value, emit);
  const rules = useRules(props).value;

  const id = useId(props);
  const key = computed(() => props.config.key);
  const dynamicShow = computed(() => {
    if (!key.value) return;
    return (
      props.formConfigs.find((config) => {
        const { control: { configKey } = {} } = config;
        return helpers.isArray(configKey)
          ? configKey.includes(key.value)
          : configKey === key.value;
      }) ||
      props.config.controlled ||
      props.config.show
    );
  });
  const display = computed(() => {
    const { show } = props.config;
    if (show === false) return show;
    if (!dynamicShow.value) return true;
    let isDisplay;
    if (dynamicShow.value.control) {
      let { control: { display } = {}, key } = dynamicShow.value;
      const controlValue = props.formData[key];
      helpers.isArray(display) &&
        (display = display.map((item) => unitNumberString(item)));
      isDisplay = helpers.isArray(display)
        ? display.includes(unitNumberString(controlValue))
        : unitNumberString(display) === unitNumberString(controlValue);
    } else {
      if (helpers.isFunction(show)) {
        isDisplay = helpers.isFunction(show) && show(props.formData);
      } else if (helpers.isObject(show)) {
        const { display, by } = show;
        if (!display || !by) return true;
        let ref = formView.$refs[`input-${by}`];
        let vm = helpers.isArray(ref) ? ref[0] : ref;
        isDisplay = display(props.formData, vm);
      }
    }
    return isDisplay;
  });
  const getRef = (config) =>
    props.formConfigs.some((item) => item.show?.by === config.key)
      ? `input-${config.key}`
      : null;

  watch(
    () => display.value,
    (display) => {
      if (!display) {
        value.value !== defaultValue.value &&
          emit('change', defaultValue.value);
      }
    }
  );
  const getComponent = (controlName) =>
    controlName.includes('-')
      ? controlName
      : camel2Kebab(controlName).substring(1);
</script>
<style lang="postcss" scoped>
  .col {
    > .v-input {
      ::v-deep {
        .v-input {
          width: 100%;
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
