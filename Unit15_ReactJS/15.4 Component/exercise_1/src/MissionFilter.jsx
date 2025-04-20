function MissionFilter( {filter, setFilter} ) {

    return (
        <>
			<button className='btn-filter' onClick={() => setFilter('All')}>All</button>
			<button className='btn-filter' onClick={() => setFilter('Planned')}>Planned</button>
			<button className='btn-filter' onClick={() => setFilter('Active')}>Active</button>
			<button className='btn-filter' onClick={() => setFilter('Completed')}>Completed</button>
        </>
    );
}

export default MissionFilter;