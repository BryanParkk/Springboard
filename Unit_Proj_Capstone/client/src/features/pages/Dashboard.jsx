import '../../styles/layout/DashboardPage.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
// import dashboardImg from "../../assets/dashboard_img.png";

export default function Dashboard() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || user?.email || 'User');
  useEffect(() => {
    setName(user?.name || user?.email || 'User');
  }, [user]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data } = await api.get('/api/user');
        if (!ignore) setName(data?.name || user?.name || user?.email || 'User');
      } catch {
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <div className="dashboard-container">
        <main className="dashboard-main">
            <h1 className='headline'>Welcome back, {name}</h1>
            <p className='subtitle'>Every rep counts. Let’s crush your goals today!</p>
            {/* <img src={dashboardImg} width='400px'/> */}
        </main>
    </div>
    )
}