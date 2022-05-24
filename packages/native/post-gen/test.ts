import path from 'path';

import { replaceInFile } from 'replace-in-file';

const build = path.resolve(__dirname, '../build');
const hybrid = path.join(path.dirname(build), 'lib');

const destDir = path.join(hybrid, 'generated');
replaceInFile({
  files: `${destDir}/**/*.mjs`,
  from: /\b(import\s+.* from\s+)'(\.\.\/|\.\/)(.*)';/g,
  to: "$1 '$2../$3';",
}).then(console.log);
