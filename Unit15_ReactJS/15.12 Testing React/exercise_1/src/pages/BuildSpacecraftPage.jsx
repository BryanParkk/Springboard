import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import LoadingDots from "../components/LoadingDots.jsx";
import ErrorMsg from "../components/ErrorMsg.jsx";

export default function BuildSpacecraftPage() {
  const [form, setForm] = useState({ name:"", capacity:"", description:"", pictureUrl:"" });
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!form.name.trim() || !form.capacity || !form.description.trim()) {
      setErr("Name, capacity, and description are required.");
      return;
    }
    const capacityInt = parseInt(form.capacity, 10);
    if (Number.isNaN(capacityInt) || capacityInt <= 0) {
      setErr("Capacity must be greater than 0. (Number Only)");
      return;
    }

    setSubmitting(true);
    const res = await SpaceTravelApi.buildSpacecraft({
      name: form.name.trim(),
      capacity: capacityInt,
      description: form.description.trim(),
      pictureUrl: form.pictureUrl?.trim() || undefined
    });
    setSubmitting(false);

    if (res.isError) setErr("Failed to build spacecraft.");
    else navigate("/spacecrafts");
  }

  const inputStyle = {
    width:"100%",
    background:"transparent",
    color:"var(--text-0)",
    border:"1.5px solid var(--border)",
    borderRadius:"12px",
    padding:"10px 12px ",
    outline:"none",
    marginTop: "10px"
  };

  return (
    <main>
      <h2 className="page-title"><span className="emoji-icon">🛠️</span>Build New Spacecraft</h2>

      {submitting ? <LoadingDots label="Building…" /> : null}

      <section className="card">
        <ErrorMsg message={err} />
        <form onSubmit={onSubmit} noValidate className="list-gap">
          <label>Name
            <input name="name" value={form.name} onChange={onChange} required style={inputStyle}/>
          </label>
          <label>Capacity
            <input name="capacity" value={form.capacity} onChange={onChange}
                   inputMode="numeric" style={inputStyle}/>
          </label>
          <label>Description
            <textarea name="description" value={form.description} onChange={onChange}
                      rows={5} style={inputStyle}/>
          </label>
          <label>Image URL (optional)
            <input name="pictureUrl" value={form.pictureUrl} onChange={onChange}
                   style={inputStyle}/>
          </label>
          <div className="page-actions">
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" disabled={submitting}>Build</button>
          </div>
        </form>
      </section>
    </main>
  );
}