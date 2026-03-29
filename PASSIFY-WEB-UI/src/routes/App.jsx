import {useEffect, useState} from 'react'
import './App.css'
//Components
import EventCard from "../ui/EventCard/EventCard.jsx";

function App() {
    const [activities, setActivities] = useState([])
    const [view, setView] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20

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

    const handleViewChange = (e) => {
        setView(e.target.value)
        setCurrentPage(1)
    }

    const categories = ['all', ...new Set(activities.map(activity => activity.Category))]

    const filteredActivities = activities.filter(activity => {
        if (view === 'all') return true
        return activity.Category === view
    })

    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <>
            <div>
                <div className="controls-container">
                    <div className="view-selector">
                        <label>Sort by: </label>
                        <select value={view} onChange={handleViewChange}>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;&lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={currentPage === page ? 'active' : ''}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            &gt;&gt;
                        </button>
                    </div>
                </div>
            </div>
            <div className="event-grid-container">
                {
                    paginatedActivities.length > 0 ? (
                        paginatedActivities.map(activity =>(
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
