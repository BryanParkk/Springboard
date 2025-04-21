// MissionControl.jsx
import MissionCard from './MissionCard';

function MissionControl({ missions, onLaunch, onComplete }) {
  return (
    <>
      {/* Crew cards */}
      {missions.map((mission) => (
        <MissionCard 
          key={mission.id}
          mission={mission}
          onLaunch={onLaunch}
          onComplete={onComplete}
        />
      ))}
    </>
  );
}

export default MissionControl;