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
    ...useModel(),
    computed: computedOptions,
    watch: watchOption,
    ...otherOptions,
    setup(props, context) {
      const { config, formData, show } = props;
      const { emit, attrs, slots } = context;
      const formView = inject('formView', null);
      const options = computed(() => config.options);
      const readonly = computed(() => config.readonly);
      const disabled = computed(() => config.disabled);
      const key = computed(() => config.key);
      const value = useValue({
        props,
        emit,
        formView
      });
      helpers.isFunction(config.value) &&
        Object.keys(formData).length &&
        (value.value = config.value(formData));

      const overwriteVuetifySlotMapping = {
        left: 'prepend',
        'left-inner': 'prepend-inner',
        'right-inner': 'append',
        right: 'append-outer'
      };
      const vuetifySlots = ref({});
      for (let slot in slots) {
        const position = slot.split('_')[0];
        if (overwriteVuetifySlotMapping.hasOwnProperty(position)) {
          vuetifySlots.value[overwriteVuetifySlotMapping[position]] =
            slots[slot];
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

const hook = function (hookName, hook) {
  return {
    [hookName]() {
      hook && hook.call(this);
      this.config[hookName] && this.config[hookName]();
    }
  };
};

export const useLifeCircles = ({
  created,
  mounted,
  updated,
  beforeDestroy,
  destroyed
} = {}) => ({
  ...hook('created', created),
  ...hook('mounted', mounted),
  ...hook('updated', updated),
  ...hook('beforeDestroy', beforeDestroy),
  ...hook('destroyed', destroyed)
});
