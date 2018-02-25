using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SisoWebApplication.Controllers
{
    public class SnakeController : Controller
    {

        public IActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return RedirectToAction("Error", "Home");
        }




    }
}