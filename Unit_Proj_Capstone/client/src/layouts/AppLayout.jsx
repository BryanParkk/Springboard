import { useState } from "react";
import Sidebar from "../features/pages/Sidebar";
import "../styles/layout/MainLayout.css";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar hidden={!sidebarOpen} />

      <main className={`main-content ${sidebarOpen ? 'shifted' : 'no-shift'}`}>

        {/* Hamburger button - menu enable / disable */}
        {/* <button
          className="sidebar-toggle"
          aria-expanded={sidebarOpen}
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen(v => !v)}
        >
          ☰
        </button> */}

        {children}
      </main>

    </div>
  );
}