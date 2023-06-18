const isBuildLocal = process.argv.includes('build-local');
export default {
  rollupOptions: {
    output: {
      // compact: true,
      assetFileNames: ({ name }) => {
        const ext = name
          .substring(name.lastIndexOf('.') + 1, name.length)
          .toLowerCase();
        let path = ext === 'css' ? ext : 'assets';
        return `${path}/[name]-[hash].[ext]`;
      },
      entryFileNames: `main/[name]-[hash].js`,
      chunkFileNames: isBuildLocal
        ? `[name]/[name]-[hash].js`
        : `async/async-module-[hash].js`,
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id
            .toString()
            .split('node_modules/')[1]
            .split('/')[0]
            .toString();
        }
      }
    }
  }
};
