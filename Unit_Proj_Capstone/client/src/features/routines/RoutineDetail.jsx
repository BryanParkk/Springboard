// src/features/routines/RoutineDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/client";

const toUnit = (kg, unit) => {
  if (kg == null) return "--";
  if (unit === "lbs") return `${(kg * 2.2046226218).toFixed(1)} lbs`;
  return `${Number(kg).toFixed(1)} kg`;
};
////
export default function RoutineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState(null);
  const [unit, setUnit] = useState("kg"); // 사용자 선호 단위(옵션)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: r }, ures] = await Promise.all([
          api.get(`/api/routines/${id}`),
          // 사용자 단위 선호가 있으면 가져와서 표시 (실패해도 무시)
          api.get("/api/user").catch(() => ({ data: null })),
        ]);
        setRoutine(r);
        if (ures?.data?.weight_unit) setUnit(ures.data.weight_unit);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const items = useMemo(() => routine?.items || [], [routine]);

  if (loading) return <p>Loading...</p>;
  if (!routine) return <p>Not found.</p>;

  const onDelete = async () => {
    if (!window.confirm('Delete this routine? This cannot be undone.')) return;
    try {
      await api.delete(`/api/routines/${id}`);
      navigate('/routine', { replace: true });
    } catch (e) {
      alert('Failed to delete.');
    }
  };

  return (
    <div className="workoutroutine-container">
      <main className="workoutroutine-main">
        <h1 className="headline">Routine Detail</h1>
        <p className="subtitle">Edit lets you update exercises, sets, and notes; Delete permanently removes this routine.</p>
      </main>


      {/* 헤더 재사용 스타일 */}
      <div className="builder-header">
        <h2 className="routine-title-input">
          {routine.title}
        </h2>
        <div>
          <Link className="btn" to="/routine">← Back</Link>
          <Link className="btn btn-primary" to={`/routine/${routine.id}/edit`}>
            Edit Routine
          </Link>
        </div>
      </div>

      <div className="builder-body">
        {/* 좌측: 루틴 아이템(읽기 전용) */}
        <div className="builder-left">
          {items.length === 0 ? (
            <div className="empty-left">This routine has no exercises yet.</div>
          ) : (
            <div className="selected-list">
              {items.map((it, idx) => (
                <div key={idx} className="selected-card">
                  <div className="selected-card__head">
                    <div className="selected-card__title">{it.name}</div>
                  </div>

                  {it.note && (
                    <div className="field-cell">
                      <label className="field-label">Note</label>
                      <div className="field-note">{it.note}</div>
                    </div>
                  )}

                  <div className="field-row">
                    <div className="field-cell">
                      <label className="field-label">Rest (sec)</label>
                      <div className="field-input">{it.rest_sec ?? 0}</div>
                    </div>
                  </div>

                  <div className="sets-table">
                    <div className="sets-row sets-row--head">
                      <div className="sets-col sets-col--no">Set</div>
                      <div className="sets-col sets-col--w">{unit === "lbs" ? "lbs" : "kg"}</div>
                      <div className="sets-col sets-col--reps">Reps</div>
                    </div>
                    {(it.sets || []).map((s, j) => (
                      <div key={j} className="sets-row">
                        <div className="sets-col sets-col--no">{s.set_no}</div>
                        <div className="sets-col sets-col--w">{toUnit(s.weight_kg, unit)}</div>
                        <div className="sets-col sets-col--reps">{s.reps ?? "-"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 우측: 메타/액션 패널(간단) */}
        <div className="builder-right">
          <div className="workout-list-header">
            <h3>Routine Info</h3>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <div><strong>Updated</strong><br />{new Date(routine.updated_at).toLocaleString()}</div>
            <div><strong>Created</strong><br />{new Date(routine.created_at).toLocaleString()}</div>
            <Link className="btn btn-primary" to={`/routine/${routine.id}/edit`}>Edit Routine</Link>
            <button className="btn btn-danger" onClick={onDelete}>Delete</button>
          </div>
          <div className="workout-list-hint" style={{ marginTop: 12 }}>
            We show weights in your preferred unit({unit}).
          </div>
        </div>
      </div>
    </div>
  );
}