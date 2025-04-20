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
	const filteredMission = filter === 'All' ? missions : missions.filter(mission => mission.status === filter);

	const handleLaunch = (id) => {
		setMissions(missions.map(mission => mission.id === id ? { ...mission, status: 'Active' } : mission));
	};

	const handleComplete = (id) => {
		setMissions(missions.map(mission => mission.id === id ? { ...mission, status: 'Completed' } : mission));
	};

	return (
		<>
		    <h1> 🚀 Space Mission Control 🚀 </h1>
			{/* Filter button */}
			<MissionFilter filter={filter} setFilter={setFilter}/>
			<MissionControl missions={filteredMission} onLaunch={handleLaunch} onComplete={handleComplete} />
		</>
	);
}

export default App;