import { helpers } from 'utils/helpers';
import {
  useProps,
  useValue,
  useModel,
  useRules,
  useId
} from 'form/controls/composables';
import { themes } from 'definition/themes';
import { computed as computedProps, toRefs, reactive } from 'vue';

const reverseKeyValue = (obj) => {
  const res = {};
  Object.keys(obj).forEach((key) => (res[obj[key]] = key));
  return res;
};
const hook = function (hookName, hook) {
  return {
    [hookName]() {
      hook && hook.call(this);
      this.config[hookName] && this.config[hookName]();
    }
  };
};
const useEnhancedLifeCircles = ({
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
/**
 * defineControl
 * @author JAY
 * @param {function} setup{function}           Extend the default setup function,it has props and context and the inner setup's vProps as formal parameters
 * @param {object} vueComponentOptions{object} Internal use "..." as the remaining arguments, so the following pass method is wrong 'vueComponentOptions:{ data(){ return {} },mixins:[mixins] }' , please pass 'data(){ return {} },mixins:[mixins],'directly
 * @param {object} enhanceLifeCircles{object}  Its lifecycle can coexist with the configuration within the formConfig, which is performed first
 * @return Inner setup's return, they can usable in template  { formView,vProps,...attrs,value,vuetifySlotMapping,vuetifySlots }
 */
export default ({ setup, enhanceLifeCircles, ...vueComponentOptions } = {}) =>
  defineComponent({
    inheritAttrs: false,
    props: { ...useProps(), show: { type: Boolean, default: true } },
    ...useModel(),
    ...vueComponentOptions,
    ...useEnhancedLifeCircles(enhanceLifeCircles),
    setup(props, context) {
      const formView = inject('formView', null);
      const { emit, attrs, slots } = context;
      const { config, show } = toRefs(props);
      const { vProps = {}, key, control } = config.value;
      const value = useValue({
        props,
        emit,
        formView
      });
      const defineSlot = (position) => `${position}_${key}`;
      const overwriteVuetifySlotMapping = {
        left: 'prepend',
        'left-inner': 'prepend-inner',
        'right-inner': 'append',
        right: 'append-outer'
      };
      const vuetifySlots = {};
      for (let slot in slots) {
        const position = slot.split('_')[0];
        if (overwriteVuetifySlotMapping.hasOwnProperty(position)) {
          vuetifySlots[overwriteVuetifySlotMapping[position]] = slots[slot];
        }
      }
      const transferredSlots = reverseKeyValue(overwriteVuetifySlotMapping);
      const hasVariantInVProps = () =>
        Object.keys(vProps).some(
          (prop) =>
            ['outlined', 'solo', 'filled'].includes(prop) && vProps[prop]
        );
      const getVariantInThemes = (variant) =>
        !hasVariantInVProps() && themes.formControlVariant.includes(variant);

      const setupData = reactive({
        vProps: {
          solo: getVariantInThemes('solo'),
          filled: getVariantInThemes('filled') || control === 'i-textarea',
          outlined: getVariantInThemes('outlined'),
          validateOnBlur: true,
          clearable: !vProps.readonly && attrs.clearable !== false,
          ...useId(props),
          ...(['i-text', 'i-textarea'].includes(control)
            ? { counter: vProps.maxlength }
            : {}),
          // class: 'v-text-field',
          ...vProps,
          rules: computedProps(() => (show.value ? useRules(props).value : []))
        }
      });

      return {
        ...toRefs(setupData),
        ...attrs,
        value,
        formView,
        transferredSlots,
        vuetifySlots,
        defineSlot,
        className: '',
        ...(setup && helpers.isFunction(setup)
          ? setup(props, context, { ...toRefs(setupData), value })
          : {})
      };
    }
  });
