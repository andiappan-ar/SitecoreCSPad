$(function () {

    var sitecoreCSPadModule = {
       
        Config: {
            URL: {
                LoadPadComponentURL: "/api/sitecore/SitecoreCSPad/GetSCCSPad",
                ExecuteURL: "/api/sitecore/SitecoreCSPad/Execute?csCode="
            },           
        },
       
        Init: function () {            
            sitecoreCSPadModule.Module.LoadPadComponent();
        },

        Module: {

            LoadEditorComponent: function () {
                window.editor = monaco.editor.create(document.getElementById('sccspad-inputcontainer'), {
                    value: ['// Read Sitecore item recursively and bind into custom C# model\r\n\r\nusing Sitecore.BulkItemUpdate.Models;\r\nusing Sitecore.Data;\r\nusing Sitecore.Data.Items;\r\nusing Sitecore.Collections;\r\nusing Sitecore.Data.Managers;\r\n\r\nBulkModel resultRoot = new BulkModel();\r\n\r\n  try\r\n            {\r\n                string rootItemPath = @"/sitecore/content/SitecoreBulkItem/RootNestedItem";\r\n                string templateID = "{C4A7A3C9-879F-49E0-BDBF-0789C027AC2D}";\r\n\r\n                Database masterDB = Sitecore.Configuration.Factory.GetDatabase("master");\r\n\r\n                Item siteRoot = masterDB.GetItem(rootItemPath);\r\n\r\n                Action<ChildList, BulkModel> _GetChildItem = null;\r\n                Action<Item, BulkModel> _GetCurrentItem = null;\r\n\r\n                _GetChildItem = (allChildItem, parentItem) =>\r\n                {\r\n                    foreach (Item individualChildItem in allChildItem)\r\n                    {\r\n                        _GetCurrentItem(individualChildItem, parentItem);\r\n                    }\r\n                };\r\n\r\n                _GetCurrentItem = (currentItem, parentItem) =>\r\n                {\r\n                    var eventTypeModel = new BulkModel();\r\n\r\n                    if (currentItem != null)\r\n                    {\r\n                        if (Sitecore.Data.Managers.TemplateManager.GetTemplate(currentItem).InheritsFrom(templateID))\r\n                        {\r\n                            eventTypeModel.ItemName = currentItem.Name;\r\n\r\n                            if (parentItem.Child != null)\r\n                            {\r\n                                parentItem.Child.Add(eventTypeModel);\r\n                            }\r\n                            else\r\n                            {\r\n                                parentItem.Child = new List<BulkModel>() { eventTypeModel };\r\n                            }\r\n\r\n                        }\r\n\r\n                        if (currentItem.Children.Any() && currentItem.Children.Count() > 0)\r\n                            _GetChildItem(currentItem.Children, eventTypeModel);\r\n                    }\r\n                };\r\n\r\n                _GetCurrentItem(siteRoot, resultRoot);\r\n            }\r\n\r\n\r\n            catch (Exception ex)\r\n            {\r\n                return ex.Message;\r\n            }\r\n\r\n return resultRoot;'].join('\n'),
                    language: 'csharp'
                });
            },

            LoadPadComponent: function () {
                $('#spinner-div').show();//show spinner

                $.ajax({
                    url: sitecoreCSPadModule.Config.URL.LoadPadComponentURL,
                    type: 'GET',                    
                    success: function (innerHtml) {
                        $("#main-sccspad-editor").html(innerHtml);
                        sitecoreCSPadModule.Module.LoadEditorComponent();
                        sitecoreCSPadModule.EventListeners();
                        $('#spinner-div').hide();//hide spinner
                    },
                    complete: function () {
                        $('#spinner-div').hide();//hide spinner
                    },
                    error: function () {
                        $('#spinner-div').hide();//hide spinner
                    }
                });
            },

            Execute: function (encodedString) {

                $('#spinner-div').show();//show spinner

                $.ajax({
                    url: sitecoreCSPadModule.Config.URL.ExecuteURL + encodedString,
                    type: 'POST',
                    contenttype : 'application/json; charset=utf-8',
                    success: function (data) {
                        //data = JSON.parse(data);
                        //Reset inputs
                        $('#json-data').jsonViewer({}, { collapsed: true });
                        $("#sccspad-outputcontainer #textarea-error").val("");

                        //Set Error
                        if (data.Script.Error == true) {

                            $("#sccspad-outputcontainer #textarea-error").val(data.Script.ErrorMessage + "\n\r" +
                                data.Script.GeneratedClassCodeWithLineNumbers);
                            $("#sccspad-outputcontainer #textarea-error").css('color', 'red');
                            $("#nav-error-tab").click();
                        }
                        //Set Success
                        else {
                            var strObj = JSON.stringify(data.Result);

                            $("#sccspad-outputcontainer #textarea-console").val(strObj);
                            $("#sccspad-outputcontainer #textarea-console").css('color', 'white');
                            $("#nav-console-tab").click();

                            // inline data demo
                            $('#json-data').jsonViewer(data.Result, { collapsed: true });

                        }
                        //Set Warning
                        if (data.Script.Error == false && data.Result == null) {
                            $("#sccspad-outputcontainer #textarea-console").val("No return statement present!");
                            $("#sccspad-outputcontainer #textarea-console").css('color', 'yellow');
                            $("#nav-console-tab").click();
                        }

                        $('#spinner-div').hide();//hide spinner

                    },
                    complete: function () {
                        $('#spinner-div').hide();//hide spinner
                    },
                    error: function () {
                        $('#spinner-div').hide();//hide spinner
                    }
                });
            },
        },

        EventListeners: function () {

            // Execute
            $("#sccs-run").click(function () {
                var csCodeQuery = window.editor.getValue().trim();
                var encodedString = btoa(encodeURIComponent(csCodeQuery));               

                sitecoreCSPadModule.Module.Execute(encodedString);
            });

            //Sample snippet
            $(".sample-snippets").click(function () {
                var templateValue = "";

                switch ($(this).attr("id")) {
                    case "sample-readitem":
                        templateValue = '// Read Sitecore item recursively and bind into custom C# model\r\n\r\nusing Sitecore.BulkItemUpdate.Models;\r\nusing Sitecore.Data;\r\nusing Sitecore.Data.Items;\r\nusing Sitecore.Collections;\r\nusing Sitecore.Data.Managers;\r\n\r\nBulkModel resultRoot = new BulkModel();\r\n\r\n  try\r\n            {\r\n                string rootItemPath = @"/sitecore/content/SitecoreBulkItem/RootNestedItem";\r\n                string templateID = "{C4A7A3C9-879F-49E0-BDBF-0789C027AC2D}";\r\n\r\n                Database masterDB = Sitecore.Configuration.Factory.GetDatabase("master");\r\n\r\n                Item siteRoot = masterDB.GetItem(rootItemPath);\r\n\r\n                Action<ChildList, BulkModel> _GetChildItem = null;\r\n                Action<Item, BulkModel> _GetCurrentItem = null;\r\n\r\n                _GetChildItem = (allChildItem, parentItem) =>\r\n                {\r\n                    foreach (Item individualChildItem in allChildItem)\r\n                    {\r\n                        _GetCurrentItem(individualChildItem, parentItem);\r\n                    }\r\n                };\r\n\r\n                _GetCurrentItem = (currentItem, parentItem) =>\r\n                {\r\n                    var eventTypeModel = new BulkModel();\r\n\r\n                    if (currentItem != null)\r\n                    {\r\n                        if (Sitecore.Data.Managers.TemplateManager.GetTemplate(currentItem).InheritsFrom(templateID))\r\n                        {\r\n                            eventTypeModel.ItemName = currentItem.Name;\r\n\r\n                            if (parentItem.Child != null)\r\n                            {\r\n                                parentItem.Child.Add(eventTypeModel);\r\n                            }\r\n                            else\r\n                            {\r\n                                parentItem.Child = new List<BulkModel>() { eventTypeModel };\r\n                            }\r\n\r\n                        }\r\n\r\n                        if (currentItem.Children.Any() && currentItem.Children.Count() > 0)\r\n                            _GetChildItem(currentItem.Children, eventTypeModel);\r\n                    }\r\n                };\r\n\r\n                _GetCurrentItem(siteRoot, resultRoot);\r\n            }\r\n\r\n\r\n            catch (Exception ex)\r\n            {\r\n                return ex.Message;\r\n            }\r\n\r\n return resultRoot;';
                        break;
                    case "sample-updateitem":
                        templateValue = '// Update sitecore items';
                        break;
                    case "sample-readsolr":
                        templateValue = '// Read solr sitecore contexts';
                        break;
                }

                monaco.editor.getModels()[0].setValue(templateValue);
            });
        }

    };

    sitecoreCSPadModule.Init();
   
});