namespace PASSIFY.Models;

public class Activity
{
    private int Id { get; set; } //Primary Key
    private string Title { get; set; } = string.Empty;
    private string Description { get; set; } = string.Empty;
    private DateTime EventStart { get; set; }
    private DateTime EventEnd { get; set; }
    private DateTime Created { get; set; }
    private DateTime Modified { get; set; }
    private int OrganizerId { get; set; } // Foreign Key
    
}

