using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Westwind.Scripting;

namespace SitecoreCSPad.Models
{
    public class ExecuteResult
    {
        public dynamic Result { get; set; }
        public CSharpScriptExecution Script { get; set; }
    }
}