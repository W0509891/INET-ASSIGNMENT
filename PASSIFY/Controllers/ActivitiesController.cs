using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;


using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PASSIFY.Data;
using PASSIFY.Models;

namespace PASSIFY.Controllers
{
    [Authorize]
    public class ActivitiesController : Controller
    {
        private readonly PASSIFYContext _context;
        private readonly IConfiguration _configuration;
        private readonly BlobContainerClient _containerClient;

        public ActivitiesController(PASSIFYContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            
            var connectionString = _configuration["AzureStorage"];
            var containerName = "uploads";
            
            _containerClient = new BlobContainerClient(connectionString, containerName);
            
        }

        // GET: Activities
        public async Task<IActionResult> Index()
        {
            var pASSIFYContext = _context.Activity.Include(a => a.Category).Include(a => a.Organizer);
            return View(await pASSIFYContext.ToListAsync());
        }

        // GET: Activities/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var activity = await _context.Activity
                .Include(a => a.Category)
                .Include(a => a.Organizer)
                .FirstOrDefaultAsync(m => m.ActivityId == id);
            if (activity == null)
            {
                return NotFound();
            }

            return View(activity);
        }

        // GET: Activities/Create
        public IActionResult Create()
        {
            ViewData["CategoryId"] = new SelectList(_context.Set<Category>(), "CategoryId", "Title");
            ViewData["OrganizerId"] = new SelectList(_context.Set<Organizer>(), "OrganizerId", "Name");
            return View();
        }

        // POST: Activities/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(
            [Bind("ActivityId,Title,Description,EventStart,EventEnd,Created,Modified,OrganizerId,CategoryId,Image,EventImageName")]Activity activity)
        {
            activity.Created = DateTime.Now;
            activity.Modified = DateTime.Now;

            //Validate form input
            if (ModelState.IsValid)
            {
                // _context.Add(activity);

                if (activity.EventImage != null)
                {
                    //Create unique file name on server
                    
                    //
                    var fileUpload = activity.EventImage;
                    
                    //path to save the file to
                    string blobName = Guid.NewGuid().ToString() + "_" + fileUpload.FileName;

                    var blobClient = _containerClient.GetBlobClient(blobName);
                    
                    using (var stream = fileUpload.OpenReadStream())
                    {
                        await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = fileUpload.ContentType });
                    }
                    // Get the URL of the blob file
                    activity.EventImageName = blobClient.Uri.ToString();
                }

                //Save to database
                _context.Add(activity);

                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            ViewData["CategoryId"] = new SelectList(_context.Set<Category>(), "CategoryId", "CategoryId", activity.CategoryId);
            ViewData["OrganizerId"] = new SelectList(_context.Set<Organizer>(), "OrganizerId", "OrganizerId", activity.OrganizerId);
            return View(activity);
        }

        // GET: Activities/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var activity = await _context.Activity.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            ViewData["CategoryId"] = new SelectList(_context.Set<Category>(), "CategoryId", "Title", activity.Category);
            ViewData["OrganizerId"] =
                new SelectList(_context.Set<Organizer>(), "OrganizerId", "Name", activity.Organizer);
            return View(activity);
        }

        // POST: Activities/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id,
            [Bind("ActivityId,Title,Description,EventStart,EventEnd,Created,Modified,OrganizerId,CategoryId")]
            Activity activity)
        {
            if (id != activity.ActivityId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    activity.Modified = DateTime.Now;
                    _context.Update(activity);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ActivityExists(activity.ActivityId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return RedirectToAction(nameof(Index));
            }

            ViewData["CategoryId"] = new SelectList(_context.Set<Category>(), "CategoryId", "CategoryId", activity.CategoryId);
            ViewData["OrganizerId"] = new SelectList(_context.Set<Organizer>(), "OrganizerId", "OrganizerId", activity.OrganizerId);
            return View(activity);
        }

        // GET: Activities/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var activity = await _context.Activity
                .Include(a => a.Category)
                .Include(a => a.Organizer)
                .FirstOrDefaultAsync(m => m.ActivityId == id);
            if (activity == null)
            {
                return NotFound();
            }

            return View(activity);
        }

        // POST: Activities/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var activity = await _context.Activity.FindAsync(id);
            if (activity != null)
            {
                _context.Activity.Remove(activity);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ActivityExists(int id)
        {
            return _context.Activity.Any(e => e.ActivityId == id);
        }
    }
}