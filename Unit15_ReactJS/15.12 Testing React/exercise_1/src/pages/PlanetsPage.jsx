import { useEffect, useMemo, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import LoadingDots from "../components/LoadingDots.jsx"
import ErrorMsg from "../components/ErrorMsg.jsx";

export default function PlanetsPage() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [moving, setMoving] = useState(false);
  const [moveErr, setMoveErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    const [pRes, sRes] = await Promise.all([
      SpaceTravelApi.getPlanets(),
      SpaceTravelApi.getSpacecrafts()
    ]);
    if (pRes.isError || sRes.isError) setErr("Failed to load lists.");
    else {
      setPlanets(pRes.data || []);
      setSpacecrafts(sRes.data || []);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const spacecraftsByPlanet = useMemo(() => {
    const m = new Map();
    for (const p of planets) m.set(p.id, []);
    for (const sc of spacecrafts) {
      if (!m.has(sc.currentLocation)) m.set(sc.currentLocation, []);
      m.get(sc.currentLocation).push(sc);
    }
    return m;
  }, [planets, spacecrafts]);

  async function send(spacecraftId, fromPlanetId, targetPlanetId) {
    if (targetPlanetId === fromPlanetId) return;
    setMoving(true);
    setMoveErr("");
    const res = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId });
    setMoving(false);
    if (res.isError) {
      setMoveErr("Move failed: " + (res.data?.message || "Unknown error"));
    } else {
      await load();
    }
  }

  if (loading) return <LoadingDots label="Loading planets" />;

  return (
    <main>
    <h2 className="page-title"><span className="emoji-icon">🌍</span>Planets</h2>
    <ErrorMsg message={err || moveErr} />
    {moving && <LoadingDots label="Moving" />}

    <ul className="list-gap">
        {planets.map(p => (
          <li key={p.id} className="card planet-card">
            <div className="planet-card__icon" aria-hidden="true">
              <img src={p.pictureUrl} alt={p.name} />
            </div>

            <div className="planet-card__body">
              <header className="planet-card__header">
                <h3>{p.name}</h3>
                <div className="planet-card__population">Current population: {p.currentPopulation.toLocaleString()}</div>
              </header>

              <section className="mt-3">
                <h4 className="mt-0" style={{ marginTop: 0 }}>Stationed spacecraft</h4>
                {(spacecraftsByPlanet.get(p.id) ?? []).length === 0 ? (
                  <p style={{ color: "var(--text-dim)" }}>None</p>
                ) : (
                  <ul className="list-gap">
                    {spacecraftsByPlanet.get(p.id).map(sc => (
                      <li key={sc.id} className="card">
                        <b><span className="emoji-icon">🛸</span>{sc.name}</b> (Capacity {sc.capacity.toLocaleString()})
                        <div className="mt-2" style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "8px" }}>
                          <label>Send to another planet:</label>
                          <select
                            defaultValue=""
                            onChange={(e) => {
                              const targetId = Number(e.target.value);
                              if (!Number.isNaN(targetId)) {
                                send(sc.id, p.id, targetId);
                                e.target.value = "";
                              }
                            }}
                          >
                            <option value="" disabled>Select a planet</option>
                            {planets.filter(pp => pp.id !== p.id).map(pp => (
                              <option key={pp.id} value={pp.id}>{pp.name}</option>
                            ))}
                          </select>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </li>
        ))}
    </ul>
    </main>
  );
}