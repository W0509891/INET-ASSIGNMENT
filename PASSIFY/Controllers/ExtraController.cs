using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PASSIFY.Controllers;

public class ExtraController : Controller
{
    private string _lastpage;
    
    
    // GET
    public IActionResult LastPage()
    {
        Console.WriteLine(Request.Cookies["LastPage"]);
        return Redirect(Request.Cookies["LastPage"] ?? throw new InvalidOperationException());
    }
}