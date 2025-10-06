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

      {/* 페이지 스코프 루트 (WorkoutRoutine 전용 네임스페이스) */}
      <section className="wr-content" aria-label="Saved Workout Routines">
        <h2 className="wr-title">Saved Routines</h2>

        <div className="wr-layout">
          <section className="wr-top">
            {loading ? (
              <p>Loading...</p>
            ) : routines.length === 0 ? (
              <div className="wr-empty">No routines yet. Create your first workout routine!</div>
            ) : (
              <div className="wr-grid">
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
                    <div key={rt.id} className="wr-card">
                      <div className="wr-card__head">
                        <h4 className="wr-card__title">{rt.title}</h4>
                      </div>

                      <div className="wr-card__meta">
                        <span>{exCount} exercises</span>
                        <span aria-hidden>·</span>
                        <span>{setCount} sets</span>
                      </div>

                      {when && <div className="wr-card__date">Updated: {when}</div>}

                      <div className="wr-card__actions">
                        <Link to={`/routine/${rt.id}`} className="btn">
                          Open
                        </Link>
                        <button
                          className="btn btn-danger"
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

          <aside className="wr-bottom">
            <Link to="/routine/new" className="btn btn-primary new-routine-btn">
              ＋ New Workout Routine
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
