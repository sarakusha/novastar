using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using static System.Console;


namespace gen
{
    internal static class Program
    {
        private static readonly Func<string, string> Common = path => $"common.{path}";

        private static ICollection<(string line, string comment)> GetLocationComment(string outDir,
            FileLinePositionSpan lineSpan, params string[] comments)
        {
            var list = new List<(string line, string comment)>
            {
                ("/**", null),
            };
            list.AddRange(comments.Select(comment => ($" * {comment}", (string)null)));
            list.Add(
                ($" * @see Automatically generated from {Path.GetRelativePath(outDir, lineSpan.Path)}:{lineSpan.StartLinePosition.Line}",
                    null));

            list.Add((" */\n", null));
            return list;
        }

        private static string GetName(MemberDeclarationSyntax member) =>
            member switch
            {
                FieldDeclarationSyntax field => field.Declaration.Variables.First().Identifier.ValueText,
                PropertyDeclarationSyntax props => props.Identifier.ValueText,
                _ => throw new ArgumentException("Invalid Type")
            };

        private static TypeSyntax GetType(MemberDeclarationSyntax member) =>
            member switch
            {
                FieldDeclarationSyntax field => field.Declaration.Type,
                PropertyDeclarationSyntax prop => prop.Type,
                _ => throw new ArgumentException("Invalid Type")
            };

        private static IEnumerable<TypeSyntax> GetDeepTypes(MemberDeclarationSyntax member)
        {
            var type = GetType(member);
            return type.Kind() switch
            {
                SyntaxKind.ArrayType => new[] { (type as ArrayTypeSyntax)?.ElementType },
                SyntaxKind.GenericName =>
                    ((GenericNameSyntax)type).TypeArgumentList.Arguments,
                _ => new[] { type },
            };
        }

        private static EqualsValueClauseSyntax GetInitializer(MemberDeclarationSyntax member) =>
            member switch
            {
                FieldDeclarationSyntax field => field.Declaration.Variables.First().Initializer,
                PropertyDeclarationSyntax props => props.Initializer,
                _ => throw new ArgumentException("Invalid Type")
            };

        private static string GetDefaultValue(string value, string typeName)
        {
            return value switch
            {
                "string.Empty" => "''",
                "byte.MaxValue" => "255",
                "ushort.MaxValue" => "65535",
                _ => typeName switch
                {
                    "float" => value.Replace("f", ""),
                    "uint" => value.Replace("u", ""),
                    _ => value.StartsWith($"{typeName}.") ? $"'{value.Replace($"{typeName}.", "")}'" : value,
                }
            };
        }

        private static string GetBrandedType(string typeName)
        {
            return typeName switch
            {
                "int" => Common("Int32"),
                "uint" => Common("UInt32"),
                "byte" => Common("UInt8"),
                "ushort" => Common("UInt16"),
                "short" => Common("Int16"),
                "float" => Common("Numeric"),
                "double" => Common("Numeric"),
                "ulong" => Common("UInt64"),
                "bool" => Common("Bool"),
                _ => null,
            };
        }

        private static string GetMixedType(string typeName)
        {
            return GetBrandedType(typeName) ?? typeName switch
            {
                // "float" => "t.number",
                // "double" => "t.number",
                "string" => "t.string",
                // "bool" => "t.boolean",
                "DateTime" => "DateFromISOString",
                "object" => "t.UnknownRecord",
                "Color" => "t.string",
                "DayOfWeek" => "t.string",
                "Point" => Common("PointFromString"),
                _ => typeName
            };
        }

        private static string GetTypeName(TypeSyntax type)
        {
            return type.Kind() switch
            {
                SyntaxKind.PredefinedType => (type as PredefinedTypeSyntax)?.Keyword.ValueText,
                SyntaxKind.ArrayType => GetTypeName((type as ArrayTypeSyntax)?.ElementType),
                SyntaxKind.IdentifierName => (type as IdentifierNameSyntax)?.Identifier.ValueText,
                SyntaxKind.GenericName =>
                    GetTypeName(((GenericNameSyntax)type).TypeArgumentList.Arguments.First()),
                _ => $"Unknown ({type.Kind()})"
            };
        }

        private static ICollection<string> AlignComments(ICollection<(string code, string comment)> lines)
        {
            var list = new List<string>();
            var maxLength = lines.Where(line => line.comment != null)
                .DefaultIfEmpty()
                .Max(line => line.code?.Length);
            foreach (var (code, comment) in lines)
            {
                list.Add(comment is { Length: > 0 }
                    ? string.Format($"{{0, -{maxLength}}}    {{1}}", code, $"// {comment}")
                    : code);
            }

            return list;
        }

        private static string Hex(int value)
        {
            var hex = $"{value:X}";
            var split = hex.Length - 4;
            if (split > 0) hex = $"{hex[..split]}_{hex[split..]}";
            return $"0x{hex}";
        }

        private static Dictionary<string, int> GenConstEnum(string outDir, TypeDeclarationSyntax node,
            Boolean removeConstMod = false)
        {
            var query = from member in node.Members
                where IsPublic(member.Modifiers) && (IsStatic(member.Modifiers) || IsConst(member.Modifiers)) &&
                      member.Kind() == SyntaxKind.FieldDeclaration
                let field = (FieldDeclarationSyntax)member
                where field.Declaration.Type.Kind() == SyntaxKind.PredefinedType
                let type = (PredefinedTypeSyntax)field.Declaration.Type
                where type.Keyword.ValueText is "uint" or "int" or "byte" or "ushort" or "short" or "sbyte"
                select field;
            var staticFields = query.ToArray();
            if (staticFields.Length == 0) return null;

            var dict = new Dictionary<string, int>();
            var name = node.Identifier.ValueText;
            var lines = new List<(string line, string comment)>(GetLocationComment(outDir,
                    node.GetLocation().GetLineSpan()))
                { ($"{(removeConstMod ? string.Empty : "const ")}enum {name} {{", null) };

            foreach (var member in staticFields)
            {
                var initializer = GetInitializer(member);
                var expr = initializer.Kind() switch
                {
                    SyntaxKind.CastExpression => ((CastExpressionSyntax)initializer.Value).Expression,
                    _ => initializer.Value
                };
                var memberName = GetName(member);
                var value = GetDefaultValue(expr.ToString(), GetTypeName(GetType(member)));
                string comment = string.Empty;
                if (int.TryParse(value, out var intValue))
                {
                    if (intValue > 9) comment = Hex(intValue);
                    dict.Add($"{name}.{memberName}", intValue);
                }

                lines.Add(($"  {memberName} = {value},", comment));
            }

            lines.Add(("}\n", null));
            lines.Add(($"export default {name};\n", null));
            using StreamWriter file = new(Path.Join(outDir, $"{name}.ts"));
            foreach (var line in AlignComments(lines))
            {
                file.WriteLine(line);
            }

            return dict;
        }

        private static void GenEnum(string outDir, EnumDeclarationSyntax node)
        {
            if (!node.Members.Any()) return;

            var name = node.Identifier.ValueText;
            var lines = new List<(string line, string comment)>
            {
                ("import * as common from '../common';\n", null),
                ("/** @category Enums */", null),
                ($"export enum {name}Enum {{", null)
            };
            foreach (var member in node.Members)
            {
                var memberName = member.Identifier.ValueText;
                var eqValue = member.EqualsValue?.Value;
                var comment = string.Empty;
                if (eqValue != null)
                {
                    if (eqValue.Kind() == SyntaxKind.NumericLiteralExpression)
                    {
                        var value = int.Parse(((LiteralExpressionSyntax)eqValue).Token.ValueText);
                        if (value > 9) comment = Hex(value);
                        lines.Add(($"  {memberName} = {value},", comment));
                    }
                    else
                    {
                        lines.Add(($"  {memberName} {member.EqualsValue},", comment));
                    }
                }
                else
                {
                    lines.Add(($"  {memberName},", comment));
                }
            }

            lines.Add(("}\n", null));
            lines.AddRange(GetLocationComment(outDir,
                node.GetLocation().GetLineSpan(), "@category Codecs", $"@desc Codec for {{@link {name}Enum}}"));
            lines.Add(($"export const {name} = {Common("EnumFromString")}({name}Enum, '{name}');\n", null));
            // lines.Add(($"export type {name} = typeof {name}Enum;\n", null));
            using StreamWriter file = new(Path.Join(outDir, $"{name}.ts"));
            // WriteLine($"GenEnum {name}");
            foreach (var line in AlignComments(lines))
            {
                file.WriteLine(line);
            }
        }

        private static int FindCloseParentheses(string value)
        {
            if (value[0] == '(')
            {
                var count = 1;
                for (int i = 1; i < value.Length; i++)
                {
                    switch (value[i])
                    {
                        case '(':
                            count++;
                            break;
                        case ')':
                            if (--count == 0)
                            {
                                return i;
                            }

                            break;
                    }
                }
            }

            return -1;
        }

        private static string TrimParentheses(string value) =>
            value != null && value.StartsWith('(') && value.EndsWith(')') &&
            FindCloseParentheses(value) == value.Length - 1
                ? value.Substring(1, value.Length - 2)
                : value;

        private static IEnumerable<string> GetImports(BaseTypeDeclarationSyntax node)
        {
            var fieldsCollector = new FieldsCollector(node);
            fieldsCollector.Visit(node);
            return from field in fieldsCollector.Fields
                from type in GetDeepTypes(field)
                where type.Kind() != SyntaxKind.PredefinedType
                let typeName = GetTypeName(type)
                select typeName;
            // return GetBaseTypes(node).Union(filedImports);
        }

        /*
        private static void GetRecursiveImports(ICollection<BaseTypeDeclarationSyntax> types,
            ICollection<BaseTypeDeclarationSyntax> visited)
        {
            var enter = visited.Last();
            var enterImports = from typeName in GetImports(enter).Distinct()
                let node = types.FirstOrDefault(type => type.Identifier.ValueText == typeName)
                where node == null || !visited.Contains(node)
                select (typeName, node);
            foreach (var (typeName, node) in enterImports)
            {
                if (node != null)
                {
                    visited.Add(node);
                    GetRecursiveImports(types, visited);
                }
                else if (typeName != "DateTime") throw new Exception($"Unknown type {typeName}");
            }
        }
        */

        private static string GetBaseTypeT(string baseType, IEnumerable<string> types) =>
            types.Contains(baseType) ? baseType : $"{baseType}Base";

        private static IDictionary<string, string> GetPrivateInitializers(TypeDeclarationSyntax node)
        {
            var result = new Dictionary<string, string>();
            var collector = new PrivateFieldsCollector(node);
            collector.Visit(node);
            foreach (var member in collector.Fields)
            {
                var name = GetName(member);
                var initializer = GetInitializer(member);
                var type = GetType(member);
                var typeName = GetTypeName(type);
                if (initializer != null && initializer.Kind() == SyntaxKind.EqualsValueClause)
                {
                    var value = initializer.Value;
                    switch (value.Kind())
                    {
                        case SyntaxKind.ArrayCreationExpression:
                            break;
                        case SyntaxKind.ObjectCreationExpression:
                            break;
                        case SyntaxKind.CastExpression:
                            var expr = ((CastExpressionSyntax)value).Expression;
                            result.Add(name, GetDefaultValue(expr.ToString(), typeName));
                            break;
                        default:
                            result.Add(name, GetDefaultValue(value.ToString(), typeName));
                            break;
                    }
                }
            }

            return result;
        }

        private static ICollection<string> GenType(string outDir, TypeDeclarationSyntax node,
            ICollection<string> baseClasses, ICollection<string> enums)
        {
            var privateInits = GetPrivateInitializers(node);
            var fieldsCollector = new FieldsCollector(node);
            fieldsCollector.Visit(node);
            // if (fieldsCollector.Fields.Count == 0) return Array.Empty<string>();

            var className = node.Identifier.ValueText;
            var lines = new List<(string line, string comment)> { ("import * as t from 'io-ts';\n", null) };

            var baseTypes = GetBaseTypes(node).Where(baseClasses.Contains).ToArray();
            var imports = GetImports(node).Union(baseTypes)
                .Distinct()
                .OrderBy(i => i, StringComparer.Ordinal)
                .Where(typeName => typeName is not ("Color" or "DayOfWeek" or "Point")).ToArray();
            if (imports.Contains("DateTime"))
            {
                lines.Add(("import { DateFromISOString } from 'io-ts-types';", null));
                imports = imports.Where(typeName => typeName != "DateTime").ToArray();
            }

            lines.Add(($"\nimport * as common from '../common';\n", null));
            lines.AddRange(imports.Select(external =>
                ((string line, string comment))(
                    $"import {{ {(baseTypes.Contains(external) && GetBaseTypeT(external, baseClasses) != external ? $"{GetBaseTypeT(external, baseClasses)}, {external}" : (enums.Contains(external) ? $"{external}, {external}Enum" : external))} }} from './{external}';",
                    null)));
            if (baseTypes.Length > 0)
                lines.Add((
                    $"export const {className}Base = t.intersection([\n  {string.Join(",\n  ", baseTypes.Select(super => GetBaseTypeT(super, baseClasses)))},\n  t.partial({{",
                    null));
            else
            {
                lines.AddRange(GetLocationComment(outDir,
                    node.GetLocation().GetLineSpan(), "@category Codecs",
                    $"@desc Codec for interface {{@link {className}}}"));

                lines.Add(($"export const {className} = t.partial({{", null));
            }

            bool importMaxValue = false;
            var interfaceProps = new List<string>();
            foreach (var member in fieldsCollector.Fields)
            {
                var name = GetName(member);
                if (name.StartsWith('_')) continue;
                var sb = new StringBuilder($"  {name}: ");
                var type = GetType(member);
                var typeName = GetTypeName(type);
                var mixedType = GetMixedType(typeName);
                var initializer = GetInitializer(member);
                var isRequired = initializer != null && initializer.Kind() == SyntaxKind.EqualsValueClause;
                if (isRequired)
                {
                    var value = initializer.Value;
                    switch (value.Kind())
                    {
                        case SyntaxKind.ArrayCreationExpression:
                            var size = ((ArrayCreationExpressionSyntax)value).Type.RankSpecifiers.First().Sizes.First()
                                .ToString();
                            if (size.StartsWith("MaxValue.")) importMaxValue = true;
                            sb.Append(
                                typeName == "byte"
                                    ? $"new {Common("BufferFromBase64")}('{name}', {size}),"
                                    : $"{Common("XMLArray")}({mixedType}, '{typeName}'),");

                            break;
                        case SyntaxKind.ObjectCreationExpression:
                            var create = (ObjectCreationExpressionSyntax)value;
                            var dateArgs = create.ArgumentList?.Arguments
                                .Select(arg => ((LiteralExpressionSyntax)arg.Expression).Token.Value).ToArray();
                            if (dateArgs is { Length: > 1 } && dateArgs[1] != null &&
                                Type.GetTypeCode(dateArgs[1].GetType()) == TypeCode.Int32)
                            {
                                dateArgs[1] = (int)dateArgs[1] - 1;
                            }

                            var generic = create.Type as GenericNameSyntax;

                            if (generic?.Identifier.ValueText == "List")
                            {
                                sb.Append($"{Common("XMLArray")}({mixedType}, '{typeName}'),");
                                break;
                            }

                            if (generic?.Identifier.ValueText == "Dictionary")
                            {
                                var valueType = GetMixedType(GetTypeName(generic.TypeArgumentList.Arguments[1]));
//                                 sb.Append($"t.record(t.string, {valueType}),");
                                sb.Append($"t.record({mixedType}, {valueType}),");
                                break;
                            }

                            var dataInitializer = dateArgs != null ? string.Join(", ", dateArgs) : string.Empty;
                            if (typeName == "DateTime")
                                sb.Append($"{Common("withDefault")}({mixedType}, new Date({dataInitializer})),");
                            else
                            {
                                if (mixedType != name) sb.Append($"{mixedType},");
                                else sb.Replace(": ", ",");
                                isRequired = false;
                            }
                            break;
                        case SyntaxKind.CastExpression:
                            var expr = ((CastExpressionSyntax)value).Expression;
                            sb.Append(
                                $"{Common("withDefault")}({mixedType}, {GetDefaultValue(expr.ToString(), typeName)}),");
                            break;
                        default:
                            sb.Append(
                                $"{Common("withDefault")}({mixedType}, {GetDefaultValue(value.ToString(), typeName)}),");
                            break;
                    }
                }
                else
                {
                    switch (type.Kind())
                    {
                        case SyntaxKind.ArrayType:
                            sb.Append(typeName == "byte"
                                ? $"{Common("Base64")},"
                                : $"{Common("XMLArray")}({mixedType}, '{typeName}'),");
                            break;
                        case SyntaxKind.GenericName:
                            var generic = (GenericNameSyntax)type;
                            switch (generic.Identifier.ValueText)
                            {
                                case "List":
                                    sb.Append($"{Common("XMLArray")}({mixedType}, '{typeName}'),");
                                    break;
                                case "Dictionary":
                                    var valueType = GetMixedType(GetTypeName(generic.TypeArgumentList.Arguments[1]));
                                    sb.Append($"t.record({mixedType}, {valueType}),");
//                                     sb.Append($"t.record(t.string, {valueType}),");
                                    break;
                                default:
                                    throw new Exception(
                                        $"Unknown type, {type}: {type.GetLocation().GetLineSpan().Path}:{type.GetLocation().GetLineSpan().StartLinePosition.Line}");
                            }

                            break;
                        default:
                            if (member.Kind() == SyntaxKind.PropertyDeclaration)
                            {
                                var prop = (PropertyDeclarationSyntax)member;
                                var getProp = prop.AccessorList?.Accessors.FirstOrDefault(accessor =>
                                    accessor.Kind() == SyntaxKind.GetAccessorDeclaration);
                                var ret = getProp?.Body?.Statements.OfType<ReturnStatementSyntax>().FirstOrDefault();
                                if (ret != null && ret.Expression.Kind() == SyntaxKind.IdentifierName)
                                {
                                    var privateName = ret.Expression.ToString();
                                    if (privateInits.TryGetValue(privateName, out var value) && value != "null")
                                    {
                                        sb.Append(
                                            $"{Common("withDefault")}({mixedType}, {GetDefaultValue(value, typeName)}),");
                                        isRequired = true;
                                        break;
                                    }
                                }
                            }

                            if (mixedType != name) sb.Append($"{mixedType},");
                            else sb.Replace(": ", ",");
                            break;
                    }
                }

                if (type.Kind() == SyntaxKind.IdentifierName &&
                    typeName is not ("Color" or "DayOfWeek" or "Point" or "DateTime"))
                {
                    interfaceProps.Add(
                        $"{name}{(isRequired ? "" : "?")}: {(enums.Contains(typeName) ? $"{typeName}Enum" : typeName)}");
                }

                lines.Add((sb.ToString(),
                    $"#{member.GetLocation().GetLineSpan().StartLinePosition.Line}"));
            }

            if (baseTypes.Length > 0)
            {
                lines.Add(($"}})], '{className}Base');\n", null));
                lines.AddRange(GetLocationComment(outDir,
                    node.GetLocation().GetLineSpan(),
                    "@category Codecs",
                    $"@desc Codec for {{@link {className}}}"));
                lines.Add((
                    $"export const {className} = t.intersection([\n  {className}Base,\n  t.partial({{ '@_xsi:type': t.literal('{className}')}}),\n], '{className}');\n",
                    null));
            }
            else
                lines.Add(($"}}, '{className}');\n", null));

            if (importMaxValue)
            {
                var insertBefore = lines
                    .Where(code => code.line.StartsWith("import {") && code.line.Contains("'./"))
                    .FirstOrDefault(code =>
                        string.Compare(code.line[(code.line.IndexOf("'./", StringComparison.Ordinal) + 3)..],
                            "MaxValue",
                            StringComparison.Ordinal) > 0);

                var index = lines.FindIndex(code => code == insertBefore);
                lines.Insert(index, ("import MaxValue from './MaxValue';", null));
            }

//             lines.Add(($"export type {className} = {Common("Id")}<t.TypeOf<typeof {className}>>;\n", null));
            lines.Add((
                $"export interface {className} extends t.TypeOf<typeof {className}> {{ {string.Join(", ", interfaceProps)} }}\n",
                null));
            using StreamWriter file = new(Path.Join(outDir, $"{className}.ts"));
            // WriteLine($"GenType {className}");
            foreach (var line in AlignComments(lines))
            {
                file.WriteLine(line);
            }

            return imports;
        }

