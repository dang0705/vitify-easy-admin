const vue = require('@vitejs/plugin-vue2');
const examples = require('../../examples/index.js');
const Components = require('unplugin-vue-components/vite');
const autoImport = require('unplugin-auto-import/vite');
const defineOptions = require('unplugin-vue-define-options/vite');
const { VuetifyResolver } = require('unplugin-vue-components/resolvers');

module.exports = (appName, isDev) => {
  return {
    ...examples,
    server: {
      port: 9898
    },
    plugins: [
      vue(),
      defineOptions(),
      Components({
        directives: true,
        resolvers: [VuetifyResolver()]
      }),
      autoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'pinia']
      })
    ]
  };
};
