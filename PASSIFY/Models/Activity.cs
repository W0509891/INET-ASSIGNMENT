using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.VisualBasic;

namespace PASSIFY.Models;

public class Activity
{
    //String for date format
    private const string DateFormat = "{0:dd-MMM-yy hh:mm tt}";
    [Display(Name = "Id")]
    
    public int ActivityId { get; set; } //Primary Key

    public string Title { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;

    //Name of Image on server
    public string ImageName { get; set; } = string.Empty;
    
    [Display(Name = "Start"),
     DisplayFormat(DataFormatString = DateFormat)]
    public DateTime EventStart { get; set; }

    [Display(Name = "End"),
     DisplayFormat(DataFormatString = DateFormat)]
    public DateTime EventEnd { get; set; }

    [DisplayFormat(DataFormatString = DateFormat)]
    public DateTime Created { get; set; }

    [DisplayFormat(DataFormatString = DateFormat)]
    public DateTime Modified { get; set; }

    
    // ==== Foreign Keys ====//

    [Display(Name = "Organizer")] public int? OrganizerId { get; set; }

    [Display(Name = "Category")] public int? CategoryId { get; set; }

    // ==== Navigation Properties ==== //
    public Organizer? Organizer { get; set; }
    public Category? Category { get; set; }
    
    [NotMapped]
    [Display(Name = "Image")]
    public IFormFile? FormFile { get; set; }
}