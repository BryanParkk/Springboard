import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';

const lbsToKg = (v) => (v===''||v==null)? null : +(Number(v) / 2.2046226218).toFixed(2);

export default function RoutineBuilder() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState({ equipment: 'All', target: 'All' });
  const [selected, setSelected] = useState([]); // [{exercise_id,name,note,rest_sec,sets:[{set_no,weight_lbs,reps}]}]
  const [saving, setSaving] = useState(false);

  // 로드
  useEffect(()=>{
    (async()=>{
      const { data } = await api.get('/api/exercises');
      setExercises(data || []);
    })();
  },[]);

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
      .slice(0,15);
  },[exercises, filter, query]);

  // 운동 추가
  const addExercise = (ex) => {
    if (selected.some(s => s.exercise_id === ex.id)) return; // 중복 방지
    setSelected(s => [...s, {
      exercise_id: ex.id,
      name: ex.name,
      note: '',
      rest_sec: 90,
      sets: [{ set_no: 1, weight_lbs: '', reps: '' }]
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
      return { ...it, sets: [...it.sets, { set_no: nextNo, weight_lbs:'', reps:'' }] };
    }));
  };
  const removeExercise = (idx) => {
    setSelected(arr => arr.filter((_,i)=> i!==idx));
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
          weight_kg: lbsToKg(s.weight_lbs),   // 저장은 kg (SI)
          reps: Number(s.reps)||0
        }))
      }));
      const { data } = await api.post('/api/routines', { title: title.trim(), items });
      navigate('/routine', { replace: true });
    } catch (e) {
      console.error(e);
      alert('Failed to save routine.');
    } finally { setSaving(false); }
  };

  return (
    <div className="routine-builder">
      <div className="builder-header">
        <input
          className="routine-title-input"
          placeholder="Create Workout Routine"
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
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

                  <label className="field-label">Note</label>
                  <input
                    className="field-input"
                    placeholder="e.g., Incline 30°, elbows in"
                    value={it.note}
                    onChange={e=>updateItem(idx, { note: e.target.value })}
                  />

                  <div className="field-row">
                    <div className="field-cell">
                      <label className="field-label">Rest (sec)</label>
                      <input
                        className="field-input"
                        type="number"
                        min="0"
                        value={it.rest_sec}
                        onChange={e=>updateItem(idx, { rest_sec: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="sets-table">
                    <div className="sets-row sets-row--head">
                      <div className="sets-col sets-col--no">Set</div>
                      <div className="sets-col sets-col--w">lbs</div>
                      <div className="sets-col sets-col--reps">Reps</div>
                    </div>
                    {it.sets.map((s, j) => (
                      <div key={j} className="sets-row">
                        <div className="sets-col sets-col--no">{s.set_no}</div>
                        <div className="sets-col sets-col--w">
                          <input
                            className="set-input"
                            type="number"
                            step="0.5"
                            placeholder="lbs"
                            value={s.weight_lbs}
                            onChange={e=>updateSet(idx, j, { weight_lbs: e.target.value })}
                          />
                        </div>
                        <div className="sets-col sets-col--reps">
                          <input
                            className="set-input"
                            type="number"
                            placeholder="reps"
                            value={s.reps}
                            onChange={e=>updateSet(idx, j, { reps: e.target.value })}
                          />
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
          <div className="workout-list-header">
            <h3>Workout List</h3>

            <div className="filters">
              <div className="filter">
                <label>Equipment</label>
                <select
                  value={filter.equipment}
                  onChange={e=>setFilter(f=>({ ...f, equipment:e.target.value }))}
                >
                  {equipmentOpts.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="filter">
                <label>Target</label>
                <select
                  value={filter.target}
                  onChange={e=>setFilter(f=>({ ...f, target:e.target.value }))}
                >
                  {targetOpts.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="filter search">
                <label>Search</label>
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
          <div className="workout-list-hint">Showing up to 15 results. Use filters or search to narrow down.</div>
        </div>
      </div>
    </div>
  );
}

// helpers
function uniq(arr){ return [...new Set((arr||[]).filter(Boolean))]; }