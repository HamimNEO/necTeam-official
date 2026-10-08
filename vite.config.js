import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { pages } from './src/policies.js';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/necTeam-official/' : './',
  build: {
    rolldownOptions: {
      input: Object.fromEntries([
        ['home', fileURLToPath(new URL('./index.html', import.meta.url))],
        ...Object.keys(pages).map(path => [path.slice(1), fileURLToPath(new URL(`.${path}/index.html`, import.meta.url))]),
      ]),
    },
  },
});
