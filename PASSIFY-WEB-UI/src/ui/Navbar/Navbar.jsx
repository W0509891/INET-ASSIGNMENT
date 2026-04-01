import "./Navbar.scss"
import {Link, useLocation} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isAuth = location.pathname === "/auth";

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">Passify</span>
                </Link>

                <div className="navbar-links"></div>

                <div className="navbar-actions">
                    {isHome && (
                        <div className="search-wrapper">
                            <SearchBar />
                        </div>
                    )}
                    
                    {user ? (
                        <div className="user-profile">
                            <div className="user-info">
                                <span className="welcome-text">Hi,</span>
                                <span className="user-name">{user.first_name}</span>
                            </div>
                            <div className="profile-dropdown">
                                <Link to="/tickets" className={location.pathname === "/tickets" ? "active" : ""}>
                                    Your Tickets
                                </Link>
                                <Link to={"/event"} className={location.pathname === "/event" ? "active" : ""}>Become an organizer</Link>
                                <button className="logout-btn" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        !isAuth &&
                        <Link to="/auth" className="login-btn">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar