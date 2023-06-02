import vue from '@vitejs/plugin-vue2';
import defineOptions from 'unplugin-vue-define-options/vite';
import Components from 'unplugin-vue-components/vite';
import autoImport from 'unplugin-auto-import/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

export default [
  vue(),
  defineOptions(),
  Components({
    directives: true,
    resolvers: [VuetifyResolver()]
  }),
  autoImport({
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    imports: [
      'vue',
      'pinia',
      { 'configuration/http': ['$http'], 'plugins/bus': ['useBus'] }
    ]
  })
];
