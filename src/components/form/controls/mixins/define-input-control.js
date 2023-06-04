import { helpers } from 'utils/helpers';
import {
  useProps,
  useDefaultValue,
  useValue,
  useModel,
  useOptions,
  useWatchValue,
  useRules
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
    name: `Input${cfl(name)}`,
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

      const rules = useRules(props);

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
          clearable: !readonly.value,
          // rules: rules.value,
          readonly: readonly.value,
          disabled: disabled.value
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
