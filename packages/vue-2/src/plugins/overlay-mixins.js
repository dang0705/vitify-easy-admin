export default {
  el: document.createElement('div'),
  data: {
    show: false,
    ele: null,
    destroyTimer: null,
    button: {
      elevation: 2,
      class: 'tw-mx-2 tw-py-2 tw-h-8 tw-px-8',
      rounded: true,
      color: 'primary'
    }
  },
  mounted() {
    this.ele = document.getElementsByClassName('v-application')[0];
    this.ele.appendChild(this.$el);
    this.$nextTick(() => (this.show = true));
  },
  methods: {
    destroy() {
      this.$destroy();
      this.ele.contains(this.$el) && this.ele.removeChild(this.$el);
      this.destroyTimer && clearTimeout(this.destroyTimer);
      this.destroyTimer = null;
    }
  }
};
export const initPlugin = (async, init) =>
  async ? new Promise((resolve, reject) => init(resolve, reject)) : init();
