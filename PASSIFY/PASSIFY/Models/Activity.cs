using System.ComponentModel.DataAnnotations;

namespace PASSIFY.Models;

public class Activity
{
 
    public int ActivityId { get; set; } //Primary Key

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    [Display(Name = "Start")]
    public DateTime EventStart { get; set; }

    [Display(Name = "End")]
    public DateTime EventEnd { get; set; }

    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime Modified { get; set; }

    // Foreign Keys

    [Display(Name = "Organizer")]
    public int? OrganizerId { get; set; }

    [Display(Name = "Category")]
    public int? CategoryId { get; set; } 

    // Navigation Properties
    public Organizer? Organizer { get; set; }
    public Category? Category { get; set; }


    
}

