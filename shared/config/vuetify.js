import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import deepmerge from 'deepmerge';
import minifyTheme from 'minify-css-string';
import thresholds from '@/define/breakpoint.json';
import { pl, zhHans } from 'vuetify/lib/locale';

Vue.use(Vuetify);
const preset = {
  breakpoint: {
    thresholds,
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
      /*    themeCache: {
        get: (key) => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value)
      }*/
    }
  }
};
export default (opts = {}) => new Vuetify(deepmerge(preset, opts));
