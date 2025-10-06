import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/client"; 
import { useAuth } from "../../context/AuthContext.jsx";
import "../../styles/layout/Sidebar.css";
import profileImg from "../../assets/profile_sample.png";
import logoImg from "../../assets/logo_flexfit.png";
import iconDashboard from "../../assets/icon_dashboard.png";
import iconLog from "../../assets/icon_log.png";
import iconRoutine from "../../assets/icon_routine.png";
import iconGuide from "../../assets/icon_guide.png";
import iconMeal from "../../assets/icon_meal.png";
import iconSettings from "../../assets/icon_settings.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    weight_unit: "kg",
    current_weight_kg: null,
    goal_weight_kg: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/user");
        setProfile((p) => ({ ...p, ...data }));
      } catch {
        // ignore
      }
    })();
  }, []);

  // logout
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // display name and weight
  const formatWeight = (kg, unit = profile.weight_unit || "kg") => {
    if (kg == null) return "--";
    const formatValue = (val) => {
      // 소수점이 0이면 정수로, 아니면 한 자리 소수로
      return val % 1 === 0 ? val.toFixed(0) : val.toFixed(1);
    };
    if (unit === "lbs") {
      const lbs = kg * 2.2046226218;
      return `${formatValue(lbs)} lbs`;
    }
    return `${formatValue(Number(kg))} kg`;
  };

  const displayName = profile.name || user?.name || user?.email || "User";

  // * Return * //
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        {/* <span className="sidebar-title-flex">Flex</span>
        <span className="sidebar-title-fit">Fit</span> */}
        <img src={logoImg} alt="Welcome to FlexFit" className="logo-image" />
      </div>

      <ul className="sidebar-menu">
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}><img src={iconDashboard} className="icon-sidebar" /> Dashboard</NavLink></li>
        <li><NavLink to="/log" className={({ isActive }) => isActive ? "active" : ""}><img src={iconLog} className="icon-sidebar" />  Log Workout</NavLink></li>
        <li><NavLink to="/routine" className={({ isActive }) => isActive ? "active" : ""}><img src={iconRoutine} className="icon-sidebar" />  Routine</NavLink></li>
        <li><NavLink to="/exercises" className={({ isActive }) => isActive ? "active" : ""}><img src={iconGuide} className="icon-sidebar" />  Exercise Guide</NavLink></li>
        <li><NavLink to="/meals" className={({ isActive }) => isActive ? "active" : ""}><img src={iconMeal} className="icon-sidebar" />  Meal Plan</NavLink></li>
        <li><NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}><img src={iconSettings} className="icon-sidebar" />  Settings</NavLink></li>
      </ul>

        {/* sidebar footer */}
        <div className="sidebar-footer">
          <img src={profileImg} alt="Profile" className="profile-image" />
          <div className="profile-info">
            <div className="profile-name">
              Hello, <strong>{displayName}</strong>
            </div>

            {/* 현재/목표 체중 (단위 자동) */}
            <div className="profile-stats">
              <span>current {formatWeight(profile.current_weight_kg)}</span>
              <span className="profile-stats__sep">/</span>
              <span>goal {formatWeight(profile.goal_weight_kg)}</span>
            </div>
          </div>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              <i>🔓 LOGOUT</i>
            </button>
        </div>
    </aside>
  );
};

export default Sidebar;


        {/* <div className="sidebar-footer">
            <img src={profileImg} alt="Profile" className="profile-image" />
            <div className="profile-name">
                Bryan Park
                <div className="profile-title">Full-stack Dev</div>
            </div>
            <button type="button" className="logout-btn" onClick={handleLogout}>
                🔓 Logout
            </button>
        </div> */}