

using SitecoreCSPad.Scripting;

namespace SitecoreCSPad.Models
{
    public class ExecuteResult
    {
        public dynamic Result { get; set; }
        public Script Script { get; set; }
    }

    public class Script
    {
        public bool Error { get; set; }
        public string GeneratedClassCodeWithLineNumbers { get; set; }
        public string ErrorMessage { get; set; }
    }
}