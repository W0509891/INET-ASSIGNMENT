import './Ticket.scss'

function Ticket() {

    let ticketData = JSON.parse(sessionStorage.getItem("purchases"))

    //pulldata from local storage to display data

    return (
        <>
            <h1>Tickets</h1>

            <p>Please note this is only temporary and your tickets have been sent to the email provided at the time of
                purchase</p>

            <div className="ticket-container">

                {ticketData.length === 0 && <p>No tickets purchased</p>}
                {ticketData.length > 0 && ticketData.map((ticket, index) =>
                    <div className={"ticket-card"} key={index}>
                        <img src={ticket.ImageName} className={"ticket-image"} alt={"Event Cover"}/>
                        {/* Placeholder QR Code API */}
                        {/*From https://goqr.me/api/*/}
                        <img src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleTicket"} className={"ticket-qr"} alt={"QR Code"}/>

                        <p className="ticket-title">{ticket.ActivityName}</p>
                        <p className="ticket-description">{ticket.Description}</p>
                        <p className="ticket-location">5355 Leeds Street, Halifax, NS</p>

                        <div className="ticket-start">Starts: {ticket.EventStart.replace("-", "by")}</div>
                        <div className="ticket-end">Ends: {ticket.EventStart.replace("-", "by")}</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Ticket