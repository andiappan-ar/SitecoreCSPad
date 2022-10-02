using Newtonsoft.Json;
using Sitecore.Mvc.Controllers;
using SitecoreCSPad.Models;
using SitecoreCSPad.Scripting;
using System;
using System.Text;
using System.Web;
using System.Web.Mvc;


namespace SitecoreCSPad.Controllers
{
    public class SitecoreCSPadController : SitecoreController
    {
        public ActionResult GetSCCSPad()
        {
            return View("/Sitecore/Admin/SitecoreCSPad/Views/SitecoreCSPadEditor.cshtml");
        }

        [HttpPost]
        public JsonResult Execute(string csCode)
        {
           
            ExecuteResult executeResult = new ExecuteResult();

            var script = new CSharpScriptExecution() { SaveGeneratedCode = true };
            script.AddDefaultReferencesAndNamespaces();            
            script.AddLoadedReferences();

            var code = DecodeBase64(@csCode);
           
            executeResult.Result = script.ExecuteCode<dynamic>(code);
            executeResult.Script = new Script()
            {
                Error = script.Error,
                ErrorMessage = script?.ErrorMessage,
                GeneratedClassCodeWithLineNumbers = script?.GeneratedClassCodeWithLineNumbers
            };           

           return new JsonResult() {
                Data = executeResult,
                MaxJsonLength = 100000,
                RecursionLimit = 1000,
                ContentType = "application/json; charset=utf-8",
                ContentEncoding = Encoding.UTF8
            };
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