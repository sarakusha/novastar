import fs from 'fs';
import os from 'os';
import path from 'path';

import { notEmpty } from '@novastar/codec';
import ts, { factory } from 'typescript';

import { getTSConfig, makeImport, printer, saveSourceFile } from './common';

const root = path.resolve(__dirname, '../generated/api');
const indexFile = fs.createWriteStream(path.join(root, 'index.ts'));

const FalseToken = ts.factory.createToken(ts.SyntaxKind.FalseKeyword);

const makeModuleDeclaration = (name: string, body: ts.ModuleBlock): ts.ModuleDeclaration => {
  const mn = ts.factory.createStringLiteral(name, true);
  return ts.factory.createModuleDeclaration(
    undefined,
    [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
    mn,
    body,
  );
};

const makeInterface = (name: string, members: ts.MethodSignature[]): ts.InterfaceDeclaration =>
  ts.factory.createInterfaceDeclaration(undefined, undefined, name, undefined, undefined, members);

const makeMethodSignature = (
  name: string,
  param: ts.NodeArray<ts.ParameterDeclaration>,
  type: ts.TypeReferenceNode,
): ts.MethodSignature =>
  ts.factory.createMethodSignature(undefined, name, undefined, undefined, param, type);

const thisSession = ts.factory.createParameterDeclaration(
  undefined,
  undefined,
  undefined,
  'this',
  undefined,
  ts.factory.createTypeReferenceNode('Session'),
);

const tryReadType = ts.factory.createTypeReferenceNode('Promise', [
  ts.factory.createUnionTypeNode([
    ts.factory.createTypeReferenceNode('Packet'),
    ts.factory.createLiteralTypeNode(ts.factory.createNull()),
  ]),
]);

const tryWriteType = ts.factory.createTypeReferenceNode('Promise', [
  // ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
  ts.factory.createUnionTypeNode([
    ts.factory.createTypeReferenceNode('ErrorType'),
    ts.factory.createLiteralTypeNode(ts.factory.createNull()),
  ]),
]);
const broadcastTypeParam = ts.factory.createTypeParameterDeclaration(
  'Broadcast',
  ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
);

const broadcastType = ts.factory.createTypeReferenceNode('Broadcast');

const requestType = ts.factory.createTypeReferenceNode('Request');

const reqBroadcastType = ts.factory.createTypeReferenceNode('Request', [broadcastType]);

const reqTrueType = ts.factory.createTypeReferenceNode('Request', [
  ts.factory.createLiteralTypeNode(ts.factory.createTrue()),
]);

const returnRequest = ts.factory.createReturnStatement(ts.factory.createIdentifier('req'));

const returnTrySendReading = ts.factory.createReturnStatement(
  ts.factory.createCallExpression(
    ts.factory.createPropertyAccessExpression(
      ts.factory.createPropertyAccessExpression(
        ts.factory.createToken(ts.SyntaxKind.ThisKeyword),
        'connection',
      ),
      'trySend',
    ),
    undefined,
    [ts.factory.createIdentifier('req')],
  ),
);

/*
const returnTrySendWriting = ts.factory.createReturnStatement(
  ts.factory.createBinaryExpression(
    ts.factory.createParenthesizedExpression(
      ts.factory.createAwaitExpression(
        ts.factory.createCallExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createPropertyAccessExpression(
              ts.factory.createToken(ts.SyntaxKind.ThisKeyword),
              'connection',
            ),
            'trySend',
          ),
          undefined,
          [ts.factory.createIdentifier('req')],
        ),
      ),
    ),
    ts.factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
    ts.factory.createNull(),
  ),
);
*/

const returnTrySendWriting = factory.createReturnStatement(
  factory.createBinaryExpression(
    factory.createPropertyAccessChain(
      factory.createParenthesizedExpression(factory.createAwaitExpression(factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createPropertyAccessExpression(
            factory.createThis(),
            factory.createIdentifier('connection'),
          ),
          factory.createIdentifier('trySend'),
        ),
        undefined,
        [factory.createIdentifier('req')],
      ))),
      factory.createToken(ts.SyntaxKind.QuestionDotToken),
      factory.createIdentifier('ack'),
    ),
    factory.createToken(ts.SyntaxKind.QuestionQuestionToken),
    factory.createNull(),
  ));

