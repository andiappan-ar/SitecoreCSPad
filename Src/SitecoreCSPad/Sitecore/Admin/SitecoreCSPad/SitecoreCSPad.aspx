<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SitecoreCSPad.aspx.cs" Inherits="SitecoreCSPad.Sitecore.Admin.SitecoreCSPad.SitecoreCSPad" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>SitecoreCSPad</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="icon" type="image/x-icon" href="/Sitecore/Admin/SitecoreCSPad/Assets/SitecoreCSPadLogo.jpg"/>
    <link href="/Sitecore/Admin/SitecoreCSPad/Assets/Bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="~/Sitecore/Admin/SitecoreCSPad/Assets/Site.css" rel="stylesheet" />
</head>
<body>   
        <!--Spinner--->
        <div id="spinner-div" class="pt-5">
            <div class="spinner-border text-primary" role="status">
            </div>
        </div>

        <div id="main-sccspad-editor">
             <!--SC CS Pad--->
        </div>  

    <script src="/Sitecore/Admin/SitecoreCSPad/Assets/jquery-3.6.1.min.js"></script>
    <script src="/Sitecore/Admin/SitecoreCSPad/Assets/Bootstrap/bootstrap.bundle.min.js"></script>
    <script src="/Sitecore/Admin/SitecoreCSPad/Assets/SitecoreCSPadScript.js"></script>
</body>
</html>
