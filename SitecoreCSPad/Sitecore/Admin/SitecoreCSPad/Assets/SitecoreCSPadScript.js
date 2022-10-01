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
                    value: ['/*\r\nRead Sitecore item recursively and bind into custom C# model\r\n*/\r\n\r\nusing Sitecore.Data;\r\nusing Sitecore.Data.Items;\r\nusing Sitecore.Collections;\r\nusing Sitecore.Data.Managers;\r\nusing Sitecore.BulkItemUpdate.Models; // Custom class namespace \r\n\r\nBulkModel resultRoot = new BulkModel();\r\n\r\n  try\r\n            {\r\n                string rootItemPath = @"/sitecore/content/SitecoreBulkItem/RootNestedItem";\r\n                string templateID = "{C4A7A3C9-879F-49E0-BDBF-0789C027AC2D}";\r\n\r\n                Database masterDB = Sitecore.Configuration.Factory.GetDatabase("master");\r\n\r\n                Item siteRoot = masterDB.GetItem(rootItemPath);\r\n\r\n                Action<ChildList, BulkModel> _GetChildItem = null;\r\n                Action<Item, BulkModel> _GetCurrentItem = null;\r\n\r\n                _GetChildItem = (allChildItem, parentItem) =>\r\n                {\r\n                    foreach (Item individualChildItem in allChildItem)\r\n                    {\r\n                        _GetCurrentItem(individualChildItem, parentItem);\r\n                    }\r\n                };\r\n\r\n                _GetCurrentItem = (currentItem, parentItem) =>\r\n                {\r\n                    var eventTypeModel = new BulkModel();\r\n\r\n                    if (currentItem != null)\r\n                    {\r\n                        if (Sitecore.Data.Managers.TemplateManager.GetTemplate(currentItem).InheritsFrom(templateID))\r\n                        {\r\n                            eventTypeModel.ItemName = currentItem.Name;\r\n\r\n                            if (parentItem.Child != null)\r\n                            {\r\n                                parentItem.Child.Add(eventTypeModel);\r\n                            }\r\n                            else\r\n                            {\r\n                                parentItem.Child = new List<BulkModel>() { eventTypeModel };\r\n                            }\r\n\r\n                        }\r\n\r\n                        if (currentItem.Children.Any() && currentItem.Children.Count() > 0)\r\n                            _GetChildItem(currentItem.Children, eventTypeModel);\r\n                    }\r\n                };\r\n\r\n                _GetCurrentItem(siteRoot, resultRoot);\r\n            }\r\n\r\n\r\n            catch (Exception ex)\r\n            {\r\n                return ex.Message;\r\n            }\r\n\r\n return resultRoot;'].join('\n'),
                    language: 'csharp',
                    theme:'vs-dark'
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
            $("#sample-snippets").change(function () {
                var templateValue = "";

                switch ($(this).val()) {
                    case "sample-readitem":
                        templateValue = '/*\r\nRead Sitecore item recursively and bind into custom C# model\r\n*/\r\n\r\nusing Sitecore.Data;\r\nusing Sitecore.Data.Items;\r\nusing Sitecore.Collections;\r\nusing Sitecore.Data.Managers;\r\nusing Sitecore.BulkItemUpdate.Models; // Custom class namespace \r\n\r\nBulkModel resultRoot = new BulkModel();\r\n\r\n  try\r\n            {\r\n                string rootItemPath = @"/sitecore/content/SitecoreBulkItem/RootNestedItem";\r\n                string templateID = "{C4A7A3C9-879F-49E0-BDBF-0789C027AC2D}";\r\n\r\n                Database masterDB = Sitecore.Configuration.Factory.GetDatabase("master");\r\n\r\n                Item siteRoot = masterDB.GetItem(rootItemPath);\r\n\r\n                Action<ChildList, BulkModel> _GetChildItem = null;\r\n                Action<Item, BulkModel> _GetCurrentItem = null;\r\n\r\n                _GetChildItem = (allChildItem, parentItem) =>\r\n                {\r\n                    foreach (Item individualChildItem in allChildItem)\r\n                    {\r\n                        _GetCurrentItem(individualChildItem, parentItem);\r\n                    }\r\n                };\r\n\r\n                _GetCurrentItem = (currentItem, parentItem) =>\r\n                {\r\n                    var eventTypeModel = new BulkModel();\r\n\r\n                    if (currentItem != null)\r\n                    {\r\n                        if (Sitecore.Data.Managers.TemplateManager.GetTemplate(currentItem).InheritsFrom(templateID))\r\n                        {\r\n                            eventTypeModel.ItemName = currentItem.Name;\r\n\r\n                            if (parentItem.Child != null)\r\n                            {\r\n                                parentItem.Child.Add(eventTypeModel);\r\n                            }\r\n                            else\r\n                            {\r\n                                parentItem.Child = new List<BulkModel>() { eventTypeModel };\r\n                            }\r\n\r\n                        }\r\n\r\n                        if (currentItem.Children.Any() && currentItem.Children.Count() > 0)\r\n                            _GetChildItem(currentItem.Children, eventTypeModel);\r\n                    }\r\n                };\r\n\r\n                _GetCurrentItem(siteRoot, resultRoot);\r\n            }\r\n\r\n\r\n            catch (Exception ex)\r\n            {\r\n                return ex.Message;\r\n            }\r\n\r\n return resultRoot;';
                        break;
                    case "sample-updateitem":
                        templateValue = '/*\r\nUpdate sitecore items\r\n*/\r\n\r\nusing Sitecore.Data;\r\nusing Sitecore.Data.Items;\r\n\r\nItem result = null;\r\nStringBuilder logWriter = new StringBuilder();\r\n\r\nstring rootItemPath = @"/sitecore/content/SitecoreBulkItem/RootNestedItem";\r\nstring templateID = "{C4A7A3C9-879F-49E0-BDBF-0789C027AC2D}";\r\n\r\nSitecore.Data.Database masterDB =   Sitecore.Configuration.Factory.GetDatabase("master");\r\nItem parentItem = masterDB.GetItem(rootItemPath);\r\nvar template = masterDB.GetTemplate(templateID);\r\n\r\nDictionary<string,string> sourceDictionary = new Dictionary<string,string>(){\r\n    {"Andy","Mr"},\r\n    {"Anu","Miss"},\r\n    {"RaviRaj","Jr"},\r\n    {"InvalidName#$%^&**(((","Jr"},\r\n    {"Unknown","**"},\r\n};\r\n \r\n\r\nusing (new Sitecore.SecurityModel.SecurityDisabler())\r\n{\r\n    foreach(var dict in sourceDictionary){\r\n        Item newItem = null;\r\n        try\r\n        {        \r\n            newItem = parentItem.Add(dict.Key, template);\r\n            if (newItem!=null)\r\n            {\r\n                    newItem.Editing.BeginEdit();\r\n                    newItem["Name"] = dict.Key;\r\n                    newItem["Role"] = dict.Value;        \r\n                    newItem.Editing.EndEdit();\r\n            }\r\n            result = newItem;\r\n            logWriter.Append("Processed - Item name:"+newItem.Name+". Item path:"+newItem.Paths.FullPath+Environment.NewLine);\r\n        }\r\n        catch(Exception ex)\r\n        {\r\n            logWriter.Append("Not Processed - "+dict.Key+Environment.NewLine);\r\n            logWriter.Append(ex.Message+Environment.NewLine);\r\n            if(newItem!=null){\r\n                newItem.Editing.CancelEdit();\r\n            }            \r\n        }\r\n    }\r\n    \r\n}\r\n\r\n// Return created item string\r\nreturn logWriter.ToString();';
                        break;
                    case "sample-readsolr":
                        templateValue = '/*\r\nGet document values from custom search index\r\n*/\r\n\r\nusing Sitecore.ContentSearch;\r\nusing Sitecore.ContentSearch.Linq;\r\nusing Sitecore.ContentSearch.SearchTypes;\r\n\r\nstring searchTerm = "key_t:\\"key Two\\"";\r\nvar index = ContentSearchManager.GetIndex("my_new_cutom_core_webdb");\r\nusing (var ctx = index.CreateSearchContext())\r\n    {\r\n        var query = ctx.GetQueryable<SearchResultItem>().Where(x => x.Content.Contains(searchTerm));\r\n        //Get results\r\n        var results = query.GetResults();\r\n        if (results.Hits.Any())\r\n        {\r\n            return results.ToList().Select(\r\n                //Bind results to the dynamic model\r\n                x=> new {\r\n                    ItemId=x.Document.ItemId, \r\n                    ItemPath=x.Document.Path}\r\n                );\r\n        }\r\n\r\n        return null;\r\n    }';
                        break;
                }

                monaco.editor.getModels()[0].setValue(templateValue);
            });

            $("#monaco-theme").change(function () {               
                monaco.editor.setTheme($(this).val());
            });
            
            
        }

    };

    sitecoreCSPadModule.Init();
   
});