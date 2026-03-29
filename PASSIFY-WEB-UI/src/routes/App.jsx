import {useEffect, useState} from 'react'
import './App.css'
//Components
import EventCard from "../ui/EventCard/EventCard.jsx";

function App() {
    const [activities, setActivities] = useState([])
    const [view, setView] = useState('all')

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

    const categories = ['all', ...new Set(activities.map(activity => activity.Category))]

    const filteredActivities = activities.filter(activity => {
        if (view === 'all') {
            return true
        } else {
            return activity.Category === view
        }
    })

    return (
        <>
            <div className="view-selector">
                <label>Sort by: </label>
                <select value={view} onChange={(e) => setView(e.target.value)}>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="event-grid-container">
                {
                    filteredActivities.length > 0 ? (
                        filteredActivities.map(activity =>(
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
                    ) : (
                        <p>No events found for this view.</p>
                    )
                }
            </div>

        </>
    )
}

export default App
