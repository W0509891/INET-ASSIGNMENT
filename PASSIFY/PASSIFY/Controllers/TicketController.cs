using Microsoft.AspNetCore.Mvc;

namespace PASSIFY.Controllers
{
    public class TicketController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
