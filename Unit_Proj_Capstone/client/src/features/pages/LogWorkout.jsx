import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import '../../styles/layout/LogWorkout.css';

const toKg = (v, unit) => v===''||v==null ? null : (unit==='lbs' ? Number(v)/2.2046226218 : Number(v));
const fromKg = (kg, unit) => kg==null ? '' : (unit==='lbs' ? (kg*2.2046226218).toFixed(1) : Number(kg).toFixed(1));

export default function LogWorkout() {
  const [unit, setUnit] = useState('kg');       // 사용자 선호(옵션: /api/user로 가져와도 됨)
  const [todaySession, setTodaySession] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 오늘 세션 로드 + 루틴 목록
  useEffect(()=>{
    (async()=>{
      try {
        const [sess, rts] = await Promise.all([
          api.get('/api/logs?status=in_progress'),
          api.get('/api/routines')
        ]);
        const session = (sess.data || [])[0] || null;
        setTodaySession(session);
        setRoutines(rts.data || []);
        // 단위 선호
        api.get('/api/user').then(u=> {
          if (u.data?.weight_unit) setUnit(u.data.weight_unit);
        }).catch(()=>{});
        // 히스토리 로드(완료 세션)
        api.get('/api/logs/history?status=completed&limit=50')
        .then(res=>setHistory(res.data||[]))
        .catch(()=>{});
      } finally { setLoading(false); }
    })();
  },[]);

  const startFromRoutine = async (rid) => {
    const { data } = await api.post('/api/logs/start', { routine_id: rid });
    const sess = await api.get(`/api/logs/${data.id}`);
    setTodaySession({ id: data.id, title: data.title, status: 'in_progress' });
    setRunner(sess.data);
  };

  // 세션 상세 상태(실행)
  const [runner, setRunner] = useState(null); // { session, exercises:[{... sets:[]}] }

  // 세션 로드(있으면)
  useEffect(()=>{
    if (!todaySession?.id) return;
    (async()=>{
      const { data } = await api.get(`/api/logs/${todaySession.id}`);
      setRunner(data);
    })();
  }, [todaySession?.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="logw-page">
      {!runner ? (
        <div className="logw-start">
          <div className="panel">
            <h2>Start Workout</h2>
            {routines.length === 0 ? (
              <div className="empty">No routines yet. <Link to="/routine/new">Create one</Link> to start faster.</div>
            ) : (
              <div className="routine-grid">
                {routines.map(r => (
                  <button key={r.id} className="routine-item" onClick={()=>startFromRoutine(r.id)}>
                    <div className="routine-item__title">{r.title}</div>
                    <div className="routine-item__meta">Open as today</div>
                  </button>
                ))}
              </div>
            )}
            <div className="hr" />
            <button className="btn" onClick={()=>startFromRoutine(null)}>+ Quick Start (empty)</button>
          </div>
        </div>
      ) : (
        <>
          <SessionRunner runner={runner} unit={unit} onRunnerChange={setRunner} onComplete={async (titleText) => {
              await api.post(`/api/logs/${runner.session.id}/complete`, { title: titleText });
              setRunner(null);
              setTodaySession(null);
              try {
                const h = await api.get('/api/logs/history?status=completed&limit=50');
                setHistory(h.data || []);
              } catch {}
            }}
          />
          <div className="panel" style={{ marginTop: 16 }}>
            <h3>Workout History</h3>
            <WorkoutHistoryTable rows={history} />
          </div>
        </>
      )}
    </div>
  );
}

function SessionRunner({ runner, unit, onRunnerChange, onComplete }) {
  const { session, exercises } = runner;

  const [localTitle, setLocalTitle] = useState(session.title || '');

  useEffect(()=>{ setLocalTitle(session.title || ''); }, [session.id]);

  const saveTitle = async (next) => {
    setLocalTitle(next);
    try {
      await api.patch(`/api/logs/${session.id}`, { title: next.trim() || 'Workout' });
      onRunnerChange(prev => ({ ...prev, session: { ...prev.session, title: next.trim() || 'Workout' } }));
    } catch {}
  };

  const patchSet = async (setId, patch) => {
    const body = { ...patch };
    if ('weight' in patch) { body.weight_kg = toKg(patch.weight, unit); delete body.weight; }
    const { data } = await api.patch(`/api/logs/sets/${setId}`, body);
    // 로컬 반영
    onRunnerChange(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => ({
        ...ex,
        sets: ex.sets.map(s => s.id === setId ? { ...s, ...data } : s)
      }))
    }));
  };

  return (
    <div className="runner">
      <div className="runner-head">

        <input
          className="runner-title-input"
          value={localTitle}
          onChange={(e)=>setLocalTitle(e.target.value)}
          onBlur={()=>saveTitle(localTitle)}
          placeholder="Session name"
        />

        <div className="runner-actions">

         <button className="btn btn-primary" onClick={()=>onComplete(localTitle)} disabled={session.status==='completed'}>
            {session.status==='completed' ? 'Completed' : 'Finish Workout'}
          </button>
        </div>
      </div>

      <div className="runner-body">
        {exercises.length === 0 && <div className="empty">No exercises in this session.</div>}
        {exercises.map(ex => (
          <div key={ex.id} className="runner-card">
            <div className="runner-card__head">
              <div className="runner-card__title">{ex.name}</div>
              <div className="runner-card__meta">{ex.note ? ex.note : ''}</div>
            </div>

            <div className="sets-table">
              <div className="sets-row sets-row--head">
                <div className="sets-col sets-col--no">Set</div>
                <div className="sets-col sets-col--w">{unit === 'lbs' ? 'lbs' : 'kg'}</div>
                <div className="sets-col sets-col--reps">Reps</div>
                <div className="sets-col sets-col--rpe">RPE</div>
                <div className="sets-col sets-col--chk">Done</div>
              </div>
              {ex.sets.map(s => (
                <div key={s.id} className="sets-row">
                  <div className="sets-col sets-col--no">{s.set_no}</div>
                  <div className="sets-col sets-col--w">
                    <input
                      className="set-input"
                      type="number"
                      step="0.5"
                      value={fromKg(s.weight_kg, unit)}
                      onChange={e=>patchSet(s.id, { weight: e.target.value })}
                    />
                  </div>
                  <div className="sets-col sets-col--reps">
                    <input
                      className="set-input"
                      type="number"
                      value={s.reps ?? ''}
                      onChange={e=>patchSet(s.id, { reps: Number(e.target.value)||0 })}
                    />
                  </div>
                  <div className="sets-col sets-col--rpe">
                    <input
                      className="set-input"
                      type="number"
                      step="0.5"
                      value={s.rpe ?? ''}
                      onChange={e=>patchSet(s.id, { rpe: Number(e.target.value) })}
                    />
                  </div>
                  <div className="sets-col sets-col--chk">
                    <input
                      type="checkbox"
                      checked={!!s.completed}
                      onChange={e=>patchSet(s.id, { completed: e.target.checked })}
                    />
                  </div>
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

function WorkoutHistoryTable({ rows }) {
  if (!rows?.length) return <div className="empty">No completed sessions yet.</div>;
  return (
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
          {rows.map((r, i) => (
            <tr key={r.id}>
              <td>{i+1}</td>
              <td>
                <Link to={`/log/${r.id}`} className="link">{r.title || 'Workout'}</Link>
              </td>
              <td>{new Date(r.workout_date || r.completed_at || r.started_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

