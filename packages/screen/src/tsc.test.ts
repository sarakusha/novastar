import path from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import ts, { FormatDiagnosticsHost } from 'typescript';

const formatHost: FormatDiagnosticsHost = {
  getCanonicalFileName: p => p,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

function getTSConfig() {
  const configPath = ts.findConfigFile('../', ts.sys.fileExists, 'tsconfig.json');
  if (!configPath) throw new TypeError('Unknown config');
  const readConfigFileResult = ts.readConfigFile(configPath, ts.sys.readFile);
  if (readConfigFileResult.error) {
    throw new Error(ts.formatDiagnostic(readConfigFileResult.error, formatHost));
  }
  const jsonConfig = readConfigFileResult.config;
  const convertResult = ts.convertCompilerOptionsFromJson(jsonConfig.compilerOptions, './');
  if (convertResult.errors && convertResult.errors.length > 0) {
    throw new Error(ts.formatDiagnostics(convertResult.errors, formatHost));
  }
  return convertResult.options;
}

const filename = path.join(__dirname, 'test-ts.ts');
const program = ts.createProgram([filename], getTSConfig());
const typeChecker = program.getTypeChecker();
const source = program.getSourceFile(filename);

describe('test ts', () => {
  test('1', () => {
    source &&
      ts.forEachChild(source, node => {
        if (ts.isTypeAliasDeclaration(node)) {
          // console.log(node);
          const type = typeChecker.getTypeAtLocation(node);
          console.log('type', typeChecker.typeToString(type));
        }
      });
    console.log('Ok');
  });
});
