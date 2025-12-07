import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
//Router
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//Components
import Navbar from "./ui/Navbar/Navbar.jsx";

//Route Components
import App from './routes/App.jsx'
import Event from './routes/Event/Event.jsx';
import Ticket from './routes/Ticket/Ticket.jsx';
import Details from "./routes/Details/Details.jsx";
import Purchase from "./routes/Purchase/Purchase.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Router>
      <Navbar />
         <Routes>
             <Route path="/" element={<App />} />
             <Route path="/details/:id" element={<Details />} />
             <Route path="/Purchase" element={<Purchase />} />
             <Route path="/event" element={<Event />} />
             <Route path="/tickets" element={<Ticket />} />
         </Routes>
     </Router>
  </StrictMode>
)
