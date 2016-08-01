using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace UniversalTunesWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Universal Tunes";

            ViewBag.Authenticated = Request.IsAuthenticated ? "true" : "false";
            ViewBag.UserName = string.Empty;

            if (Request.IsAuthenticated)
            {
                ViewBag.UserName = Thread.CurrentPrincipal.Identity.Name;
            }

            return View();
        }

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}
    }
}