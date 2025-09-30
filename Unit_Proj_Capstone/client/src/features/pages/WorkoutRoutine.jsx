// src/pages/WorkoutRoutine.jsx  (또는 실제 경로에 맞게)
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import '../../styles/layout/WorkoutRoutine.css';

export default function WorkoutRoutine() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (rid) => {
    if (!window.confirm('Delete this routine?')) return;
    try {
      await api.delete(`/api/routines/${rid}`);
      setRoutines((list) => list.filter((r) => r.id !== rid));
    } catch {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/routines');
        setRoutines(data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="workoutroutine-container">
      <main className="workoutroutine-main">
        <h1 className="headline">Workout Routine</h1>
        <p className="subtitle">Personalized plans to match your goals.</p>
      </main>

      {/* 페이지 스코프 루트 */}
      <div className="routine-page">
        <div className="routine-head">
          <h2 className="section-title">Saved Routines</h2>
        </div>

        <div className="routine-layout">
          {/* 좌측: 새 루틴 만들기 */}
          <aside className="routine-left">
            <Link to="/routine/new" className="btn btn-primary new-routine-btn">
              ＋ New Workout Routine
            </Link>
          </aside>

          {/* 우측: 저장된 루틴 그리드 */}
          <section className="routine-right">
            {loading ? (
              <p>Loading...</p>
            ) : routines.length === 0 ? (
              <div className="empty">No routines yet. Create your first workout routine!</div>
            ) : (
              <div className="routine-grid">
                {routines.map((rt) => {
                  const items = Array.isArray(rt.items) ? rt.items : [];
                  const exCount = items.length;
                  const setCount = items.reduce(
                    (acc, it) => acc + (Array.isArray(it.sets) ? it.sets.length : 0),
                    0
                  );
                  const when =
                    rt.updated_at || rt.created_at
                      ? new Date(rt.updated_at || rt.created_at).toLocaleString()
                      : '';

                  return (
                    <div key={rt.id} className="routine-card">
                      <div className="routine-card__head">
                        <h4 className="routine-card__title">{rt.title}</h4>
                      </div>

                      <div className="routine-card__meta">
                        <span>{exCount} exercises</span>
                        <span>·</span>
                        <span>{setCount} sets</span>
                      </div>

                      {when && <div className="routine-card__date">Updated: {when}</div>}

                      <div className="routine-card__actions">
                        <Link to={`/routine/${rt.id}`} className="btn">
                          Open
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(rt.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
