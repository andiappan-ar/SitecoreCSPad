﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SitecoreCSPad.Sitecore.Admin.SitecoreCSPad
{
    public partial class SitecoreCSPad : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var r = HttpContext.Current;
        }
    }
}