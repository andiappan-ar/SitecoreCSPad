using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SitecoreCSPad.TestNonReferredLibrary
{
    public class Class1
    {
        public int ii=0;

        public string GetInteger(int i) { return (ii+i).ToString(); }
    }
}
