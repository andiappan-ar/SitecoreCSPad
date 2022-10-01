using Sitecore.Collections;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.Linq;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Data.Managers;
using Sitecore.Data.Masters;
using Sitecore.Mvc.Extensions;
using Sitecore.Web.UI.HtmlControls;
using SitecoreCSPad.TestLibrary.Model;
using SitecoreCSPad.TestNonReferredLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SitecoreCSPad.TestLibrary
{
    public static class StaticClass
    {
        public static string StrProperty { get; set; }

        public static List<Person> GetMockPersonList()
        {
            var persons = new List<Person>();

            for (int i = 0; i < 10; i++)
            {
                persons.Add(new Person()
                {
                    Name = "Person-" + i,
                    Id = i
                });
            }

            return persons;
        }

        public static dynamic GetNonRefferedClassString()
        {
            BulkModel resultRoot = new BulkModel();

            try
            {
                string searchTerm = "key_t_en:\"Key Four\"";
                var index = ContentSearchManager.GetIndex("my_new_cutom_core_webdb");
                using (var ctx = index.CreateSearchContext())
                {
                    var query = ctx.GetQueryable<SearchResultItem>().Where(x => x.Content.Equals(searchTerm));
                    var results = query.GetResults();
                    if (results.Hits.Any())
                    {
                        return results;
                    }

                    return null;
                }

                    string rootItemPath = @"/sitecore/content/SitecoreBulkItem/RootNestedItem";
                string templateID = "{C4A7A3C9-879F-49E0-BDBF-0789C027AC2D}";

                Database masterDB = Sitecore.Configuration.Factory.GetDatabase("master");

                Item siteRoot = masterDB.GetItem(rootItemPath);

                Action<ChildList, BulkModel> _GetChildItem = null;
                Action<Item, BulkModel> _GetCurrentItem = null;

                _GetChildItem = (allChildItem, parentItem) =>
                {
                    foreach (Item individualChildItem in allChildItem)
                    {
                        _GetCurrentItem(individualChildItem, parentItem);
                    }
                };

                _GetCurrentItem = (currentItem, parentItem) =>
                {
                    var eventTypeModel = new BulkModel();

                    if (currentItem != null)
                    {
                        if (TemplateManager.GetTemplate(currentItem).InheritsFrom(templateID))
                        {
                            eventTypeModel.ItemName = currentItem.Name;

                            if (parentItem.Child != null)
                            {
                                parentItem.Child.Add(eventTypeModel);
                            }
                            else
                            {
                                parentItem.Child = new List<BulkModel>() { eventTypeModel };
                            }

                        }

                        if (currentItem.Children.Any() && currentItem.Children.Count() > 0)
                            _GetChildItem(currentItem.Children, eventTypeModel);
                    }
                };

                _GetCurrentItem(siteRoot, resultRoot);
            }


            catch (Exception ex)
            {
                return ex.Message;
            }

            return resultRoot;


            using (var ctx = Sitecore.ContentSearch.ContentSearchManager.GetIndex("ar_master_index").CreateSearchContext())
            {
                IQueryable<SearchResultItem> searchQuery = ctx.GetQueryable<SearchResultItem>();
                var results = searchQuery.ToList().Where(x => x.Content.Contains("Branch")).FirstOrDefault();
            }


            }


    }

    public class BulkModel
    {
        // Helper field
        public string Action { get; set; }
        public string ItemName { get; set; }
        public string ItemId { get; set; }

        // Text fields
        public string Field_SIngleLineText { get; set; }
        public string Field_Multiline { get; set; }
        public string Field_RichText { get; set; }

        // Number fields 
        public int Field_Integer { get; set; }
        public int Field_Number { get; set; }

        // Date field        
        public DateTime Field_DateTime { get; set; }


        // Reference fields
        public string Field_DropList { get; set; }
        public string Field_DropLink { get; set; }

        public List<string> Field_MultiList { get; set; }

        // Checkbox field    
        public bool Field_Checkbox { get; set; }

        // Image field
        public string Field_Image { get; set; }

        // Reference field
        public string Field_Link { get; set; }

        public List<BulkModel> Child { get; set; }
    }
}
