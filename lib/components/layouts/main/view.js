import { helpers } from '@utils/helpers';
import { mapState } from 'pinia';
import { useModelStore } from '@store/current-route-model-store';
// import { useAlertInfo } from '@balm-async';
// import { mapState } from 'pinia';
// import { useModelStore } from '@store/current-route-model-store';

export default {
  props: {
    formConfigs: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      default: undefined
    },
    formModel: {
      type: String,
      default: ''
    },
    formModelConfig: {
      type: Object,
      default: () => ({})
    },
    routeName: {
      type: String,
      default: ''
    },
    defaultParams: {
      type: Object,
      default: () => ({})
    },
    validations: {
      type: Array,
      default: () => []
    },
    formConfig: {
      type: [Array, Function],
      default: () => []
    }
  },
  data() {
    return {
      errorMessage: ''
    };
  },
  computed: {
    ...mapState(useModelStore, ['currentMenuName', 'currentModel']),
    useValidator() {
      return !!this.validations.length;
    },
    modelName() {
      return this.model || this.currentModel;
    }
  },
  watch: {
    validations: {
      immediate: true,
      handler(val) {
        this.useValidator && this.$validations.set(val);
      }
    },
    formConfig: {
      immediate: true,
      handler(formConfig) {
        helpers.isArray(formConfig) &&
          ((this.searchForm || this.detailForm).config = formConfig || []);
      }
    }
  },
  methods: {
    /*    async onSubmit(formData, fn, params = '') {
      if (this.useValidator) {
        const { valid, message } = this.$validate(formData);
        // message && (await useAlertInfo());
        alert(message);
        this.errorMessage = message;

        if (valid) {
          fn(params);
        }
      } else {
        this.errorMessage = '';
        fn(params);
      }
    }*/
  }
};
