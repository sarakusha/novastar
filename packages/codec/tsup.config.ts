import { defineConfig, type Options } from 'tsup';

const nodeConfig: Options = {
  name: 'node',
  platform: 'node',
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: false,
  target: 'es2021',
  treeshake: true,
  sourcemap: true,
};

export default defineConfig(nodeConfig);
