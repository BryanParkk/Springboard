import MissionControl from "./MissionControl";
import MissionFilter from "./MissionFilter";
import { useState } from 'react';
import './index.css';

function App ()
{
	const INITIAL_MISSIONS = [
		{id: 1, name: "Mars Rover", status: "Planned", crew: ["Alice", "Bob"]},
		{id: 2, name: "Moon Base", status: "Active", crew: ["Charlie", "Dave"]},
		{id: 3, name: "Venus Observatory", status: "Planned", crew: ["Eve", "Frank"]},
		{id: 4, name: "Jupiter Moons Survey", status: "Completed", crew: ["Grace", "Hank"]},
		{id: 5, name: "Asteroid Belt Mining", status: "Active", crew: ["Ivy", "John"]},
		{id: 6, name: "Saturn Ring Research", status: "Planned", crew: ["Karen", "Leo"]},
		{id: 7, name: "Deep Space Probe", status: "Completed", crew: ["Mia", "Nolan"]},
		{id: 8, name: "Interstellar Observatory", status: "Planned", crew: ["Olivia", "Pete"]},
		{id: 9, name: "Neptune Atmospheric Study", status: "Active", crew: ["Quinn", "Rachel"]},
		{id: 10, name: "Pluto Reclamation", status: "Planned", crew: ["Sam", "Tina"]}
	];

	//Filter variable
	const [filter, setFilter] = useState('All');
	const [missions, setMissions] = useState(INITIAL_MISSIONS);

	//Filter condition
	const filteredMission = filter === 'All' ? missions : missions.filter(mission => mission.status === filter);

	//Status update (Completed -> Completed)
	const handleComplete = (id) => {
		const updated = missions.map((mission) =>
		  mission.id === id ? { ...mission, status: 'Completed' } : mission
		);
		setMissions(updated);
	  };

	//Status update (Launch -> Active)
	const handleLaunch= (id) => {
		const updated = missions.map((mission) =>
		  mission.id === id ? { ...mission, status: 'Active' } : mission
		);
		setMissions(updated);
	  };

	return (
		<>
		    <h1> 🚀 Space Mission Control 🚀 </h1>
			{/* Filter button */}
			<button className='btn-filter' onClick={() => setFilter('All')}>All</button>
			<button className='btn-filter' onClick={() => setFilter('Planned')}>Planned</button>
			<button className='btn-filter' onClick={() => setFilter('Active')}>Active</button>
			<button className='btn-filter' onClick={() => setFilter('Completed')}>Completed</button>

			{/* Crew cards */}
			{filteredMission.map((INITIAL_MISSIONS, index) => (
				<div className='crew-card' key={index}>
					<div className='crew-info'>
						<div className='crew-name'>{INITIAL_MISSIONS.name}</div>
						<div className='crew-status'>Status: {INITIAL_MISSIONS.status}</div>
						<div className='crew-member'>Crew: {INITIAL_MISSIONS.crew.join(', ')}</div>
					</div>
					<div className="btn-card-group">	
						<button className='btn-card-launch' onClick={() => handleLaunch(INITIAL_MISSIONS.id)}>Launch</button>
						<button className='btn-card-complete' onClick={() => handleComplete(INITIAL_MISSIONS.id)}>Completed</button>
					</div>
				</div>
			))}
		</>
	);
}

export default App;