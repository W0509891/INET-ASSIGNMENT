using System.ComponentModel.DataAnnotations;

namespace PASSIFY.Models;

public class Activity
{
 
    public int ActivityId { get; set; } //Primary Key

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    [Display(Name = "Start"), 
     DisplayFormat(DataFormatString = "{0:dd-MMM-yy hh:mm tt}")]
    public DateTime EventStart { get; set; }

    [Display(Name = "End"),
     DisplayFormat(DataFormatString = "{0:dd-MMM-yy hh:mm tt}")]
    public DateTime EventEnd { get; set; }

    [DisplayFormat(DataFormatString = "{0:dd-MMM-yy hh:mm tt}")]
    public DateTime Created { get; set; } = DateTime.Now;
    
    [DisplayFormat(DataFormatString = "{0:dd-MMM-yy hh:mm tt}")]
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

