import { defineConfig } from 'vite';
import build from './vite.config/build';
import resolve from './vite.config/alias';
import plugins from './vite.config/plugins';
import postcss from './vite.config/postcss';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const _isDev_ = mode === 'development';
  return {
    base: '/',
    build,
    css: {
      postcss,
      devSourcemap: true,
      preprocessorOptions: {
        sass: {
          //
          additionalData: [
            '@import "vuetify/src/styles/settings/index"',
            '@import "styles/vuetify/variables"',
            ''
          ].join('\n'),
          charset: false
        }
      }
    },
    define: {
      _isDev_
    },
    ...resolve,
    server: {
      host: 'localhost',
      port: 8899
    },
    preview: {
      port: 9988
    },
    plugins
  };
});
