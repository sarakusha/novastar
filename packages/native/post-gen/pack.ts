import fs from 'fs';
import path from 'path';

import { notEmpty } from '@novastar/codec';
import ts, {
  factory,
  isIdentifier,
  isPropertyAccessExpression,
  isPropertyAssignment,
  isVariableStatement,
  NodeFlags,
  PropertyAssignment,
  Statement,
  SyntaxKind,
} from 'typescript';

import {
  bufferKey,
  getProps,
  getTSConfig,
  isBufferInitializer,
  isTypeInitializer,
  makeImport,
  makeIsWithDefaultInitializer,
  makeValidSourceFile,
  saveSourceFile,
  withDefaultKey,
} from './common';
import makeTransformer, { UnionMap } from './transformer';

const hasExportKeyword = (st: Statement): boolean =>
  Boolean(st.modifiers?.findIndex(mod => mod.kind === SyntaxKind.ExportKeyword) !== -1);

const isWithDefaultInitializer = makeIsWithDefaultInitializer(1);

const dir = path.resolve(__dirname, '../generated');
const files = fs
  .readdirSync(dir)
  .filter(filename => filename !== 'Session.ts')
  .map(filename => path.join(dir, filename))
  .filter(pathname => fs.statSync(pathname).isFile());

const withDefaults: Record<string, number> = {};
const buffers: Record<string, number> = {};
const config = getTSConfig();

const program = ts.createProgram(files, config);

const parseUnions = (): UnionMap => {
  const pathname = path.join(dir, 'unions.ts');
  const source = program.getSourceFile(pathname);
  if (!source) throw new TypeError(`File not found: ${pathname}`);
  const stats = source.statements
    .filter(ts.isVariableStatement)
    .filter(stat => stat.modifiers?.find(mod => mod.kind === SyntaxKind.ExportKeyword));
  return Object.fromEntries(
    stats
      .map(stat => {
        const {
          declarationList: {
            declarations: [decl],
          },
        } = stat;
        const { initializer, name } = decl;
        if (!initializer || !ts.isIdentifier(name) || !ts.isCallExpression(initializer))
          return undefined;
        const {
          expression,
          arguments: [arr],
        } = initializer;
        if (
          !ts.isPropertyAccessExpression(expression) ||
          expression.name.escapedText !== 'union' ||
          !ts.isArrayLiteralExpression(arr)
        )
          return undefined;
        const baseTypeName = name.escapedText.toString();
        const derivedNames = arr.elements
          .filter(ts.isIdentifier)
          .map(({ escapedText }) => escapedText.toString());
        return [baseTypeName, derivedNames];
      })
      .filter(notEmpty)
  );
};

function countWithDefaults(initializers: ts.Expression[]): void {
  initializers
    .filter(isWithDefaultInitializer)
    .map(call => call.arguments)
    .forEach(args => {
      const [a, b] = args;
      const key = withDefaultKey(a, b);
      if (key !== undefined) withDefaults[key] = (withDefaults[key] ?? 0) + 1;
    });
}

function countBuffers(initializers: ts.Expression[]): void {
  initializers
    .filter(isBufferInitializer)
    .map(exp => exp.arguments)
    .filter(notEmpty)
    .map(args => args[1])
    .filter(notEmpty)
    .forEach(size => {
      const key = bufferKey(size);
      if (!key) throw new TypeError('Unknown buffer property initializer');
      buffers[key] = (buffers[key] ?? 0) + 1;
    });
}

files.forEach(sourcePath => {
  const source = program.getSourceFile(sourcePath);
  const sts = source?.statements.filter(isVariableStatement).filter(hasExportKeyword);

  sts?.forEach(st => {
    const {
      declarationList: {
        declarations: [declaration],
      },
    } = st;
    const { initializer } = declaration;
    if (isTypeInitializer(initializer, ['partial', 'type', 'intersection'])) {
      const props = getProps(initializer);
      const inits = props.map(prop => (isPropertyAssignment(prop) ? prop.initializer : prop.name));
      countWithDefaults(inits);
      countBuffers(inits);
    }
  });
});

