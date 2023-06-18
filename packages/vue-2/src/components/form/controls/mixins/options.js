import { helpers } from 'utils/helpers';
// import { getOptionsModelConfig } from 'module-utils/CRUD';

export default {
  data() {
    return {
      options: this.config?.options || [],
      optionsLoading: false
    };
  },
  computed: {
    selectedValue() {
      const selected = helpers.isArray(this.options)
        ? this.options?.find((option) => option.value === this.value)
        : {};
      return selected?.label;
    }
  },
  watch: {
    'config.options': {
      handler(val) {
        val?.length && (this.options = val);
      }
    }
    /*selectedValue: {
      immediate: true,
      handler(val) {
        this.$emit('get-selected-val', this.key, val);
      }
    }*/
  },
  async created() {
    const { model, params = {}, cache, optionKey = [] } = this.config;
    if (model) {
      this.optionsLoading = true;
      /*      try {
        this.options = await getOptionsModelConfig({
          model,
          params,
          cache,
          optionKey
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.$nextTick(() => (this.optionsLoading = false));
      }*/
    }
  }
};
