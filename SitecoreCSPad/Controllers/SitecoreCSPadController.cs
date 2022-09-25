using Sitecore.Mvc.Controllers;
using SitecoreCSPad.Models;
using SitecoreCSPad.Scripting;
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

        // GET: SitecoreCSPad
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
                ErrorMessage = script?.ErrorMessage,
                GeneratedClassCodeWithLineNumbers = script?.GeneratedClassCodeWithLineNumbers
            };
            
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