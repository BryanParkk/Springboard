function MissionFilter() {
    return (
        <>
            <button className="btn-filter-all">All</button>
            <button className="btn-filter-planned">Planned</button>
            <button className="btn-filter-active">Active</button>
            <button className="btn-filter-completed">Completed</button>
        </>
    );
}

export default MissionFilter;