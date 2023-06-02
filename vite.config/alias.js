import path from 'node:path';
const workspace = path.join(__dirname, '../');
const resolvePath = (dir) => path.join(workspace, dir);

export default {
  resolve: {
    alias: {
      '@': resolvePath('src'),
      'module-utils': resolvePath('src/utils/for-modules'),
      components: resolvePath('src/components'),
      composables: resolvePath('src/composables'),
      configuration: resolvePath('src/configuration'),
      definition: resolvePath('src/definition'),
      form: resolvePath('src/components/form'),
      plugins: resolvePath('src/plugins'),
      router: resolvePath('src/router'),
      store: resolvePath('src/store'),
      styles: resolvePath('src/styles'),
      utils: resolvePath('src/utils'),
      views: resolvePath('src/views'),
      mock: resolvePath('mock')
    }
  }
};
