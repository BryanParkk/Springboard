import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import '../../styles/layout/LogWorkout.css';
import binIcon from '../../assets/bin.png';

export default function WorkoutHistoryPanel({ limit = 20, title = 'Workout History' }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  // Fallback total when count API is missing: if there's no next page, infer total from current slice
  const derivedTotal = (totalCount !== null)
    ? totalCount
    : (!hasNext ? ((page - 1) * limit + rows.length) : null);
  const totalPages = (derivedTotal !== null) ? Math.max(1, Math.ceil(derivedTotal / limit)) : null;

  useEffect(()=>{
    (async()=>{
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const res = await api.get(`/api/logs/history?status=completed&limit=${limit}&offset=${offset}`);
        const list = res.data || [];

        // For each entry, fetch minimal detail to compute counts (exercises / sets)
        const enriched = await Promise.all(list.map(async (r) => {
          try {
            const d = await api.get(`/api/logs/${r.id}`);
            const exs = d.data?.exercises || [];
            const exCount = exs.length;
            const setCount = exs.reduce((acc, ex) => acc + ((ex.sets || []).length), 0);
            return { ...r, exercise_count: exCount, set_count: setCount };
          } catch {
            return r; // fallback if detail fetch fails
          }
        }));

        setRows(enriched);
        if (totalCount !== null) {
          const tp = Math.max(1, Math.ceil(totalCount / limit));
          setHasNext(page < tp);
        } else {
          setHasNext(list.length === limit); // if full page fetched, there may be a next page
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [page, limit]);

  useEffect(()=>{
    (async()=>{
      try {
        const res = await api.get(`/api/logs/history/count?status=completed`);
        if (typeof res.data?.total === 'number') {
          setTotalCount(res.data.total);
        }
      } catch (e) {
        // 서버에 count 라우트가 없으면 totalPages는 null로 남음(표시는 fallback)
        console.warn('Count API failed or missing:', e?.response?.status, e?.response?.data);
      }
    })();
  }, [limit]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workout log? This cannot be undone.')) return;
    try {
      setDeletingId(id);
      await api.delete(`/api/logs/${id}`);

      // Update totalCount if we have it
      let nextTotal = totalCount;
      if (typeof totalCount === 'number') {
        nextTotal = Math.max(0, totalCount - 1);
        setTotalCount(nextTotal);
      }

      // Decide next page
      let nextPage = page;
      if (typeof nextTotal === 'number') {
        const nextTotalPages = Math.max(1, Math.ceil(nextTotal / limit));
        if (page > nextTotalPages) nextPage = nextTotalPages;
      } else {
        // No count: if this page now empty, go back a page
        if (rows.length <= 1 && page > 1) nextPage = page - 1;
      }

      if (nextPage !== page) {
        // Trigger list reload via useEffect
        setPage(nextPage);
      } else {
        // Refetch same page to fill up to limit again
        const offset = (nextPage - 1) * limit;
        const res = await api.get(`/api/logs/history?status=completed&limit=${limit}&offset=${offset}`);
        const list = res.data || [];
        const enriched = await Promise.all(list.map(async (r) => {
          try {
            const d = await api.get(`/api/logs/${r.id}`);
            const exs = d.data?.exercises || [];
            const exCount = exs.length;
            const setCount = exs.reduce((acc, ex) => acc + ((ex.sets || []).length), 0);
            return { ...r, exercise_count: exCount, set_count: setCount };
          } catch {
            return r;
          }
        }));
        setRows(enriched);

        if (typeof nextTotal === 'number') {
          const tp = Math.max(1, Math.ceil(nextTotal / limit));
          setHasNext(nextPage < tp);
        } else {
          setHasNext(list.length === limit);
        }
      }
    } catch (e) {
      alert('Delete failed (server may not support DELETE /api/logs/:id yet).');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="panel">
      <h2>{title}</h2>
      {loading ? (
        <div className="empty">Loading...</div>
      ) : !rows.length ? (
        <div className="empty">No completed sessions yet.</div>
      ) : (
      <>
        <div className="log-history-wrap">
              <table className="log-history">
                <thead>
                  <tr>
                    <th className="cell-center">#</th>
                    <th className="cell-name">Name</th>
                    <th className="cell-center">Exercises / Sets</th>
                    <th className="cell-center">Date</th>
                    <th className="cell-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id}>
                      <td style={{ textAlign: 'center' }}>{i + 1 + (page - 1) * limit}</td>
                      <td><Link className="link" to={`/log/${r.id}`}>{r.title || 'Workout'}</Link></td>
                      <td style={{ textAlign: 'center' }}>
                        {(r.exercise_count ?? '—')} / {(r.set_count ?? '—')}
                      </td>
                      <td>{new Date(r.workout_date || r.completed_at || r.started_at).toLocaleDateString()}</td>
                      <td className="cell-center">
                        <span
                          className="icon-trash"
                          role="button"
                          tabIndex={0}
                          aria-label="Delete this workout log"
                          aria-disabled={deletingId === r.id ? 'true' : 'false'}
                          onClick={() => handleDelete(r.id)}
                          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDelete(r.id)}
                        >
                          {deletingId === r.id
                            ? '…'
                            : <img src={binIcon} alt="" className="icon-trash-img" />}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1 || loading}>❮ Prev</button>
              <span>
                {totalPages !== null
                  ? <>{page} of {totalPages}</>
                  : <>Page {page}</>}
              </span>
              <button onClick={() => setPage(p => p + 1)} disabled={((totalPages !== null) ? page >= totalPages : !hasNext) || loading}>Next ❯</button>
            </div>
      </>
      )}
    </div>
  );
}
