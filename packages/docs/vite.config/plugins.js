import vue from '@vitejs/plugin-vue2';
import vueSetupDefineOptions from 'unplugin-vue-define-options/vite';
import legacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';
import autoImport from 'unplugin-auto-import/vite';
import { browserslist as targets } from '../package.json';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

const polyfills = [
  'es.object.from-entries',
  'es.object.values',
  'es.array.at',
  'es.array.flat-map',
  'es.array.flat'
];
export default [
  vue(),
  //   define options in setup
  vueSetupDefineOptions(),
  legacy({
    targets,
    polyfills,
    modernPolyfills: polyfills
  }),
  Components({
    // directives: true,
    resolvers: [VuetifyResolver()]
  }),
  autoImport({
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    imports: [
      'vue',
      'pinia',
      {
        'configuration/http': ['$http'],
        'plugins/bus': ['useBus']
      }
    ]
  })
];
