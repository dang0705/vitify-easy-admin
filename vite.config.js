import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';
import resolve from './vite.config/alias';
import $appName from './vite.config/app-name';
import deepmerge from 'deepmerge';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const _isDev_ = mode === 'development';
  try {
    var configs = require(`./vite.config/apps/${$appName}/index.js`);
  } catch (e) {}
  const basicConfigs = {
    define: {
      _isDev_,
      _appName_: `"${$appName}"`
    },
    ...resolve,
    server: {
      host: 'localhost'
    },
    preview: {
      port: 9988
    },
    plugins: [commonjs()]
  };
  const totalConfigs = deepmerge(
    basicConfigs,
    configs ? configs($appName, _isDev_) : {}
  );
  // console.log(totalConfigs);
  return totalConfigs;
});
