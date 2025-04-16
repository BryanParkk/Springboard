import React from "react";

function MissionControl( {name, status, crew} ) {
    return (
        <div className="crew-card">
            <div className="crew-info">
                <h2 className="crew-name">{name}</h2>
                <h3 className="crew-status">Status: {status}</h3>
                <h3 className="crew-member">Crew: {crew.join(', ')}</h3>
            </div>
            <div className="btn-card-group">
                    <button className="btn-card-launch">Launch</button>
                    <button className="btn-card-complete">Complete</button>
            </div>
        </div>
    )
}

export default MissionControl;