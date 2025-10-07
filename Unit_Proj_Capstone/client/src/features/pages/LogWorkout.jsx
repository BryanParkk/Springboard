// src/features/pages/LogWorkout.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import '../../styles/layout/LogWorkout.css';
import '../../styles/components/Table.css';

const toKg = (v, unit) =>
  v === '' || v == null ? null : unit === 'lbs' ? Number(v) / 2.2046226218 : Number(v);
const fromKg = (kg, unit) =>
  kg == null ? '' : unit === 'lbs' ? (kg * 2.2046226218).toFixed(1) : Number(kg).toFixed(1);

/** 루틴 카드 그리드 */
function RoutineGrid({ routines, onChoose }) {
  return (
    <div className="routine-grid">
      {routines.map((rt) => {
        const items = Array.isArray(rt.items) ? rt.items : [];
        const exCount = items.length;
        const setCount = items.reduce(
          (acc, it) => acc + (Array.isArray(it.sets) ? it.sets.length : 0),
          0
        );
        return (
          <div key={rt.id} className="log-routine-card">
            <div className="log-routine-card__head">
              <h4 className="log-routine-card__title">{rt.title}</h4>
            </div>
            <div className="log-routine-card__meta">
              <span>{exCount} exercises</span>
              <span>·</span>
              <span>{setCount} sets</span>
            </div>
            <div className="log-routine-card__actions">
              <button className="btn btn-primary" onClick={() => onChoose(rt)}>
                Start
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 시작 전 확인 — 인라인(제목 아래, 그리드 위) */
function ConfirmStartInline({ open, routine, onYes, onNo }) {
  if (!open) return null;
  return (
    <div className="inline-confirm">
      <div className="inline-confirm__body">
        <h3 className="inline-confirm__title">Start this workout?</h3>
        <p className="inline-confirm__text">
          You’re about to begin <strong>{routine?.title}</strong>. We’ll start tracking your sets and reps
          now.
        </p>
        <div className="inline-confirm__actions">
          <button className="btn btn-ghost" onClick={onNo}>
            No, go back
          </button>
          <button className="btn btn-primary" onClick={onYes}>
            Yes, start
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LogWorkout() {
  const [unit, setUnit] = useState('kg');
  const [todaySession, setTodaySession] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirm, setConfirm] = useState({ open: false, routine: null });
  const [runner, setRunner] = useState(null); // { session, exercises:[{... sets:[]}] }

  useEffect(() => {
    (async () => {
      try {
        const [sess, rts] = await Promise.all([
          api.get('/api/logs?status=in_progress'),
          api.get('/api/routines'),
        ]);
        const session = (sess.data || [])[0] || null;
        setTodaySession(session);
        setRoutines(rts.data || []);

        api
          .get('/api/user')
          .then((u) => {
            if (u.data?.weight_unit) setUnit(u.data.weight_unit);
          })
          .catch(() => {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!todaySession?.id) return;
    (async () => {
      const { data } = await api.get(`/api/logs/${todaySession.id}`);
      setRunner(data);
    })();
  }, [todaySession?.id]);

  const startFromRoutine = async (routine) => {
    const rid = typeof routine === 'object' ? routine.id : routine;
    const rtitle = typeof routine === 'object' ? routine.title : undefined;
    const { data } = await api.post('/api/logs/start', { routine_id: rid, title: rtitle });
    const sess = await api.get(`/api/logs/${data.id}`);
    setTodaySession({ id: data.id, title: data.title, status: 'in_progress' });
    setRunner(sess.data);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="logworkout-container">
      <main className='workoutroutine-main'>
        <h2 className='headline'>Log Workout</h2>
        <p className='subtitle'>Log your workout to keep track of your exercises, sets, reps, and progress over time.</p>
      </main>
      {!runner ? (
        <div>
          <div>
            <h2>Start Workout</h2>

            <ConfirmStartInline
              open={!!confirm.open}
              routine={confirm.routine}
              onNo={() => setConfirm({ open: false, routine: null })}
              onYes={async () => {
                const rt = confirm.routine;
                setConfirm({ open: false, routine: null });
                await startFromRoutine(rt);
              }}
            />

            {routines.length === 0 ? (
              <div className="wr-empty">
                No routines yet. <Link to="/routine/new">Create your first workout routine</Link>.
              </div>
            ) : (
              <RoutineGrid routines={routines} onChoose={(rt) => setConfirm({ open: true, routine: rt })} />
            )}
          </div>
        </div>
      ) : (
        <SessionRunner
          runner={runner}
          unit={unit}
          onRunnerChange={setRunner}
          onComplete={async (titleText) => {
            await api.post(`/api/logs/${runner.session.id}/complete`, { title: titleText });
            localStorage.removeItem('logw:suppressResume'); 
            setRunner(null);
            setTodaySession(null);
          }}
          onCancel={async () => {
            try {
              await api.post(`/api/logs/${runner.session.id}/cancel`);
            } catch (e) {}
            localStorage.removeItem('logw:suppressResume'); 
            setRunner(null);
            setTodaySession(null);
          }}
        />
      )}
    </div>
  );
}

function SessionRunner({ runner, unit, onRunnerChange, onComplete, onCancel }) {
  const { session, exercises } = runner;
  const [localTitle, setLocalTitle] = useState(session.title || '');

  useEffect(() => {
    setLocalTitle(session.title || '');
  }, [session.id]);

  const saveTitle = async (next) => {
    const val = next.trim() || 'Workout';
    setLocalTitle(val);
    try {
      await api.patch(`/api/logs/${session.id}`, { title: val });
      onRunnerChange((prev) => ({ ...prev, session: { ...prev.session, title: val } }));
    } catch {}
  };

  const patchSet = async (setId, patch) => {
    const body = { ...patch };
    if ('weight' in patch) {
      body.weight_kg = toKg(patch.weight, unit);
      delete body.weight;
    }
    const { data } = await api.patch(`/api/logs/sets/${setId}`, body);
    onRunnerChange((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => ({
        ...ex,
        sets: ex.sets.map((s) => (s.id === setId ? { ...s, ...data } : s)),
      })),
    }));
  };

  return (
    <div className="runner">
      <div className="runner-head">
        <input
          className="runner-title-input"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onBlur={() => saveTitle(localTitle)}
          placeholder="Session name"
        />
        <div className="runner-actions">
          <button className="btn btn-danger" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onComplete(localTitle)}
            disabled={session.status === 'completed'}
          >
            {session.status === 'completed' ? 'Completed' : 'Finish Workout'}
          </button>
        </div>
      </div>

      <div className="runner-body">
        {exercises.length === 0 && <div className="empty">No exercises in this session.</div>}
        {exercises.map((ex) => (
          <div key={ex.id} className="runner-card">
            <div className="runner-card__head">
              <div className="runner-card__title">{ex.name}</div>
              <div className="runner-card__meta">{ex.note ? ex.note : ''}</div>
            </div>

            <div className="sets-table table table--sticky-head table--scroll">
              <div className="sets-row sets-row--head">
                <div className="sets-col sets-col--no">Set</div>
                <div className="sets-col sets-col--w">{unit === 'lbs' ? 'lbs' : 'kg'}</div>
                <div className="sets-col sets-col--reps">Reps</div>
                <div className="sets-col sets-col--rpe">RPE</div>
                <div className="sets-col sets-col--chk">Done</div>
              </div>

              {ex.sets.map((s) => (
                <div key={s.id} className="sets-row">
                  <div className="sets-col sets-col--no">{s.set_no}</div>
                  <div className="sets-col sets-col--w">
                    <input
                      className="set-input"
                      type="number"
                      step="1"
                      value={fromKg(s.weight_kg, unit)}
                      onChange={(e) => patchSet(s.id, { weight: e.target.value })}
                    />
                  </div>
                  <div className="sets-col sets-col--reps">
                    <input
                      className="set-input"
                      type="number"
                      value={s.reps ?? ''}
                      onChange={(e) => patchSet(s.id, { reps: Number(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="sets-col sets-col--rpe">
                    <select
                      className="set-input"
                      value={s.rpe == null ? 10 : Number(s.rpe)}
                      onChange={(e) => {
                        const n = Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 10));
                        patchSet(s.id, { rpe: n });         
                      }}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>                    
                  </div>

                  <div className="sets-col sets-col--chk">
                    <input
                      type="checkbox"
                      checked={!!s.completed}
                      onChange={(e) => patchSet(s.id, { completed: e.target.checked })}
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
