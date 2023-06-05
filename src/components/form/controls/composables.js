import { helpers } from 'utils/helpers';
import maybeFunctional from 'utils/maybe-functional';
import { computed } from 'vue';
import email from '@/regexp/usage/email';
import phone from '@/regexp/usage/phone';
export const useProps = () => ({
  formConfigs: {
    type: Array,
    default: () => []
  },
  config: {
    type: Object,
    default: () => ({})
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  dataSource: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: [String, Array, Object, Number, Boolean],
    default: null
  }
});

export const useDefaultValue = (value, formData) =>
  computed(() => maybeFunctional({ data: value, params: [formData] }));

const onValueChange = async (value, { config, formData, formConfigs }) => {
  await nextTick();
  config.change &&
    helpers.isFunction(config.change) &&
    config.change({ config, formConfigs, value, formData });
};
const needNotVModelComponents = ['text', 'textarea', 'select'];
export const useWatchValue = (name, attrs, props) =>
  needNotVModelComponents.includes(name) &&
  watch(
    () => attrs.value,
    (value) => onValueChange(value, props)
  );
export const useValue = (props, defaultValue, emit) =>
  computed({
    get() {
      if (props.modelValue === null && !Object.keys(props.formData).length)
        return;
      const key = props.config.key;
      const manualValue =
        props.modelValue ?? props.formData[key]?.value ?? props.formData[key];
      return helpers.isFunction(manualValue)
        ? manualValue(props.formData)
        : manualValue ?? defaultValue;
    },
    async set(value) {
      emit('change', value);
      onValueChange(value, props);
    }
  });
export const useModel = (name) =>
  needNotVModelComponents.includes(name)
    ? {}
    : {
        model: {
          prop: 'modelValue',
          event: 'change'
        }
      };

const withOptionsComponents = ['select', 'checkbox', 'radio'];
export const useOptions = (name, options) =>
  withOptionsComponents.includes(name) ? { options } : {};

export const useRules = ({ config }) =>
  computed(() => {
    if (config.readonly) return [];
    const rules =
      config.rules?.length && Array.isArray(config.rules) ? config.rules : [];
    config.required && rules.unshift((v) => !!v || `${config.label}为必填项!`);

    if (['text', 'textarea'].includes(config.control)) {
      switch (config.inputType) {
        case 'email':
          rules.push((address) => email(address) || '邮箱格式不正确');
          break;
        case 'phone':
          rules.push((number) => phone(number) || '手机号码格式不正确');
          break;
      }
      if (config.max) {
        rules.push(
          (v) =>
            (v || '').length <= config.max || `最多字数不得超过${config.max}`
        );
      }
    }
    return rules;
  });

export const useId = ({ config }) => config.key + '-' + config.control;
