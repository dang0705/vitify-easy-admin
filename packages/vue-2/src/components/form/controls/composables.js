import { helpers } from 'utils/helpers';
import { computed } from 'vue';
import email from 'regexp/usage/email';
import phone from 'regexp/usage/phone';
import maybeFunction from 'utils/maybe-function';

const useProps = () => ({
  formConfig: {
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

const useDefaultValue = (value, formData) =>
  computed(() => maybeFunction({ data: value, params: [formData] }));

const useRefs = (props, formView) =>
  computed(() => {
    let refs = {};
    if (props.config.useRef) {
      const { form: { $children = [] } = {}, ...otherRefs } = formView.$refs;
      const inputRefs = {};
      for (let inputKey in otherRefs) {
        inputRefs[inputKey] = otherRefs[inputKey][0];
      }
      refs = $children.reduce(
        (prev, { getRefs }) =>
          Object.assign({}, prev, getRefs, formView.$refs, inputRefs),
        $children.find(({ getRefs } = {}) => getRefs)?.getRefs || {}
      );
    }
    return refs;
  });

const onValueChange = (value, { config, formData, formConfig }, refs = {}) =>
  config.change &&
  helpers.isFunction(config.change) &&
  config.change({ config, formConfig, value, formData, refs });
const useValue = ({ props, emit, formView = null }) =>
  computed({
    get() {
      const {
        modelValue,
        config: { key, value },
        formData
      } = props;
      if (modelValue === null && !Object.keys(formData).length) return;
      const manualValue = modelValue ?? formData[key]?.value ?? formData[key];
      return helpers.isFunction(manualValue)
        ? manualValue(formData)
        : manualValue ?? useDefaultValue(value, formData).value;
    },
    async set(value) {
      emit('change', value);
      await nextTick();
      onValueChange(value, props, useRefs(props, formView).value);
    }
  });
const useModel = () => ({
  model: {
    prop: 'modelValue',
    event: 'change'
  }
});

const useRules = ({ config }) =>
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

const useId = ({ config }) => ({ id: config.key + '-' + config.control });
export {
  useId,
  useRules,
  useProps,
  useModel,
  useValue,
  useDefaultValue,
  useRefs
};
