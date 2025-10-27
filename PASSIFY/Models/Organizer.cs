using System.ComponentModel.DataAnnotations;

namespace PASSIFY.Models
{
    public class Organizer
    {
        public int OrganizerId {get; set; } //Primary Key
        public string Name {get; set; } = string.Empty;

        public List<Activity>? Activities {get; set; }
    }
}
