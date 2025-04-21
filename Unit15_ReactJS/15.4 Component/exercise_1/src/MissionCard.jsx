// MissionCard.jsx
function MissionCard({ mission, onLaunch, onComplete }) {
    return (
      <div className='crew-card' key={mission.id}>
        <div className='crew-info'>
          <div className='crew-name'>{mission.name}</div>
          <div className='crew-status'>Status: {mission.status}</div>
          <div className='crew-member'>Crew: {mission.crew.join(', ')}</div>
        </div>
        <div className="btn-card-group">    
          <button className='btn-card-launch' onClick={() => onLaunch(mission.id)}>Launch</button>
          <button className='btn-card-complete' onClick={() => onComplete(mission.id)}>Completed</button>
        </div>
      </div>
    );
  }
  
  export default MissionCard;