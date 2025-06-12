import Sidebar from './Sidebar';

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
            <div className="dashboard-greeting">
                <h1>Welcome back, Champion 💪</h1>
                <p>Every rep counts. Let’s crush your goals today!</p>
            </div>
        </main>
    </div>
  );
}