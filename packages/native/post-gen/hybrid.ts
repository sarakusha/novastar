import { existsSync } from 'fs';
import { copyFile, mkdir, readdir, rm, writeFile } from 'fs/promises';
import path from 'path';

import mkdirp from 'mkdirp';
import { replaceInFile } from 'replace-in-file';

const build = path.resolve(__dirname, '../build');
const hybrid = path.join(path.dirname(build), 'lib');
const main = path.join(build, 'main');
const es = path.join(build, 'module');

async function* getFiles(dir: string): AsyncGenerator<string> {
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

(async () => {
  if (existsSync(hybrid)) {
    await rm(hybrid, {
      recursive: true,
      force: true,
    });
  }
  await mkdir(hybrid);
  await Promise.all(
    ['generated', 'common'].map(async subdir => {
      const destDir = path.join(hybrid, subdir);
      const mainSrc = path.join(main, subdir);
      const moduleSrc = path.join(es, subdir);
      await mkdir(destDir);
      for await (const src of getFiles(mainSrc)) {
        const relative = path.relative(mainSrc, src);
        const name = path.basename(src).replace(/\..+$/, '');
        const root =
          name.toLowerCase() === 'index' ? path.dirname(relative) : relative.replace(/\..+$/, '');
        // const dest = path.resolve(destDir, root, path.basename(src));
        const mjsSrc = path.resolve(moduleSrc, relative);
        // const mjs = `${dest.substring(0, dest.lastIndexOf('.'))}.mjs`;
        const dir = path.join(destDir, root);
        if (!existsSync(dir)) {
          await mkdirp(dir);
        }
        const pkg = path.join(dir, 'package.json');
        // console.log({
        //   src,
        //   dir,
        //   mjsSrc,
        //   pkg,
        // });
        switch (path.extname(src).toLowerCase()) {
          case '.js':
            await copyFile(src, path.join(dir, 'index.js'));
            await copyFile(mjsSrc, path.join(dir, 'index.mjs'));
            await writeFile(
              pkg,
              `{
  "sideEffects": false,
  "module": "./index.mjs",
  "main": "./index.js",
  "types": "./index.d.ts"
}
`
            );
            break;
          case '.ts':
            await copyFile(src, path.join(dir, 'index.d.ts'));
            break;
          default:
            break;
        }
      }
    })
  );
  await Promise.all(['common', 'generated'].map(async subdir => {
    const destDir = path.join(hybrid, subdir);
    await replaceInFile({
      files: `${destDir}/**/*.{mjs,ts}`,
      ignore: `**/${subdir}/index.*`,
      from: /\b(import\s+.* from\s+)'(\.\.\/|\.\/)(.*)';/g,
      to: "$1 '$2../$3';",
    });
    await replaceInFile({
      files: `${destDir}/**/*.js`,
      ignore: `**/${subdir}/index.js`,
      from: /\b(require\(['"])(\.\/|\.\.\/)(.*['"]\))/g,
      to: '$1$2../$3',
    });
  }));
})();
