namespace PASSIFY.Models
{
    public class Organizer
    {
        private int Id {get; set; } //Primary Key
        private string Name {get; set; } = string.Empty;
        private int EventId {get; set; } // Foreign Key
    }
}
