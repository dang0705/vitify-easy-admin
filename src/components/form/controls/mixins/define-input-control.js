import { helpers } from 'utils/helpers';
import {
  useProps,
  useValue,
  useModel,
  useOptions,
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
    props: { ...useProps(), show: { type: Boolean, default: true } },
    ...useModel(name),
    computed: computedOptions,
    watch: watchOption,
    ...otherOptions,
    setup(props, context) {
      const { config, formData, dataSource, show } = props;
      const { emit, attrs } = context;
      const formView = inject('formView', null);
      const formConfig = inject('formConfig', null);
      console.log(formConfig);
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
      const value = useValue({
        props,
        value: config.value,
        formData,
        formView,
        emit
      });

      // console.log(formView.$refs.form.$children);
      watch(
        () => config.value,
        (val) => {
          helpers.isFunction(val) &&
            Object.keys(formData).length &&
            (value.value = val(formData));
        }
      );

      const overwriteVuetifySlotMapping = {
        left: 'prepend',
        'left-inner': 'prepend-inner',
        'right-inner': 'append',
        right: 'append-outer'
      };
      const vuetifySlots = ref({});
      for (let slot in context.slots) {
        const position = slot.split('_')[0];
        if (overwriteVuetifySlotMapping.hasOwnProperty(position)) {
          vuetifySlots.value[overwriteVuetifySlotMapping[position]] =
            context.slots[slot];
        }
      }
      const reverseKeyValue = (obj) => {
        const res = {};
        Object.keys(obj).forEach((key, value) => (res[obj[key]] = key));
        return res;
      };

      const vuetifySlotMapping = reverseKeyValue(overwriteVuetifySlotMapping);
      const transferVuetifySlot = (vuetifySlot) =>
        vuetifySlotMapping[vuetifySlot];

      const defineSlot = (position) => `${position}_${key.value}`;
      const setUpData = {
        formView,
        bind: {
          ...attrs,
          id: useId(props),
          rules: show ? useRules(props).value : [],
          clearable: !readonly.value && attrs.clearable !== false,
          readonly: readonly.value,
          disabled: disabled.value,
          'left-inner': defineSlot('left-inner'),
          left: defineSlot('left'),
          'right-inner': defineSlot('right-inner'),
          right: defineSlot('right')
        },
        value,
        vuetifySlotMapping,
        vuetifySlots,
        transferVuetifySlot,
        ...useOptions(name, options)
      };
      const slotBind = (position) => {
        const slot = config.slot?.[position];
        if (!slot) return { bind: { is: 'span' } };
        const isText = helpers.isString(slot);
        return {
          bind: {
            is: slot.control || 'span',
            ...(isText ? {} : slot.bind)
          },
          text: isText ? slot : ''
        };
      };

      return {
        slotBind,
        ...setUpData,
        ...(setup && helpers.isFunction(setup)
          ? setup(props, context, setUpData)
          : {})
      };
    }
  });
const callConfigHooks = function (hooks) {
  this.config[hooks] && this.config[hooks]();
};
export const useLifeCircles = ({
  created,
  mounted,
  updated,
  beforeDestroy,
  destroyed
} = {}) => ({
  created() {
    created && created.call(this);
    callConfigHooks.call(this, 'created');
  },
  mounted() {
    mounted && mounted.call(this);
    callConfigHooks.call(this, 'mounted');
  },
  updated() {
    updated && updated.call(this);
    callConfigHooks.call(this, 'updated');
  },
  beforeDestroy() {
    beforeDestroy && beforeDestroy.call(this);
    callConfigHooks.call(this, 'beforeDestroy');
  },
  destroyed() {
    destroyed && destroyed.call(this);
    callConfigHooks.call(this, 'destroyed');
  }
});
