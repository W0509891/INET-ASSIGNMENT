import "./SearchResultCard.scss"
import {Link} from "react-router-dom";

function SearchResultCard(props) {
    if (props.Key === null) {

        return (
            <div className={"search-result-item-none"}>
                <div className="None">
                    <p>No results found</p>

                </div>
            </div>
        )
    }

    else {

        return (

            <Link to={`/details/${props.ActivityId}`}>
                <div className={"search-result-item"}>
                    <div className={"search-result-image"}>
                        <img src={props.ImageName} alt={"Event Image"}/>
                    </div>
                    <div className={"search-result-title"}>
                        <p>{props.ActivityName}</p>
                    </div>
                    <div className="search-result-description">
                        <p>{props.Description}</p>
                    </div>

                </div>
            </Link>
        )
    }
}

export default SearchResultCard