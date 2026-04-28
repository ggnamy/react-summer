function RegionFilter({ regions, selectedRegion, setSelectedRegion, getRegionCount }) {
  return (
    <div className="region-filter">
      {regions.map(r => (
        <button
          key={r}
          className={selectedRegion === r ? "active" : ""}
          onClick={() => setSelectedRegion(r)}
        >
          {r} <span className="badge">{getRegionCount(r)}</span>
        </button>
      ))}
    </div>
  );
}

export default RegionFilter;