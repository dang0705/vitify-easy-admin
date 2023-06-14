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
      const { emit, attrs, slots } = context;
      const formView = inject('formView', null);
      const options = computed(() => props.config.options);
      const readonly = computed(() => props.config.readonly);
      const disabled = computed(() => props.config.disabled);
      const key = computed(() => props.config.key);
      const value = useValue({
        props,
        emit,
        formView
      });
      helpers.isFunction(props.config.value) &&
        Object.keys(props.formData).length &&
        (value.value = props.config.value(props.formData));

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

      const rules = computed(() => (props.show ? useRules(props).value : []));
      const defineSlot = (position) => `${position}_${key.value}`;
      const setUpData = {
        formView,
        staticProps: {
          ...attrs,
          id: useId(props),
          clearable: !readonly.value && attrs.clearable !== false,
          'left-inner': defineSlot('left-inner'),
          left: defineSlot('left'),
          'right-inner': defineSlot('right-inner'),
          right: defineSlot('right')
        },
        readonly,
        disabled,
        rules,
        value,
        vuetifySlotMapping,
        vuetifySlots,
        transferVuetifySlot,
        ...useOptions(name, options)
      };
      const slotBind = (position) => {
        const slot = props.config.slot?.[position];
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
