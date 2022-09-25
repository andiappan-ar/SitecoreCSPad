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
                    value: ['return SitecoreCSPad.TestLibrary.StaticClass.GetMockPersonList();'].join('\n'),
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
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {

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
                        templateValue = '// Read sitecore item recursively and display some fields value';
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