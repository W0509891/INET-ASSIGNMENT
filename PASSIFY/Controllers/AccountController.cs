using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace PASSIFY.Controllers;

public class AccountController : Controller
{
    
    private readonly IConfiguration _configuration;

    public AccountController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // GET
    public IActionResult Login()
    {
        return View();
    }
    
    [HttpPost]
    public async Task<IActionResult> Login(string username, string password)
    {
        if (username == _configuration["username"] && password == _configuration["password"])
        {
            // Create a list of claims identifying the user
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, username), // unique ID
                new Claim(ClaimTypes.Name, "Dasil"), // human readable name
                new Claim(ClaimTypes.Role, "Administrator"), // could use roles if needed         
            };

            // Create the identity from the claims
            var claimsIdentity = new ClaimsIdentity(claims,
                CookieAuthenticationDefaults.AuthenticationScheme);

            // Sign-in the user with the cookie authentication scheme
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));
            
            return RedirectToAction("Index", "Home");
        }
        ViewBag.ErrorMessage = "Invalid username or password";
        return View();
    }
    
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Login", "Account");
    }
}