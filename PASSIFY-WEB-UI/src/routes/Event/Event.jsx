import {Link} from "react-router-dom";

function Event() {

    return (
        <>
            <h1>Events</h1>

            <p>Hello there, Looking to host an event?</p>
            <p>You would need to create an account with us and we can get you started</p>
            <a href={"https://www.example.com"} target={"_blank"}>Create and account</a>
        </>
    )
}

export default Event