        private static IEnumerable<NamespaceDeclarationSyntax> FindNamespaces(CompilationUnitSyntax root,
            params string[] namespaces)
        {
            return from node in root.Members
                where node.Kind() == SyntaxKind.NamespaceDeclaration
                let ns = (NamespaceDeclarationSyntax)node
                where namespaces.Contains(ns.Name.ToString())
                select ns;
        }

        private static ClassDeclarationSyntax FindClass(SyntaxNode root, string name)
        {
            return root.DescendantNodes()
                .Where(node => node.Kind() == SyntaxKind.ClassDeclaration)
                .Select(node => (ClassDeclarationSyntax)node)
                .SingleOrDefault(node => node.Identifier.ValueText == name);
        }

        private static string GetInputType(TypeSyntax type)
        {
            var isArray = false;
            if (type.Kind() == SyntaxKind.ArrayType)
            {
                type = ((ArrayTypeSyntax)type).ElementType;
                isArray = true;
            }

            if (type.Kind() == SyntaxKind.IdentifierName) return $"{type}Enum";
            switch (((PredefinedTypeSyntax)type).Keyword.ValueText)
            {
                case "byte":
                    return isArray ? "number[] | Buffer" : "number";
                case "uint":
                case "int":
                case "ushort":
                    return isArray ? "number[]" : "number";
                case "bool":
                    return isArray ? "boolean[]" : "boolean";
                default:
                    throw new Exception($"Unknown input type: {type}");
            }
        }

        private static SyntaxNode GetParentNode(SyntaxKind kind, SyntaxNode node)
        {
            var parent = node.Parent;
            if (parent == null) return null;
            return parent.Kind() == kind ? parent : GetParentNode(kind, parent);
        }

        private static string FindAddressDeclarations(string lowAddress, string highAddress, BlockSyntax node,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs) =>
            node?.Statements.Where(statement =>
                    statement.Kind() == SyntaxKind.LocalDeclarationStatement)
                .Select(statement => (LocalDeclarationStatementSyntax)statement)
                .SelectMany(st => st.Declaration.Variables)
                .Where(decl => decl.Identifier.ValueText == lowAddress || decl.Identifier.ValueText == highAddress)
                .Select(variable => variable.Initializer?.Value)
                .Where(exp => exp != null)
                .Select(exp => ParseExpressionStatement(exp, parameters, inputs))
                .LastOrDefault();

        private static string GetValueAssignment(IEnumerable<StatementSyntax> statements, string name,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            if (statements == null) return null;
            var query = from st in statements
                where st.Kind() == SyntaxKind.ExpressionStatement
                let expSt = (ExpressionStatementSyntax)st
                where expSt.Expression.Kind() == SyntaxKind.SimpleAssignmentExpression
                let assign = (AssignmentExpressionSyntax)expSt.Expression
                where assign.Left.Kind() == SyntaxKind.IdentifierName
                let ident = (IdentifierNameSyntax)assign.Left
                where ident.Identifier.ValueText == name
                select assign.Right;

            var last = query.LastOrDefault();
            return last != null ? ParseExpressionStatement(last, parameters, inputs) : null;
        }

        private static IEnumerable<string> GetArrayInitializers(IEnumerable<StatementSyntax> statements, string name,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            if (statements == null) return Enumerable.Empty<string>();
            var regex = new Regex($"{name}\\[(\\d+)\\]");
            var x = from exp in statements
                where exp.Kind() == SyntaxKind.ExpressionStatement
                let st = (ExpressionStatementSyntax)exp
                where st.Expression.Kind() == SyntaxKind.SimpleAssignmentExpression
                let assign = (AssignmentExpressionSyntax)st.Expression
                let index = regex.Match(assign.Left.ToString()).Groups[1].Value
                where !string.IsNullOrEmpty(index)
                select (index, ParseExpressionStatement(assign.Right, parameters, inputs, false));
            return x.OrderBy(item => item.Item1).Select(item => item.Item2);
        }

        private static string MakeArrayInit(ICollection<string> values) =>
            $"[{string.Join(", ", values)}]";

