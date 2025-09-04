import { Link } from "react-router-dom";

export default function HomePage(){
  return (
    <>
      <section className="hero card">
        <div className="hero__content">
          <h1 className="hero__title">Space Travel</h1>
          <p className="hero__subtitle">The command dashboard for humanity’s evacuation.</p>
          <div className="hero__actions">
            <Link className="btn" to="/spacecrafts">View / Manage Spacecrafts</Link>
            <Link className="btn" to="/spacecrafts/new">Build New Spacecraft</Link>
            <Link className="btn" to="/planets">View / Deploy Planets & Spacecrafts</Link>
          </div>
        </div>
        <div className="hero__flare" aria-hidden="true"/>
      </section>

      <section className="features">
        <div className="feature-card card">
          <div className="feature-card__icon" aria-hidden="true">🛰️</div>
          <div className="feature-card__body">
            <h3>Spacecrafts Management</h3>
            <p>View the entire fleet, access details, and decommission or construct spacecraft.</p>
          </div>
        </div>
        <div className="feature-card card">
          <div className="feature-card__icon" aria-hidden="true">🛠️</div>
          <div className="feature-card__body">
            <h3>New Construction</h3>
            <p>Build a new spacecraft on Earth by entering its name, capacity, and description.</p>
          </div>
        </div>
        <div className="feature-card card">
          <div className="feature-card__icon" aria-hidden="true">🌍</div>
          <div className="feature-card__body">
            <h3>Planets & Deployment</h3>
            <p>Check each planet’s population and stationed spacecraft, and send them to other planets.</p>
          </div>
        </div>
      </section>
    </>
  );
}
