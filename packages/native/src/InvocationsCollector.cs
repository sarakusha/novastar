using System.Collections.Generic;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace gen
{
    public class InvocationsCollector: CSharpSyntaxWalker
    {
        public ICollection<InvocationExpressionSyntax> Invocations = new List<InvocationExpressionSyntax>();
        
        public override void VisitInvocationExpression(InvocationExpressionSyntax node)
        {
            Invocations.Add(node);
        }
    }
}