using Newtonsoft.Json;
using PoeticCloud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace PoeticCloud.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            ViewBag.Message = "Your application description page.";
            ViewBag.selectedPoem = new Poem();
            return View();
        }

        [System.Web.Mvc.HttpPost]
        public ActionResult CreateFromSearch([FromBody]string[] selectedFromSearch)
        {
            
            ViewBag.selectedPoem = JsonConvert.DeserializeObject<Poem>(selectedFromSearch[0]); 
            return View("Create");
        }

        public ActionResult Search()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}