export default {
  data() {
    return {
      manualChange: false
    };
  },
  mounted() {
    this.$el.addEventListener('keydown', this.onKeydown, { passive: true });
  },
  methods: {
    onClick() {
      this.manualChange = true;
    },
    onKeydown() {
      this.manualChange = true;
    }
  }
};
