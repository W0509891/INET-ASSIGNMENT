import PurchaseForm from "../../ui/PurchaseForm/PurchaseForm.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

import "./Purchase.scss";

function Purchase() {

    const [searchParams, setSearchParams] = useSearchParams();
    let eventName = searchParams.get("event_name");
    let event_id = searchParams.get("event_id");

    console.log(event_id)

    return (
        <>
            <div className={"purchase-container"}>
                <h1>Purchase tickets for {eventName}</h1>
            <PurchaseForm EventId={event_id}/>
            </div>
        </>
    )
}

export default Purchase;