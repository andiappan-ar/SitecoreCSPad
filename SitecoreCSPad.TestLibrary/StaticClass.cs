using SitecoreCSPad.TestLibrary.Model;
using SitecoreCSPad.TestNonReferredLibrary;
using System.Collections.Generic;

namespace SitecoreCSPad.TestLibrary
{
    public static class StaticClass
    {
        public static string StrProperty { get; set; }

        public static List<Person> GetMockPersonList()
        {
            var persons = new List<Person>();

            for(int i = 0; i < 10; i++)
            {
                persons.Add(new Person()
                {
                    Name = "Person-"+i,
                    Id = i
                });
            }
            
            return persons;
        }

        public static string GetNonRefferedClassString()
        {
            return StaticClass1.StrValue;
        }
    }
}
