using System.Collections.Generic;
using System.Linq;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace gen
{
    public class ClassesCollector : CSharpSyntaxWalker
    {
        public ICollection<TypeDeclarationSyntax> Classes { get; } = new List<TypeDeclarationSyntax>();

        public IEnumerable<TypeDeclarationSyntax> SerializableClasses => Classes.Where(IsSerializableClass).ToArray();

        public IEnumerable<TypeDeclarationSyntax> StaticClasses => Classes.Where(IsStaticClass).ToArray();

        public override void VisitClassDeclaration(ClassDeclarationSyntax node)
        {
            Classes.Add(node);
            var innerClasses = from member in node.Members
                where member.Kind() == SyntaxKind.ClassDeclaration
                let classDeclaration = (ClassDeclarationSyntax)member
                where IsSerializableClass(classDeclaration)
                select classDeclaration;
            foreach (var typeDeclarationSyntax in innerClasses)
            {
                Classes.Add(typeDeclarationSyntax);
            }
        }

        public override void VisitStructDeclaration(StructDeclarationSyntax node)
        {
            if (Program.IsPublic(node.Modifiers) && Program.IsSerializable(node)) this.Classes.Add(node);
        }

        private static bool IsSerializableClass(BaseTypeDeclarationSyntax node)
        {
            return Program.IsPublic(node.Modifiers) &&
                   (Program.IsSerializable(node) || node.Identifier.ValueText == "CustomGammaInfo" ||
                    node.Identifier.ValueText == "SenderProperty") &&
                   (Program.HasBaseType(node, "ICopy") || Program.HasBaseType(node, "ICloneable") ||
                    node.Identifier.ValueText == "SystemParameterConfig");
        }

        private static bool IsStaticClass(BaseTypeDeclarationSyntax node)
        {
            return Program.IsPublic(node.Modifiers) && Program.IsStatic(node.Modifiers);
        }
    }
}