const makeDefaultFunctionDeclaration = (
  name: string,
  params: ts.NodeArray<ts.ParameterDeclaration>,
  statements: ts.Statement[],
  broadcast: boolean | string,
): [ts.FunctionDeclaration, string] => {
  const createName = `create${name}`;
  return [
    ts.factory.createFunctionDeclaration(
      undefined,
      [
        ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
        ts.factory.createModifier(ts.SyntaxKind.DefaultKeyword),
      ],
      undefined,
      createName,
      typeof broadcast === 'string' ? [broadcastTypeParam] : undefined,
      params.map(param =>
        ts.isIdentifier(param.name) && param.name.escapedText === broadcast
          ? {
            ...param,
            type: broadcastType,
          }
          : param,
      ),
      typeof broadcast === 'string' ? reqBroadcastType : broadcast ? reqTrueType : requestType,
      ts.factory.createBlock([...statements, returnRequest]),
    ),
    createName,
  ];
};

const extendPrototype = (
  name: string,
  parameters: ts.NodeArray<ts.ParameterDeclaration>,
  type: ts.TypeReferenceNode,
  statements: ts.Statement[],
) => {
  // const {
  //   parameters,
  //   type,
  // } = node;
  const params = [thisSession, ...parameters];
  return ts.factory.createExpressionStatement(
    ts.factory.createAssignment(
      ts.factory.createPropertyAccessChain(
        ts.factory.createPropertyAccessChain(
          ts.factory.createIdentifier('Session'),
          undefined,
          'prototype',
        ),
        undefined,
        name,
      ),
      ts.factory.createFunctionExpression(
        [ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
        undefined,
        name,
        undefined,
        params,
        type,
        ts.factory.createBlock(statements),
      ),
    ),
  );
};

const sessionPath = path.resolve(__dirname, '../generated/Session.ts');
const program = ts.createProgram([sessionPath], getTSConfig());
const source = program.getSourceFile(sessionPath);

const isUpperCase = (ch: string) => ch[0].toUpperCase() === ch[0];

// looks like a hack
const makeValidSourceFile = (filename: string, statements: ts.Statement[]) => {
  const text = printer.printFile(
    ts.factory.createSourceFile(
      statements,
      ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
      ts.NodeFlags.None,
    ),
  );
  return ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
};

const nodeText = (node: ts.Node) =>
  printer.printNode(
    ts.EmitHint.Unspecified,
    node,
    ts.createSourceFile('node', '', ts.ScriptTarget.Latest),
  );

const unique = <T>(item: T, index: number, array: T[]) => array.indexOf(item) === index;

const extendSession = (node: ts.MethodDeclaration): void => {
  const {
    parameters,
    type,
    body,
  } = node;
  if (!ts.isIdentifier(node.name) || !body || !type || !ts.isTypeReferenceNode(type))
    throw new TypeError('Invalid method');
  const name = node.name.text;
  const methods: ts.MethodSignature[] = [];
  const isReading = type.typeArguments?.[0].kind !== ts.SyntaxKind.VoidKeyword;
  // type && type.typeArguments?.[0].kind !== ts.SyntaxKind.VoidKeyword ? `try${name}` : false;
  let broadcast: string | boolean = !isReading;
  if (broadcast) {
    [broadcast] = body.statements
      .filter(ts.isVariableStatement)
      .map(st => st.declarationList.declarations[0].initializer)
      .filter(notEmpty)
      .filter(ts.isNewExpression)
      .filter(
        initializer =>
          ts.isIdentifier(initializer.expression) &&
          initializer.expression.escapedText === 'Request',
      )
      .map(initializer => initializer.arguments)
      .filter(notEmpty)
      .filter(({ length }) => length === 3)
      .map(args => args[1])
      .map(arg => {
        switch (arg.kind) {
          case ts.SyntaxKind.TrueKeyword:
            return true;
          case ts.SyntaxKind.FalseKeyword:
            return false;
          default:
            if (ts.isIdentifier(arg)) return arg.escapedText.toString();
            throw new TypeError('Invalid broadcast');
        }
      });
  }
  const packetImport = isReading ? ['Packet'] : ['ErrorType'];
  const srcName = path.join(root, `${name}.ts`);
  indexFile.write(`export { default as create${name} } from './${name}';${os.EOL}`);
  const methodSignature = makeMethodSignature(name, parameters, type);
  methods.push(methodSignature);
  const tryParams =
    isReading || !broadcast
      ? parameters
      : ts.factory.createNodeArray(
        parameters.filter(
          param => !ts.isIdentifier(param.name) || param.name.escapedText !== broadcast,
        ),
      );
  const tryName = broadcast !== true && `try${name}`;
  if (tryName)
    methods.push(makeMethodSignature(tryName, tryParams, isReading ? tryReadType : tryWriteType));
  const enumImports = [...nodeText(methodSignature).matchAll(/:\s*(\w+)Enum[^\w\d]/g)]
    .map(item => item[1])
    .filter(item => !!item)
    .filter(unique)
    .sort();
  const bodyText = nodeText(body);
  const imports = bodyText.match(/(decodeUIntLE)|(encodeUIntLE)/g);
  const makeBytes = bodyText.indexOf('makeOutDeviceBytes') !== -1;
  const commonImports = makeBytes
    ? [makeImport('../../lib/common/makeOutDeviceBytes', 'makeOutDeviceBytes')]
    : [];
  const constants = bodyText.match(/(AddressMapping)|(MaxValueInfo)/g);
  const constantImports = constants
    ? constants.filter(unique).map(typeName => makeImport(`../${typeName}`, typeName))
    : [];
  const bodyStatements = [...body.statements];
  const [last] = bodyStatements.splice(-1);
  const [createRequest, createName] = makeDefaultFunctionDeclaration(
    name,
    parameters,
    bodyStatements,
    broadcast,
  );
  const createReqVariableStatement = (broadcastName: boolean | string) =>
    ts.factory.createVariableStatement(
      undefined,
      ts.factory.createVariableDeclarationList(
        [
          ts.factory.createVariableDeclaration(
            'req',
            undefined,
            undefined,
            ts.factory.createCallExpression(
              ts.factory.createIdentifier(createName),
              undefined,
              parameters
                .map(param => param.name)
                .filter(ts.isIdentifier)
                .map(paramName =>
                  broadcastName && paramName.escapedText === broadcastName ? FalseToken : paramName,
                ),
            ),
          ),
        ],
        ts.NodeFlags.Const,
      ),
    );
  const methodPrototypeExtends = [
    extendPrototype(name, parameters, type, [createReqVariableStatement(false), last]),
  ];
  if (tryName) {
    methodPrototypeExtends.push(
      extendPrototype(tryName, tryParams, isReading ? tryReadType : tryWriteType, [
        createReqVariableStatement(broadcast),
        isReading ? returnTrySendReading : returnTrySendWriting,
      ]),
    );
  }
  const statements = [
    makeImport(
      '@novastar/codec',
      undefined,
      ...packetImport,
      'Request',
      'Session',
      ...(imports?.filter(unique) ?? []),
    ),
    ...constantImports,
    ...enumImports.map(src => makeImport(`../${src}`, undefined, `${src}Enum`)),
    ...commonImports,
    makeModuleDeclaration(
      '@novastar/codec',
      ts.factory.createModuleBlock([makeInterface('API', methods)]),
    ),
    createRequest,
    ...methodPrototypeExtends,
  ];
  // ts.addSyntheticLeadingComment(
  //   statements[0],
  //   ts.SyntaxKind.MultiLineCommentTrivia,
  //   ' eslint-disable camelcase,no-bitwise,no-nested-ternary ',
  //   true
  // );
  const src = makeValidSourceFile(srcName, statements);
  saveSourceFile(src);
  // fs.writeFileSync(srcName, prettier.format(printer.printFile(src), prettierOpts));
  // console.log(srcName);
};

if (!fs.existsSync(root)) fs.mkdirSync(root);

const visit = (node: ts.Node): void => {
  if (ts.isClassDeclaration(node)) {
    ts.forEachChild(node, visit);
  }
  if (ts.isMethodDeclaration(node) && ts.isIdentifier(node.name) && isUpperCase(node.name.text)) {
    extendSession(node);
  }
};

source && ts.forEachChild(source, visit);
