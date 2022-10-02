using Sitecore.Pipelines;
using System.Web.Mvc;
using System.Web.Routing;

namespace SitecoreCSPad.Processor
{
    public class SitecoreCSPadProcessor
    {
        public void Process(PipelineArgs args)
        {
            Configure(RouteTable.Routes);
        }

        protected void Configure(RouteCollection routes)
        {
            routes.MapRoute("SitecoreCSPad", "/api/sitecore/SitecoreCSPad/GetSCCSPad", new
            {
                controller = "SitecoreCSPad",
                action = "GetSCCSPad"
            });
        }
       
    }
}