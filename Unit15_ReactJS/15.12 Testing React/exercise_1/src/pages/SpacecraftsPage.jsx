import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import LoadingDots from "../components/LoadingDots.jsx";
import ErrorMsg from "../components/ErrorMsg.jsx";

export default function SpacecraftsPage() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setErr("");
    const res = await SpaceTravelApi.getSpacecrafts();
    if (res.isError) setErr("Failed to load spacecraft list.");
    else setItems(res.data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function onDestroy(id) {
    if (!window.confirm("Are you sure you want to decommission this spacecraft?")) return;
    const res = await SpaceTravelApi.destroySpacecraftById({ id });
    if (res.isError) {
      setErr("Failed to decommission spacecraft.");
    } else {
      await load();
    }
  }

  if (loading) return <LoadingDots label="Loading spacecrafts" />;
    return (
    <main>
        <h2 className="page-title"><span className="emoji-icon">🛰️</span>Spacecrafts</h2>

        <div className="page-actions">
        <button onClick={() => navigate(-1)}>BACK</button>
        <Link className="btn" to="/spacecrafts/new">+ Build New</Link>
        </div>

        <section className="card" style={{marginTop:16}}>
        <ErrorMsg message={err} />
        {items.length === 0 ? (
            <p>No spacecraft registered.</p>
        ) : (
            <ul className="list-gap">
            {items.map(sc => (
                <li key={sc.id} className="card">
                <h3 style={{marginTop:0}}>
                    <Link to={`/spacecrafts/${sc.id}`}>
                    <span className="emoji-icon" role="img" aria-label="ship">🛸</span>
                    {sc.name}
                    </Link>
                </h3>
                <p>Capacity: {sc.capacity.toLocaleString()}</p>
                <p style={{color:"var(--text-dim)"}}>
                    {sc.description?.slice(0, 140)}{sc.description?.length > 140 ? "..." : ""}
                </p>
                <div className="page-actions">
                    <Link className="btn" to={`/spacecrafts/${sc.id}`}>Details</Link>
                    <button onClick={() => onDestroy(sc.id)}>Decommission</button>
                </div>
                </li>
            ))}
            </ul>
        )}
        </section>
    </main>
    );
}