        private static string ParseArrayInitIf(BlockSyntax node, string name, ICollection<string> initials,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            var ifQuery = from st in node.Statements
                where st.Kind() == SyntaxKind.IfStatement
                let ifSt = (IfStatementSyntax)st
                let leftSt =
                    GetArrayInitializers(((BlockSyntax)ifSt.Statement).Statements, name, parameters,
                            inputs)
                        .ToArray()
                let rightSt = GetArrayInitializers(((BlockSyntax)ifSt.Else?.Statement)?.Statements,
                    name,
                    parameters, inputs).ToArray()
                where leftSt.Length > 0
                select (ifSt.Condition, leftSt, rightSt);
            var ternary = ifQuery.FirstOrDefault();
            if (ternary.leftSt != null)
            {
                string cond;
                if (ternary.Condition.Kind() == SyntaxKind.IdentifierName)
                {
                    var ident = (IdentifierNameSyntax)ternary.Condition;
                    var identName = ident.Identifier.ValueText;
                    CheckInput(identName, parameters, inputs);
                    cond = identName;
                }
                else if (ternary.Condition is BinaryExpressionSyntax binC)
                {
                    var leftC = ParseExpressionStatement(binC.Left, parameters, inputs, false);
                    var rightC = ParseExpressionStatement(binC.Right, parameters, inputs, false);
                    cond = $"{leftC} {binC.OperatorToken} {rightC}";
                }
                else
                {
                    cond = ParseExpressionStatement(ternary.Condition, parameters, inputs);
                    // throw new Exception("Unknown condition");
                }

                if ((initials == null || initials.Count == 0) && ternary.rightSt.Length == 0)
                    initials = ternary.leftSt.Select(_ => "0").ToArray();

                return
                    $"({cond} ? {MakeArrayInit(ternary.leftSt)} : {MakeArrayInit(ternary.rightSt.Length > 0 ? ternary.rightSt : initials)})";
            }

            return null;
        }

        private static string ParseValueInitIf(BlockSyntax node, string name, string initial,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            var query = from st in node.Statements
                where st.Kind() == SyntaxKind.IfStatement
                let ifSt = (IfStatementSyntax)st
                let leftSt = GetValueAssignment(((BlockSyntax)ifSt.Statement).Statements, name, parameters, inputs)
                let rightSt = GetValueAssignment(((BlockSyntax)ifSt.Else?.Statement)?.Statements, name, parameters,
                    inputs)
                where leftSt.Length > 0
                select (ifSt.Condition, leftSt, rightSt);
            var ternary = query.FirstOrDefault();
            if (ternary.leftSt != null)
            {
                string cond;
                if (ternary.Condition.Kind() == SyntaxKind.IdentifierName)
                {
                    var ident = (IdentifierNameSyntax)ternary.Condition;
                    var identName = ident.Identifier.ValueText;
                    CheckInput(identName, parameters, inputs);
                    cond = identName;
                }
                else if (ternary.Condition is BinaryExpressionSyntax binC)
                {
                    var leftC = ParseExpressionStatement(binC.Left, parameters, inputs, false);
                    var rightC = ParseExpressionStatement(binC.Right, parameters, inputs, false);
                    cond = $"{leftC} {binC.OperatorToken} {rightC}";
                }
                else
                {
                    cond = ParseExpressionStatement(ternary.Condition, parameters, inputs);
                }

                return
                    $"({cond} ? {ternary.leftSt} : {ternary.rightSt ?? initial})";
            }

            return initial;
        }


        private static string ParseExpressionStatement(ExpressionSyntax node,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs,
            bool skipRightShift = true) =>
            TrimParentheses(ParseExpressionStatementImpl(node, parameters, inputs, skipRightShift));

        private static string ParseExpressionStatementImpl(ExpressionSyntax node,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs, bool skipRightShift)
        {
            switch (node.Kind())
            {
                case SyntaxKind.CastExpression:
                    return ParseExpressionStatementImpl(((CastExpressionSyntax)node).Expression, parameters, inputs,
                        skipRightShift);
                case SyntaxKind.ParenthesizedExpression:
                    return
                        $"({ParseExpressionStatementImpl(((ParenthesizedExpressionSyntax)node).Expression, parameters, inputs, skipRightShift)})";
                case SyntaxKind.RightShiftExpression:
                    var left = ParseExpressionStatementImpl(((BinaryExpressionSyntax)node).Left, parameters, inputs,
                        skipRightShift);
                    var right = ParseExpressionStatementImpl(((BinaryExpressionSyntax)node).Right, parameters, inputs,
                        skipRightShift);
                    return skipRightShift && right == "16" ? left : $"{left} >>> {right}";
                case SyntaxKind.SimpleMemberAccessExpression:
                    var memberAccess = (MemberAccessExpressionSyntax)node;
                    var memberExp = memberAccess.Expression.ToString();
                    var value = node.ToString();
                    return value switch
                    {
                        "byte.MaxValue" => "255",
                        "ushort.MaxValue" => "65535",
                        _ => memberExp is "AddressMapping" or "MaxValueInfo"
                            ? value
                            : $"{memberExp}Enum.{memberAccess.Name}"
                    };

                case SyntaxKind.AddExpression:
                case SyntaxKind.MultiplyExpression:
                case SyntaxKind.DivideExpression:
                case SyntaxKind.SubtractExpression:
                case SyntaxKind.ModuloExpression:
                case SyntaxKind.LeftShiftExpression:
                case SyntaxKind.BitwiseOrExpression:
                case SyntaxKind.BitwiseAndExpression:
                case SyntaxKind.BitwiseNotExpression:
                case SyntaxKind.NotEqualsExpression:
                case SyntaxKind.EqualsExpression:
                    var bin = (BinaryExpressionSyntax)node;
                    var sign = bin.OperatorToken.ValueText; // GetOperationSign(node.Kind());
                    var leftV = ParseExpressionStatementImpl(bin.Left, parameters, inputs, skipRightShift);
                    var rightV = ParseExpressionStatementImpl(bin.Right, parameters, inputs, skipRightShift);
                    switch (sign)
                    {
                        case "/" when rightV == "256":
                            sign = ">>>";
                            rightV = "8";
                            break;
                        case "!=":
                            sign = "!==";
                            break;
                        case "===":
                            sign = "===";
                            break;
                    }

                    return $"{leftV} {sign} {rightV}";

                case SyntaxKind.IdentifierName:
                    var identifier = (IdentifierNameSyntax)node;
                    var name = identifier.Identifier.ValueText;
                    var input = parameters.SingleOrDefault(p => p.Identifier.ValueText == name);
                    if (input == null)
                    {
                        if (GetParentNode(SyntaxKind.Block, node) is not BlockSyntax block)
                            throw new Exception($"Unknown parameters: {node}");
                        var initializer = block.Statements
                            .Where(st => st.Kind() == SyntaxKind.LocalDeclarationStatement)
                            .Select(st => (LocalDeclarationStatementSyntax)st)
                            .SelectMany(st => st.Declaration.Variables)
                            .Single(decl => decl.Identifier.ValueText == name).Initializer;

                        var res = initializer == null
                            ? null
                            : ParseExpressionStatementImpl(initializer.Value, parameters, inputs, skipRightShift);
                        var type = ((VariableDeclarationSyntax)initializer?.Parent?.Parent)?.Type;
                        return (res is null or "null") && type?.Kind() == SyntaxKind.ArrayType
                            ? ParseArrayInitIf(block, name, null, parameters, inputs)
                            : res;
                    }
                    else
                    {
                        CheckInput(name, parameters, inputs);
                    }

                    return name;
                case SyntaxKind.NumericLiteralExpression:
                    return node.ToString().TrimEnd('u').TrimEnd('f');
                case SyntaxKind.FalseLiteralExpression:
                case SyntaxKind.TrueLiteralExpression:
                case SyntaxKind.NullLiteralExpression:
                    return node.ToString();
                case SyntaxKind.ArrayCreationExpression:
                    var arrayExp = (ArrayCreationExpressionSyntax)node;
                    ICollection<string> initials;
                    if (arrayExp.Type.ElementType.ToString() != "byte" || arrayExp.Initializer == null)
                    {
                        var variable = ((VariableDeclaratorSyntax)GetParentNode(SyntaxKind.VariableDeclarator, node))
                            .Identifier.ValueText;
                        var block = (BlockSyntax)GetParentNode(SyntaxKind.Block, node);
                        initials = GetArrayInitializers(block.Statements, variable, parameters, inputs).ToArray();

                        var ifInit = ParseArrayInitIf(block, variable, initials, parameters, inputs);
                        if (ifInit != null) return ifInit;

                        var onlyDeclarations = block.Statements.Count(st =>
                            st.Kind() != SyntaxKind.LocalDeclarationStatement &&
                            st.Kind() != SyntaxKind.ReturnStatement) == 0;
                        if (onlyDeclarations)
                            return $"Buffer.alloc({arrayExp.Type.RankSpecifiers[0].Rank})";

                        var switchQuery = from st in block.Statements
                            where st.Kind() == SyntaxKind.SwitchStatement
                            let swStat = (SwitchStatementSyntax)st
                            let exp = ParseExpressionStatement(swStat.Expression, parameters, inputs, false)
                            from section in swStat.Sections
                            let conditions = section.Labels.Where(label => label.Kind() == SyntaxKind.CaseSwitchLabel)
                                .Select(label => (CaseSwitchLabelSyntax)label)
                                .Select(sw => ParseExpressionStatement(sw.Value, parameters, inputs)).ToArray()
                            let initializers = GetArrayInitializers(section.Statements, variable, parameters, inputs)
                                .ToArray()
                            select (exp, conditions, initializers);
                        var switches = switchQuery.ToArray();
                        var makeConditions =
                            new Func<(string exp, string[] conditions, string[] initializers), string>(sw =>
                                string.Join(" || ", sw.Item2.Select(cond => $"{sw.Item1} === {cond}")));
                        if (switches.Length > 0)
                        {
                            var last = switches.Last();
                            var ss = switches.TakeWhile(sw => sw.conditions.Length != 0);
                            var r = string.Join(" : ",
                                ss.Select(s => $"{makeConditions(s)} ? {MakeArrayInit(s.initializers)}"));
                            var d = last.conditions.Length == 0
                                ? MakeArrayInit(last.initializers)
                                : MakeArrayInit(last.initializers.Select(_ => "0").ToArray());
                            var res = $"{r} : {d}";
                            return res;
                        }
                    }
                    else
                    {
                        initials = arrayExp.Initializer.Expressions.Select(exp =>
                            ParseExpressionStatement(exp, parameters, inputs, false)).ToArray();
                    }


                    if (initials.Count == 0)
                    {
                        // var block = (BlockSyntax)GetParentNode(SyntaxKind.Block, node);
                        throw new Exception("Unknown array initialization");
                    }

                    return MakeArrayInit(initials);

                case SyntaxKind.ConditionalExpression:
                    var conditional = (ConditionalExpressionSyntax)node;
                    return
                        $"{ParseExpressionStatement(conditional.Condition, parameters, inputs)} ? {ParseExpressionStatement(conditional.WhenTrue, parameters, inputs)} : {ParseExpressionStatement(conditional.WhenFalse, parameters, inputs)}";

                case SyntaxKind.LogicalNotExpression:
                    var not = (PrefixUnaryExpressionSyntax)node;
                    return $"!{ParseExpressionStatement(not.Operand, parameters, inputs)}";

                case SyntaxKind.ElementAccessExpression:
                    var access = node.ToString();
                    return access == "array[0]" ? "0" : access;

                case SyntaxKind.InvocationExpression:
                    var inv = (InvocationExpressionSyntax)node;
                    return inv.Expression.ToString() switch
                    {
                        "Math.Abs" =>
                            $"Math.abs({ParseExpressionStatement(inv.ArgumentList.Arguments.First().Expression, parameters, inputs)})",
                        _ => throw new Exception($"Not implemented: {inv.Expression}")
                    };

                default:
                    throw new Exception($"Unknown param: {node}");
            }
        }

