import fs from 'fs';

import prettier, { Options } from 'prettier';
import ts, {
  CallExpression,
  Expression,
  FormatDiagnosticsHost,
  isArrayLiteralExpression,
  isCallExpression,
  isIdentifier,
  isLiteralExpression,
  isNewExpression,
  isObjectLiteralExpression,
  isPropertyAccessExpression,
  isPropertyAssignment,
  isShorthandPropertyAssignment,
  NewExpression,
  Node,
  PropertyAssignment,
  ShorthandPropertyAssignment,
  SourceFile,
  Statement,
  SyntaxKind,
} from 'typescript';

const extractValue = (value: Expression): string => {
  if (value.kind === SyntaxKind.FalseKeyword) return 'false';
  if (value.kind === SyntaxKind.TrueKeyword) return 'true';
  if (!isLiteralExpression(value)) {
    // console.log(JSON.stringify(value));
    // console.log(SyntaxKind[value.kind]);
    // console.log(SyntaxKind[(value as any).operator]);
    throw new TypeError('Unknown value');
  }
  return value.text || 'empty';
};

export const withDefaultKey = (type: Expression, value: Expression): string | undefined =>
  isPropertyAccessExpression(type) /* || isIdentifier(type) */ &&
  (value.kind === SyntaxKind.FalseKeyword ||
    value.kind === SyntaxKind.TrueKeyword ||
    isLiteralExpression(value))
    ? `${/* isIdentifier(type) ? type.escapedText : */ type.name.escapedText}_${extractValue(
        value
      ).replace(/[^A-Za-z0-9_]/g, '')}`
    : undefined;

export const bufferKey = (size: Expression | undefined): string | undefined =>
  size &&
  (isPropertyAccessExpression(size)
    ? `buffer_${size.name.escapedText}`
    : isLiteralExpression(size)
    ? `buffer_${size.text.replace(/[^A-Za-z0-9)]/g, '')}`
    : undefined);

export const isTypeInitializer = (
  initializer: Expression | undefined,
  names = ['partial'] // |'type' | 'intersection']
): initializer is CallExpression =>
  initializer !== undefined &&
  isCallExpression(initializer) &&
  isPropertyAccessExpression(initializer.expression) &&
  names.includes(initializer.expression.name.escapedText.toString()) &&
  isIdentifier(initializer.expression.expression) &&
  initializer.expression.expression.escapedText === 't';

const isProperty = (node: Node): node is PropertyAssignment | ShorthandPropertyAssignment =>
  isPropertyAssignment(node) || isShorthandPropertyAssignment(node);

export const getSuper = (initializer: CallExpression): Expression[] => {
  const [arg] = initializer.arguments;
  return isArrayLiteralExpression(arg)
    ? arg.elements.filter(element => !isTypeInitializer(element, ['partial', 'type']))
    : [];
};

export const getProps = (
  initializer: CallExpression
): (PropertyAssignment | ShorthandPropertyAssignment)[] => {
  const [arg] = initializer.arguments;
  return isObjectLiteralExpression(arg)
    ? arg.properties.filter(isProperty)
    : isArrayLiteralExpression(arg)
    ? arg.elements.filter(isCallExpression).flatMap(getProps)
    : [];
};

export const makeIsWithDefaultInitializer =
  (length: 1 | 2) =>
  (initializer: Expression | undefined): initializer is CallExpression =>
    initializer !== undefined &&
    isCallExpression(initializer) &&
    isPropertyAccessExpression(initializer.expression) &&
    ['withDefault', 'XMLArray']
      .slice(0, length)
      .includes(initializer.expression.name.escapedText.toString()) &&
    isIdentifier(initializer.expression.expression) &&
    initializer.expression.expression.escapedText === 'common';

export const isBufferInitializer = (
  initializer: Expression | undefined
): initializer is NewExpression =>
  initializer !== undefined &&
  isNewExpression(initializer) &&
  isPropertyAccessExpression(initializer.expression) &&
  initializer.expression.name.escapedText === 'BufferFromBase64';

export const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

const formatHost: FormatDiagnosticsHost = {
  getCanonicalFileName: p => p,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

export function getTSConfig() {
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

let prettierOpts: Options | undefined;

export const getPrettierOptions = (): Promise<Options | undefined> => {
  if (prettierOpts) return Promise.resolve(prettierOpts);
  return prettier.resolveConfig(process.cwd()).then(opts => {
    if (opts) {
      prettierOpts = opts;
      prettierOpts.parser = 'typescript';
    }
    return prettierOpts;
  });
};

if (!prettierOpts) getPrettierOptions().then();

export const makeValidSourceFile = (filename: string, statements: Statement[]) => {
  const text = printer.printFile(
    ts.factory.createSourceFile(
      statements,
      ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
      ts.NodeFlags.None
    )
  );
  return ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
};
export const makeImport = (
  src: string,
  identifier?: string,
  ...namedImports: string[]
): ts.ImportDeclaration => {
  const namedBindings =
    namedImports.length > 0
      ? ts.factory.createNamedImports(
          namedImports.map(name =>
            ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(name))
          )
        )
      : undefined;
  const name = identifier?.length ? ts.factory.createIdentifier(identifier) : undefined;
  const ic = ts.factory.createImportClause(false, name, namedBindings);
  const ms = ts.factory.createStringLiteral(src, true);
  return ts.factory.createImportDeclaration(undefined, ic, ms);
};

export const saveSourceFile = (source: SourceFile): void => {
  // console.info(`${source.fileName}...`);
  const src = printer.printFile(source);
  getPrettierOptions().then(async opts => {
    fs.writeFileSync(source.fileName, await prettier.format(src, opts));
  });
};
