# SitecoreCSPad
SitecoreCSPad is pad is used to execute C# codes inside your Sitecore instance.
We can write and execute code using the sitecore, custom class codes. Below some of use cases,

![SitecoreCSPadLogo](https://user-images.githubusercontent.com/11770345/193467460-534b919f-4892-474b-a259-e3b1442e88cf.jpg)

## Use cases
Listed below some example use cases,

* `Read SOLR index docuemnts and get the values`
* `Create/Update bulk Sitecore items`
* `Read Sitecore items and bind into custom model`
* `Call your custom dlls methods`

> ### Boost development speed:
> During your development - You want to execute some C code for testing purpose , If you write the code and place the dll. This will eat your time.
> CS Pad will help you to save this time.

> ### Remote code execution and debug experience:
> You want to execute some C# code in your higher environement and want to check some thing.
> Then this case CS pad will help you, with out test dll replacement.

## Features
| Feature  | Status |
| ------------- | ------------- |
| Execute C# code  | ✅	Available |
| Resuts display or log the execution results | ✅	Available |
| Error details | ✅	Available |
| Debugging | ⏳	InProgress |

## Tools and techs used
* `Monaco` - C# code editor
* `Roslyn/Micorsoft.Code/Westwind.Scripting` - C# code execution

## Setup
Setting up this in your Sitecore XP/XM.

1. Go to [release folder](URL 'https://github.com/andiappan-ar/SitecoreCSPad/tree/master/Release/Release-1.0/WebsiteRoot'), get release artifacts and paste this in your website root.
2. Go to your web config and add custom assembly bindings from this [file](URL 'https://github.com/andiappan-ar/SitecoreCSPad/blob/master/Src/SitecoreCSPad/App_Config/Modules/SitecoreCSPad/SitecoreCSPad.Assembly.config.NoNeedtoCopy'). (Please dont copy paste this config, Just do the manual change.)
3. Since this is a sensitve tool, its placed under admin folder.
   Below is the access path you can access the PAD,
   URL: [https://{your-domain.com}/sitecore/admin/SitecoreCSPad/SitecoreCSPad.aspx](URL 'https://{your-domain.com}/sitecore/admin/SitecoreCSPad/SitecoreCSPad.aspx')
   
   ![image](https://user-images.githubusercontent.com/11770345/193468586-77dcc296-e5ec-478c-9a71-7ff982b9d65d.png)

## How to use?

Write your code in input editor.

Execute your code by clicking this button ![image](https://user-images.githubusercontent.com/11770345/193468700-4e61a365-8c7c-44b5-8f7e-e394918584f8.png)
.

| Results  | Look and feel |
| ------------- | ------------- |
| Successfull, console view.  | ![image](https://user-images.githubusercontent.com/11770345/193468674-daa18ccd-464b-40d2-bc22-e1188764b6b1.png) |
| Successfull, object view. Example your return statement returning any object. This will show as object viewer  | ![image](https://user-images.githubusercontent.com/11770345/193468750-7dd8289b-fa9e-49e7-87da-a680b8fd488a.png) |
| Error details  | ![image](https://user-images.githubusercontent.com/11770345/193468785-637cae00-f60b-4f75-b653-106e59de602f.png) |









