using System.ComponentModel.DataAnnotations;

namespace PASSIFY.Models;

public class Category
{
    
    //Primary Key
    public int CategoryId { get; set; }
    public string Title { get; set; } = string.Empty;

    //Navigation Property
    public List<Activity>? Activities { get; set; }
}

