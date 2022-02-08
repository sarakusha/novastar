using System.Collections.Generic;
using System.Linq;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace gen
{
    public class EnumsCollector : CSharpSyntaxWalker
    {
        public ICollection<EnumDeclarationSyntax> Enums { get; } = new List<EnumDeclarationSyntax>();

        public override void VisitEnumDeclaration(EnumDeclarationSyntax node)
        {
            if (Program.IsPublic(node.Modifiers) && node.Members.Count > 0 &&
                Enums.FirstOrDefault(item => item.Identifier.ValueText == node.Identifier.ValueText) == null)
                Enums.Add(node);
        }
    }
}