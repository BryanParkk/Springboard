import { NavLink } from "react-router-dom";
import "../../styles/layout/Sidebar.css";
import profileImg from "../../assets/profile_sample.png"

const Sidebar = () => {
return (
    <aside className="sidebar">
        <div className="sidebar-title">
            <span className="sidebar-title-flex">Flex</span>
            <span className="sidebar-title-fit">Fit</span>
        </div>
        <ul className="sidebar-menu">
            <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>🏠 Dashboard</NavLink></li>
            <li><NavLink to="/log" className={({ isActive }) => isActive ? "active" : ""}>📓 Log Workout</NavLink></li>
            <li><NavLink to="/routine" className={({ isActive }) => isActive ? "active" : ""}>💪 Routine</NavLink></li>
            <li><NavLink to="/meals" className={({ isActive }) => isActive ? "active" : ""}>🥗 Meal Plan</NavLink></li>
            <li><NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>⚙️ Settings</NavLink></li>

        </ul>
        <div class="sidebar-footer">
            <img src={profileImg} alt="Profile" class="profile-image" />
            <div class="profile-name">Bryan Park
                <div class ="profile-title">Full-stack Dev</div>
            </div>
        </div>
    </aside>
);
};

export default Sidebar;