namespace PASSIFY.Models;

public class Purchase
{
    public int PurchaseId {get; set;}
    public int NoOfTickets {get; set;}
    public String CustomerEmail {get; set;} = string.Empty;
    public String CreditCardExp {get; set;} = string.Empty;
    public String CreditCardCvv {get; set;} = string.Empty;
    
    //Foreign Key
    public int ActivityId {get; set;}
    
    //navigation property
    public Activity? Activity {get; set;}
    
}