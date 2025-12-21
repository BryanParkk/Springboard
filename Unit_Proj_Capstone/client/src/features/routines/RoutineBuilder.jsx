// src/features/routines/RoutineBuilder.jsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../../api/client';
import '../../styles/layout/RoutineBuilder.css';
import NumberInputStepper from '../components/NumberInputStepper';
import '../../App.css'

const toKg = (v, unit) => {
  if (v === '' || v == null) return null;
  const n = Number(v);
  if (Number.isNaN(n)) return null;
  const kg = unit === 'lbs' ? n / 2.2046226218 : n;
  return Math.round(kg * 100) / 100; // store precise kg (2 decimals) to avoid drift when converting back to lbs
};
const fromKg = (kg, unit) => {
  if (kg == null) return '';
  const n = Number(kg);
  if (Number.isNaN(n)) return '';
  if (unit === 'lbs') return String(Math.round(n * 2.2046226218)); // integer lbs
  return String(Math.round(n)); // integer kg
};
//////
export default function RoutineBuilder({ mode }) {
  const params = useParams();
  const isEdit = mode === 'edit' && params?.id;
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState({ equipment: 'All', target: 'All' });
  const [selected, setSelected] = useState([]); // [{exercise_id,name,note,rest_sec,sets:[{set_no,weight_lbs,reps}]}]
  const [saving, setSaving] = useState(false);

  const [unit, setUnit] = useState('kg'); // user preference

  // load user unit (kg/lbs)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/user');
        if (data?.weight_unit) setUnit(data.weight_unit); // 'kg' | 'lbs'
      } catch {}
    })();
  }, []);

  // 로드
  useEffect(()=>{
    (async()=>{
      const { data } = await api.get('/api/exercises');
      setExercises(data || []);
    })();
  },[]);

 useEffect(() => {
   if (!isEdit) return;
   (async () => {
     const { data } = await api.get(`/api/routines/${params.id}`);
     setTitle(data.title || '');
     const sel = (data.items || []).map(it => ({
       exercise_id: it.exercise_id,
       name: it.name,
       note: it.note || '',
       rest_sec: it.rest_sec ?? 90,
       sets: (it.sets || []).map(s => ({
         set_no: s.set_no || 1,
         weight_val: fromKg(s.weight_kg, unit), // display in user's unit
         reps: s.reps || ''
       }))
     }));
     setSelected(sel);
   })();
 }, [isEdit, params?.id, unit]);

  // 유니크 옵션
  const equipmentOpts = useMemo(() => ['All', ...uniq(exercises.map(x=>x.equipment))], [exercises]);
  const targetOpts    = useMemo(() => ['All', ...uniq(exercises.map(x=>x.target_muscle))], [exercises]);

  // 필터+검색 → 상위 15개
  const workoutList = useMemo(()=>{
    const q = query.trim().toLowerCase();
    return (exercises||[])
      .filter(x => filter.equipment==='All' || (x.equipment||'')===filter.equipment)
      .filter(x => filter.target==='All'    || (x.target_muscle||'')===filter.target)
      .filter(x => !q || [x.name,x.target_muscle].some(f => (f||'').toLowerCase().includes(q)))
      // .slice(0,15);
  },[exercises, filter, query]);

  // 운동 추가
  const addExercise = (ex) => {
    if (selected.some(s => s.exercise_id === ex.id)) return; // 중복 방지
    setSelected(s => [...s, {
      exercise_id: ex.id,
      name: ex.name,
      note: '',
      rest_sec: 90,
      sets: [{ set_no: 1, weight_val: '', reps: '' }]
    }]);
  };

  const updateItem = (idx, patch) => {
    setSelected(arr => arr.map((it,i)=> i===idx ? { ...it, ...patch } : it));
  };
  const updateSet = (idx, setIdx, patch) => {
    setSelected(arr => arr.map((it,i)=>{
      if (i!==idx) return it;
      const sets = it.sets.map((s,j)=> j===setIdx ? { ...s, ...patch } : s);
      return { ...it, sets };
    }));
  };
  const addSet = (idx) => {
    setSelected(arr => arr.map((it,i)=>{
      if (i!==idx) return it;
      const nextNo = (it.sets.at(-1)?.set_no || it.sets.length) + 1;
      return { ...it, sets: [...it.sets, { set_no: nextNo, weight_val:'', reps:'' }] };
    }));
  };

  const removeSet = (idx, setIdx) => {
    setSelected(arr => arr.map((it,i)=>{
      if (i!==idx) return it;
      const next = it.sets
        .filter((_, j) => j !== setIdx)
        .map((s, k) => ({ ...s, set_no: k + 1 }));
      return { ...it, sets: next };
    }));
  };

  const removeExercise = (idx) => {
    setSelected(arr => arr.filter((_,i)=> i!==idx));
  };

  // normalize stepper onChange payload (number | string | event)
  const toNumberFromInput = (val) => {
    if (typeof val === 'number') return val;
    if (val == null) return NaN;
    if (typeof val === 'string') return Number(val);
    if (typeof val === 'object' && 'target' in val) {
      return Number(val.target?.value ?? NaN);
    }
    return Number(val);
  };

  // 저장
  const handleSave = async () => {
    if (!title.trim()) { alert('Please enter a routine title.'); return; }
    if (!selected.length) { alert('Please add at least one exercise.'); return; }
    try {
      setSaving(true);
      const items = selected.map(it => ({
        exercise_id: it.exercise_id,
        name: it.name,
        note: it.note || null,
        rest_sec: Number(it.rest_sec)||0,
        sets: (it.sets||[]).map(s => ({
          set_no: Number(s.set_no)||1,
          weight_kg: toKg(s.weight_val, unit),   // save as kg based on user unit
          reps: Number(s.reps)||0
        }))
      }));
     if (isEdit) {
       await api.put(`/api/routines/${params.id}`, { title: title.trim(), items });
       navigate(`/routine/${params.id}`, { replace: true });
     } else {
       const { data } = await api.post('/api/routines', { title: title.trim(), items });
       navigate(`/routine/${data.id}`, { replace: true });
     }
    } catch (e) {
      console.error(e);
      alert('Failed to save routine.');
    } finally { setSaving(false); }
  };

  return (
    <div className="workoutroutine-container routine-builder">
      <main className='workoutroutine-main'>
        <header className="page-hero builder-hero">
          <h1 className='headline'>Create Workout Routine</h1>
          <p className='subtitle'>Personalized plans to match your goals.</p>
        </header>
      
      <div className="builder-header">
        <input
          className="routine-title-input"
          placeholder="Create Workout Routine"
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />
        <button className="btn btn-primary builder-save-btn" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Routine'}
        </button>
      </div>

      <div className="builder-body">
        {/* 좌측: 선택된 운동 카드 리스트 */}
        <div className="builder-left">
          {selected.length === 0 ? (
            <div className="empty-left">Add exercises from the right to build your routine.</div>
          ) : (
            <div className="selected-list">
              {selected.map((it, idx) => (
                <div key={idx} className="selected-card">
                  <div className="selected-card__head">
                    <div className="selected-card__title">{it.name}</div>
                    <button className="icon-btn remove-btn" onClick={()=>removeExercise(idx)}>✕</button>
                  </div>

                  <div className="selected-compact-row">
                    <input
                      className="field-input compact-note"
                      placeholder="Note…"
                      value={it.note}
                      onChange={e=>updateItem(idx, { note: e.target.value })}
                    />
                    <span className="field-label">Rest</span>
                    <input
                      className="field-input compact-rest"
                      type="number"
                      min="0"
                      placeholder="Rest (s)"
                      value={it.rest_sec}
                      onChange={e=>updateItem(idx, { rest_sec: e.target.value })}
                    />
                  </div>

                  <div className="sets-table">
                    <div className="sets-row sets-row--head">
                      <div className="sets-col sets-col--no">Set</div>
                      <div className="sets-col sets-col--w">{unit}</div>
                      <div className="sets-col sets-col--reps">Reps</div>
                      <div className="sets-col sets-col--act"></div>
                    </div>
                    {it.sets.map((s, j) => (
                      <div key={j} className="sets-row">
                        <div className="sets-col sets-col--no">{s.set_no}</div>
                        <div className="sets-col sets-col--w">
                          <NumberInputStepper
                            className="set-input"
                            step={1}
                            value={s.weight_val === '' || s.weight_val == null ? 0 : Number(s.weight_val)}
                            placeholder="–"
                            onChange={(val) => {
                              const n = toNumberFromInput(val);
                              updateSet(idx, j, { weight_val: Number.isFinite(n) ? String(n) : '' });
                            }}
                            min={0}
                            max={999}
                            ariaLabel={`Weight (${unit})`}
                          />
                        </div>
                        <div className="sets-col sets-col--reps">
                          <NumberInputStepper
                            className="set-input"
                            step={1}
                            min={0}
                            max={99}
                            placeholder="reps"
                            value={s.reps === '' || s.reps == null ? 0 : Number(s.reps)}
                            onChange={(val) => {
                              const n = toNumberFromInput(val);
                              updateSet(idx, j, { reps: Number.isFinite(n) ? n : '' });
                            }}
                            ariaLabel="Repetitions"
                          />
                        </div>
                        <div className="sets-col sets-col--act">
                          <button
                            type="button"
                            className="icon-btn remove-btn"
                            title="Remove set"
                            onClick={()=>removeSet(idx, j)}
                          >X</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="btn add-set-btn" onClick={()=>addSet(idx)}>＋ Add set</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 우측: Workout List (필터/검색/목록) */}
        <div className="builder-right">
          <div className="workout-list-header workout-toolbar">
            <h3>Workout List</h3>

            <div className="filters">
              <div className="filter">
                <label className="field-label">Equipment</label>
                <select
                  value={filter.equipment}
                  onChange={e=>setFilter(f=>({ ...f, equipment:e.target.value }))}
                >
                  {equipmentOpts.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="filter">
                <label className="field-label">Target</label>
                <select
                  value={filter.target}
                  onChange={e=>setFilter(f=>({ ...f, target:e.target.value }))}
                >
                  {targetOpts.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="filter search">
                <label className="field-label">Search</label>
                <input
                  placeholder="Search exercises..."
                  value={query}
                  onChange={e=>setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="workout-list">
            {workoutList.map(ex => (
              <button key={ex.id} className="workout-item" onClick={()=>addExercise(ex)}>
                <img className="workout-thumb" src={ex.image_url} alt={ex.name} />
                <div className="workout-texts">
                  <div className="workout-name">{ex.name}</div>
                  <div className="workout-meta">{ex.target_muscle || '-'}</div>
                </div>
              </button>
            ))}
            {workoutList.length === 0 && <div className="empty-list">No exercises match your filters.</div>}
          </div>
          <div className="workout-list-hint">Showing {workoutList.length} results.</div>
        </div>
      </div>
      </main>
    </div>
  );
}

// helpers
function uniq(arr){ return [...new Set((arr||[]).filter(Boolean))]; }