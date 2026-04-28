import { useState } from 'react';
import useFetch from './hooks/useFetch';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import RegionFilter from './components/RegionFilter';
import './App.css';

const API =
'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages';

function App() {
  const { data: countries, loading, error } = useFetch(API);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [favourites, setFavourites] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const regions = ['All','Africa','Americas','Asia','Europe','Oceania'];

  const filtered = (countries || []).filter(c =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === 'All' || c.region === selectedRegion)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'population') return b.population - a.population;
    return a.name.common.localeCompare(b.name.common);
  });

  function toggleFavourite(name) {
    setFavourites(prev =>
      prev.includes(name)
        ? prev.filter(f => f !== name)
        : [...prev, name]
    );
  }

  function getRegionCount(region) {
    if (!countries) return 0;
    if (region === 'All') return countries.length;
    return countries.filter(c => c.region === region).length;
  }

  if (loading) {
    return (
      <div className="full-loading">
        <div className="loader"></div>
        <p>Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>🌍 Country Explorer</h1>
      </div>

      <div className="controls">
        <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />

        <select
          className="sort"
          onChange={(e)=>setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="population">Sort by Population</option>
        </select>
      </div>

      <RegionFilter
        regions={regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        getRegionCount={getRegionCount}
      />

      <p className="count">
        Showing {filtered.length} of {countries.length}
      </p>

      <div className="country-grid">
        {sorted.map(c => (
          <CountryCard
            key={c.name.common}
            country={c}
            isFav={favourites.includes(c.name.common)}
            onFav={toggleFavourite}
            onClick={() => setSelectedCountry(c)}
          />
        ))}
      </div>

      {selectedCountry && (
        <div className="modal" onClick={() => setSelectedCountry(null)}>
          <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
            <img
              src={selectedCountry.flags.svg}
              className="modal-flag"
            />
            <h2>{selectedCountry.name.common}</h2>
            <p>Capital: {selectedCountry.capital?.[0]}</p>
            <p>Population: {selectedCountry.population.toLocaleString()}</p>
            <p>Region: {selectedCountry.region}</p>
            <button onClick={()=>setSelectedCountry(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;