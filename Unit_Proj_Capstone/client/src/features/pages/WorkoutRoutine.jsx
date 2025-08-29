// src/pages/WorkoutRoutine.jsx
import '../../styles/layout/WorkoutRoutine.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export default function WorkoutRoutine() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (rid) => {
  if (!window.confirm('Delete this routine?')) return;
    try {
      await api.delete(`/api/routines/${rid}`);
      setRoutines(list => list.filter(r => r.id !== rid));
    } catch (e) { alert('Delete failed'); }
  };
//
  useEffect(()=>{
    (async()=>{
      try {
        const { data } = await api.get('/api/routines');
        setRoutines(data || []);
      } finally { setLoading(false); }
    })();
  },[]);

  return (
    <div className='workoutroutine-container'>
      <main className='workoutroutine-main'>
        <h1 className='headline'>Workout Routine</h1>
        <p className='subtitle'>Personalized plans to match your goals.</p>
      </main>
      <div className="routine-page">
        
          <h2 className="section-title">Saved Routines</h2>
        <div className="routine-left">
          <Link to="/routine/new" className="btn btn-primary new-routine-btn">＋ New Workout Routine</Link>
        </div>

        <div className="routine-right">
          <h2 className="section-title">Saved Routines</h2>
          {loading ? (
            <p>Loading...</p>
          ) : routines.length === 0 ? (
            <div className="empty-state">No routines yet. Create your first workout routine!</div>
          ) : (
            <div className="routine-list">
              {routines.map(r => (
                <div key={r.id} className="routine-card">
                  <div className="routine-card__title">{r.title}</div>
                  <div className="routine-card__meta">Updated: {new Date(r.updated_at).toLocaleString()}</div>
                  <Link to={`/routine/${r.id}`} className="routine-card__link">Open</Link>
                  <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(r.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}