        private static string ParseAddressBlock(string lowAddress, string highAddress, BlockSyntax node,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            var query = from st in node.Statements
                where st.Kind() == SyntaxKind.ExpressionStatement
                let exp = (ExpressionStatementSyntax)st
                where exp.Expression.Kind() == SyntaxKind.SimpleAssignmentExpression
                let assign = (AssignmentExpressionSyntax)exp.Expression
                where assign.Left.Kind() == SyntaxKind.IdentifierName
                let ident = (IdentifierNameSyntax)assign.Left
                where ident.Identifier.ValueText == lowAddress || ident.Identifier.ValueText == highAddress
                select ParseExpressionStatement(assign.Right, parameters, inputs);

            var addresses = query.ToArray();
            switch (addresses.Length)
            {
                case > 2:
                    WriteLine($"WARNING: to many addresses: {addresses.Length}");
                    break;
                case 2:
                    if (addresses[0] != addresses[1])
                        WriteLine($"WARNING: different addresses:\n{addresses[0]}\n{addresses[1]}");
                    return addresses[1];
                case 1: return addresses[0];
            }

            throw new Exception($"Unknown address");
        }

        private static void CheckInput(string name,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            if (!inputs.Exists(input => input.Identifier.ValueText == name))
            {
                var param = parameters.SingleOrDefault(param => param.Identifier.ValueText == name);
                if (param != null) inputs.Add(param);
            }
        }

