import mitt from "mitt";
const emitter = mitt();
export const useBus = emitter;
export default {
  install(vue) {
    vue.prototype.$bus = emitter;
  },
};
