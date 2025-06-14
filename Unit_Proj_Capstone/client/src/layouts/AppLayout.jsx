import Sidebar from "../features/dashboard/Sidebar";
import "../styles/layout/MainLayout.css";

export default function AppLayout({ children }) {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                {children}
            </main>
        </div>
    )
}
