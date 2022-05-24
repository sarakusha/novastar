#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
import { existsSync } from 'fs';
import { copyFile, mkdir, readdir, rm, writeFile, readFile } from 'fs/promises';
import path from 'path';
import mkdirp from 'mkdirp';
import replaceInFile from 'replace-in-file';

const build = path.resolve('./build');
const hybrid = path.join(path.dirname(build), 'lib');
const main = path.join(build, 'main');
const es = path.join(build, 'module');

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const copyFixSourceMap = async (src, dest) => {
  const text = (await readFile(src)).toString();
  await writeFile(dest,
    text.replace(
      `//# sourceMappingURL=${path.basename(src)}.map`,
      `//# sourceMappingURL=${path.basename(dest)}.map`,
    ),
  );
};

(async () => {
  if (existsSync(hybrid)) {
    await rm(hybrid, {
      recursive: true,
      force: true,
    });
  }
  await mkdir(hybrid);
  const ignore = [];
  for await (const src of getFiles(main)) {
    const basename = path.basename(src);
    const relative = path.relative(main, src);
    const name = basename.replace(/\..+$/, '');
    const isIndex = name.toLowerCase() === 'index';
    const root = isIndex ?
      path.dirname(relative) :
      relative.replace(/\..+$/, '');
    const dir = path.join(hybrid, root);
    // console.log({src, dir, es, basename, ext: basename.replace(/^[^.]*/, '').toLowerCase() });
    switch (basename.replace(/^[^.]*/, '').toLowerCase()) {
      case '.js': {
        existsSync(dir) || await mkdirp(dir);
        if (isIndex) ignore.push(`${dir}/index.*`);
        const pkg = path.join(dir, 'package.json');
        const mjsSrc = path.resolve(es, relative);
        await copyFixSourceMap(src, path.join(dir, 'index.js'));
        await copyFixSourceMap(mjsSrc, path.join(dir, 'index.mjs'));
        await writeFile(pkg, `{
  "sideEffects": ${/[\\/]api[\\/]/.test(root)},
  "module": "./index.mjs",
  "main": "./index.js",
  "types": "./index.d.ts",
  "exports": {
    ".": {
      "require": "./index.js",
      "default": "./index.mjs"
    }
  }
}
`);
        break;
      }
      case '.d.ts':
        existsSync(dir) || await mkdirp(dir);
        await copyFile(src, path.join(dir, 'index.d.ts'));
        break;
      case '.js.map': {
        existsSync(dir) || await mkdirp(dir);
        const mjsSrc = path.resolve(es, relative);
        await copyFile(src, path.join(dir, 'index.js.map'));
        await copyFile(mjsSrc, path.join(dir, 'index.mjs.map'));
      }
      default:
        break;
    }
  }
  // console.log({ ignore });
  await replaceInFile({
    files: `${hybrid}/**/*.{mjs,ts}`,
    ignore,
    from: /\b(import\s+.*)'(\.\.\/|\.\/)(.*)';/g,
    to: '$1 \'$2../$3\';',
  });
  await replaceInFile({
    files: `${hybrid}/**/*.js`,
    ignore,
    from: /\b(require\(['"])(\.\/|\.\.\/)(.*['"]\))/g,
    to: '$1$2../$3',
  });
})();
