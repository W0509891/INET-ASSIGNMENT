import "./PurchaseForm.scss"
import LoadingIcon from "../../ui/LoadingIcon/LoadingIcon.jsx";


import {useState} from "react";
import {useForm} from "react-hook-form";
import {Logger} from "sass";
import {Link} from "react-router-dom";

function PurchaseForm(props) {
    function $qs(queryselector) {
        return document.querySelector(queryselector)
    }

    const apiUrl = import.meta.env.VITE_API_URL
    const {register, handleSubmit, formState: {errors}} = useForm();

    const [isLoaing, setIsLoading] = useState(null)

    let tregex = /^\d+$/;
    let eregex = /^(\w+\.?\w+)@(\w+(\.\w+){0,2})(\.[a-zA-Z]+)$/
    let cxpregex = /^\d{2}\/\d{2}$/;
    let cvvregex = /^\d{3,4}$/;


    var ticketHasHadFocus = false;
    var emailHasHadFocus = false;
    var cardExpHasHadFocus = false;
    var cvvHasHadFocus = false;

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInput(e.target.value)
    }

    // let ticketFieldValid, emailFieldValid, cardexp, cvvFieldValid = false

    // function validateField(e) {
    //     let invalidDisplay = e.target.parentNode.children[2]
    //     switch (e.target.name.toLowerCase()) {
    //         case "tickets":
    //             ticketHasHadFocus = true;
    //             ticketFieldValid = regex.test(e.target.value) && e.target.value > 0
    //             e.target.style.borderColor = (!ticketFieldValid && ticketHasHadFocus) ? "#ff0000" : "#00ff00"
    //             break;
    //
    //         case "email":
    //             //For the scope of the assignment, regex only covers:
    //             // example@domain.com | exam.ple@dom.ain.com
    //             emailHasHadFocus = true;
    //             emailFieldValid = regex.test(e.target.value) && (e.target.value.length > 0)
    //             e.target.style.borderColor = (!emailFieldValid && emailHasHadFocus) ? "#ff0000" : "#00ff00"
    //             break;
    //
    //         case "ccexp":
    //             cardExpHasHadFocus = true;
    //             e.target.style.borderColor = (!cardexp && cardExpHasHadFocus) ? "#ff0000" : "#00ff00"
    //             break;
    //
    //         case "cccvv":
    //             cvvHasHadFocus = true;
    //             cvvFieldValid = regex.test(e.target.value) && (e.target.value !== "" || e.target.value !== null)
    //             e.target.style.borderColor = (!cvvFieldValid && cvvHasHadFocus) ? "#ff0000" : "#00ff00"
    //             break;
    //     }
    // }

    async function onSubmit(e) {
        setIsLoading(true)
        console.log(e)
        // console.log(ticketFieldValid && emailFieldValid && cardexp && cvvFieldValid)
        // if (ticketFieldValid && emailFieldValid && cardexp && cvvFieldValid) {
        //     e.target.submit();
        console.log("Form submitted")

        let req = await fetch(`${apiUrl}/purchase`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e)
        })

        let res = await req.json()

        // Source - https://stackoverflow.com/a
        // Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
        // Retrieved 2025-12-06, License - CC BY-SA 4.0

        // setIsLoading(false)

        await new Promise(r => setTimeout(r, 2000));

        console.log(res)


        if (res.status === 200) {
            setIsLoading(false)
        }

        // } else {
        //     console.log("Form not submitted")
        // }
    }


    return (

        <div className={"purchase-form-container"}>

            <div>
                <form method={"POST"} onSubmit={handleSubmit(onSubmit)}>
                    <div className={"formfieldgroup"}>
                        <label>Event ID</label>
                        <input type="text" name="event_id" value={props.EventId}
                               {...register("event_id")} readOnly/>
                    </div>

                    <div className={"formfieldgroup"}>
                        <label>Tickets</label>
                        <input type="number" name="tickets"
                               style={{borderColor: errors.tickets ? "#ff0000" : "#cccccc"}}
                               {...register("tickets", {required: true, pattern: tregex})}/>


                    </div>

                    <div className={"formfieldgroup"}>
                        <label>Email</label>
                        <input type="text" name="email" placeholder={"example@domain.com"}
                               style={{borderColor: errors.email ? "#ff0000" : "#cccccc"}}
                               {...register("email", {required: true, pattern: eregex})}/>
                    </div>

                    <div className={"formfieldgroup"}>
                        <label>Exp</label>
                        <input type="text" name="ccexp" maxLength={5} placeholder={"MM/YY"}
                               style={{borderColor: errors.ccexp ? "#ff0000" : "#cccccc"}}
                               {...register("ccexp", {required: true, pattern: cxpregex})}/>

                    </div>

                    <div className={"formfieldgroup"}>
                        <label>CVV</label>
                        <input type="text" id="cccvv" name="cccvv" maxLength={4} placeholder={"123"}
                               style={{borderColor: errors.cccvv ? "#ff0000" : "#cccccc"}}
                               {...register("cccvv", {required: true, pattern: cvvregex})}/>

                    </div>

                    {isLoaing === null ? <button>Purchase</button> :
                        isLoaing ? <button className={"loading-button"}><LoadingIcon/></button> :
                            <button onClick={event => {event.preventDefault()}}>
                                <Link to={"/tickets"}>SeeTickets</Link>
                            </button>
                    }
                </form>
            </div>
        </div>

    )
}

export default PurchaseForm