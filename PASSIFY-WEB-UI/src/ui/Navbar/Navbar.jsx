import "./Navbar.scss"
import {Link} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";

function Navbar() {

    return (
        <>
            <div className={"navbar-container"}>
                <div>
                    <div className={"leftend"}>
                        <Link to="/">Home</Link>
                        <Link to="/event">Events</Link>
                        <Link to="/tickets">Tickets</Link>

                    </div>
                    <div className={"middle"}>
                        <p>Passify</p>
                    </div>
                    <div className={"rightend"}>
                        <SearchBar/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar