import { dateLimit } from '@/utils';

export default {
  data() {
    return {
      pickerLimit: {}
    };
  },
  watch: {
    'formView.$attrs.model': {
      handler() {
        this.config.limitType &&
          this.$nextTick(() => {
            this.manualChange = true;
            this.value = this.pickerLimit[this.config.limitType];
            setTimeout((this.manualChange = false), 0);
          });
      }
    }
  },
  created() {
    const pickerLimit = dateLimit();
    for (let pickerLimitKey in pickerLimit) {
      this.$set(this.pickerLimit, pickerLimitKey, pickerLimit[pickerLimitKey]);
    }

    if (!this.config.infiniteDate) {
      this.$set(
        this.pickerConfig,
        'maxDate',
        this.config.maxDate || pickerLimit.today
      );
    }

    if (this.config.limitType) {
      this.manualChange = true;
      this.value = this.pickerLimit[this.config.limitType];
    }
  }
};
