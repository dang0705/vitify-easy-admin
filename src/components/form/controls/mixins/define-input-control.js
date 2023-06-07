import { helpers } from 'utils/helpers';
import {
  useProps,
  useDefaultValue,
  useValue,
  useModel,
  useOptions,
  useWatchValue,
  useRules,
  useId
} from 'form/controls/composables';
import cfl from 'utils/capitalize-the-first-letter';

export default ({
  name,
  setup,
  computed: computedOptions,
  watch: watchOption,
  ...otherOptions
}) =>
  defineComponent({
    name: `I${cfl(name)}`,
    props: useProps(),
    ...useModel(name),
    computed: computedOptions,
    watch: watchOption,
    ...otherOptions,
    setup(props, context) {
      const { config, formConfigs, formData, dataSource } = props;
      const { emit, attrs } = context;

      const formView = inject('formView', null);
      const useGrid = inject('useGrid', null);
      const options = computed(() => config.options);

      const selectedValue = computed(() => {
        const selected = helpers.isArray(options.value)
          ? options.value?.find((option) => option.value === value.value)
          : {};
        return selected?.label;
      });
      const useGridAttrs = computed(() =>
        useGrid ? { hideDetails: true } : {}
      );
      const readonly = computed(() => config.readonly);
      const disabled = computed(() => config.disabled);

      const key = computed(() => config.key);
      const value = useValue(
        props,
        useDefaultValue(config.value, formData).value,
        emit
      );

      useWatchValue(name, attrs, props);

      watch(
        () => props.config.value,
        (val) => {
          helpers.isFunction(val) &&
            Object.keys(props.formData).length &&
            (value.value = val(props.formData));
        }
      );

      const setUpData = {
        formView,
        bind: {
          ...attrs,
          id: useId(props),
          rules: useRules(props).value,
          clearable: !readonly.value,
          readonly: readonly.value,
          disabled: disabled.value,
          leftInner: `left-inner-${key.value}`,
          left: `left-${key.value}`,
          rightInner: `right-inner-${key.value}`,
          right: `right-${key.value}`
        },
        value,
        ...useOptions(name, options)
      };
      return {
        ...setUpData,
        ...(setup && helpers.isFunction(setup)
          ? setup(props, context, setUpData)
          : {})
      };
    }
  });