// const filterCounter = (counter: Record<string, number>, max: number): Record<string, number> =>
//   Object.fromEntries(Object.entries(counter).filter(([_, value]) => value > max));
//
// console.log('withDefault', filterCounter(withDefaults, 1));
// console.log('buffers', filterCounter(buffers, 1));

const typesStatements: Record<string, Statement> = {};

const integerImports = new Set<string>();

function createExportStatement(key: string, a: ts.Expression, b?: ts.Expression) {
  let expression: ts.Expression | undefined;
  if (b !== undefined) {
    let aa: ts.Expression = a;
    if (
      isPropertyAccessExpression(a) &&
      isIdentifier(a.expression) &&
      a.expression.escapedText === 'common'
    ) {
      aa = a.name;
      integerImports.add(a.name.escapedText.toString());
    }
    expression = factory.createCallExpression(factory.createIdentifier('withDefault'), undefined, [
      aa,
      b,
    ]);
  } else {
    expression = factory.createNewExpression(
      factory.createIdentifier('BufferFromBase64'),
      undefined,
      [factory.createStringLiteral(key, true), a]
    );
  }
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(key, undefined, undefined, expression)],
      NodeFlags.Const
    )
  );
}

const updateWithDefault = (prop: PropertyAssignment): PropertyAssignment => {
  if (isWithDefaultInitializer(prop.initializer)) {
    const [a, b] = prop.initializer.arguments;
    const key = withDefaultKey(a, b);
    if (key !== undefined && withDefaults[key] > 1) {
      if (!typesStatements[key]) {
        typesStatements[key] = createExportStatement(key, a, b);
      }
      return factory.updatePropertyAssignment(
        prop,
        prop.name,
        factory.createPropertyAccessExpression(factory.createIdentifier('common'), key)
      );
    }
  }
  return prop;
};

const updateBufferInitializer = (prop: PropertyAssignment): PropertyAssignment => {
  if (isBufferInitializer(prop.initializer)) {
    const arg = prop.initializer.arguments?.[1];
    const key = bufferKey(arg);
    if (arg && key && buffers[key] > 1) {
      if (!typesStatements[key]) {
        typesStatements[key] = createExportStatement(key, arg);
      }
      return factory.updatePropertyAssignment(
        prop,
        prop.name,
        factory.createPropertyAccessExpression(factory.createIdentifier('common'), key)
      );
    }
  }
  return prop;
};

const unions: UnionMap = parseUnions();

files
  .filter(
    filename =>
      !['AddressMapping.ts', 'unions.ts', 'SingleRefreshRateParam.ts'].includes(
        path.basename(filename)
      )
  )
  .forEach(sourceName => {
    const source = program.getSourceFile(sourceName);
    if (source) {
      const transformer = makeTransformer(updateWithDefault, updateBufferInitializer, unions);
      const result = ts.transform(source, [transformer], config);
      // eslint-disable-next-line no-console
      if (result.diagnostics?.length) console.error(result.diagnostics);
      else {
        result.transformed.forEach(transformed => {
          saveSourceFile(transformed);
        });
      }
    }
  });

// console.log(Object.keys(typesStatements));
const stats = Object.values(typesStatements);
stats.unshift(
  factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamespaceImport(factory.createIdentifier('t'))
    ),
    factory.createStringLiteral('io-ts', true)
  ),
  makeImport('../generated/MaxValue', 'MaxValue'),
  makeImport(
    './integers',
    undefined,
    ...['withDefault', 'BufferFromBase64', ...integerImports].sort()
  )
);

stats.length &&
  ts.addSyntheticLeadingComment(
    stats[0],
    ts.SyntaxKind.MultiLineCommentTrivia,
    ' Automatically generated ',
    true
  );

const typesPath = path.resolve(__dirname, '../common/types.ts');
const types = makeValidSourceFile(typesPath, stats);
saveSourceFile(types);
