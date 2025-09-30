import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/client';

const fromKg = (kg, unit) => kg==null ? '' : unit==='lbs' ? (kg*2.2046226218).toFixed(1) : Number(kg).toFixed(1);

export default function LogSessionDetail() {
  const { id } = useParams();
  const [unit, setUnit] = useState('kg');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      try {
        const [sess, me] = await Promise.all([
          api.get(`/api/logs/${id}`),
          api.get('/api/user').catch(()=>({ data: null }))
        ]);
        setData(sess.data);
        if (me?.data?.weight_unit) setUnit(me.data.weight_unit);
      } finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Not found.</p>;
  const { session, exercises } = data;

  return (
    <div className="runner">
      <div className="runner-head">
        <h2>{session.title || 'Workout'}</h2>
        <div className="runner-actions">
          <Link className="btn" to="/log">← Back to Log</Link>
        </div>
      </div>

      <div style={{ marginBottom: 8, color: '#6b7280' }}>
        Date: {new Date(session.workout_date || session.completed_at || session.started_at).toLocaleString()} • Status: {session.status}
      </div>

      <div className="runner-body">
        {exercises.length === 0 && <div className="empty">No exercises in this session.</div>}
        {exercises.map(ex => (
          <div key={ex.id} className="runner-card">
            <div className="runner-card__head">
              <div className="runner-card__title">{ex.name}</div>
              {ex.note && <div className="runner-card__meta">{ex.note}</div>}
            </div>

            <div className="sets-table">
              <div className="sets-row sets-row--head">
                <div className="sets-col sets-col--no">Set</div>
                <div className="sets-col sets-col--w">{unit==='lbs'?'lbs':'kg'}</div>
                <div className="sets-col sets-col--reps">Reps</div>
                <div className="sets-col sets-col--rpe">RPE</div>
                <div className="sets-col sets-col--chk">Done</div>
              </div>
              {ex.sets.map(s => (
                <div key={s.id} className="sets-row">
                  <div className="sets-col sets-col--no">{s.set_no}</div>
                  <div className="sets-col sets-col--w">{fromKg(s.weight_kg, unit)}</div>
                  <div className="sets-col sets-col--reps">{s.reps ?? '-'}</div>
                  <div className="sets-col sets-col--rpe">{s.rpe ?? '-'}</div>
                  <div className="sets-col sets-col--chk">{s.completed ? '✓' : ''}</div>
                </div>
              ))}
            </div>

            <div className="runner-rest">Rest: {ex.rest_sec}s</div>
          </div>
        ))}
      </div>
    </div>
  );
}
