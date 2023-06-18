import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import deepmerge from 'deepmerge';
import minifyTheme from 'minify-css-string';
import {
  Ripple,
  Resize,
  Scroll,
  ClickOutside,
  Intersect
} from 'vuetify/lib/directives';
import { pl, zhHans } from 'vuetify/lib/locale';

Vue.use(Vuetify, {
  directives: {
    Ripple,
    Resize,
    Scroll,
    ClickOutside,
    Intersect
  }
});
const preset = {
  breakpoint: {
    mobileBreakpoint: 'sm',
    scrollBarWidth: 10
  },
  icons: {
    iconfont: 'mdiSvg'
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
