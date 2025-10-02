using System.ComponentModel.DataAnnotations;

namespace PASSIFY.Models;

public class Activity
{
 
    private int ActivityId { get; set; } //Primary Key

    private string Title { get; set; } = string.Empty;
    private string Description { get; set; } = string.Empty;
    private DateTime EventStart { get; set; }
    private DateTime EventEnd { get; set; }
    private DateTime Created { get; set; }
    private DateTime Modified { get; set; }

    // Foreign Keys
    private int OrganizerId { get; set; } 
    private int CategoryId { get; set; } 

    // Navigation Properties
    public Organizer? Organizer { get; set; }
    public Category? Category { get; set; }


    
}

