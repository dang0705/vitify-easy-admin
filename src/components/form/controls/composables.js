import { helpers } from 'utils/helpers';
import maybeFunctional from 'utils/maybe-functional';
import { computed, inject } from 'vue';
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
  },
  refs: {
    type: Object,
    default: () => ({})
  }
});

export const useDefaultValue = (value, formData) =>
  computed(() => maybeFunctional({ data: value, params: [formData] }));

const onValueChange = async (
  value,
  { config, formData, formConfigs },
  refs = {}
) => {
  await nextTick();
  config.change &&
    helpers.isFunction(config.change) &&
    config.change({ config, formConfigs, value, formData, refs });
};
export const useValue = ({ props, value, formData, emit, formView = null }) =>
  computed({
    get() {
      if (props.modelValue === null && !Object.keys(formData).length) return;
      const key = props.config.key;
      const manualValue =
        props.modelValue ?? formData[key]?.value ?? formData[key];

      return helpers.isFunction(manualValue)
        ? manualValue(props.formData)
        : manualValue ?? useDefaultValue(value, formData).value;
    },
    async set(value) {
      emit('change', value);
      await nextTick();
      let refs = {};
      if (props.config.useRef) {
        const { $children } = formView.$refs.form;
        refs = $children.reduce(
          (prev, { getRefs }) => Object.assign({}, prev, getRefs),
          $children.find(({ getRefs }) => getRefs).getRefs
        );
      }
      onValueChange(value, props, refs);
    }
  });
export const useModel = (name) => ({
  model: {
    prop: 'modelValue',
    event: 'change'
  }
});

const withOptionsComponents = ['select', 'checkbox', 'radio'];
export const useOptions = (name, options) =>
  withOptionsComponents.includes(name) ? { options } : {};

export const useRules = ({ config }) =>
  computed(() => {
    if (config.readonly) return [];
    const rules =
      config.rules?.length && Array.isArray(config.rules) ? config.rules : [];
    config.required && rules.unshift((v) => !!v || `${config.label}不能为空!`);

    if (['text', 'textarea'].includes(config.control)) {
      switch (config.ruleType) {
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
