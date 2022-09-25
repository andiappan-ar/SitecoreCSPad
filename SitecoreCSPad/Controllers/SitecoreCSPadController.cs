using SitecoreCSPad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Westwind.Scripting;

namespace SitecoreCSPad.Controllers
{
    public class SitecoreCSPadController : Controller
    {
        // GET: SitecoreCSPad
        public ActionResult Execute(string csCode)
        {
            ExecuteResult executeResult = new ExecuteResult();

            var script = new CSharpScriptExecution() { SaveGeneratedCode = true };
            script.AddDefaultReferencesAndNamespaces();            
            script.AddLoadedReferences();

            var code = DecodeBase64(@csCode);
           
            executeResult.Result = script.ExecuteCode<dynamic>(code);
            executeResult.Script = script;
            
            return Json(executeResult, JsonRequestBehavior.AllowGet);
        }

        // Decode a Base64 string to a string
        private string DecodeBase64(string value)
        {
            if (string.IsNullOrEmpty(value))
                return string.Empty;
            var valueBytes = System.Convert.FromBase64String(value);
            return HttpUtility.UrlDecode(System.Text.Encoding.UTF8.GetString(valueBytes));
        }
    }
}