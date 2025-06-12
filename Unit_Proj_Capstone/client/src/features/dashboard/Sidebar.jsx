import '../../styles/layout/Sidebar';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">FlexFit</h2>
      <ul className="sidebar-menu">
        <li><a href="/dashboard">🏠 Dashboard</a></li>
        <li><a href="/log">📓 Workout Log</a></li>
        <li><a href="/routine">🧠 Routine</a></li>
        <li><a href="/progress">📈 Progress</a></li>
        <li><a href="/meals">🥗 Meal Plan</a></li>
        <li><a href="/settings">⚙️ Settings</a></li>
      </ul>
    </aside>
  );
}