import {useEffect, useState} from 'react'
import './App.css'
//Components
import EventCard from "../ui/EventCard/EventCard.jsx";

function App() {
    const [activities, setActivities] = useState([])

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        const getActivities = async () => {
            const response = await fetch(apiUrl + '')
            const data = await response.json()

            if (response.ok) {
                setActivities(data)
            }
        }
        getActivities()
    }, [])




    return (
        <>
            <div className="event-grid-container">
                {
                    activities.length > 0 && (
                        activities.map(activity =>(
                            <EventCard
                                key={activity.ActivityId}
                                ActivityId={activity.ActivityId}
                                ActivityName={activity.ActivityName}
                                ImageName={activity.ImageName}
                                Description={activity.Description}
                                EventStart={activity.EventStart}
                                EventEnd={activity.EventEnd}
                                Organizer={activity.Organizer}
                            />
                        ))
                    )
                }
            </div>

        </>
    )
}

export default App
