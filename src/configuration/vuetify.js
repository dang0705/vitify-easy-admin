import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import deepmerge from 'deepmerge';
import minifyTheme from 'minify-css-string';
import { pl, zhHans } from 'vuetify/lib/locale';

Vue.use(Vuetify);
const preset = {
  breakpoint: {
    mobileBreakpoint: 'sm',
    scrollBarWidth: 10
  },
  icons: {
    iconfont: 'mdi'
  },
  lang: { current: 'zhHans', locales: { pl, zhHans } },
  theme: {
    options: {
      minifyTheme,
      customProperties: true
    }
  }
};
const customOptions = {};
export default ((opts = {}) => new Vuetify(deepmerge(preset, opts)))(
  customOptions
);
