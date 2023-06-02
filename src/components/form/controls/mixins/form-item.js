import { helpers } from '@utils/helpers';
import unitNumberString from '@utils/union-number-string';
import UiInputField from '@admin-controls-mixins/input-field.vue';
import email from '@Regexp/usage/email';
import phone from '@Regexp/usage/phone';

export default {
  components: {
    UiInputField
  },
  inject: {
    formView: {
      default: null
    },
    useGrid: {
      default: null
    }
  },
  props: {
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
    itemClass: {
      type: String,
      default: ''
    },
    subitemClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    useGridAttrs() {
      return this.useGrid ? { hideDetails: true } : {};
    },
    type() {
      return this.config.type;
    },
    key() {
      return this.config.key;
    },
    defaultValue() {
      const { value } = this.config;
      return helpers.isFunction(value) ? value(this.formData) : value;
    },
    value: {
      get() {
        if (!Object.keys(this.formData).length) return;
        const manualValue = this.formData[this.key];
        return helpers.isFunction(manualValue)
          ? manualValue(this.formData)
          : manualValue ?? this.defaultValue;
      },
      set(value) {
        this.$emit('change', this.key, value) && this.onValueChange(value);
      }
    },
    readonly() {
      return this.config.readonly;
    },
    disabled() {
      return this.config.disabled;
    },
    controller() {
      if (!this.key) return;
      return (
        this.formConfigs.find((config) => {
          const { control: { key } = {} } = config;
          return helpers.isArray(key)
            ? key.includes(this.key)
            : key === this.key;
        }) ||
        this.config.controlled ||
        this.config.display
      );
    },
    display() {
      if (this.config.hidden) return false;
      if (!this.controller) return true;
      let isDisplay;
      if (this.controller.control) {
        let { control: { display } = {}, key } = this.controller;
        const controlValue = this.formData[key];
        helpers.isArray(display) &&
          (display = display.map((item) => unitNumberString(item)));
        isDisplay = helpers.isArray(display)
          ? display.includes(unitNumberString(controlValue))
          : unitNumberString(display) === unitNumberString(controlValue);
      } else {
        const { display, controlled } = this.config;
        if (display) {
          isDisplay =
            display && helpers.isFunction(display) && display(this.formData);
        } else {
          const { display, by } = controlled;
          if (!display || !by) return true;
          let ref = this.formView.$refs[`input-${by}`];
          let vm = helpers.isArray(ref) ? ref[0] : ref;
          isDisplay = display(this.formData, vm);
        }
      }
      return isDisplay;
    },
    afterSlotName() {
      return `after-input-${this.type}-${this.key}`;
    },
    rules() {
      const rules = this.config.required
        ? [(v) => !!v || `${this.config.label}为必填项!`]
        : [];

      if (this.type === 'text' || this.type === 'textarea') {
        switch (this.config.inputType) {
          case 'email':
            rules.push((address) => email(address) || '邮箱格式不正确');
            break;
          case 'phone':
            rules.push((number) => phone(number) || '手机号码格式不正确');
            break;
          default:
            this.config.rules?.length && rules.push(this.config.rules);
        }
        if (this.config.max) {
          rules.push(
            (v) =>
              (v || '').length <= this.config.max ||
              `最多字数不得超过${this.config.max}`
          );
        }
      }
      return rules;
    }
  },
  watch: {
    display(display) {
      if (!display) {
        this.value !== this.defaultValue &&
          this.$emit('change', this.key, this.defaultValue);
      }
    },
    'config.value': {
      immediate: true,
      handler(value) {
        helpers.isFunction(value) &&
          Object.keys(this.formData).length &&
          (this.value = value(this.formData));
      }
    }
  },
  methods: {
    onValueChange(value) {
      const { change } = this.config;
      this.$nextTick(
        () =>
          change &&
          helpers.isFunction(change) &&
          change(value, this.formData, this.selectedValue || undefined)
      );
    }
  },
  mounted() {
    // this.$emit('rendered', 1);
  }
};
