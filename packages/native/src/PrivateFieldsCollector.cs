using System.Collections.Generic;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace gen
{
    public class PrivateFieldsCollector : CSharpSyntaxWalker
    {
        public readonly BaseTypeDeclarationSyntax Parent;
        
        public PrivateFieldsCollector(BaseTypeDeclarationSyntax parent) => Parent = parent;

        public ICollection<MemberDeclarationSyntax> Fields { get; } = new List<MemberDeclarationSyntax>();
        // public ICollection<PropertyDeclarationSyntax> Props { get; } = new List<PropertyDeclarationSyntax>();

        public override void VisitFieldDeclaration(FieldDeclarationSyntax node)
        {
            if (node.Parent == Parent && Program.IsPrivate(node.Modifiers) && !Program.IsStatic(node.Modifiers))
            {
                Fields.Add(node);
            }
        }

        public override void VisitPropertyDeclaration(PropertyDeclarationSyntax node)
        {
            if (node.Parent == Parent && Program.IsPrivate(node.Modifiers) && !Program.IsStatic(node.Modifiers))
            {
                Fields.Add(node);
            }
        }
    }
}