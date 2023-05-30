import Vue from 'vue';

export default (name, mobile) => () => {
  window.__DEVICE = Vue.prototype.__DEVICE = name;
  window.__MOBILE = Vue.prototype.__MOBILE = mobile;
};
