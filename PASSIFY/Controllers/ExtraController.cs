using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PASSIFY.Controllers;

public class ExtraController : Controller
{
    // GET
    public IActionResult LastPage()
    {
        return Redirect(Request.Cookies["LastPage"]);
    }
}