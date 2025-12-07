using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PASSIFY.Data;
using PASSIFY.Models;

namespace PASSIFY.Controllers;

[Authorize]
public class HomeController : Controller
{
    private readonly PASSIFYContext _context;

    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger, PASSIFYContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        while (await _context.Database.CanConnectAsync())
        {
            try
            {
                var pASSIFYContext = _context.Activity
                    .Include(a => a.Category)
                    .Include(a => a.Organizer);
                return View(await pASSIFYContext.ToListAsync());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        return View("Loading");
    }

    public async Task<IActionResult> Index_old()
    {
        var pASSIFYContext = _context.Activity
            .Include(a => a.Category)
            .Include(a => a.Organizer);

        return View(await pASSIFYContext.ToListAsync());
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return base.View(new ErrorViewModel
            { RequestId = System.Diagnostics.Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}