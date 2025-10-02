using System.ComponentModel.DataAnnotations;

namespace PASSIFY.Models;

public class Activity
{
 
    public int ActivityId { get; set; } //Primary Key

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime EventStart { get; set; }
    public DateTime EventEnd { get; set; }
    public DateTime Created { get; set; }
    public DateTime Modified { get; set; }

    // Foreign Keys
    public int OrganizerId { get; set; } 
    public int CategoryId { get; set; } 

    // Navigation Properties
    public Organizer? Organizer { get; set; }
    public Category? Category { get; set; }


    
}

