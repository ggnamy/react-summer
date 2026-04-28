function RegionFilter({ regions, selectedRegion, setSelectedRegion }) {
  return (
    <div className="region-filter">
      {regions.map((r) => (
        <button
          key={r}
          className={selectedRegion === r ? "active" : ""}
          onClick={() => setSelectedRegion(r)}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

export default RegionFilter;