import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'carefree-utils',
  mfsu: false,
  outputPath: 'docs-dist',
  base: process.env.NODE_ENV === 'production' ? '/carefree-utils/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/carefree-utils/' : '/',
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'cascader', dir: './src/Cascader' },
      { type: 'clone', dir: './src/clone' },
      { type: 'date', dir: './src/date' },
      { type: 'get', dir: './src/get' },
      { type: 'groupBy', dir: './src/groupBy' },
      { type: 'set', dir: './src/set' },
      { type: 'Solar2lunar', dir: './src/Solar2lunar' },
      { type: 'tree', dir: './src/Tree' },
    ],
  },
  themeConfig: {
    socialLinks: {
      github: 'https://github.com/SunLxy/carefree-utils',
    },
  },
});
