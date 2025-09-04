import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import LoadingDots from "../components/LoadingDots.jsx";
import ErrorMsg from "../components/ErrorMsg.jsx";

export default function SpacecraftDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);
  const [planets, setPlanets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const [scRes, pRes] = await Promise.all([
        SpaceTravelApi.getSpacecraftById({ id }),
        SpaceTravelApi.getPlanets()
      ]);
      if (scRes.isError || pRes.isError) setErr("Failed to load data.");
      else {
        setData(scRes.data);
        setPlanets(pRes.data);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <LoadingDots label="Loading details" />;
  if (err) return <ErrorMsg message={err} />;
  if (!data) return <p>Spacecraft not found.</p>;

  const currentPlanet = planets.find(p => p.id === data.currentLocation);

    return (
    <main>
        <h2 className="page-title">
        <span className="emoji-icon">🛰️</span>{data.name}
        </h2>
        <div className="page-actions" style={{marginBottom:16}}>
        <button onClick={() => navigate(-1)}>BACK</button>
        <Link className="btn" to="/planets">View / Deploy Planets</Link>
        </div>

        <section className="card">
        {data.pictureUrl && <img src={data.pictureUrl} alt={data.name} style={{width:"100%", borderRadius:12}} />}
        <p><b>Capacity</b>: {data.capacity.toLocaleString()}</p>
        <p><b>Current Location</b>: {currentPlanet?.name ?? "Unknown"} <span className="emoji-icon">🌍</span></p>
        <p style={{color:"var(--text-dim)"}}>{data.description}</p>
        </section>
    </main>
    );
}