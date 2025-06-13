import { NavLink } from "react-router-dom";
import "../../styles/layout/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">FlexFit</div>
      <ul className="sidebar-menu">
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>🏠 Dashboard</NavLink></li>
        <li><NavLink to="/log" className={({ isActive }) => isActive ? "active" : ""}>📓 Log Workout</NavLink></li>
        <li><NavLink to="/routine" className={({ isActive }) => isActive ? "active" : ""}>💪 Routine</NavLink></li>
        <li><a href="/progress">📈 Progress</a></li>
        <li><a href="/meals">🥗 Meal Plan</a></li>
        <li><a href="/settings">⚙️ Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;