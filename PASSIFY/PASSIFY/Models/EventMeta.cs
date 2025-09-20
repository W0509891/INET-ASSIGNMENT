namespace PASSIFY.Models;

public class EventMeta
{
    private DateTime Created { get; set; }
    private DateTime Modified { get; set; }
    private int EventId { get; set; } // Foreign Key
}