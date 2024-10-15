import path from 'path';

import ts, {
  factory,
  isPropertyAssignment,
  PropertyAssignment,
  StringLiteral,
  Visitor,
} from 'typescript';

import { getProps, getSuper, isTypeInitializer, makeIsWithDefaultInitializer } from './common';

export type UnionMap = Record<string, string[]>;

const isInitialized = makeIsWithDefaultInitializer(2);

const makeTransformer =
  (
    updateInitializer: (prop: PropertyAssignment) => PropertyAssignment,
    updateBufferInitializer: (prop: PropertyAssignment) => PropertyAssignment,
    unions: UnionMap
  ): ts.TransformerFactory<ts.SourceFile> =>
  context =>
  source => {
    const fileName = path.parse(path.basename(source.fileName)).name;
    const varVisitor = (node: ts.VariableStatement): ts.Node => {
      const { declarationList } = node;
      const {
        declarations: [declaration],
      } = declarationList;
      const { initializer } = declaration;
      if (isTypeInitializer(initializer, ['partial', 'intersection'])) {
        const { text } = initializer.arguments[1] as StringLiteral;
        const props = getProps(initializer).map(prop =>
          isPropertyAssignment(prop) ? updateBufferInitializer(prop) : prop
        );
        if (props.length > 0) {
          const partialProps = props.filter(
            prop => !isPropertyAssignment(prop) || !isInitialized(prop.initializer)
          );
          // console.log(partialProps.map(prop => prop.name.getText(source)).join(','));
          const typeProps = props
            .filter(isPropertyAssignment)
            .filter(prop => isInitialized(prop.initializer));
          if (typeProps.length > 0) {
            // console.log(typeProps.map(prop => prop.name.getText(source)).join(','));
            const newInitializer = factory.createCallExpression(
              factory.createPropertyAccessExpression(factory.createIdentifier('t'), 'intersection'),
              undefined,
              [
                factory.createArrayLiteralExpression(
                  [
                    ...getSuper(initializer),
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(factory.createIdentifier('t'), 'type'),
                      undefined,
                      [
                        factory.createObjectLiteralExpression(
                          typeProps.map(updateInitializer),
                          true
                        ),
                      ]
                    ),
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier('t'),
                        'partial'
                      ),
                      undefined,
                      [factory.createObjectLiteralExpression(partialProps, true)]
                    ),
                  ],
                  true
                ),
                factory.createStringLiteral(text),
              ]
            );
            const newDecl = factory.updateVariableDeclaration(
              declaration,
              declaration.name,
              declaration.exclamationToken,
              declaration.type,
              newInitializer
            );
            return factory.updateVariableStatement(
              node,
              node.modifiers,
              factory.updateVariableDeclarationList(declarationList, [newDecl])
            );
          }
        }
      }
      return node;
    };
    const importVisitor = (node: ts.ImportDeclaration): ts.Node => {
      const { importClause: { namedBindings } = {} } = node;
      if (!namedBindings || !ts.isNamedImports(namedBindings)) return node;
      const [
        {
          name: { escapedText: typeName },
        },
      ] = namedBindings.elements;
      const derivedNames = unions[typeName.toString()];
      if (
        !derivedNames ||
        derivedNames.includes(fileName) ||
        (typeName.toString() === 'ChipBaseExtendPropey' && fileName !== 'ScanBoardProperty')
      )
        return node;
      return factory.updateImportDeclaration(
        node,
        // node.decorators,
        node.modifiers,
        node.importClause,
        factory.createStringLiteral('./unions'),
        node.assertClause
      );
    };

    const rootVisitor = (node: ts.Node): ts.Node => {
      if (ts.isVariableStatement(node)) {
        return ts.visitNode(node, varVisitor as Visitor)!;
      }
      if (ts.isImportDeclaration(node)) return ts.visitNode(node, importVisitor as Visitor)!;
      return ts.visitEachChild(node, rootVisitor, context);
    };

    return ts.visitNode(source, rootVisitor) as ts.SourceFile;
  };

export default makeTransformer;
