import { defineConfig, type Options } from 'tsup';

const nodeConfig: Options = {
  name: 'node',
  platform: 'node',
  entry: ['src/net.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: false,
  // outDir: 'build',
  target: 'es2021',
  treeshake: true,
  sourcemap: true,
};

export default defineConfig(nodeConfig);
