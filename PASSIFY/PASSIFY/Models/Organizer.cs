using System.ComponentModel.DataAnnotations;

namespace PASSIFY.Models
{
    public class Organizer
    {
        private int OrganizerId {get; set; } //Primary Key
        private string Name {get; set; } = string.Empty;

        private List<Activity>? Activities {get; set; }
    }
}
