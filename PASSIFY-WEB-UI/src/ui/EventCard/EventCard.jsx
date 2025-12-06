import "./EventCard.scss"
import {Link} from "react-router-dom";

function EventCard(props) {

    return (

        <div className={"event-grid-item"}>
            <Link to={`/details/${props.ActivityId}`} className={"event-card-link"}>
                <div className={"image-wrapper"}>
                    <img src={props.ImageName} alt={props.ActivityName || "Event Image"}/>
                    <div className={"event-overlay"}>
                        <div className={"overlay-content"}>
                            <div className={"overlay-desc"}>{props.Description}</div>

                            <div className={"overlay-meta"}>
                                <span className={"overlay-time"}>From: {props.EventStart}</span>
                            </div>

                            <div className="overlay-meta">
                                <span className="overlay-time"><span>To {props.EventEnd} </span></span>
                            </div>

                            <div className={"overlay-meta"}>
                                <span className={"overlay-org"}>Organized by: {props.Organizer}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            <div className={"event-card-text"}>{props.ActivityName}</div>

        </div>

    )
}

export default EventCard