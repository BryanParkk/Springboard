import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import '../../styles/layout/LogWorkout.css';

export default function WorkoutHistoryPanel({ limit = 20, title = 'Workout History' }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      try {
        const res = await api.get(`/api/logs/history?status=completed&limit=${limit}`);
        setRows(res.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [limit]);

  return (
    <div className="panel" style={{ marginTop: 16 }}>
      <h2>{title}</h2>
      {loading ? (
        <div className="empty">Loading...</div>
      ) : !rows.length ? (
        <div className="empty">No completed sessions yet.</div>
      ) : (
        <div className="log-history-wrap">
          <table className="log-history">
            <thead>
              <tr>
                <th style={{width:64}}>#</th>
                <th>Name</th>
                <th style={{width:180}}>Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i)=>(
                <tr key={r.id}>
                  <td>{i+1}</td>
                  <td><Link className="link" to={`/log/${r.id}`}>{r.title || 'Workout'}</Link></td>
                  <td>{new Date(r.workout_date || r.completed_at || r.started_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