        private static ICollection<string> ParseAddressIf(string lowAddress, string highAddress, IfStatementSyntax node,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs, bool els = false)
        {
            List<string> lines = new();
            string condition;
            if (node.Condition.Kind() == SyntaxKind.IdentifierName)
            {
                var identifier = (IdentifierNameSyntax)node.Condition;
                CheckInput(identifier.Identifier.ValueText, parameters, inputs);
                condition = $"    {(els ? "else if(" : "if(")}{identifier}) {{";
            }
            else
            {
                var exp = (BinaryExpressionSyntax)node.Condition;
                var left = ParseExpressionStatement(exp.Left, parameters, inputs);
                var right = ParseExpressionStatement(exp.Right, parameters, inputs);
                condition = $"    {(els ? "} else if(" : "if (")}{left} {exp.OperatorToken} {right}) {{";
            }

            lines.Add(condition);
            lines.Add(
                $"      req.address = {ParseAddressBlock(highAddress, lowAddress, (BlockSyntax)node.Statement, parameters, inputs)};");
            if (node.Else == null)
            {
                lines.Add("    }");
            }
            else if (node.Else.Statement.Kind() == SyntaxKind.IfStatement)
            {
                lines.AddRange(ParseAddressIf(lowAddress, highAddress, (IfStatementSyntax)node.Else.Statement,
                    parameters, inputs,
                    true));
            }
            else if (node.Else.Statement.Kind() == SyntaxKind.Block)
            {
                lines.Add("    } else {");
                lines.Add(
                    $"      req.address = {ParseAddressBlock(highAddress, lowAddress, (BlockSyntax)node.Else.Statement, parameters, inputs)};");
                lines.Add("    }");
            }


            return lines;
        }

        private static ICollection<string> GenGetter(MethodDeclarationSyntax method,
            IReadOnlyDictionary<string, int> dict, ICollection<string> names)
        {
            var lines = new List<string>();
            var name = method.Identifier.ValueText;
            var ret = method.Body?.Statements.Where(st => st.Kind() == SyntaxKind.ReturnStatement)
                .Select(st => (ReturnStatementSyntax)st)
                .SingleOrDefault();
            if (ret == null || ret.Expression?.Kind() != SyntaxKind.ObjectCreationExpression)
                throw new Exception("Invalid method");
            var argList = ((ObjectCreationExpressionSyntax)ret.Expression).ArgumentList;
            if (argList?.Arguments.Count != 14) throw new Exception($"Unknown return type: {name}");
            // WriteLine($"<<< {name}");
            var overloads = names.Count(n => n == name);
            names.Add(name);
            if (overloads > 0)
            {
                name = $"{name}_{overloads}";
            }

            var parameters = method.ParameterList.Parameters;
            var inputs = new List<ParameterSyntax>();

            var arguments = argList.Arguments.ToArray();
            var destination = ParseExpressionStatement(arguments[2].Expression, parameters, inputs);
            var deviceType = ParseExpressionStatement(arguments[3].Expression, parameters, inputs);
            var port = ParseExpressionStatement(arguments[4].Expression, parameters, inputs);
            var rcvIndex = ParseExpressionStatement(arguments[5].Expression, parameters, inputs);
            var size = ParseExpressionStatement(arguments[11].Expression, parameters, inputs);
            var highAddressName = arguments[6].ToString();
            var lowAddressName = arguments[7].ToString();
            var highAddress = ParseExpressionStatement(arguments[6].Expression, parameters, inputs);
            var lowAddress = ParseExpressionStatement(arguments[7].Expression, parameters, inputs);

            var address = FindAddressDeclarations(lowAddressName, highAddressName, method.Body, parameters, inputs);
            ICollection<string> ifAddress = null;
            // if (string.IsNullOrEmpty(address))
            {
                var ifStat = method.Body?.Statements.Where(st => st.Kind() == SyntaxKind.IfStatement)
                    .Select(st => (IfStatementSyntax)st).SingleOrDefault();
                if (ifStat != null)
                {
                    try
                    {
                        ifAddress = ParseAddressIf(lowAddressName, highAddressName, ifStat, parameters, inputs);
                    }
                    catch
                    {
                        // ignored
                    }
                }
            }

            var iSize = dict != null && dict.ContainsKey(size) ? dict[size] : 0;
            if (iSize == 0) int.TryParse(size, out iSize);
            var isNumber = iSize is 1 or 2 or 4;

            lines.Add($"\n  // #{method.GetLocation().GetLineSpan().StartLinePosition.Line}");
            lines.Add($"  async {name}(");
            lines.AddRange(inputs.Select(param =>
                $"    {param.Identifier.ValueText}: {GetInputType(param.Type)},"));

            lines.Add($"  ): Promise<{(isNumber ? "number" : "Buffer")}> {{");
            // lines.Add("    this.checkConnection();");
            lines.Add($"    const req = new Request({size}, '{name}');");
            if (destination != "0") lines.Add($"    req.destination = {destination};");
            if (deviceType != "0") lines.Add($"    req.deviceType = {deviceType};");
            if (port != "0") lines.Add($"    req.port = {port};");
            if (rcvIndex != "0") lines.Add($"    req.rcvIndex = {rcvIndex};");
            var addressInitialized = true;
            if (uint.TryParse(highAddress, out var high) && uint.TryParse(lowAddress, out var low))
                lines.Add($"    req.address = 0x{((high << 16) + low):X8};");
            else if (!string.IsNullOrEmpty(address)) lines.Add($"    req.address = {address};");
            else addressInitialized = false;

            if (ifAddress != null)
            {
                lines.AddRange(ifAddress);
                addressInitialized = true;
            }

            if (!addressInitialized &&
                !string.IsNullOrEmpty(highAddress) && !string.IsNullOrEmpty(lowAddress))
            {
                lines.Add(
                    $"    req.address = {(highAddress == lowAddress ? highAddress : $"({highAddress} << 16) + {lowAddress}")};");
            }

            lines.Add(isNumber
                ? "    return decodeUIntLE(await this.connection.send(req));"
                : "    return (await this.connection.send(req)).data;");
            lines.Add("  }");
            // names.Add(method.Identifier.ValueText);

            return lines;
        }

        private static SeparatedSyntaxList<ArgumentSyntax> GetArguments(
            BlockSyntax node, string functionName) => (from st in node.Statements
            where st.Kind() == SyntaxKind.ExpressionStatement
            let exprStat = (ExpressionStatementSyntax)st
            where exprStat.Expression.Kind() == SyntaxKind.InvocationExpression
            let expr = (InvocationExpressionSyntax)exprStat.Expression
            where expr.Expression.Kind() == SyntaxKind.IdentifierName
            let ident = (IdentifierNameSyntax)expr.Expression
            where ident.Identifier.ValueText == functionName
            select expr.ArgumentList.Arguments).SingleOrDefault();

        private static string FindPatchDataWithoutUnLockCodes(BlockSyntax node,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            var args = GetArguments(node, "PatchDataWithoutUnLockCodes");
            if (args.Count != 3) return null;
            var size = ParseExpressionStatement(args[1].Expression, parameters, inputs);
            var valueExp = args[2].Expression;
            var value = ParseExpressionStatement(valueExp, parameters, inputs);
            if ((value == null || int.TryParse(value, out _)) && valueExp.Kind() == SyntaxKind.IdentifierName)
            {
                var name = ((IdentifierNameSyntax)valueExp).Identifier.ValueText;
                if (parameters.All(param => param.Identifier.ValueText != name))
                    value = GetValueAssignment(node.Statements, name, parameters, inputs) ??
                            ParseValueInitIf(node, name, value ?? "0", parameters, inputs);
            }

            return $"encodeUIntLE({value}, {size})";
        }

        private static string FindPatchBytesWithoutUnlockCodes(BlockSyntax node,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            var args = GetArguments(node, "PatchBytesWithoutUnlockCodes");
            return args.Count != 3 ? null : ParseExpressionStatement(args[1].Expression, parameters, inputs);
        }

        private static string FindMakeOutDeviceBytes(BlockSyntax node,
            SeparatedSyntaxList<ParameterSyntax> parameters, List<ParameterSyntax> inputs)
        {
            var collector = new InvocationsCollector();
            collector.Visit(node);
            var query = from expr in collector.Invocations
                where expr.Expression.Kind() == SyntaxKind.IdentifierName
                let ident = (IdentifierNameSyntax)expr.Expression
                where ident.Identifier.ValueText == "MakeOutDeviceBytes"
                select expr;
            var invocations = query.ToArray();
            if (invocations.Length == 0) return null;
            if (invocations.Length > 1)
                throw new Exception("To many invocations of MakeOutDeviceBytes");
            var args = invocations.First().ArgumentList.Arguments;
            var outDeviceAddress = ParseExpressionStatement(args[0].Expression, parameters, inputs);
            var baudType = ParseExpressionStatement(args[1].Expression, parameters, inputs);
            var otherDeviceProtocol = ParseExpressionStatement(args[2].Expression, parameters, inputs);
            if (otherDeviceProtocol == "deviceMode") throw new Exception("Not implemented");
            return $"makeOutDeviceBytes({outDeviceAddress}, {baudType}, {otherDeviceProtocol})";
        }


        private static ICollection<string> GenSetter(MethodDeclarationSyntax method,
            ICollection<string> names)
        {
            var lines = new List<string>();
            var name = method.Identifier.ValueText;
            var ret = method.Body?.Statements.Where(st => st.Kind() == SyntaxKind.ReturnStatement)
                .Select(st => (ReturnStatementSyntax)st)
                .SingleOrDefault();
            if (ret == null || ret.Expression?.Kind() != SyntaxKind.ObjectCreationExpression) return lines;
            var argList = ((ObjectCreationExpressionSyntax)ret.Expression).ArgumentList;
            if (argList?.Arguments.Count != 16) throw new Exception($"Unknown return type: {name}");
            // WriteLine($">>> {name}");
            var overloads = names.Count(n => n == name);
            names.Add(name);
            if (overloads > 0)
            {
                name = $"{name}_{overloads}";
            }

            var parameters = method.ParameterList.Parameters;
            var inputs = new List<ParameterSyntax>();
            var arguments = argList.Arguments.ToArray();
            var destination = ParseExpressionStatement(arguments[2].Expression, parameters, inputs);
            var deviceType = ParseExpressionStatement(arguments[3].Expression, parameters, inputs);
            var port = ParseExpressionStatement(arguments[4].Expression, parameters, inputs);
            var rcvIndex = ParseExpressionStatement(arguments[5].Expression, parameters, inputs);
            var broadcast = ParseExpressionStatement(arguments[11].Expression, parameters, inputs);
            var data = FindPatchDataWithoutUnLockCodes(method.Body, parameters, inputs)
                       ?? FindMakeOutDeviceBytes(method.Body, parameters, inputs);
            var value = string.IsNullOrEmpty(data)
                ? FindPatchBytesWithoutUnlockCodes(method.Body, parameters, inputs) ??
                  ParseExpressionStatement(arguments[12].Expression, parameters, inputs)
                : "$data";
            var size = ParseExpressionStatement(arguments[13].Expression, parameters, inputs);
            var highAddress = ParseExpressionStatement(arguments[6].Expression, parameters, inputs);
            var lowAddress = ParseExpressionStatement(arguments[7].Expression, parameters, inputs);
            var highAddressName = arguments[6].ToString();
            var lowAddressName = arguments[7].ToString();

            var address = FindAddressDeclarations(lowAddressName, highAddressName, method.Body, parameters, inputs);
            ICollection<string> ifAddress = null;
            var ifStat = method.Body?.Statements.Where(st => st.Kind() == SyntaxKind.IfStatement)
                .Select(st => (IfStatementSyntax)st).SingleOrDefault();
            if (ifStat != null)
            {
                try
                {
                    ifAddress = ParseAddressIf(lowAddressName, highAddressName, ifStat, parameters, inputs);
                }
                catch
                {
                    // ignored
                }
            }

            if ((parameters.Count - 5) > inputs.Count)
            {
                var total = parameters.Count;
                var skipped = parameters.Skip(4).Take(total - 6).Where(arg => !inputs.Contains(arg));
                throw new Exception($"Unused parameters: {string.Join(", ", skipped)} in {name}");
            }

            lines.Add($"\n  // #{method.GetLocation().GetLineSpan().StartLinePosition.Line}");
            lines.Add($"  async {name}(");
            lines.AddRange(inputs.Select(param =>
                $"    {param.Identifier.ValueText}: {GetInputType(param.Type)},"));

            lines.Add("  ): Promise<void> {");
            // lines.Add("    this.checkConnection();");
            if (value == "null") throw new Exception("Unknown array");
            if (!string.IsNullOrEmpty(data)) lines.Add($"    const $data = {data};");
            else if (!size.StartsWith(value) && !size.EndsWith(".Length") && !value.Contains("Buffer.alloc") &&
                     !value.StartsWith("[") &&
                     !value.StartsWith("(") && !value.Contains('?'))
                lines.Add(
                    $"    if ({value}.length !== {size}) throw new TypeError(`Invalid buffer size: ${{{value}.length}}`);");
            lines.Add($"    const req = new Request({value}, {broadcast}, '{name}');");
            if (destination != "0") lines.Add($"    req.destination = {destination};");
            if (deviceType != "0") lines.Add($"    req.deviceType = {deviceType};");
            if (port != "0") lines.Add($"    req.port = {port};");
            if (rcvIndex != "0") lines.Add($"    req.rcvIndex = {rcvIndex};");
            if (!string.IsNullOrEmpty(address)) lines.Add($"    req.address = {address};");
            if (ifAddress != null /* && ifAddress.Any(s => s.Contains("AddressMapping"))*/)
                lines.AddRange(ifAddress);

            if (string.IsNullOrEmpty(address) && ifAddress == null &&
                !string.IsNullOrEmpty(highAddress) && !string.IsNullOrEmpty(lowAddress))
            {
                if (uint.TryParse(highAddress, out var high) && uint.TryParse(lowAddress, out var low))
                    lines.Add($"    req.address = {(high << 16) + low};");
                else
                    lines.Add(
                        $"    req.address = {(highAddress == lowAddress ? highAddress : $"({highAddress} << 16) + {lowAddress}")};");
            }

            lines.Add("    await this.connection.send(req);");
            lines.Add("  }");

            return lines;
        }

        private static void GenApi(string outDir, ClassDeclarationSyntax node,
            IReadOnlyDictionary<string, int> dict)
        {
            var localImports = new List<string>
            {
                "import AddressMapping from './AddressMapping';",
                "import MaxValueInfo from './MaxValueInfo';",
                "import { BaudRateTypeEnum } from './BaudRateType';"
            };

            var lines = new List<string>(GetLocationComment(outDir,
                node.GetLocation().GetLineSpan()).Select(code => code.line))
            {
                "import { Buffer } from 'buffer';",
                "import { Duplex } from 'stream';\n",
                "import { Connection, decodeUIntLE, encodeUIntLE, Request, Session } from '@novastar/codec';\n",
                @"const makeOutDeviceBytes = (
  outDeviceAddress: number,
  baudRate: BaudRateTypeEnum,
  otherDeviceProtocol?: number[] | Buffer
): Buffer => {
  if (!otherDeviceProtocol || otherDeviceProtocol.length === 0)
    throw new TypeError('Invalid argument');
  const data = Buffer.alloc(
    AddressMapping.FuncCard_WriteOutDeviceHeaderOccupancy + otherDeviceProtocol.length
  );
  data[0] = outDeviceAddress;
  data[1] = baudRate;
  const src = Buffer.isBuffer(otherDeviceProtocol) ? otherDeviceProtocol : Buffer.from(otherDeviceProtocol);
  src.copy(data, AddressMapping.FuncCard_WriteOutDeviceHeaderOccupancy)
  return data;
};
",
                @"export default class SessionAPI<S extends Duplex> implements Session<S> {
  constructor(readonly connection: Connection<S>) {}

  get isConnected(): boolean {
    return this.connection.isConnected;
  }

  close(): boolean {
    if (!this.connection.isConnected) return false;
    this.connection.close();
    return true;
  }

  pushTimeout(timeout: number): void {
    if (timeout <= 0) throw new TypeError('Invalid timeout');
    this.#timeouts.push(this.connection.timeout);
    this.connection.timeout = timeout;
  }

  popTimeout(): number {
    const timeout = this.#timeouts.pop();
    if (timeout) {
      this.connection.timeout = timeout;
    }
    return timeout ?? this.connection.timeout;
  }

  #timeouts: number[] = [];
"
            };

            var names = new List<string>();
            var methods = from member in node.Members
                where member.Kind() == SyntaxKind.MethodDeclaration
                let method = (MethodDeclarationSyntax)member
                where IsPublic(method.Modifiers) && IsStatic(method.Modifiers) && method.Body != null &&
                      method.ReturnType != null && method.ReturnType.Kind() == SyntaxKind.IdentifierName
                let retTypeName = ((IdentifierNameSyntax)method.ReturnType).Identifier.ValueText
                where retTypeName is "PackageRequestReadData" or "PackageRequestWriteData"
                let isSetter = retTypeName == "PackageRequestWriteData"
                select (method, isSetter);

            var unrecognized = 0;
            var errs = new List<string>();
            foreach (var (method, isSetter) in methods)
            {
                try
                {
                    lines.AddRange(isSetter ? GenSetter(method, names) : GenGetter(method, dict, names));
                }
                catch (Exception err)
                {
                    WriteLine($"***** {method.Identifier.ValueText} => {err.Message}");
                    unrecognized++;
                    errs.Add(err.Message);
                    var original = names.Last();
                    var count = names.Count(name => name == original);
                    var name = $"{original}{(count > 1 ? $"_{count - 1}" : "")}";
                    lines.Add(
                        $"\n  {name} = (): void => {{ throw new TypeError('Not implemented'); }};");
                }
            }

            var groups = from err in errs
                let pos = err.IndexOf(":", StringComparison.Ordinal)
                group err by err[..(pos == -1 ? err.Length : pos)]
                into grp
                select new { err = grp.Key, count = grp.Count() };
            foreach (var grp in groups.OrderByDescending(g => g.count))
            {
                WriteLine($"{grp.err} => {grp.count}");
            }

            WriteLine($"GenSession: {names.Count}/{unrecognized}");

            lines.Add("}");

            var index = lines.FindLastIndex(line => line.StartsWith("import ")) + 1;
            var regex = new Regex(@": (\w+)Enum[^\w\d]");
            localImports.AddRange(lines.SelectMany(line => regex.Matches(line)).Select(match => match.Groups[1].Value)
                .Where(type => !string.IsNullOrEmpty(type))
                .Select(type => $"import {{ {type}Enum }} from './{type}';"));
            localImports.Sort((a, b) =>
                string.Compare(a, a.IndexOf('\''), b, b.IndexOf('\''), 255, StringComparison.Ordinal));
            localImports.Add("");
            lines.InsertRange(index, localImports.Distinct());
            using StreamWriter file = new(Path.Join(outDir, $"Session.ts"));
            file.WriteLine(@"// noinspection JSUnusedGlobalSymbols");
            file.WriteLine(@"/* eslint-disable camelcase,no-bitwise,class-methods-use-this,no-nested-ternary */");
            foreach (var line in lines)
            {
                file.WriteLine(line);
            }
        }

        public static int Main(string[] args)
        {
            if (args.Length < 3)
            {
                Error.WriteLine("Directories not specified [source out common]");
                return -1;
            }

            var total = 0;
            var currentDir = AppDomain.CurrentDomain.BaseDirectory;
            var rootDir = Directory.GetParent(currentDir)?.Parent?.Parent?.Parent?.FullName ?? currentDir;
            var argIndex = args[0].Contains("gen.dll") ? 1 : 0;
            var srcDir = Path.Combine(rootDir, args[argIndex]);
            var outDir = Path.Combine(rootDir, args[argIndex + 1]);
            var commonDir = Path.Combine(rootDir, args[argIndex + 2]);
            var apiDir = Path.Combine(outDir, "api");
            if (!Directory.Exists(srcDir) || !Directory.Exists(commonDir))
            {
                Error.WriteLine($"Unknown directory {srcDir}");
                return -1;
            }

            if (!Directory.Exists(outDir)) Directory.CreateDirectory(outDir);
            if (!Directory.Exists(apiDir)) Directory.CreateDirectory(apiDir);

            var files = Directory.GetFiles(srcDir, "*.cs");
            if (files.Length == 0)
            {
                Error.WriteLine("No source files found");
                return -1;
            }

            var classesCollector = new ClassesCollector();
            var enumsCollector = new EnumsCollector();
            foreach (var file in files)
            {
                var source = File.ReadAllText(file);
                var tree = CSharpSyntaxTree.ParseText(source, null, file);
                var root = tree.GetCompilationUnitRoot();
                var scopes = FindNamespaces(root, "Nova.GigabitController", "Nova.LCT.GigabitSystem.Common",
                    "Nova.Equipment.Protocol.TGProtocol", "Nova.LCT.GigabitSystem.CommonInfoAccessor",
                    "Nova.LCT.GigabitSystem.HWConfigAccessorBase", "Nova.LCT.GigabitSystem.ChipDataClass",
                    "Nova.LCT.GigabitSystem.ChipDataClass.ChipInterface",
                    "Nova.LCT.GigabitSystem.ChipDataClass.ChipCommonData");
                foreach (var ns in scopes)
                {
                    classesCollector.Visit(ns);
                    enumsCollector.Visit(ns);
                }

                var addressMapping = FindClass(root, "AddressMapping");
                Dictionary<string, int> addressMappingDictionary = null;
                if (addressMapping != null)
                {
                    addressMappingDictionary = GenConstEnum(outDir, addressMapping, true);
                    ++total;
                }

                var tgProtocolParser = FindClass(root, "TGProtocolParser");
                if (tgProtocolParser != null)
                {
                    GenApi(outDir, tgProtocolParser, addressMappingDictionary);
                    ++total;
                }
            }

            /*
            var config =
                serializableCollector.Classes.Single(node => node.Identifier.ValueText == "SystemParameterConfig");

            var visited = new List<BaseTypeDeclarationSyntax> { config };
            GetRecursiveImports(
                new List<BaseTypeDeclarationSyntax>(serializableCollector.Classes).Concat(enumsCollector.Enums)
                    .ToList(), visited);
                    */
            // var all =
            //     new List<BaseTypeDeclarationSyntax>(classesCollector.SerializableClasses).Concat(enumsCollector
            //         .Enums);

            // using StreamWriter indexFile = new(Path.Join(outDir, "index.ts"));
            // indexFile.WriteLine("// Automatically generated!\n");
            var index = new SortedSet<string> { "Session" };

            int GenDeepType(TypeDeclarationSyntax node, ICollection<string> baseClasses,
                ICollection<string> enums)
            {
                int count = 1;
                var typeName = node.Identifier.ValueText;

                index.Add(typeName);
                var imports = GenType(outDir, node, baseClasses, enums);
                var extras = imports.Where(item => !baseClasses.Contains(item));
                foreach (var extra in extras)
                {
                    if (File.Exists(Path.Join(outDir, $"{extra}.ts"))) continue;
                    var found = classesCollector.Classes.SingleOrDefault(item => item.Identifier.ValueText == extra);
                    if (found == null)
                    {
                        WriteLine($"WARNING: Type {extra} not found");
                    }
                    else
                    {
                        count += GenDeepType(found, baseClasses, enums);
                    }
                }

                return count;
            }

            foreach (var node in enumsCollector.Enums)
            {
                GenEnum(outDir, node);
                index.Add(node.Identifier.ValueText);
                // indexFile.WriteLine($"export * from './{node.Identifier.ValueText}';");
                ++total;
            }

            var baseClasses = classesCollector.SerializableClasses.Select(node => node.Identifier.ValueText)
                .ToArray();

            var enums = enumsCollector.Enums.Select(item => item.Identifier.ValueText).ToArray();
            total += classesCollector.SerializableClasses.Sum(node => GenDeepType(node, baseClasses, enums));

            var map = new Dictionary<string, ICollection<string>>();
            for (var super = baseClasses; super.Length > 0;)
            {
                var subs = classesCollector.Classes
                    .Select(node => (node, GetBaseTypes(node).Intersect(super).FirstOrDefault()))
                    .Where(tuple => tuple.Item2 != null).ToArray();

                super = subs.Select(tuple => tuple.node.Identifier.ValueText).ToArray();
                total += subs.Select(tuple => tuple.node).Sum(node => GenDeepType(node, baseClasses, enums));

                foreach (var (child, parent) in subs)
                {
                    if (parent != null)
                    {
                        var typeName = child.Identifier.ValueText;
                        if (map.ContainsKey(parent))
                            map[parent].Add(typeName);
                        else
                            map[parent] = new SortedSet<string>() { typeName };
                        map[typeName] = map[parent];
                        index.Remove(parent);
                        index.Remove(typeName);
                    }
                }
            }

            var unions = map.Values.Distinct().Select(value => map.First(tuple => tuple.Value.Equals(value))).ToArray();
            if (unions.Length > 0)
            {
                var unionDir = Path.Join(outDir, "unions");
                if (!Directory.Exists(unionDir)) Directory.CreateDirectory(unionDir);
                using StreamWriter unionsFile = new(Path.Join(unionDir, "index.ts"));
                // indexFile.WriteLine("export * from './unions';");
                index.Add("unions");
                unionsFile.WriteLine("// Automatically generated ");
                unionsFile.WriteLine("import * as t from 'io-ts';\n");
                unionsFile.WriteLine(string.Join(Environment.NewLine, unions.SelectMany(pair => pair.Value)
                    .Select(typeName => $"import {{{typeName}}} from '../{typeName}';")));
                unionsFile.WriteLine(
                    $"export type {{{string.Join($",{Environment.NewLine}", unions.SelectMany(pair => pair.Value))}}};");
                foreach (var (key, value) in unions)
                {
                    unionsFile.WriteLine($"export const {key} = t.union([");
                    unionsFile.WriteLine(string.Join(Environment.NewLine, value.Select(v => $"  {v},")));
                    unionsFile.WriteLine($"], '{key}');\n");
                    unionsFile.WriteLine($"export type {key} = {string.Join(" | ", value)};");
                    unionsFile.WriteLine();
                }
            }


            foreach (var node in classesCollector.StaticClasses)
            {
                GenConstEnum(outDir, node, true);
                ++total;
            }

/*
            index.Add("api");
            using StreamWriter indexFile = new(Path.Join(outDir, "index.ts"));
            indexFile.WriteLine("// Automatically generated!\n");
            // index.Sort();
            foreach (var export in index)
            {
                indexFile.WriteLine(
                    $"export {(export == "Session" ? $"{{ default as {export}}}" : "*")} from './{export}';");
            }
 */

            WriteLine($"Generated {total} files");

            // foreach (var (baseType, derived) in GetUnions(classesCollector))
            // {
            //     WriteLine($"{baseType}: {string.Join(", ", derived)}");
            // }

            return 0;
        }

        public static bool IsPublic(SyntaxTokenList modifiers) => modifiers.Any(mod => mod.ValueText == "public");
        public static bool IsPrivate(SyntaxTokenList modifiers) => modifiers.Any(mod => mod.ValueText == "private");

        public static bool IsStatic(SyntaxTokenList modifiers) => modifiers.Any(mod => mod.ValueText == "static");
        private static bool IsConst(SyntaxTokenList modifiers) => modifiers.Any(mod => mod.ValueText == "const");

        public static bool IsSerializable(BaseTypeDeclarationSyntax node)
        {
            return node.AttributeLists.Any(list =>
                list.Attributes.Any(attr => attr.Name.ToString() == "Serializable"));
        }

        public static bool IsIgnored(MemberDeclarationSyntax node) =>
            node.AttributeLists.Any(list =>
                list.Attributes.Select(attr => attr.Name).OfType<IdentifierNameSyntax>()
                    .Any(ident => ident.Identifier.ValueText == "XmlIgnore"));


        public static bool HasBaseType(BaseTypeDeclarationSyntax node, string baseType) =>
            GetBaseTypes(node).Any(typeName => typeName == baseType);

        private static ICollection<string> GetBaseTypes(BaseTypeDeclarationSyntax node)
        {
            var types = node.BaseList?.Types;
            return types != null
                ? types.OfType<SimpleBaseTypeSyntax>().Select(bt => bt.Type).OfType<IdentifierNameSyntax>()
                    .Select(t => t.Identifier.ValueText).ToArray()
                : new string[] { };
        }

        // private static IEnumerable<(string, IEnumerable<string>)> GetUnions(
        //     ClassesCollector classesCollector)
        // {
        //     return from node in classesCollector.SerializableClasses
        //         let attrs = (
        //             from list in node.AttributeLists
        //             from attr in list.Attributes
        //             where attr.Name.Kind() == SyntaxKind.IdentifierName
        //             let name = (IdentifierNameSyntax)attr.Name
        //             where name.Identifier.ValueText is "XmlInclude" or "ChipXmlInclude"
        //             select attr)
        //         where attrs.Any()
        //         let baseType = node.Identifier.ValueText
        //         let exps = from attr in attrs
        //             where attr.ArgumentList != null
        //             select attr.ArgumentList?.Arguments.First().Expression
        //         let includes = from exp in exps
        //             where exp.Kind() == SyntaxKind.TypeOfExpression
        //             let typeOf = (TypeOfExpressionSyntax)exp
        //             select ((IdentifierNameSyntax)typeOf.Type).Identifier.ValueText
        //         // let exts = from exp in exps
        //         //     where exp.Kind() == SyntaxKind.SimpleMemberAccessExpression
        //         //     let acc = (MemberAccessExpressionSyntax)exp
        //         //     let dervived = from classNode in classesCollector.Classes
        //         //         where
        //         select (baseType, includes);
        // }
    }
}
