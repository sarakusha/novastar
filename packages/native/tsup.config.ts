import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Options } from 'tsup';

const entries = Object.fromEntries(
  globSync('generated/**/*.ts').map(file => [
    path.relative('generated', file.slice(0, file.length - path.extname(file).length)),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
);
// console.log(dts);

const nodeConfig: Options = {
  name: 'node',
  platform: 'node',
  entry: { ...entries, common: 'lib/common/index.ts' },
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: false,
  target: 'es2021',
  treeshake: true,
  sourcemap: true,
  splitting: true,
  esbuildOptions(opts) {
    // opts.entryNames = '[dir]/[name]/index';
    opts.chunkNames = 'chunks/[name]-[hash]';
  },
};

export default defineConfig(nodeConfig);
