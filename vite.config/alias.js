import path from 'node:path';
import enumerateApps from './utils/enumerate-apps';
const workspace = path.join(__dirname, '../');
const appAliases = {};

const resolvePath = (dir) => path.join(workspace, dir);
enumerateApps((appName) => {
  const appRoot = `./examples/${appName}/src`;
  appAliases[`@${appName}`] = resolvePath(appRoot);
  appAliases[`@${appName}-styles`] = resolvePath(`${appRoot}/styles`);
  appAliases[`@${appName}-apis`] = resolvePath(`${appRoot}/apis`);
  appAliases[`@${appName}-configs`] = resolvePath(`${appRoot}/configs`);
  appAliases[`@${appName}-components`] = resolvePath(`${appRoot}/components`);
  appAliases[`@${appName}-store`] = resolvePath(`${appRoot}/store`);
  appAliases[`@${appName}-router`] = resolvePath(`${appRoot}/router`);
  appAliases[`@${appName}-views`] = resolvePath(`${appRoot}/views`);
});

export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      ...appAliases,
      'vite-config': resolvePath('./vite.config'),
      '@': resolvePath('shared'),
      '@bus': resolvePath('shared/plugins/bus'),
      '@router': resolvePath('shared/router'),
      '@store': resolvePath('shared/store'),
      '@utils': resolvePath('shared/utils'),
      '@configs': resolvePath('shared/config'),
      '@plugins': resolvePath('shared/plugins'),
      '@styles': resolvePath('shared/styles'),
      '@mock': resolvePath('mock'),
      '@components': resolvePath('shared/components'),
      '@layout': resolvePath('shared/components/layouts'),
      '@controls': resolvePath('shared/components/controls'),
      '@function': resolvePath('shared/components/function'),
      '@Regexp': resolvePath('shared/Regexp'),
      '@validations': resolvePath('shared/validations')
    }
  }
};
